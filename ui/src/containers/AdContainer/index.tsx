import React, { useMemo } from 'react'
import { sampleSize, shuffle, isObject } from 'lodash'
import { useQuery, useMutation } from 'urql'
import Ad from 'components/Ad'
import styles from './styles.module.scss'

const safeParse = (str?: any) => {
  try {
    const obj = JSON.parse(str)
    return isObject(obj) ? obj : {}
  } catch(e) {
    return {}
  }
}
const adQuery = `{
  currentUser {
    id
    trackingInfo
  }
  ads: adsList {
    id
    url
    img
    content
    tags
    isGeneric
    weight
    targetTags
    primaryTags
  }
}`

// , weight        int default 1
// , target_tags   jsonb default '[]'
// , primary_tags  jsonb default '[]'
// , tags          jsonb default '[]'


type AdQuery = {
  ads: Array<{
    id: string
    url: string
    img: string
    content: string
    isGeneric: boolean
    weight: number
    tags: string
    targetTags: string
    primaryTags: string
  }>
  currentUser?: {
    id: string
    trackingInfo: string
  }
}

type Ad = {
  id: string
  url: string
  img: string
  content: string,
  isGeneric: boolean
  weight: number
  tags: Array<string>
  primaryTags: Array<string>
  targetTags: Array<string>
}


const logAdClickMutation = `
mutation logAdClick($input: LogAdClickInput!) {
  logAdClick(input: $input) {
    adClick {
      adId
      userId
      clickCount
    }
  }
}`

type LogAdClickInput = {
  input: {
    ad: string
  }
}

type LogAdClickResponse = {
  logAdClick: {
    adClick: {
      adId: string
      userId: string
      clickCount: number
    }
  }
}

type Filter = {
  tags?: Array<string>,
  targetTags?: Array<string>,
}

function filterAds(
  allAds: Array<Ad>,
  filter: Filter = {},
  n: number = 1,
): Array<Ad> {
  const tags = new Set(filter.tags || [])
  const targetTags = new Set(filter.targetTags || [])
  const viableAds = allAds.filter(ad => ad.isGeneric)

  const primaryAds = allAds.filter(ad => ad.primaryTags.some(a => tags.has(a)))

  if (primaryAds.length >= n) {
    return sampleSize(primaryAds, n)
  }
  const secondaryAds = allAds.filter(ad =>
    ad.tags.some(a => tags.has(a))
    && !primaryAds.includes(ad)
  )

  if (primaryAds.length + secondaryAds.length >= n) {
    return [...shuffle(primaryAds), ...sampleSize(secondaryAds, n - primaryAds.length)]
  }

  const taggedAds = [...shuffle(primaryAds), ...shuffle(secondaryAds)]

  const targetAds = allAds.filter(ad =>
    ad.targetTags.some(a => targetTags.has(a))
    && !taggedAds.includes(ad)
  )

  const remainingAds = [
    ...targetAds,
    ...viableAds.filter(ad => !taggedAds.includes(ad))
  ]

  return [...taggedAds, ...sampleSize(remainingAds, n - taggedAds.length)]
}

export function useAds(n: number = 1, filter: Filter = {}) {
  const [{ data, fetching }] = useQuery<AdQuery>({ query: adQuery })

  const ads = useMemo(() => {
    if (!data) return []
    const parsedAds = data.ads.map(ad => ({
      ...ad,
      tags: JSON.parse(ad.tags),
      primaryTags: JSON.parse(ad.primaryTags),
      targetTags: JSON.parse(ad.targetTags),
    }))
    const trackingInfo = data.currentUser ? safeParse(data.currentUser.trackingInfo) : {}
    const targetTags = [
      trackingInfo.gender,
      ...(trackingInfo.profileTags || [])
    ]

    return filterAds(parsedAds, {...filter, targetTags}, n)
  }, [n, filter, data])

  return { ads, fetchingAds: fetching }
}

type Props = {
  ads: Array<Ad>,
  fetching?: boolean,
}
const AdContainer = ({ ads, fetching }: Props) => {
  const [response, executeLogAdClick] = useMutation<LogAdClickResponse, LogAdClickInput>(logAdClickMutation) // eslint-disable-line

  if (fetching) return <>loading...</>
  if (!ads) return null

  const logAdClick = (id: string) =>
    setTimeout(() =>
      executeLogAdClick({ input: { ad: id }
    }), 200)

  return (
    <section className={styles.adContainer}>
      <div className={styles.label}>SPONSORED CONTENT</div>
      {ads.map((ad, i) => (
        <div className={styles.adWrapper} key={i}>
          <Ad {...ad} onClick={() => logAdClick(ad.id)} />
        </div>
      ))}
    </section>
  )
}


export default AdContainer
import React, { useMemo } from 'react'
import { compact, find, sampleSize } from 'lodash'
import { useQuery, useMutation } from 'urql'
import Ad from '../../components/Ad'
import styles from './styles.module.scss'

const adQuery = `{
  ads: adsList {
    id
    url
    img
    content
    tags
    isGeneric
  }
}`


type AdQuery = {
  ads: Array<{
    id: string
    url: string
    img: string
    content: string
    isGeneric: boolean
    tags: string
  }>
}

type Ad = {
  id: string
  url: string
  img: string
  content: string,
  isGeneric: boolean
  tags: Array<string>
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

function orderAds(allAds: Array<Ad>, tagsOrderedByPreference: Array<string>, atLeast: number) {
  const usedAds = new Set()
  const adsAndNulls = tagsOrderedByPreference.map(tag => {
    const found = find(allAds, ad => !usedAds.has(ad.id) && ad.tags.includes(tag))
    if (found) usedAds.add(found.id)
    return found
  })
  const priorityAds = compact(adsAndNulls)

  const unusedAds = allAds.filter(ad => !usedAds.has(ad.id) && ad.isGeneric)
  const adsLeft = atLeast - priorityAds.length

  const ads = adsLeft > 0
    ? priorityAds.concat(sampleSize(unusedAds, adsLeft))
    : priorityAds

  return ads

}

type Props = {
  n?: number,
  offset?: number,
  tags?: Array<string>
  tag?: string
}
const AdContainer = ({ n, tag, tags, offset }: Props) => {
  const [{ data, fetching }] = useQuery<AdQuery>({ query: adQuery })
  const [response, executeLogAdClick] = useMutation<LogAdClickResponse, LogAdClickInput>(logAdClickMutation) // eslint-disable-line

  const ads = useMemo(() => {
    if (!data) return []
    const parsedAds = data.ads.map(ad => ({ ...ad, tags: JSON.parse(ad.tags) }))
    return orderAds(
      parsedAds,
      tag ? [tag] : (tags || []),
      n || 1
    ).slice(offset || 0)
  }, [n, tag, tags, offset, data])




  if (fetching) return <>loading...</>
  if (!data) return null


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

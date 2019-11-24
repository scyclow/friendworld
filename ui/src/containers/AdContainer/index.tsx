import React, { useMemo } from 'react'
import { sampleSize, shuffle } from 'lodash'
import Ad from 'components/Ad'
import styles from './styles.module.scss'
import adData from 'data/ads.json'

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
    ...allAds.filter(ad => !taggedAds.includes(ad))
  ]

  return [...taggedAds, ...sampleSize(remainingAds, n - taggedAds.length)]
}

export function useAds(n: number = 1, filter: Filter = {}) {

  const ads = useMemo(() => {
    const parsedAds = adData
    .filter(ad => !ad.dev)
    .map(ad => ({
      ...ad,
      tags: JSON.parse(ad.tags),
      primaryTags: JSON.parse(ad.primaryTags),
      targetTags: JSON.parse(ad.targetTags),
    }))

    return filterAds(parsedAds, { ...filter, targetTags: [] }, n)
  }, [n, filter])
  return { ads, fetchingAds: false }
}

type Props = {
  ads: Array<Ad>,
  fetching?: boolean,
}
const AdContainer = ({ ads, fetching }: Props) => {

  if (fetching) return <>loading...</>
  if (!ads) return null

  const logAdClick = (id: string) => {}

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

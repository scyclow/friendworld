import * as React from 'react'
import sampleSize from 'lodash/sampleSize'
import { useQuery } from 'urql'
import { Link } from 'react-router-dom'
import Ad from '../../components/Ad'
import styles from './styles.module.scss'

type AdList = Array<{
  to: string
  img?: string
  content?: string
}>

const adQuery = `query AdQuery ($n: Int!) {
  ads: adsList (first: $n) {
    id
    url
    img
    content
  }
}`

type AdQuery = {
  ads: Array<{
    id: string
    url: string
    img: string
    content: string
  }>
}

type Props = {
  n?: number
}
const AdContainer = ({ n }: Props) => {
  const [{ data, fetching }] = useQuery<AdQuery>({ query: adQuery, variables: { n: 8 } })
  if (fetching) return <>loading...</>
  if (!data) return <></>

  const adList = sampleSize(data.ads, n || 8)

  return (
    <section className={styles.adContainer}>
      <div className={styles.label}>SPONSORED CONTENT</div>
      {adList.map((ad, i) => (
        <React.Fragment key={i}>
          <Ad {...ad} />
        </React.Fragment>
      ))}
    </section>
  )
}

export default AdContainer

import React from 'react'

import { useQuery } from 'urql'
import Ad from 'components/Ad'

const adQuery = `{
  stats: ads {
    totalCount
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

export default () => {
  const [{ data, fetching, error }] = useQuery({ query: adQuery })
  if (process.env.NODE_ENV !== 'development') return 'ads'
  if (fetching) return 'loading'
  if (error) return error
  if (!data) return 'no data'

  return (
    <div>
      <h1>Total Ads: {data.stats.totalCount}</h1>
      {data.ads.map((ad: any) =>
        <div key={ad.id} style={{ border: '1px solid black', padding: '5px', margin: '10px' }}>
          <div style={{ maxWidth: '400px' }}>
            <Ad {...ad} />
          </div>
          <pre>{JSON.stringify(ad, null, 3)}</pre>
        </div>
      )}
    </div>
  )
}

import React from 'react'

import { useQuery } from 'urql'
import Ad from 'components/Ad'
import DisplayError from 'components/DisplayError'
import Loading from 'components/Loading'

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

function DevAds() {
  const [{ data, fetching, error }] = useQuery({ query: adQuery })
  if (process.env.NODE_ENV !== 'development') return 'ads'
  if (error) return <DisplayError error={error} />
  if (fetching) return <Loading />
  if (!data) return 'no data'

  return (
    <div>
      <h1>Total Ads: {data.stats.totalCount}</h1>
      {data.ads.map((ad: any) =>
        <div key={ad.id} style={{ border: '1px solid', padding: '5px', margin: '10px' }}>
          <div style={{ maxWidth: '400px' }}>
            <Ad {...ad} />
          </div>
          <pre>{JSON.stringify(ad, null, 3)}</pre>
        </div>
      )}
    </div>
  )
}

export default DevAds

import React from 'react'
import Ad from 'components/Ad'
import adData from 'data/ads.json'

function DevAds() {
  return (
    <div>
      <h1>Total Ads: {adData.length}</h1>
      {adData.filter(ad => ad.dev).map((ad: any) =>
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

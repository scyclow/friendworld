import * as React from 'react'
import sampleSize from 'lodash/sampleSize'
import { Link } from 'react-router-dom'
import Ad from '../../components/Ad'
import styles from './styles.module.scss'

type AdList = Array<{
  to: string
  img?: string
  content?: string
}>

const adData: AdList = [
  {
    to: "http://fastcashmoneyplus.biz",
    img: "https://www.washingtonpost.com/resizer/bmfQHooAGH6PmEv0qHjgf-ZUy-k=/480x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/EBULPVFULQI6PG4TXFYEHZL2EI.jpg",
    content: "BUY FASTCASH NOW",
  },
  {
    to: "http://fakebullshit.news",
    img: "https://i.imgur.com/94L6Q6X.jpg",
    content: "UH OH... WHAT DID SHILLARY DO THIS TIME?!",
  },
  {
    to: "http://steviep.xyz",
    img: "https://www.thoughtco.com/thmb/_Wdk4z5X4uEhg4h88GTFPS8KQqw=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/h20-58e655f93df78c5162ea0a1f.jpg",
    content: "YOU'LL NEVER BELIEVE WHAT SCIENTISTS ARE FINDING IN YOUR FOOD",
  },
  {
    to: "http://steviep.xyz",
    img: "https://targetedindividualscanada.files.wordpress.com/2011/01/psycho-electronic-weapon-effects-pic1.jpg",
    content: "THE GOVERNMENT JUST FREAKED ABOUT NEW INFO LEAKING",
  },
  {
    to: "http://steviep.xyz",
    img: "https://targetedindividualscanada.files.wordpress.com/2011/11/brain-inplants.jpg",
    content: "WHAT YOU DON'T KNOW ABOUT YOUR BRAIN MAY KILL YOU",
  },
  {
    to: '',
    img: 'https://www.chantellerenee.org/wp-content/uploads/2018/06/light-dimensions-ascension-1.jpg',
    content: 'SUBMIT TO GOD BEFORE ITS TOO LATE'
  }
]

type Props = {
  n?: number
}
const AdContainer = ({ n }: Props) => {
  const adList = sampleSize(adData, n || 5)

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

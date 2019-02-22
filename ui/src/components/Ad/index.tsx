import * as React from 'react';
import styles from './styles.module.scss';
import Img from '../Img'

type Props = {
  url: string
  img?: string
  content?: string
}

const Ad: React.SFC<Props> = ({ url, img, content }) => (
  <div className={styles.ad}>
    <a href={url} target="_blank" rel="noopener noreferrer">
      {img &&
        <Img url={img} alt={content} />
      }
      {content &&
        <div className={styles.content}>{content}</div>
      }
    </a>
  </div>
)

export default Ad

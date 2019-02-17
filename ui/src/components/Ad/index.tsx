import * as React from 'react';
import styles from './styles.module.scss';
import Img from '../Img'

type Props = {
  to: string
  img?: string
  content?: string
}

const Ad: React.SFC<Props> = ({ to, img, content }) => (
  <div className={styles.ad}>
    <a href={to} target="_blank" rel="noopener noreferrer">
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

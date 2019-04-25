import * as React from 'react';
import noop from 'lodash/noop'
import styles from './styles.module.scss';
import Img from '../Img'

type Props = {
  url: string
  img?: string
  content?: string
  onClick?: () => unknown
}

const Ad: React.SFC<Props> = ({ url, img, content, onClick }) => (
  <div className={styles.ad}>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick || noop}
    >
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

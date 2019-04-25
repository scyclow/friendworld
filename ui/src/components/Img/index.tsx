import * as React from 'react'
import styles from './styles.module.scss'

type Props = {
  url: string,
  alt: string,
  [props: string]: unknown
}
export default function Img({ url, alt, ...props }: Props) {
  return <img className={styles.img} src={url} alt={alt} {...props} />
}

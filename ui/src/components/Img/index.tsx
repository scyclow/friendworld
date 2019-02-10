import * as React from 'react'
import styles from './styles.module.scss'

type Props = {
  url: string,
  [props: string]: unknown
}
export default function Img({ url, ...props }: Props) {
  return <img className={styles.img} src={url} {...props} />
}

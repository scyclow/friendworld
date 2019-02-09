import * as React from 'react';
import styles from './styles.module.css';

interface Props {
  children: any,
  [prop: string]: any
}

export const Width: React.SFC<Props> = ({ children, ...props }) => (
  <div className={styles.width} {...props}>
    {children}
  </div>
)

const Body: React.SFC<Props> = ({ children }) => (
  <div className={styles.body}>
    <Width>{children}</Width>
  </div>
)

export default Body


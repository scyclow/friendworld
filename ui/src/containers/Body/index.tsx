import * as React from 'react';
import styles from './styles.module.css';

interface Props {
  children: any
}

const Body: React.SFC<Props> = ({ children }) => (
  <div className={styles.container}>
    {children}
   </div>
)

export default Body


import * as React from 'react';
import styles from './styles.module.scss';

type XProps = {
  onClick?: any,
  ring?: boolean
}

const ringStyles = { border: '1px solid', borderRadius: '100%' }
const X: React.SFC<XProps> = ({ onClick, ring }) => (
  <span
    className={styles.x}
    style={ring ? ringStyles : {}}
    onClick={onClick}
  >
    x
  </span>
)

export default X

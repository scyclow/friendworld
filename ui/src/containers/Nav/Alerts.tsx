export default () => {}
// import React  from 'react'
// import { Link } from 'react-router-dom'
// import cx from 'classnames'

// import X from 'components/X'
// import ParsedText from 'components/ParsedText'
// import styles from './styles.module.scss'
// import { CurrentUser } from './index'

// type AlertDropdownProps = {
//   alerts: CurrentUser['alerts'],
//   readAlert: (id: string) => unknown
//   onEmptyClick?: (a: any) => any
// }

// const Alerts = ({ alerts, readAlert }: AlertDropdownProps) => {
//   return (<>
//     {alerts.map(alert =>
//       <div key={alert.id} className={styles.alert} onClick={() => readAlert(alert.id)}>
//         <X ring />
//         {alert.link
//           ? <Link to={alert.link}>{alert.content}</Link>
//           : <ParsedText content={alert.content} />
//         }
//       </div>
//     )}
//   </>)


// }

// export const AlertDropdown: React.SFC<AlertDropdownProps> = ({ alerts, onEmptyClick, readAlert }) => (
//   <div className={styles.alertDropdown}>
//     {alerts.length
//       ? <Alerts alerts={alerts} readAlert={readAlert} />
//       : <div className={styles.noAlerts} onClick={onEmptyClick}>No Alerts!</div>
//     }
//   </div>
// )

// export const AlertCircle: React.SFC<{ unread: number }> = ({ unread }) => (
//   <div className={cx(styles.circle, {
//     [styles.unread]: unread,
//     [styles.unread1]: unread > 0 && unread < 5,
//     [styles.unread2]: unread >= 5 && unread < 10,
//     [styles.unread3]: unread >= 10 && unread < 15,
//     [styles.unread4]: unread >= 15,
//   })}>
//     {unread || 0}
//   </div>
// )

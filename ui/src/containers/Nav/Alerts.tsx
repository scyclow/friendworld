import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import X from '../../components/X'
import ParsedText from '../../components/ParsedText'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'
import styles from './styles.module.scss'
import { CurrentUserQuery } from './index'


type CurrentUser = CurrentUserQuery['currentUser']

type AlertDropdownProps = {
  alerts: CurrentUser['alerts'],
  readAlert: (id: string) => unknown
  onEmptyClick?: (a: any) => any
}

const Alerts = ({ alerts, readAlert }: AlertDropdownProps) => {

  // if (error) return <DisplayError error={error} />
  // if (loading) return <Loading />

  return (<>
    {alerts.map(alert =>
      <div key={alert.id} onClick={() => readAlert(alert.id)}>
        <X ring />
        {alert.link
          ? <Link to={alert.link}>{alert.content}</Link>
          : <ParsedText content={alert.content} />
        }
      </div>
    )}
  </>)


}

export const AlertDropdown: React.SFC<AlertDropdownProps> = ({ alerts, onEmptyClick, readAlert }) => (
  <div className={styles.alertDropdown}>
    {alerts.length
      ? <Alerts alerts={alerts} readAlert={readAlert} />
      : <div className={styles.noAlerts} onClick={onEmptyClick}>No Alerts!</div>
    }
  </div>
)

export const AlertCircle: React.SFC<{ unread: number }> = ({ unread }) => (
  // TODO make padding a a function of unread
  <div className={cx(styles.circle, { [styles.unread]: unread })}>
    {unread || 0}
  </div>
)

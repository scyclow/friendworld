import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from 'urql'
import cx from 'classnames'

import X from '../../components/X'
import ParsedText from '../../components/ParsedText'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'
import styles from './styles.module.scss'
import { CurrentUserQuery } from './index'

export type ReadAlertMutation = {
  readAlert: (args: {
    input: {
      alertId: string
    }
  }) => Promise<{
    readAlert: {
      alert: {
        id: string,
        read: boolean
      }
    }
  }>
}

type ReadAlertMutationResponse = {
  readAlert: {
    alert: {
      id: string,
      read: boolean
    }
  }
}

const readAlertMutation = `
mutation readAlert($input: ReadAlertInput!) {
  readAlert(input: $input) {
    alert {
      id
      read
    }
  }
}`

type CurrentUser = CurrentUserQuery['currentUser']

type AlertDropdownProps = {
  alerts: CurrentUser['alerts'],
  onEmptyClick?: (a: any) => any
}

const Alerts = ({ alerts }: AlertDropdownProps) => {
  const [response, executeReadAlert] = useMutation<ReadAlertMutationResponse>(readAlertMutation)

  // if (error) return <DisplayError error={error} />
  // if (loading) return <Loading />

  return (<>
    {alerts.map(alert =>
      <div key={alert.id} onClick={() => executeReadAlert({ input: { alertId: alert.id} })}>
        <X ring />
        {alert.link
          ? <Link to={alert.link}>{alert.content}</Link>
          : <ParsedText content={alert.content} />
        }
      </div>
    )}
  </>)


}

export const AlertDropdown: React.SFC<AlertDropdownProps> = ({ alerts, onEmptyClick }) => (
  <div className={styles.alertDropdown}>
    {alerts.length
      ? <Alerts alerts={alerts} />
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

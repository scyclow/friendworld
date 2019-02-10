import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Connect, UrqlProps, mutation } from 'urql'
import cx from 'classnames'

import X from '../../components/X'
import ParsedText from '../../components/ParsedText'
import styles from './styles.module.scss'
import { LoginQuery } from './index'

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

const readAlertMutation = mutation(`
mutation readAlert($input: ReadAlertInput!) {
  readAlert(input: $input) {
    alert {
      id
      read
    }
  }
}`)

type CurrentUser = LoginQuery['currentUser']

type AlertDropdownProps = {
  alerts: CurrentUser['alerts']
}

const Alerts: React.SFC<AlertDropdownProps> = ({ alerts }) => (
  <Connect mutation={{ readAlert: readAlertMutation }}>
    {({ readAlert }: UrqlProps<null, ReadAlertMutation>) => (
      alerts.map(alert =>
        <div key={alert.id} onClick={() => readAlert({ input: { alertId: alert.id} })}>
          <X ring />
          <ParsedText content={alert.content} />
        </div>
      )
    )}
  </Connect>
)

export const AlertDropdown: React.SFC<AlertDropdownProps> = ({ alerts }) => (
  <div className={styles.alertDropdown}>
    {alerts.length
      ? <Alerts alerts={alerts} />
      : 'No Alerts!'
    }
  </div>
)

export const AlertCircle: React.SFC<{ unread: number, onClick: any }> = ({ unread, onClick }) => (
  // TODO make padding a a function of unread
  <div className={cx(styles.circle, { [styles.unread]: unread })} onClick={onClick}>
    {unread || 0}
  </div>
)

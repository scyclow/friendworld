import React, { Component } from 'react';
import { Connect, UrqlProps, query } from 'urql'
import styles from './styles.module.scss'
import match, { DataProps } from '../../utils/match'

const messagesQuery = `
query {
  messages: messagesList {
    content
    from {
      id
      username
    }
    to {
      id
      username
    }
  }
}`

// type {}
// type MessagesQuery {
//   messages
// }

type Props = {

}

class Messages extends React.Component<Props> {
  render() {
    return (
      <div>hello gevee snow</div>
    )
  }
}

export default Messages

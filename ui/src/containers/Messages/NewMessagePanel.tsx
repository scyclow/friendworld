export default () => {}

// import React, { useState } from 'react'
// import { useMutation } from 'urql'
// import cx from 'classnames'

// import styles from './styles.module.scss'

// const createMessageMutation = `mutation createMessage ($input: CreateMessageInput!) {
//   createMessage (input: $input) {
//     message {
//       id
//       content
//       from {
//         id
//         username
//       }
//     }
//   }
// }`

// type Message = {
//   id: string
//   content: string
//   createdAt: string
//   to: {
//     id: string
//     username: string
//   }
//   from: {
//     id: string
//     username: string
//   }
// }

// type CreateMessageInput = {
//   input: {
//     toUsername: string
//     content: string
//   }
// }

// type CreateMessagePayload = {
//   createMessage: {
//     message: Message
//   }
// }

// export default function NewMessagePanel() {
//   const [messageToSend, setMessageToSend] = useState<string>('')
//   const [newUser, setNewUser] = useState<string>('')
//   const [
//     response, // eslint-disable-line
//     executeCreateMessage
//   ] = useMutation<CreateMessagePayload, CreateMessageInput>(createMessageMutation)

//   const sendMessage = () => {
//     if (!!messageToSend && !!newUser) {
//       executeCreateMessage({
//         input: {
//           content: messageToSend,
//           toUsername: newUser
//         }
//       }).then(() => {
//         window.location.href = `messages/${newUser}`
//       })
//     }
//   }

//   const submitOnCommandEnter = (e: any) => {
//     if (e.keyCode === 13 && e.metaKey) {
//       sendMessage()
//     }
//   }

//   return (
//     <section className={styles.messagePanel}>
//       <div>
//         Send a new message to:
//         <div>
//           <input
//             className={styles.sendBox}
//             placeholder="Enter username here"
//             value={newUser}
//             onChange={e => setNewUser(e.target.value)}
//           />
//           <textarea
//             className={cx(styles.sendBox, styles.newMessageBox)}
//             value={messageToSend}
//             onChange={e => setMessageToSend(e.target.value)}
//             placeholder="Enter message here"
//             onKeyDown={submitOnCommandEnter}
//           />
//         </div>
//         <button className={styles.submitButton} onClick={sendMessage}>Send</button>
//       </div>
//     </section>
//   )
// }

export default () => {}

// import React from 'react'
// import { Link } from 'react-router-dom'
// import jwt from 'utils/jwt'
// import styles from './styles.module.scss'

// const switchUser = (username: string) => {
//   jwt.setCurrentUser(username)
//   window.location.reload()
// }

// const logout = () => {
//   jwt.clearCurrentUser()
//   window.location.reload()
// }

// const getCurrentUser = () => {
//   try {
//     return JSON.parse(localStorage.__JWT__).__currentUser__
//   } catch (e) {
//     console.log(e)
//     return ''
//   }

// }

// export const UserDropdown: React.SFC<{}> = () => {
//   const alternativeUsers = jwt.getInnactiveUserList()
//   const currentUser = getCurrentUser()

//   return (
//     <ul className={styles.userDropdown}>
//       <Link to={`/users/${currentUser}`}>
//         <li>
//           <div>View Profile</div>
//         </li>
//       </Link>

//       <Link to="/profile">
//         <li>
//           <div>Update Profile</div>
//         </li>
//       </Link>

//       <Link to="/messages">
//         <li>
//           <div>Messages</div>
//         </li>
//       </Link>

//       <a href="#logout" onClick={logout}>
//         <li>Logout</li>
//       </a>

//       <Link to="/login">
//         <li>
//           <div>Login</div>
//         </li>
//       </Link>

//       <Link to="/signup">
//         <li>
//           <div>Create Account</div>
//         </li>
//       </Link>

//       {!!alternativeUsers.length &&
//         <div className={styles.switchAccounts}>
//           <strong>Switch Account</strong>
//           <ul>
//             {alternativeUsers.map(({ username }) => (
//               <li
//                 key={username}
//                 onClick={() => switchUser(username)}
//               >
//                 {username}
//               </li>
//              ))}
//           </ul>
//         </div>
//       }
//     </ul>
//   )
// }

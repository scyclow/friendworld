import React from 'react';
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'


function Onboarding() {
  return (
    <section className={styles.onboarding}>
      <div className={styles.card}>
        <h1>Welcome to Friendworld!</h1>
        <p>Thanks for signing up! Please fill out your profile so everyone knows what you're all about!</p>
        <Link to="/profile">Click here to update your profile</Link>
        <p>Or, hit the forums now and fill out your profile later :)</p>
        <Link to="/">Click here to go to the forum</Link>
      </div>
    </section>
  )
}

export default Onboarding

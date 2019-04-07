import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.css'

function LandingPage() {
  return (
    <header className={styles.Header}>
      <h1 className={styles.HText}>Welcome to Politico</h1>
      <p className="text-center mt-2">Your vote is your voice, your vote is your power, guard it jealously</p>
      <Link to="/signin" className={styles.GetStarted} id="get-started">Get Started</Link>
    </header>
  )
}

export default LandingPage

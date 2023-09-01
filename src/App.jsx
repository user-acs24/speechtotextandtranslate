// import { useState } from 'react'
import styles from './app.module.css'
// import React from 'react'

function App() {

  return (
    <>
      <div className={styles.container}>
        <h2>Speech to Text Converter</h2>
        <div className={styles.mainContent}></div>
        <div className={styles.btn}>
          <button>Copy</button>
          <button>Start</button>
          <button>Stop</button>
        </div>
      </div>
    </>
  )
}

export default App

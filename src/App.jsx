// import { useState } from 'react'
import styles from './app.module.css'
// import React from 'react'
import { BiSolidCopyAlt } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";

function App() {

  return (
    <>
      <div className={styles.container}>
        <h1>Speech to Text Converter</h1>
        <div className={styles.mainContent}></div>
        <div className={styles.btn}>
          <button><BiSolidCopyAlt />Copy</button>
          <button><BsFillMicFill />Start</button>
          <button><BsFillMicMuteFill />Stop</button>
        </div>
      </div>
    </>
  )
}

export default App

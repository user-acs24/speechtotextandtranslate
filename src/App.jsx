// import { useState } from 'react'
import styles from './app.module.css'
import { useState } from 'react'
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import useClipboard from "react-use-clipboard"
import { BiSolidCopyAlt } from "react-icons/bi"
import { BsFillMicFill } from "react-icons/bs"
import { BsFillMicMuteFill } from "react-icons/bs"
import { SiConvertio } from "react-icons/si"

const App = () => {

  const [copyTxt, setCopyTxt] = useState()
  const [isCopied, setCopied] = useClipboard(copyTxt);

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-In' })
  const stopListening = () => SpeechRecognition.stopListening()

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return alert('no browsersupport')
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Speech to Text Converter <SiConvertio className={styles.headIcon} /></h1>
        <p>Note: To copy written text, firstly click once on the white board after clicking Stop button.</p>
        <div className={styles.mainContent} onClick={() => setCopyTxt(transcript)}>
          {transcript}
        </div>
        <div className={styles.btn}>
          <button onClick={startListening}><BsFillMicFill />Start</button>
          <button onClick={stopListening}><BsFillMicMuteFill />Stop</button>
          <button onClick={setCopied}>
            <BiSolidCopyAlt />{isCopied ? " Copied" : " Copy to clipboard"}
          </button>
        </div>
      </div>
    </>
  )
}

export default App

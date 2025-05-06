import { useState } from 'react';
import styles from './app.module.css';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import { BiSolidCopyAlt } from 'react-icons/bi';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { SiConvertio } from 'react-icons/si';
import axios from 'axios';

const App = () => {
  const [copyTxt, setCopyTxt] = useState('');
  const [isCopied, setCopied] = useClipboard(copyTxt);
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('hi');

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const stopListening = () => SpeechRecognition.stopListening();

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Replace with your actual Google API key
  const apiKey = 'AIzaSyCHRCCedsIX-_IWeOy_OUyunF9hpMlCt14';
  const googleTranslateUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const languages = [
    { code: 'hi', label: 'Hindi' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'zh', label: 'Chinese (Simplified)' },
    { code: 'ja', label: 'Japanese' },
    { code: 'ru', label: 'Russian' },
    { code: 'ar', label: 'Arabic' },
    { code: 'ko', label: 'Korean' },
  ];

  if (!browserSupportsSpeechRecognition) {
    alert('Browser does not support speech recognition.');
    return null;
  }

  const translateText = async () => {
    try {
      const response = await axios.post(googleTranslateUrl, {
        q: transcript,
        source: 'en',
        target: targetLang,
        format: 'text',
      });

      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation failed. Please check your internet connection or API key.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Speech to Text Converter</h1>

      <div
        className={styles.mainContent}
        onClick={() => setCopyTxt(transcript)}
      >
        {transcript}
      </div>

      <div className={styles.btn}>
        <button onClick={startListening}>
          <BsFillMicFill /> Start
        </button>
        <button onClick={stopListening}>
          <BsFillMicMuteFill /> Stop
        </button>
        <button onClick={setCopied}>
          <BiSolidCopyAlt /> {isCopied ? 'Copied' : 'Copy to clipboard'}
        </button>
        <button onClick={translateText}>
          <SiConvertio /> Translate
        </button>
      </div>

      <div className={styles.dropdown}>
        <label htmlFor="language-select">Translate to:</label>
        <select
          id="language-select"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {translatedText && (
        <div className={styles.translationBox}>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default App;

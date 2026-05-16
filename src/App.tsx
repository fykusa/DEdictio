import { useState } from 'react'
import { useWords } from './hooks/useWords'
import { QuizScreen } from './QuizScreen'
import { LoadingScreen } from './components/LoadingScreen'
import type { LangPair } from './types/word'
import { LANG_PAIRS } from './types/word'
import './App.css'

export function App() {
  const { words, loading, error } = useWords()
  const [langPair, setLangPair] = useState<LangPair>(LANG_PAIRS[0])

  if (loading || error) {
    return <LoadingScreen error={error ?? undefined} />
  }

  return (
    <div className="app">
      <QuizScreen
        words={words}
        langPair={langPair}
        onChangeLang={setLangPair}
      />
    </div>
  )
}

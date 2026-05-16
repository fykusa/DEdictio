import { useState } from 'react'
import { useWords } from './hooks/useWords'
import { QuizScreen } from './QuizScreen'
import { LoadingScreen } from './components/LoadingScreen'
import type { LangPair } from './types/word'
import { LANG_PAIRS } from './types/word'
import './App.css'

export function App() {
  const { words, loading, error } = useWords()
  const [langPair, setLangPair] = useState<LangPair>(
    LANG_PAIRS.find(p => p.id === 'de-cs') ?? LANG_PAIRS[0]
  )

  return (
    <div className="shell">
      <div className="phone">
        {loading || error
          ? <LoadingScreen error={error ?? undefined} />
          : <QuizScreen words={words} langPair={langPair} onChangeLang={setLangPair} />
        }

        <div className="home-indicator">
          <div className="home-bar" />
        </div>
      </div>
    </div>
  )
}

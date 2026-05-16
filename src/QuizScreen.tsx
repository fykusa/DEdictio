import { useState } from 'react'
import type { Word, LangPair } from './types/word'
import { LANG_PAIRS } from './types/word'
import { useQuiz } from './hooks/useQuiz'
import { WordCard } from './components/WordCard'
import { AnswerGrid } from './components/AnswerGrid'
import { ProgressBar } from './components/ProgressBar'
import { FeedbackBar } from './components/FeedbackBar'
import { LangPairModal } from './components/LangPairModal'
import { EndScreen } from './components/EndScreen'

interface Props {
  words: Word[]
  langPair: LangPair
  onChangeLang: (pair: LangPair) => void
}

export function QuizScreen({ words, langPair, onChangeLang }: Props) {
  const { state, select, next, restart } = useQuiz(words, langPair)
  const [showModal, setShowModal] = useState(false)

  if (state.phase === 'end') {
    return (
      <EndScreen
        correctCount={state.correctCount}
        wrongCount={state.wrongCount}
        score={state.score}
        total={state.questions.length}
        onRestart={restart}
      />
    )
  }

  const question = state.questions[state.currentIndex]

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <button className="lang-pair-trigger" onClick={() => setShowModal(true)}>
          {langPair.srcFlag}→{langPair.tgtFlag}
        </button>
      </div>

      <ProgressBar
        current={state.currentIndex + (state.answered ? 1 : 0)}
        total={state.questions.length}
        score={state.score}
      />

      <WordCard question={question} srcLang={langPair.srcLang} />

      <AnswerGrid
        options={question.options}
        selectedIndex={state.selectedIndex}
        correctIndex={question.correctIndex}
        onSelect={select}
      />

      {state.answered && (
        <FeedbackBar
          correct={state.selectedIndex === question.correctIndex}
          score={state.score}
          onNext={next}
        />
      )}

      {showModal && (
        <LangPairModal
          pairs={LANG_PAIRS}
          activePairId={langPair.id}
          onSelect={pair => {
            onChangeLang(pair)
            setShowModal(false)
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

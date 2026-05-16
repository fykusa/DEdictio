import { useState } from 'react'
import type { Word, LangPair } from './types/word'
import { LANG_PAIRS } from './types/word'
import { useQuiz } from './hooks/useQuiz'
import { WordCard } from './components/WordCard'
import { AnswerGrid } from './components/AnswerGrid'
import { ProgressBar } from './components/ProgressBar'
import { FeedbackBar } from './components/FeedbackBar'
import { LangPairModal } from './components/LangPairModal'
import { FlagImg } from './components/FlagImg'
import { EndScreen } from './components/EndScreen'

interface Props {
  words: Word[]
  langPair: LangPair
  onChangeLang: (pair: LangPair) => void
}

export function QuizScreen({ words, langPair, onChangeLang }: Props) {
  const { state, select, next, restart } = useQuiz(words, langPair)
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <>
      <div className="header">
        <button
          className="lang-pair"
          onClick={openModal}
          aria-label="Změnit jazykový pár"
        >
          <FlagImg code={langPair.srcFlagCode} size={18} label={langPair.srcLabel} />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--fg-2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          <FlagImg code={langPair.tgtFlagCode} size={18} label={langPair.tgtLabel} />
        </button>
      </div>

      {state.phase === 'end' ? (
        <EndScreen
          correctCount={state.correctCount}
          wrongCount={state.wrongCount}
          score={state.score}
          total={state.questions.length}
          onRestart={restart}
          onChangeLang={openModal}
        />
      ) : (
        <>
          <ProgressBar
            current={state.currentIndex + (state.answered ? 1 : 0)}
            total={state.questions.length}
            score={state.score}
          />

          <div className="card-area">
            <WordCard question={state.questions[state.currentIndex]} srcLang={langPair.srcLang} />
          </div>

          <div className="answers-area">
            <AnswerGrid
              options={state.questions[state.currentIndex].options}
              selectedIndex={state.selectedIndex}
              correctIndex={state.questions[state.currentIndex].correctIndex}
              onSelect={select}
              onNext={next}
            />
            <FeedbackBar
              correct={state.selectedIndex === state.questions[state.currentIndex].correctIndex}
              visible={state.answered}
              onNext={next}
            />
          </div>
        </>
      )}

      <LangPairModal
        open={showModal}
        pairs={LANG_PAIRS}
        activePairId={langPair.id}
        onSelect={pair => { onChangeLang(pair); closeModal() }}
        onClose={closeModal}
      />
    </>
  )
}

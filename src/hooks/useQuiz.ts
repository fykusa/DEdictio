import { useReducer, useMemo } from 'react'
import type { Word, LangPair, QuizQuestion, QuizState } from '../types/word'
import { QUIZ_SIZE } from '../types/word'
import { shuffled } from '../utils/shuffle'

type Action =
  | { type: 'SELECT'; index: number }
  | { type: 'NEXT' }
  | { type: 'RESTART'; questions: QuizQuestion[] }

function buildQuestions(words: Word[], langPair: LangPair): QuizQuestion[] {
  const pool = shuffled(words).slice(0, QUIZ_SIZE)
  return pool.map(word => {
    const correct = word[langPair.tgtLang]
    const distractors = shuffled(
      words.filter(w => w.id !== word.id).map(w => w[langPair.tgtLang])
    ).slice(0, 3)
    const options = shuffled([correct, ...distractors])
    return {
      word,
      options,
      correctIndex: options.indexOf(correct),
    }
  })
}

function initialState(questions: QuizQuestion[]): QuizState {
  return {
    questions,
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    answered: false,
    selectedIndex: null,
    phase: 'quiz',
  }
}

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'SELECT': {
      if (state.answered) return state
      const correct = state.questions[state.currentIndex].correctIndex === action.index
      return {
        ...state,
        answered: true,
        selectedIndex: action.index,
        score: correct ? state.score + 10 : state.score,
        correctCount: correct ? state.correctCount + 1 : state.correctCount,
        wrongCount: correct ? state.wrongCount : state.wrongCount + 1,
      }
    }
    case 'NEXT': {
      const next = state.currentIndex + 1
      if (next >= state.questions.length) {
        return { ...state, phase: 'end' }
      }
      return { ...state, currentIndex: next, answered: false, selectedIndex: null }
    }
    case 'RESTART':
      return initialState(action.questions)
    default:
      return state
  }
}

export function useQuiz(words: Word[], langPair: LangPair) {
  const initialQuestions = useMemo(() => buildQuestions(words, langPair), [])
  const [state, dispatch] = useReducer(reducer, initialState(initialQuestions))

  function select(index: number) { dispatch({ type: 'SELECT', index }) }
  function next() { dispatch({ type: 'NEXT' }) }
  function restart() { dispatch({ type: 'RESTART', questions: buildQuestions(words, langPair) }) }

  return { state, select, next, restart }
}

export interface Word {
  id: number
  cesky: string
  anglicky: string
  nemecky: string
  kategorie: string
}

export type WordKey = 'cesky' | 'anglicky' | 'nemecky'

export interface LangPair {
  id: 'cs-en' | 'cs-de' | 'en-de'
  srcLang: WordKey
  tgtLang: WordKey
  srcLabel: string
  tgtLabel: string
  srcFlag: string
  tgtFlag: string
}

export interface QuizQuestion {
  word: Word
  options: string[]
  correctIndex: number
}

export type QuizPhase = 'loading' | 'quiz' | 'end'

export interface QuizState {
  questions: QuizQuestion[]
  currentIndex: number
  score: number
  correctCount: number
  wrongCount: number
  answered: boolean
  selectedIndex: number | null
  phase: QuizPhase
}

export const LANG_PAIRS: LangPair[] = [
  {
    id: 'cs-en',
    srcLang: 'cesky',
    tgtLang: 'anglicky',
    srcLabel: 'Čeština',
    tgtLabel: 'Angličtina',
    srcFlag: '🇨🇿',
    tgtFlag: '🇬🇧',
  },
  {
    id: 'cs-de',
    srcLang: 'cesky',
    tgtLang: 'nemecky',
    srcLabel: 'Čeština',
    tgtLabel: 'Němčina',
    srcFlag: '🇨🇿',
    tgtFlag: '🇩🇪',
  },
  {
    id: 'en-de',
    srcLang: 'anglicky',
    tgtLang: 'nemecky',
    srcLabel: 'Angličtina',
    tgtLabel: 'Němčina',
    srcFlag: '🇬🇧',
    tgtFlag: '🇩🇪',
  },
]

export const QUIZ_SIZE = 15

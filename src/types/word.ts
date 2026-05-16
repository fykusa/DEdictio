export interface Word {
  id: number
  cesky: string
  anglicky: string
  nemecky: string
  kategorie: string
}

export type WordKey = 'cesky' | 'anglicky' | 'nemecky'

export interface LangPair {
  id: 'cs-en' | 'en-cs' | 'cs-de' | 'de-cs' | 'en-de' | 'de-en'
  srcLang: WordKey
  tgtLang: WordKey
  srcLabel: string
  tgtLabel: string
  srcFlag: string
  tgtFlag: string
  srcFlagCode: string
  tgtFlagCode: string
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
  { id: 'de-cs', srcLang: 'nemecky',  tgtLang: 'cesky',    srcLabel: 'Němčina',    tgtLabel: 'Čeština',    srcFlag: '🇩🇪', tgtFlag: '🇨🇿', srcFlagCode: 'de', tgtFlagCode: 'cz' },
  { id: 'cs-de', srcLang: 'cesky',    tgtLang: 'nemecky',  srcLabel: 'Čeština',    tgtLabel: 'Němčina',    srcFlag: '🇨🇿', tgtFlag: '🇩🇪', srcFlagCode: 'cz', tgtFlagCode: 'de' },
  { id: 'en-cs', srcLang: 'anglicky', tgtLang: 'cesky',    srcLabel: 'Angličtina', tgtLabel: 'Čeština',    srcFlag: '🇬🇧', tgtFlag: '🇨🇿', srcFlagCode: 'gb', tgtFlagCode: 'cz' },
  { id: 'cs-en', srcLang: 'cesky',    tgtLang: 'anglicky', srcLabel: 'Čeština',    tgtLabel: 'Angličtina', srcFlag: '🇨🇿', tgtFlag: '🇬🇧', srcFlagCode: 'cz', tgtFlagCode: 'gb' },
  { id: 'de-en', srcLang: 'nemecky',  tgtLang: 'anglicky', srcLabel: 'Němčina',    tgtLabel: 'Angličtina', srcFlag: '🇩🇪', tgtFlag: '🇬🇧', srcFlagCode: 'de', tgtFlagCode: 'gb' },
  { id: 'en-de', srcLang: 'anglicky', tgtLang: 'nemecky',  srcLabel: 'Angličtina', tgtLabel: 'Němčina',    srcFlag: '🇬🇧', tgtFlag: '🇩🇪', srcFlagCode: 'gb', tgtFlagCode: 'de' },
]

export const QUIZ_SIZE = 15

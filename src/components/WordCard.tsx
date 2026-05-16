import type { QuizQuestion, WordKey } from '../types/word'

interface Props {
  question: QuizQuestion
  srcLang: WordKey
}

export function WordCard({ question, srcLang }: Props) {
  const { word } = question
  return (
    <div className="word-card">
      <div className="word-category">{word.kategorie}</div>
      <div className="word-main">{word[srcLang]}</div>
    </div>
  )
}

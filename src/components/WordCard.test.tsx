import { render, screen } from '@testing-library/react'
import { WordCard } from './WordCard'
import type { QuizQuestion } from '../types/word'

const question: QuizQuestion = {
  word: { id: 1, cesky: 'světlo', anglicky: 'light', nemecky: 'Licht', kategorie: 'věci' },
  options: ['light', 'dark', 'sun', 'moon'],
  correctIndex: 0,
}

test('zobrazí zdrojové slovo', () => {
  render(<WordCard question={question} srcLang="cesky" />)
  expect(screen.getByText('světlo')).toBeInTheDocument()
})

test('zobrazí kategorii', () => {
  render(<WordCard question={question} srcLang="cesky" />)
  expect(screen.getByText('věci')).toBeInTheDocument()
})

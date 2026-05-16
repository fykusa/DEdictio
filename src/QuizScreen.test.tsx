import { render, screen, fireEvent } from '@testing-library/react'
import { QuizScreen } from './QuizScreen'
import { LANG_PAIRS } from './types/word'
import type { Word } from './types/word'

const words: Word[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  cesky: `slovo${i}`,
  anglicky: `word${i}`,
  nemecky: `Wort${i}`,
  kategorie: 'test',
}))

test('zobrazí WordCard a AnswerGrid', () => {
  render(
    <QuizScreen
      words={words}
      langPair={LANG_PAIRS[0]}
      onChangeLang={() => {}}
    />
  )
  expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(4)
})

test('po výběru odpovědi se zobrazí FeedbackBar', () => {
  render(
    <QuizScreen
      words={words}
      langPair={LANG_PAIRS[0]}
      onChangeLang={() => {}}
    />
  )
  // Klikni na první answer button (lang-pair-trigger je index 0)
  const buttons = screen.getAllByRole('button')
  const firstAnswerBtn = buttons.find(btn => btn.className.includes('answer-btn'))!
  fireEvent.click(firstAnswerBtn)
  expect(screen.getByText(/pokračování/i)).toBeInTheDocument()
})

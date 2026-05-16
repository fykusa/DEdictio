import { renderHook, act } from '@testing-library/react'
import { useQuiz } from './useQuiz'
import type { LangPair, Word } from '../types/word'
import { LANG_PAIRS, QUIZ_SIZE } from '../types/word'

const words: Word[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  cesky: `slovo${i}`,
  anglicky: `word${i}`,
  nemecky: `Wort${i}`,
  kategorie: 'test',
}))

const langPair: LangPair = LANG_PAIRS[0] // cs-en

test('inicializuje se s QUIZ_SIZE otázkami', () => {
  const { result } = renderHook(() => useQuiz(words, langPair))
  expect(result.current.state.questions).toHaveLength(QUIZ_SIZE)
})

test('každá otázka má 4 možnosti', () => {
  const { result } = renderHook(() => useQuiz(words, langPair))
  for (const q of result.current.state.questions) {
    expect(q.options).toHaveLength(4)
    expect(q.options).toContain(q.word[langPair.tgtLang])
  }
})

test('select nastaví selectedIndex a answered', () => {
  const { result } = renderHook(() => useQuiz(words, langPair))
  act(() => result.current.select(0))
  expect(result.current.state.answered).toBe(true)
  expect(result.current.state.selectedIndex).toBe(0)
})

test('správná odpověď přidá 10 bodů', () => {
  const { result } = renderHook(() => useQuiz(words, langPair))
  const correctIdx = result.current.state.questions[0].correctIndex
  act(() => result.current.select(correctIdx))
  expect(result.current.state.score).toBe(10)
  expect(result.current.state.correctCount).toBe(1)
})

test('špatná odpověď nepřidá body', () => {
  const { result } = renderHook(() => useQuiz(words, langPair))
  const correctIdx = result.current.state.questions[0].correctIndex
  const wrongIdx = (correctIdx + 1) % 4
  act(() => result.current.select(wrongIdx))
  expect(result.current.state.score).toBe(0)
  expect(result.current.state.wrongCount).toBe(1)
})

test('next posune na další otázku', () => {
  const { result } = renderHook(() => useQuiz(words, langPair))
  act(() => result.current.select(0))
  act(() => result.current.next())
  expect(result.current.state.currentIndex).toBe(1)
  expect(result.current.state.answered).toBe(false)
})

test('po poslední otázce phase=end', () => {
  const { result } = renderHook(() => useQuiz(words, langPair))
  for (let i = 0; i < QUIZ_SIZE; i++) {
    act(() => result.current.select(0))
    act(() => result.current.next())
  }
  expect(result.current.state.phase).toBe('end')
})

test('restart resetuje stav', () => {
  const { result } = renderHook(() => useQuiz(words, langPair))
  act(() => result.current.select(0))
  act(() => result.current.next())
  act(() => result.current.restart())
  expect(result.current.state.currentIndex).toBe(0)
  expect(result.current.state.score).toBe(0)
  expect(result.current.state.phase).toBe('quiz')
})

import { render, screen, fireEvent } from '@testing-library/react'
import { AnswerGrid } from './AnswerGrid'
import { describe, test, expect, vi } from 'vitest'

const options = ['light', 'dark', 'sun', 'moon']

describe('AnswerGrid', () => {
  test('zobrazí 4 tlačítka', () => {
    render(
      <AnswerGrid
        options={options}
        selectedIndex={null}
        correctIndex={0}
        onSelect={() => {}}
      />
    )
    expect(screen.getAllByRole('button')).toHaveLength(4)
  })

  test('onSelect se zavolá s indexem po kliknutí', () => {
    const onSelect = vi.fn()
    render(
      <AnswerGrid
        options={options}
        selectedIndex={null}
        correctIndex={0}
        onSelect={onSelect}
      />
    )
    fireEvent.click(screen.getByText('dark'))
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  test('po výběru volá onNext při kliknutí', () => {
    const onNext = vi.fn()
    render(
      <AnswerGrid
        options={options}
        selectedIndex={1}
        correctIndex={0}
        onSelect={() => {}}
        onNext={onNext}
      />
    )
    fireEvent.click(screen.getByText('dark'))
    expect(onNext).toHaveBeenCalledTimes(1)
  })

  test('správná odpověď má třídu correct', () => {
    render(
      <AnswerGrid
        options={options}
        selectedIndex={0}
        correctIndex={0}
        onSelect={() => {}}
      />
    )
    expect(screen.getByText('light').closest('button')).toHaveClass('correct')
  })

  test('špatná odpověď má třídu wrong', () => {
    render(
      <AnswerGrid
        options={options}
        selectedIndex={1}
        correctIndex={0}
        onSelect={() => {}}
      />
    )
    expect(screen.getByText('dark').closest('button')).toHaveClass('wrong')
  })
})

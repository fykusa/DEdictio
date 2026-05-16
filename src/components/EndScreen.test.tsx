import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { EndScreen } from './EndScreen'

describe('EndScreen', () => {
  test('zobrazí počet správných odpovědí', () => {
    render(
      <EndScreen
        correctCount={12}
        wrongCount={3}
        score={120}
        total={15}
        onRestart={() => {}}
      />
    )
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  test('zavolá onRestart po kliknutí', () => {
    const onRestart = vi.fn()
    render(
      <EndScreen
        correctCount={12}
        wrongCount={3}
        score={120}
        total={15}
        onRestart={onRestart}
      />
    )
    fireEvent.click(screen.getByText(/Znovu/i))
    expect(onRestart).toHaveBeenCalledTimes(1)
  })
})

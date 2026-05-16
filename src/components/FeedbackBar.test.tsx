import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { FeedbackBar } from './FeedbackBar'

describe('FeedbackBar', () => {
  it('zobrazí "Správně" při correct=true', () => {
    render(<FeedbackBar correct={true} visible={true} onNext={() => {}} />)
    expect(screen.getByText(/správně/i)).toBeInTheDocument()
  })

  it('zobrazí "Špatně" při correct=false', () => {
    render(<FeedbackBar correct={false} visible={true} onNext={() => {}} />)
    expect(screen.getByText(/špatně/i)).toBeInTheDocument()
  })

  it('zavolá onNext po kliknutí', () => {
    const onNext = vi.fn()
    render(<FeedbackBar correct={true} visible={true} onNext={onNext} />)
    fireEvent.click(screen.getByText(/pokračování/i))
    expect(onNext).toHaveBeenCalledTimes(1)
  })
})

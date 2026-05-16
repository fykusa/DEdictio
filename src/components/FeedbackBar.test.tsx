import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { FeedbackBar } from './FeedbackBar'

describe('FeedbackBar', () => {
  it('zobrazí "Správně" při correct=true', () => {
    render(<FeedbackBar correct={true} score={10} onNext={() => {}} />)
    expect(screen.getByText(/správně/i)).toBeInTheDocument()
  })

  it('zobrazí "Špatně" při correct=false', () => {
    render(<FeedbackBar correct={false} score={0} onNext={() => {}} />)
    expect(screen.getByText(/špatně/i)).toBeInTheDocument()
  })

  it('zavolá onNext po kliknutí Dál', () => {
    const onNext = vi.fn()
    render(<FeedbackBar correct={true} score={10} onNext={onNext} />)
    fireEvent.click(screen.getByText(/dál/i))
    expect(onNext).toHaveBeenCalledTimes(1)
  })
})

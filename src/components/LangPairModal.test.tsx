import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { LangPairModal } from './LangPairModal'
import { LANG_PAIRS } from '../types/word'

describe('LangPairModal', () => {
  test('zobrazí všechny 3 páry', () => {
    render(
      <LangPairModal
        pairs={LANG_PAIRS}
        activePairId="cs-en"
        onSelect={() => {}}
        onClose={() => {}}
      />
    )
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(3)
  })

  test('zavolá onSelect po kliknutí na pár', () => {
    const onSelect = vi.fn()
    render(
      <LangPairModal
        pairs={LANG_PAIRS}
        activePairId="cs-en"
        onSelect={onSelect}
        onClose={() => {}}
      />
    )
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[1]) // cs-de
    expect(onSelect).toHaveBeenCalledWith(LANG_PAIRS[1])
  })
})

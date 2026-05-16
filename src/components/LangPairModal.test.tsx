import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { LangPairModal } from './LangPairModal'
import { LANG_PAIRS } from '../types/word'

describe('LangPairModal', () => {
  test('zobrazí všechny páry', () => {
    render(
      <LangPairModal
        open={true}
        pairs={LANG_PAIRS}
        activePairId="cs-en"
        onSelect={() => {}}
        onClose={() => {}}
      />
    )
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(LANG_PAIRS.length)
  })

  test('zavolá onSelect po kliknutí na pár', () => {
    const onSelect = vi.fn()
    render(
      <LangPairModal
        open={true}
        pairs={LANG_PAIRS}
        activePairId="cs-en"
        onSelect={onSelect}
        onClose={() => {}}
      />
    )
    const options = screen.getAllByRole('button')
    fireEvent.click(options[1])
    expect(onSelect).toHaveBeenCalledWith(LANG_PAIRS[1])
  })
})

import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useWords } from './useWords'

const CSV_TEXT = `id;cesky;anglicky;nemecky;kategorie
1;pes;dog;Hund;zvířata
2;kočka;cat;Katze;zvířata`

describe('useWords', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(CSV_TEXT),
    } as Response)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loading je true na začátku', () => {
    const { result } = renderHook(() => useWords())
    expect(result.current.loading).toBe(true)
  })

  it('po načtení vrátí slova', async () => {
    const { result } = renderHook(() => useWords())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.words).toHaveLength(2)
    expect(result.current.words[0].cesky).toBe('pes')
  })

  it('při chybě fetch nastaví error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } as Response)
    const { result } = renderHook(() => useWords())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBeTruthy()
  })
})

import { parseWordsCsv } from './csvParser'
import { describe, it, expect } from 'vitest'

const VALID_CSV = `id;cesky;anglicky;nemecky;kategorie
1;pes;dog;Hund;zvířata
2;kočka;cat;Katze;zvířata`

const INVALID_CSV = `id;cesky;anglicky
1;pes;dog`

describe('parseWordsCsv', () => {
  it('parsuje validní CSV', () => {
    const words = parseWordsCsv(VALID_CSV)
    expect(words).toHaveLength(2)
    expect(words[0]).toEqual({
      id: 1,
      cesky: 'pes',
      anglicky: 'dog',
      nemecky: 'Hund',
      kategorie: 'zvířata',
    })
  })

  it('vyhodí chybu při chybějícím sloupci', () => {
    expect(() => parseWordsCsv(INVALID_CSV)).toThrow('Chybí sloupce')
  })

  it('konvertuje id na číslo', () => {
    const words = parseWordsCsv(VALID_CSV)
    expect(typeof words[0].id).toBe('number')
  })
})

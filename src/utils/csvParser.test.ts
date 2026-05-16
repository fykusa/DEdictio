import { parseWordsCsv } from './csvParser'
import { describe, it, expect } from 'vitest'

const VALID_CSV = `id;cesky;anglicky;nemecky;kategorie
1;pes;dog;Hund;zvířata
2;kočka;cat;Katze;zvířata`

const INVALID_CSV = `id;cesky;anglicky
1;pes;dog`

// Reálný formát z public/slovicka.csv — záhlaví v uvozovkách, hodnoty s čárkami
const REAL_FORMAT_CSV = `"id";"cesky";"anglicky";"nemecky";"kategorie"
1;hodně, moc;a lot;viel;Příslovce
2;hodně;a lot of;sehr;Příslovce`

// CSV s BOM (Byte Order Mark) — jak ho může generovat Excel
const BOM = '﻿'
const BOM_CSV = `${BOM}"id";"cesky";"anglicky";"nemecky";"kategorie"
1;pes;dog;Hund;zvířata`

// CSV s prázdnými hodnotami v buňkách
const SPARSE_CSV = `id;cesky;anglicky;nemecky;kategorie
1;pes;dog;;zvířata
2;;cat;Katze;zvířata`

// Reálný problém: řádky s méně sloupci (papaparse TooFewFields → kategorie === undefined)
// Simulujeme to přímo — řádek se 4 sloupci místo 5
const MISSING_COL_CSV = `id;cesky;anglicky;nemecky;kategorie
1;hodně, moc;a lot;viel;Příslovce
53;mimozemšťan;a lot;viel
2;hodně;a lot of;sehr;Příslovce`

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

  it('parsuje reálný formát CSV (záhlaví v uvozovkách)', () => {
    const words = parseWordsCsv(REAL_FORMAT_CSV)
    expect(words).toHaveLength(2)
    expect(words[0].cesky).toBe('hodně, moc')
    expect(words[0].anglicky).toBe('a lot')
  })

  it('zpracuje CSV s BOM', () => {
    const words = parseWordsCsv(BOM_CSV)
    expect(words).toHaveLength(1)
    expect(words[0].id).toBe(1)
  })

  it('zpracuje CSV s undefined/prázdnými hodnotami bez pádu', () => {
    const words = parseWordsCsv(SPARSE_CSV)
    expect(words).toHaveLength(2)
    expect(words[0].nemecky).toBe('')
    expect(words[1].cesky).toBe('')
  })

  it('nepadne na řádcích s chybějícím sloupcem (kategorie === undefined)', () => {
    // Řádek id=53 má jen 4 sloupce → papaparse nastaví kategorie = undefined
    expect(() => parseWordsCsv(MISSING_COL_CSV)).not.toThrow()
    const words = parseWordsCsv(MISSING_COL_CSV)
    expect(words.some(w => w.id === 1)).toBe(true)
    expect(words.some(w => w.id === 2)).toBe(true)
    // id=53 má undefined kategorie — musí být vyfiltrován
    expect(words.some(w => w.id === 53)).toBe(false)
  })
})

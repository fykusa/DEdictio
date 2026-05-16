import Papa from 'papaparse'
import type { Word } from '../types/word'

const REQUIRED_COLUMNS = ['id', 'cesky', 'anglicky', 'nemecky', 'kategorie'] as const

export function parseWordsCsv(csvText: string): Word[] {
  const result = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    delimiter: ';',
    skipEmptyLines: true,
  })

  const headers = result.meta.fields ?? []
  const missing = REQUIRED_COLUMNS.filter(col => !headers.includes(col))
  if (missing.length > 0) {
    throw new Error(`Chybí sloupce: ${missing.join(', ')}`)
  }

  return result.data
    .filter(row =>
      REQUIRED_COLUMNS.every(col => row[col] !== undefined && row[col] !== null)
    )
    .map(row => ({
      id: Number(row.id),
      cesky: (row.cesky ?? '').trim(),
      anglicky: (row.anglicky ?? '').trim(),
      nemecky: (row.nemecky ?? '').trim(),
      kategorie: (row.kategorie ?? '').trim(),
    }))
}

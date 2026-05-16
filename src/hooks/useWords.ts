import { useState, useEffect } from 'react'
import type { Word } from '../types/word'
import { parseWordsCsv } from '../utils/csvParser'

interface UseWordsResult {
  words: Word[]
  loading: boolean
  error: string | null
}

export function useWords(): UseWordsResult {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/slovicka.csv')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then(text => {
        setWords(parseWordsCsv(text))
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Nepodařilo se načíst slovíčka.')
      })
      .finally(() => setLoading(false))
  }, [])

  return { words, loading, error }
}

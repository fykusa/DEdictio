import { render, screen, waitFor } from '@testing-library/react'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { App } from './App'

const realCsv = readFileSync(resolve(__dirname, '../public/slovicka.csv'), 'utf-8')

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    text: () => Promise.resolve(realCsv),
  } as Response)
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('App načte reálné CSV a zobrazí kvíz bez pádu', async () => {
  render(<App />)
  await waitFor(() => {
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
  // AnswerGrid má 4 tlačítka — kvíz je zobrazen
  expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(4)
})

test('App zobrazí slovo z reálného CSV (není undefined)', async () => {
  render(<App />)
  await waitFor(() => {
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
  // žádný element nesmí obsahovat text "undefined"
  expect(document.body.textContent).not.toContain('undefined')
})

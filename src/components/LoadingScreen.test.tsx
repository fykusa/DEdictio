import { render, screen } from '@testing-library/react'
import { LoadingScreen } from './LoadingScreen'

test('zobrazí spinner bez error prop', () => {
  render(<LoadingScreen />)
  expect(screen.getByRole('status')).toBeInTheDocument()
})

test('zobrazí chybovou hlášku když je error', () => {
  render(<LoadingScreen error="Chyba načítání" />)
  expect(screen.getByText('Chyba načítání')).toBeInTheDocument()
})

test('nezobrazí spinner při chybě', () => {
  render(<LoadingScreen error="Chyba" />)
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
})

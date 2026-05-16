import { render, screen } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

test('zobrazí text "3 / 15"', () => {
  render(<ProgressBar current={3} total={15} score={30} />)
  expect(screen.getByText('3 / 15')).toBeInTheDocument()
})

test('zobrazí skóre', () => {
  render(<ProgressBar current={3} total={15} score={30} />)
  expect(screen.getByText('+30 bodů')).toBeInTheDocument()
})

test('pruh má správnou šířku', () => {
  const { container } = render(<ProgressBar current={6} total={15} score={0} />)
  const fill = container.querySelector('.progress-fill')
  expect(fill).toHaveStyle({ width: '40%' })
})

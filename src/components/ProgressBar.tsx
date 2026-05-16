interface Props {
  current: number
  total: number
  score: number
}

export function ProgressBar({ current, total, score }: Props) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-text">
        <span>{current} / {total}</span>
        <span className="score">{score}</span>
      </div>
    </div>
  )
}

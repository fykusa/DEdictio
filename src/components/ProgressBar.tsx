interface Props {
  current: number
  total: number
  score: number
}

export function ProgressBar({ current, total, score }: Props) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0
  return (
    <div className="progress-area">
      <div className="progress-row">
        <span className="progress-label">{current} / {total}</span>
        <span className="progress-score">+{score} bodů</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

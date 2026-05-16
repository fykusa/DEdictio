import './EndScreen.css'

interface Props {
  correctCount: number
  wrongCount: number
  score: number
  total: number
  onRestart: () => void
  onChangeLang: () => void
}

export function EndScreen({ correctCount, wrongCount, score, total, onRestart, onChangeLang }: Props) {
  return (
    <div className="end-screen">
      <h2 className="end-title">Kolo dokončeno!</h2>
      <div className="end-stats">
        <div className="stat">
          <span className="stat-value correct">{correctCount}</span>
          <span className="stat-label">Správně</span>
        </div>
        <div className="stat">
          <span className="stat-value wrong">{wrongCount}</span>
          <span className="stat-label">Chybně</span>
        </div>
        <div className="stat">
          <span className="stat-value">{score}</span>
          <span className="stat-label">Bodů</span>
        </div>
      </div>
      <div className="end-total">z {total} otázek</div>
      <button className="btn-restart" onClick={onRestart}>
        Znovu →
      </button>
      <button className="btn-change-lang" onClick={onChangeLang}>
        Změnit jazyk
      </button>
    </div>
  )
}

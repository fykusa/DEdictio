interface Props {
  correctCount: number
  wrongCount: number
  score: number
  total: number
  onRestart: () => void
  onChangeLang: () => void
}

export function EndScreen({ correctCount, wrongCount, score, total, onRestart, onChangeLang }: Props) {
  const pct = Math.round((correctCount / total) * 100)
  const emoji = pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚'
  const title = pct >= 80 ? 'Výborně!' : pct >= 50 ? 'Dobrá práce!' : 'Pokračuj v tréninku!'

  return (
    <div className="end-screen visible">
      <div className="end-emoji">{emoji}</div>
      <h2 className="end-title">{title}</h2>
      <p className="end-sub">{pct} % správně — paměť se tříbí opakováním.</p>
      <div className="end-stats">
        <div className="end-stat">
          <div className="end-stat-val green">{correctCount}</div>
          <div className="end-stat-label">Správně</div>
        </div>
        <div className="end-stat">
          <div className="end-stat-val red">{wrongCount}</div>
          <div className="end-stat-label">Chybně</div>
        </div>
        <div className="end-stat">
          <div className="end-stat-val" style={{color: 'var(--accent)'}}>{score}</div>
          <div className="end-stat-label">Bodů</div>
        </div>
      </div>
      <button className="restart-btn" onClick={onRestart}>Hrát znovu</button>
      <button
        className="lang-pair"
        onClick={onChangeLang}
        style={{alignSelf: 'center', marginTop: 8}}
      >
        <span className="lang-labels" style={{alignItems:'center'}}>
          <span className="lang-target">Změnit jazyk</span>
        </span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{color:'var(--muted)'}}><path d="M6 9l6 6 6-6"/></svg>
      </button>
    </div>
  )
}

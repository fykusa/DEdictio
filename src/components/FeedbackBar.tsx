interface Props {
  correct: boolean
  visible: boolean
  onNext: () => void
}

export function FeedbackBar({ correct, visible, onNext }: Props) {
  return (
    <div className={`feedback-bar${visible ? ' visible' : ''}`}>
      <span className={`feedback-text ${correct ? 'correct' : 'wrong'}`}>
        {correct ? '✓ Správně! +10 bodů' : '✗ Špatně'}
      </span>
      <button className="next-btn" onClick={onNext} style={{ background: 'none', color: 'var(--muted)', fontSize: 12, fontWeight: 500, border: 'none', padding: '4px 8px', boxShadow: 'none' }}>
        klikni pro pokračování
      </button>
    </div>
  )
}

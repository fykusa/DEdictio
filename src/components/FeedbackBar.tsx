interface Props {
  correct: boolean
  score: number
  onNext: () => void
}

export function FeedbackBar({ correct, score, onNext }: Props) {
  return (
    <div className={`feedback-bar visible ${correct ? 'feedback-correct' : 'feedback-wrong'}`}>
      <span className="feedback-text">
        {correct ? `✓ Správně! +10 bodů` : `✗ Špatně`}
      </span>
      <span className="feedback-score">{score}</span>
      <button className="btn-next" onClick={onNext}>Dál →</button>
    </div>
  )
}

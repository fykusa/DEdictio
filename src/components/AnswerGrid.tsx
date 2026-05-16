interface Props {
  options: string[]
  selectedIndex: number | null
  correctIndex: number
  onSelect: (index: number) => void
  onNext?: () => void
}

export function AnswerGrid({ options, selectedIndex, correctIndex, onSelect, onNext }: Props) {
  const answered = selectedIndex !== null

  function getClassName(i: number): string {
    if (!answered) return 'answer-btn'
    if (i === correctIndex) return 'answer-btn correct'
    if (i === selectedIndex) return 'answer-btn wrong'
    return 'answer-btn dimmed'
  }

  return (
    <div className="answers-grid">
      {options.map((opt, i) => (
        <button
          key={i}
          className={getClassName(i)}
          onClick={() => answered ? onNext?.() : onSelect(i)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

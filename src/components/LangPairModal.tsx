import type { LangPair } from '../types/word'
import './LangPairModal.css'

interface Props {
  pairs: LangPair[]
  activePairId: string
  onSelect: (pair: LangPair) => void
  onClose: () => void
}

export function LangPairModal({ pairs, activePairId, onSelect, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Vyber jazykový pár</div>
        <div className="modal-buttons">
          {pairs.map(pair => (
            <button
              key={pair.id}
              className={`lang-pair-btn ${pair.id === activePairId ? 'active' : ''}`}
              onClick={() => {
                onSelect(pair)
                onClose()
              }}
            >
              {pair.srcFlag} {pair.srcLabel} → {pair.tgtFlag} {pair.tgtLabel}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

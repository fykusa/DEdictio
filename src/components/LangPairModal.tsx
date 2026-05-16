import type { LangPair } from '../types/word'
import { FlagImg } from './FlagImg'

interface Props {
  open: boolean
  pairs: LangPair[]
  activePairId: string
  onSelect: (pair: LangPair) => void
  onClose: () => void
}

export function LangPairModal({ open, pairs, activePairId, onSelect, onClose }: Props) {
  return (
    <div
      className={`modal-overlay${open ? ' open' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Výběr jazykového páru"
    >
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <p className="modal-title">Jazykový pár</p>
        <p className="modal-sub">Vyber směr překladu</p>
        <div className="lang-options">
          {pairs.map(pair => (
            <div
              key={pair.id}
              className={`lang-option${pair.id === activePairId ? ' active' : ''}`}
              onClick={() => onSelect(pair)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(pair) } }}
            >
              <span className="lang-option-flag" style={{display:'flex',alignItems:'center',gap:4}}>
                <FlagImg code={pair.srcFlagCode} size={22} label={pair.srcLabel} />
                <span style={{fontSize:12,color:'var(--muted)'}}>→</span>
                <FlagImg code={pair.tgtFlagCode} size={22} label={pair.tgtLabel} />
              </span>
              <div className="lang-option-info">
                <div className="lang-option-name">{pair.srcLabel} → {pair.tgtLabel}</div>
                <div className="lang-option-sub">{pair.id.split('-')[0].toUpperCase()} · {pair.id.split('-')[1].toUpperCase()}</div>
              </div>
              <div className="lang-check">
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

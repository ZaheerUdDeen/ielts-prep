// Shared layout bits: top bar, tiles, progress ring.
import { Icon } from './Icons.jsx'
import { navigate } from '../lib/router.js'

export function TopBar({ title, back, right }) {
  return (
    <header className="topbar">
      {back ? (
        <button type="button" className="icon-btn" onClick={() => navigate(back)} aria-label="Back">
          <Icon name="back" />
        </button>
      ) : (
        <span className="topbar__spacer" />
      )}
      <h1 className="topbar__title">{title}</h1>
      <div className="topbar__right">{right}</div>
    </header>
  )
}

export function Tile({ label, subtitle, icon, disabled, onClick, meta, accent }) {
  return (
    <button
      type="button"
      className={`tile ${disabled ? 'tile--disabled' : ''} ${accent ? `tile--${accent}` : ''}`}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
    >
      {icon && (
        <span className="tile__icon">
          <Icon name={icon} size={30} />
        </span>
      )}
      <span className="tile__label">{label}</span>
      {subtitle && <span className="tile__subtitle">{subtitle}</span>}
      {meta && <span className="tile__meta">{meta}</span>}
      {disabled && (
        <span className="tile__soon">
          <Icon name="lock" size={12} /> Coming soon
        </span>
      )}
    </button>
  )
}

export function ProgressRing({ value, total, size = 112 }) {
  const r = 44
  const c = 2 * Math.PI * r
  const pct = total ? value / total : 0
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={r} className="ring__bg" />
        <circle
          cx="50"
          cy="50"
          r={r}
          className="ring__fg"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <div className="ring__text">
        <strong>
          {value}/{total}
        </strong>
        <span>mastered</span>
      </div>
    </div>
  )
}

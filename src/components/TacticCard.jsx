import { Icon } from './Icons.jsx'
import { Marked } from './Marked.jsx'
import { Visual } from './Visual.jsx'

function Example({ example }) {
  if (!example) return null
  const kind = example.kind || 'plain'
  return (
    <figure className={`example example--${kind}`}>
      {example.label && (
        <figcaption className="example__label">
          {kind === 'fail' && <Icon name="cross" size={14} />}
          {kind === 'fix' && <Icon name="check" size={14} />}
          {example.label}
        </figcaption>
      )}
      {example.before && (
        <div className="example__pair">
          <Marked as="p" text={example.before} className="example__text example__text--before" />
          <span className="example__arrow" aria-label="becomes">↓</span>
          <Marked as="p" text={example.after} className="example__text" />
        </div>
      )}
      {example.text && <Marked as="p" text={example.text} className="example__text" />}
      {example.lines && (
        <ul className="example__lines">
          {example.lines.map((l, i) => (
            <li key={i}>
              {l.tag && <span className="example__tag">{l.tag}</span>}
              <Marked text={l.text} className="example__text" />
            </li>
          ))}
        </ul>
      )}
    </figure>
  )
}

export function TacticCard({ tactic, family, familyIndex, familySize, known }) {
  const isDont = tactic.polarity === 'dont'
  return (
    <article className={`card tone-${family.tone}`} aria-label={`${tactic.id}: ${tactic.title}`}>
      <header className="card__head">
        <span className="card__badge">{tactic.id}</span>
        <div className="card__family">
          <span className="card__family-name">{family.name}</span>
          <span className="card__family-pos">
            {familyIndex + 1} of {familySize}
            {known && (
              <span className="card__known">
                <Icon name="star" size={11} filled /> known
              </span>
            )}
          </span>
        </div>
        <span
          className={`card__polarity card__polarity--${isDont ? 'dont' : 'do'}`}
          title={isDont ? 'Never do this' : 'Do this'}
        >
          <Icon name={isDont ? 'cross' : 'check'} size={22} />
        </span>
      </header>

      <div className="card__body">
        <h2 className="card__title">{tactic.title}</h2>
        <p className="card__hook">{tactic.hook}</p>
        <div className="card__visual">
          <Visual visual={tactic.visual} />
        </div>
        <Example example={tactic.example} />
      </div>
    </article>
  )
}

/** Two-state "Still learning" / "Known" switch. Lives in the deck's bottom
 *  bar so it is always under your thumb, however long the card is. */
export function KnownToggle({ known, onToggle, label }) {
  return (
    <button
      type="button"
      className={`known-toggle ${known ? 'is-known' : ''}`}
      aria-pressed={known}
      aria-label={label ? `${label}: mark as ${known ? 'still learning' : 'known'}` : undefined}
      onClick={onToggle}
    >
      <span className="known-toggle__track">
        <span className="known-toggle__thumb">
          <Icon name={known ? 'star' : 'sprout'} size={14} filled={known} />
        </span>
      </span>
      <span className="known-toggle__label">{known ? 'Known' : 'Still learning'}</span>
    </button>
  )
}

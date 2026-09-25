// Writing pipeline map: every section's formula as a big "station", fanning
// out into its families (the formula letters) and down into each family's
// tactic chips, then converging into the next station.
//
// Fully data-driven: walks skill.sections -> deck.formula / deck.families /
// deck.tactics. Add a section or a tactic to the data files and it appears
// here automatically. Plain SVG + CSS, no layout library.
import { useState } from 'react'
import { cardKey } from '../data/catalog.js'
import { navigate } from '../lib/router.js'
import { Icon } from './Icons.jsx'

/** x positions (0..100) of n equal-width columns' centres. */
const colX = (i, n) => ((i + 0.5) * 100) / n

/** Curved connectors between one point and n column centres.
 *  dir="fan": centre-top -> columns-bottom. dir="merge": columns-top -> centre-bottom.
 *  preserveAspectRatio="none" + non-scaling strokes lets it stretch to any width. */
function Connectors({ tones, dir, height = 40 }) {
  const n = tones.length
  const h = height
  const paths = tones.map((tone, i) => {
    const x = colX(i, n)
    const d =
      dir === 'fan'
        ? `M50 0 C50 ${h * 0.6} ${x} ${h * 0.4} ${x} ${h}`
        : `M${x} 0 C${x} ${h * 0.6} 50 ${h * 0.4} 50 ${h}`
    return { tone, d, key: i }
  })
  return (
    <svg
      className={`flow__links flow__links--${dir}`}
      viewBox={`0 0 100 ${h}`}
      preserveAspectRatio="none"
      style={{ height: h }}
      aria-hidden="true"
    >
      {paths.map((p) => (
        <g key={p.key} className={`tone-${p.tone}`}>
          <path d={p.d} className="flow__link" vectorEffect="non-scaling-stroke" />
          <path d={p.d} className="flow__pulse" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </svg>
  )
}

/** Fixed-size downward arrow joining one station to the next. */
function DownArrow() {
  return (
    <svg className="flow__arrow" viewBox="0 0 24 26" aria-hidden="true">
      <path d="M12 0v18" />
      <path d="M5 13l7 8 7-8" />
    </svg>
  )
}

function StationWord({ formula, families, fallback }) {
  const word = formula?.word || fallback
  const starred = families.filter((f) => f.star)
  return (
    <span className="station__word" aria-hidden="true">
      {[...word].map((ch, i) => (
        <span key={i} className={`station__letter tone-${starred[i]?.tone || 'none'}`}>
          {ch}
        </span>
      ))}
    </span>
  )
}

function FamilyPanel({ id, family, items, base, isKnown }) {
  const label = family.star ? family.star.action : family.name
  return (
    <div id={id} className={`flow-panel tone-${family.tone}`}>
      <div className="flow-panel__head">
        {family.star ? (
          <span className="family__letter">{family.star.letter}</span>
        ) : (
          <span className="family__swatch" />
        )}
        <span className="family__titles">
          <span className="family__name">{label}</span>
          {family.star && <span className="family__legacy">{family.name}</span>}
        </span>
      </div>
      <p className="flow-panel__tip">{family.tip}</p>
      <ol className="flow-panel__list">
        {items.map((t) => {
          const known = isKnown(t)
          const dont = t.polarity === 'dont'
          return (
            <li key={t.id}>
              <button type="button" className="flow-panel__row" onClick={() => navigate(`${base}/deck?start=${t.id}`)}>
                <span className={`flow-panel__id ${known ? 'is-known' : ''}`}>{t.id}</span>
                <span className="flow-panel__text">
                  <strong>{t.title}</strong>
                  <span>{t.hook}</span>
                </span>
                <span className={`flow-panel__pol flow-panel__pol--${dont ? 'dont' : 'do'}`} title={dont ? 'Never do this' : 'Do this'}>
                  <Icon name={dont ? 'cross' : 'check'} size={14} />
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Station({ skill, section, step, mastered, openKey, setOpenKey }) {
  const base = `/${skill.id}/${section.id}`
  const go = () => navigate(base)

  if (!section.deck) {
    return (
      <button type="button" className="station station--empty" onClick={go}>
        <span className="station__body">
          <span className="station__eyebrow">
            {step}. {section.label}
          </span>
          <span className="station__plain">{section.subtitle || section.label}</span>
          <span className="station__meta">Coming soon</span>
        </span>
      </button>
    )
  }

  const { formula, families, tactics } = section.deck
  const isKnown = (t) => !!mastered[cardKey(skill.id, section.id, t.id)]
  const known = tactics.filter(isKnown).length
  const cols = families
    .map((f) => ({ family: f, items: tactics.filter((t) => t.family === f.id) }))
    .filter((c) => c.items.length)
  const tones = cols.map((c) => c.family.tone)
  const openCol = cols.find((c) => openKey === `${section.id}:${c.family.id}`)
  const panelId = `flow-panel-${section.id}`
  const word = formula?.word || section.label

  return (
    <div className="flow__stage">
      <button
        type="button"
        className="station"
        onClick={go}
        aria-label={`${word}, ${section.label}: ${tactics.length} cards, ${known} known`}
      >
        <span className="station__step">{step}</span>
        <span className="station__body">
          <span className="station__eyebrow">{section.label}</span>
          <StationWord formula={formula} families={families} fallback={section.label} />
          <span className="station__meta">
            <span className="meter station__meter">
              <span className="meter__fill" style={{ width: `${(known / tactics.length) * 100}%` }} />
            </span>
            {tactics.length} cards · {known} known
          </span>
        </span>
        <Icon name="next" size={22} />
      </button>

      <Connectors tones={tones} dir="fan" height={34} />

      <div className="flow__cols" style={{ '--n': cols.length }}>
        {cols.map(({ family: f, items }) => {
          const key = `${section.id}:${f.id}`
          const open = openKey === key
          return (
            <div key={f.id} className={`flow-col tone-${f.tone} ${open ? 'is-open' : ''}`}>
              <button
                type="button"
                className="flow-fam"
                aria-expanded={open}
                aria-controls={open ? panelId : undefined}
                aria-label={`${f.star ? f.star.action : f.name}: ${items.length} tactics. ${open ? 'Hide' : 'Explain'}`}
                onClick={() => setOpenKey(open ? null : key)}
              >
                {f.star ? (
                  <span className="flow-fam__letter">{f.star.letter}</span>
                ) : (
                  <span className="flow-fam__letter flow-fam__letter--swatch" />
                )}
                <span className="flow-fam__word">{f.star ? f.star.word : f.name}</span>
              </button>
              <ul className="flow-col__chips">
                {items.map((t) => {
                  const k = isKnown(t)
                  return (
                    <li key={t.id}>
                      <button
                        type="button"
                        className={`flow-chip ${k ? 'is-known' : ''}`}
                        onClick={() => navigate(`${base}/deck?start=${t.id}`)}
                        aria-label={`${t.id}: ${t.title}${k ? ' (known)' : ''}`}
                        title={t.title}
                      >
                        {t.id}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      {openCol && (
        <FamilyPanel id={panelId} family={openCol.family} items={openCol.items} base={base} isKnown={isKnown} />
      )}

      <Connectors tones={tones} dir="merge" height={40} />
    </div>
  )
}

export function FlowMap({ skill, mastered }) {
  const [openKey, setOpenKey] = useState(null)
  return (
    <div className="flow">
      <p className="flow__hint">
        Tap a <strong>formula</strong> to open it, a <strong>letter</strong> to see its tactics, a{' '}
        <strong>chip</strong> to jump to that card.
      </p>
      {skill.sections.map((sec, i) => (
        <div key={sec.id} className="flow__step">
          {i > 0 && <DownArrow />}
          <Station
            skill={skill}
            section={sec}
            step={i + 1}
            mastered={mastered}
            openKey={openKey}
            setOpenKey={setOpenKey}
          />
        </div>
      ))}
      <div className="flow__end">
        <DownArrow />
        <span className="flow__end-cap">
          <Icon name="check" size={16} /> Full essay
        </span>
      </div>
    </div>
  )
}

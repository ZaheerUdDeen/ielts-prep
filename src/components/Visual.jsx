// One visual mnemonic per card. Each renderer reads the family colour from
// CSS custom properties (--c, --c-soft, --c-ink) set on the card.
import { Icon } from './Icons.jsx'
import { Marked } from './Marked.jsx'

function Morph({ from, to }) {
  return (
    <div className="v-morph">
      <div className="v-morph__box v-morph__box--from">
        <Marked text={from.text} className="v-morph__word" />
        <span className="v-morph__label">{from.label}</span>
      </div>
      <svg className="v-morph__arrow" viewBox="0 0 48 24" aria-hidden="true">
        <path d="M2 12h38M32 4l10 8-10 8" />
      </svg>
      <div className="v-morph__box v-morph__box--to">
        <Marked text={to.text} className="v-morph__word" />
        <span className="v-morph__label">{to.label}</span>
      </div>
    </div>
  )
}

function Swap({ top, bottom }) {
  return (
    <svg className="v-svg" viewBox="0 0 300 170" role="img" aria-label={`${top.join(' ')} becomes ${bottom.join(' ')}`}>
      <defs>
        <marker id="ah-c" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 10 5 0 10z" className="fill-c" />
        </marker>
        <marker id="ah-ink" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 10 5 0 10z" className="fill-ink" />
        </marker>
      </defs>
      {/* crossing arrows */}
      <path d="M40 58 C40 95 260 78 260 110" className="stroke-c" strokeWidth="3" fill="none" markerEnd="url(#ah-c)" />
      <path d="M260 58 C260 95 40 78 40 110" className="stroke-ink" strokeWidth="2.5" strokeDasharray="6 5" fill="none" markerEnd="url(#ah-ink)" />
      {/* top row */}
      <rect x="10" y="18" width="60" height="40" rx="10" className="fill-c" />
      <text x="40" y="45" className="v-svg__big v-svg__on-c">{top[0]}</text>
      <text x="150" y="44" className="v-svg__verb">{top[1]}</text>
      <rect x="230" y="18" width="60" height="40" rx="10" className="fill-ink" />
      <text x="260" y="45" className="v-svg__big v-svg__on-ink">{top[2]}</text>
      {/* bottom row */}
      <rect x="10" y="116" width="60" height="40" rx="10" className="fill-ink" />
      <text x="40" y="143" className="v-svg__big v-svg__on-ink">{bottom[0]}</text>
      <text x="150" y="142" className="v-svg__verb v-svg__verb--hl">{bottom[1]}</text>
      <rect x="230" y="116" width="60" height="40" rx="10" className="fill-c" />
      <text x="260" y="143" className="v-svg__big v-svg__on-c">{bottom[2]}</text>
    </svg>
  )
}

function Merge({ inputs, output }) {
  return (
    <svg className="v-svg" viewBox="0 0 300 170" role="img" aria-label={`${inputs.join(' and ')} merge into one sentence`}>
      <path d="M75 50 C75 90 150 80 150 112" className="stroke-c" strokeWidth="3" fill="none" />
      <path d="M225 50 C225 90 150 80 150 112" className="stroke-c" strokeWidth="3" fill="none" />
      <rect x="15" y="12" width="120" height="38" rx="19" className="fill-soft stroke-c" strokeWidth="2" />
      <text x="75" y="37" className="v-svg__mid v-svg__on-soft">{inputs[0]}</text>
      <rect x="165" y="12" width="120" height="38" rx="19" className="fill-soft stroke-c" strokeWidth="2" />
      <text x="225" y="37" className="v-svg__mid v-svg__on-soft">{inputs[1]}</text>
      <text x="150" y="36" className="v-svg__mid v-svg__plus">+</text>
      <rect x="40" y="112" width="220" height="46" rx="23" className="fill-c" />
      <text x="150" y="141" className="v-svg__mid v-svg__on-c">{output}</text>
      <text x="275" y="100" className="v-svg__tag">1 sentence</text>
    </svg>
  )
}

function Test({ question, pass, fail }) {
  return (
    <div className="v-test">
      <svg className="v-test__target" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" className="fill-soft" />
        <circle cx="50" cy="50" r="32" className="fill-c" opacity="0.35" />
        <circle cx="50" cy="50" r="18" className="fill-c" opacity="0.7" />
        <circle cx="50" cy="50" r="7" className="fill-ink" />
        <path d="M92 8 54 46" className="stroke-ink" strokeWidth="4" strokeLinecap="round" />
        <path d="M80 6h14v14" className="stroke-ink" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
      <div className="v-test__body">
        <p className="v-test__q">{question}</p>
        <p className="v-test__row v-test__row--pass">
          <Icon name="check" size={16} /> {pass}
        </p>
        <p className="v-test__row v-test__row--fail">
          <Icon name="cross" size={16} /> {fail}
        </p>
      </div>
    </div>
  )
}

function Dial({ left, middle, right }) {
  return (
    <svg className="v-svg" viewBox="0 0 300 180" role="img" aria-label={`Aim for ${middle}, between ${left} and ${right}`}>
      <path d="M40 160 A110 110 0 0 1 93 65.7" className="stroke-muted" strokeWidth="22" fill="none" />
      <path d="M97 63.4 A110 110 0 0 1 203 63.4" className="stroke-c" strokeWidth="22" fill="none" />
      <path d="M207 65.7 A110 110 0 0 1 260 160" className="stroke-warn" strokeWidth="22" fill="none" />
      <line x1="150" y1="160" x2="150" y2="68" className="stroke-ink" strokeWidth="5" strokeLinecap="round" />
      <circle cx="150" cy="160" r="10" className="fill-ink" />
      <text x="150" y="26" className="v-svg__mid v-svg__c">{middle} ✓</text>
      <text x="40" y="178" className="v-svg__small">{left}</text>
      <text x="260" y="178" className="v-svg__small">{right}</text>
    </svg>
  )
}

function Blocks({ blocks, paper = 'INTRO' }) {
  return (
    <div className="v-blocks" role="img" aria-label={`${paper} contains: ${blocks.map((b) => b.label).join(', ')}`}>
      <div className="v-blocks__paper" data-paper={paper}>
        {blocks.map((b, i) => (
          <div key={i} className="v-blocks__row">
            {i > 0 && <span className="v-blocks__plus">+</span>}
            <span className={`v-block v-block--${b.kind}`}>
              {b.kind === 'view' && <Icon name="star" size={16} filled />}
              {b.kind === 'hold' && <span className="v-block__pause" aria-hidden="true">❚❚</span>}
              {b.kind === 'cut' && <Icon name="cross" size={16} />}
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Banned({ phrase, badge }) {
  return (
    <div className="v-banned">
      <div className="v-banned__phrase">
        <Marked text={phrase} />
      </div>
      <div className="v-banned__stamp" aria-hidden="true">
        <Icon name="cross" size={34} />
      </div>
      {badge && <span className="v-banned__badge">{badge}</span>}
    </div>
  )
}

// Tiny inline glyphs for `contrast` rows: a pair of people vs a lightbulb.
function Glyph({ name }) {
  if (name === 'people') {
    return (
      <svg className="v-glyph" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="11" cy="10" r="4.5" />
        <path d="M3 27c0-5 3.6-8.5 8-8.5s8 3.5 8 8.5" />
        <circle cx="22" cy="11.5" r="3.8" />
        <path d="M20 19.4c.6-.2 1.3-.3 2-.3 3.9 0 7 3.1 7 7.4" />
      </svg>
    )
  }
  return (
    <svg className="v-glyph" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 4a8.5 8.5 0 0 0-5 15.4c.8.6 1.3 1.6 1.3 2.6v1h7.4v-1c0-1 .5-2 1.3-2.6A8.5 8.5 0 0 0 16 4z" />
      <path d="M12.8 27h6.4M14 30h4" />
    </svg>
  )
}

function Contrast({ rows }) {
  return (
    <div className="v-contrast">
      {rows.map((r, i) => (
        <div key={i} className={`v-contrast__row v-contrast__row--${r.ok ? 'ok' : 'no'}`}>
          <span className="v-contrast__icon">
            <Glyph name={r.icon} />
          </span>
          <div className="v-contrast__body">
            <span className="v-contrast__label">
              <Icon name={r.ok ? 'check' : 'cross'} size={13} /> {r.label}
            </span>
            <Marked text={r.text} className="v-contrast__text" />
          </div>
        </div>
      ))}
    </div>
  )
}

const MARKS = { yes: ['check', 'Yes'], no: ['cross', 'No'], opt: [null, 'Optional'] }

function Grid({ head, rows, footer }) {
  return (
    <div className="v-grid">
      {head && (
        <div className="v-grid__head">
          <span>{head[0]}</span>
          {head[1] && <span>{head[1]}</span>}
        </div>
      )}
      <ul className="v-grid__rows">
        {rows.map((r, i) => {
          // `mark` is optional: rows without one render as a plain descriptive row.
          const [icon, word] = MARKS[r.mark] || MARKS.opt
          return (
            <li key={i} className={`v-grid__row v-grid__row--${r.mark || 'plain'}`}>
              <div className="v-grid__cell">
                <span className="v-grid__label">{r.label}</span>
                {r.text && <Marked text={r.text} className="v-grid__text" />}
                {r.note && <span className="v-grid__note">{r.note}</span>}
              </div>
              {r.mark && (
                <span className="v-grid__mark" aria-label={word} title={word}>
                  {icon ? <Icon name={icon} size={16} /> : '~'}
                </span>
              )}
            </li>
          )
        })}
      </ul>
      {footer && <Marked as="p" text={footer} className="v-grid__footer" />}
    </div>
  )
}

const renderers = {
  morph: Morph,
  swap: Swap,
  merge: Merge,
  test: Test,
  dial: Dial,
  blocks: Blocks,
  banned: Banned,
  contrast: Contrast,
  grid: Grid,
}

export function Visual({ visual }) {
  const R = renderers[visual?.type]
  return R ? <R {...visual} /> : null
}

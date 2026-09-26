// Vocabulary: spelling + meaning trainer over the Academic Word List.
// Loop: show a word for 5 s -> hide it -> type it from memory -> check, see the
// letter diff and the meaning -> next. Words you miss come back sooner.
import { useEffect, useMemo, useRef, useState } from 'react'
import vocabulary from '../data/vocabulary.js'
import { TopBar } from '../components/Chrome.jsx'
import { Icon } from '../components/Icons.jsx'
import {
  useVocabProgress,
  recordAttempt,
  setLevel,
  resetProgress,
  exportProgress,
  importProgress,
} from '../lib/vocabProgress.js'

const REVEAL_MS = 5000
const RECENT = 6
const TONES = ['amber', 'teal', 'violet', 'rose']
const POS_LABEL = { n: 'noun', v: 'verb', adj: 'adjective', adv: 'adverb', prep: 'preposition', conj: 'conjunction' }
const LEVELS = ['all', 'miss', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

const toneFor = (sublist) => TONES[(sublist - 1) % TONES.length]

function clean(s) {
  return s.trim().toLowerCase().replace(/[‐-―]/g, '-').replace(/\s+/g, ' ')
}

function poolFor(level, words) {
  if (level === 'miss') return vocabulary.filter((e) => words[e.w]?.miss)
  if (level !== 'all') return vocabulary.filter((e) => String(e.s) === level)
  return vocabulary
}

// Weighted pick: last attempt wrong = very likely, new = normal,
// each correct-in-a-row halves the chance. Recently shown words are skipped.
function pickWord(level, words, recent) {
  let pool = poolFor(level, words)
  if (!pool.length) pool = vocabulary
  const fresh = pool.length > RECENT ? pool.filter((e) => !recent.includes(e.w)) : pool
  const weight = (e) => {
    const h = words[e.w]
    if (!h) return 1
    if (h.miss) return 6
    return 0.5 ** h.run
  }
  const total = fresh.reduce((sum, e) => sum + weight(e), 0)
  let r = Math.random() * total
  for (const e of fresh) {
    r -= weight(e)
    if (r <= 0) return e
  }
  return fresh[fresh.length - 1]
}

// Levenshtein alignment -> per-letter ops, used to highlight what went wrong.
function diff(typed, target) {
  const a = [...typed]
  const b = [...target]
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const same = a[i - 1].toLowerCase() === b[j - 1].toLowerCase()
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (same ? 0 : 1))
    }
  }
  const ops = []
  let i = a.length
  let j = b.length
  while (i > 0 || j > 0) {
    const same = i > 0 && j > 0 && a[i - 1].toLowerCase() === b[j - 1].toLowerCase()
    if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (same ? 0 : 1)) {
      ops.push({ t: same ? 'eq' : 'sub', a: a[i - 1], b: b[j - 1] })
      i--
      j--
    } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) {
      ops.push({ t: 'extra', a: a[i - 1] })
      i--
    } else {
      ops.push({ t: 'missing', b: b[j - 1] })
      j--
    }
  }
  return ops.reverse()
}

function Countdown({ secs }) {
  const r = 20
  const c = 2 * Math.PI * r
  return (
    <div className="vx-count" aria-label={`${secs} seconds left`}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={r} className="vx-count__bg" />
        <circle
          cx="24"
          cy="24"
          r={r}
          className="vx-count__fg"
          strokeDasharray={c}
          style={{ '--c-len': c, animationDuration: `${REVEAL_MS}ms` }}
        />
      </svg>
      <span>{secs}</span>
    </div>
  )
}

function Stats({ progress }) {
  const { attempted, correct, wrong, streak, best } = progress
  const pct = attempted ? Math.round((correct / attempted) * 100) : 0
  return (
    <section className="vx-stats" aria-label="Your progress">
      <div className="vx-stat tone-violet">
        <strong>{attempted}</strong>
        <span>Attempted</span>
      </div>
      <div className="vx-stat tone-teal">
        <strong>{correct}</strong>
        <span>Correct</span>
      </div>
      <div className="vx-stat tone-rose">
        <strong>{wrong}</strong>
        <span>Wrong</span>
      </div>
      <div className="vx-stat tone-amber">
        <strong>{attempted ? `${pct}%` : '–'}</strong>
        <span>Accuracy</span>
      </div>
      <div className="vx-stats__meter" aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="vx-stats__streak">
        <Icon name="star" size={13} filled /> Streak <b>{streak}</b>
        <span className="vx-dot">·</span>
        Best <b>{best}</b>
      </p>
    </section>
  )
}

function Levels({ level, missCount, onChange }) {
  return (
    <div className="vx-levels" role="radiogroup" aria-label="Word set">
      {LEVELS.map((l) => {
        const label = l === 'all' ? `All ${vocabulary.length}` : l === 'miss' ? `Mistakes ${missCount}` : `Sublist ${l}`
        const disabled = l === 'miss' && !missCount
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={level === l}
            disabled={disabled}
            className={`vx-level ${level === l ? 'is-on' : ''} ${l === 'miss' ? 'vx-level--miss' : ''}`}
            onClick={() => onChange(l)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

function Meaning({ entry }) {
  return (
    <div className={`vx-meaning tone-${toneFor(entry.s)}`}>
      <div className="vx-meaning__tags">
        <span className="vx-tag vx-tag--pos">{POS_LABEL[entry.p]}</span>
        <span className="vx-tag vx-tag--sub">AWL sublist {entry.s}</span>
      </div>
      <p className="vx-meaning__def">{entry.d}</p>
      {entry.f && (
        <p className="vx-meaning__family">
          <span>Word family</span>
          {entry.f.map((f) => (
            <em key={f}>{f}</em>
          ))}
        </p>
      )}
    </div>
  )
}

function Diff({ typed, word }) {
  const ops = diff(typed, word)
  return (
    <div className="vx-diff">
      <div className="vx-diff__row">
        <span className="vx-diff__label">You wrote</span>
        <span className="vx-diff__word vx-diff__word--typed">
          {typed ? (
            ops.map((o, k) =>
              o.t === 'missing' ? (
                <i key={k} className="vx-ch vx-ch--gap" />
              ) : (
                <span key={k} className={`vx-ch ${o.t === 'eq' ? '' : `vx-ch--${o.t}`}`}>
                  {o.a}
                </span>
              ),
            )
          ) : (
            <span className="vx-diff__empty">(nothing)</span>
          )}
        </span>
      </div>
      <div className="vx-diff__row">
        <span className="vx-diff__label">Correct</span>
        <span className="vx-diff__word">
          {ops
            .filter((o) => o.t !== 'extra')
            .map((o, k) => (
              <span key={k} className={`vx-ch ${o.t === 'eq' ? '' : 'vx-ch--fix'}`}>
                {o.b}
              </span>
            ))}
        </span>
      </div>
    </div>
  )
}

function wordSize(word) {
  if (word.length <= 8) return '3rem'
  if (word.length <= 11) return '2.5rem'
  return '2.05rem'
}

function Backup({ onMessage }) {
  const fileRef = useRef(null)
  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const p = importProgress(await file.text())
      onMessage({ ok: true, text: `Progress restored: ${p.attempted} attempts, ${Object.keys(p.words).length} words.` })
    } catch (err) {
      onMessage({ ok: false, text: err.message })
    }
  }
  return (
    <div className="vx-backup__actions">
      <button type="button" className="btn btn--ghost vx-backup__btn" onClick={exportProgress}>
        <Icon name="download" size={18} /> Export
      </button>
      <button type="button" className="btn btn--ghost vx-backup__btn" onClick={() => fileRef.current?.click()}>
        <Icon name="upload" size={18} /> Import
      </button>
      <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={onFile} />
    </div>
  )
}

export function VocabularyScreen() {
  const progress = useVocabProgress()
  const [round, setRound] = useState(() => ({ n: 0, entry: pickWord(progress.level, progress.words, []) }))
  const [phase, setPhase] = useState('show') // show | type | result
  const [secs, setSecs] = useState(REVEAL_MS / 1000)
  const [typed, setTyped] = useState('')
  const [result, setResult] = useState(null) // { ok, viaAlt }
  const [message, setMessage] = useState(null)
  const recent = useRef([])
  const inputRef = useRef(null)
  const nextRef = useRef(null)
  const { entry } = round

  const missed = useMemo(
    () =>
      vocabulary
        .filter((e) => progress.words[e.w]?.miss)
        .sort((a, b) => progress.words[b.w].x - progress.words[a.w].x),
    [progress.words],
  )

  // 5-second reveal
  useEffect(() => {
    if (phase !== 'show') return undefined
    const started = Date.now()
    const tick = setInterval(() => {
      setSecs(Math.max(1, Math.ceil((REVEAL_MS - (Date.now() - started)) / 1000)))
    }, 200)
    const hide = setTimeout(() => setPhase('type'), REVEAL_MS)
    return () => {
      clearInterval(tick)
      clearTimeout(hide)
    }
  }, [phase, round.n])

  useEffect(() => {
    if (phase === 'type') inputRef.current?.focus()
    if (phase === 'result') nextRef.current?.focus({ preventScroll: true })
  }, [phase])

  // Start a new round with `forced` or a weighted pick from `level`.
  const startRound = (forced, level = progress.level) => {
    recent.current = [...recent.current.filter((w) => w !== entry.w), entry.w].slice(-RECENT)
    const next = forced || pickWord(level, progress.words, recent.current)
    setRound((r) => ({ n: r.n + 1, entry: next }))
    setTyped('')
    setResult(null)
    setSecs(REVEAL_MS / 1000)
    setPhase('show')
  }

  const check = (answer) => {
    const guess = clean(answer)
    const target = clean(entry.w)
    const viaAlt = !!entry.alt?.some((a) => clean(a) === guess)
    const ok = guess === target || viaAlt
    recordAttempt(entry.w, ok)
    setResult({ ok, viaAlt })
    setPhase('result')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (clean(typed)) check(typed)
  }

  const changeLevel = (l) => {
    setLevel(l)
    startRound(null, l)
  }

  const onReset = () => {
    if (window.confirm('Reset all vocabulary progress? This clears your stats and word history on this device.')) {
      resetProgress()
      setMessage({ ok: true, text: 'Progress reset.' })
    }
  }

  const tone = toneFor(entry.s)
  const letters = [...entry.w]

  return (
    <div className="screen vx">
      <TopBar title="Vocabulary" back="/" />
      <main className="vx__main">
        <Stats progress={progress} />
        <Levels level={progress.level} missCount={missed.length} onChange={changeLevel} />

        <section
          className={`vx-stage vx-stage--${phase} ${result ? (result.ok ? 'is-right' : 'is-wrong') : ''}`}
          aria-live="polite"
        >
          {phase === 'show' && (
            <div key={`s${round.n}`} className="vx-panel vx-panel--show">
              <div className="vx-stage__top">
                <span className="vx-eyebrow">
                  <Icon name="eye" size={14} /> Memorise
                </span>
                <Countdown key={round.n} secs={secs} />
              </div>
              <p className="vx-word" style={{ fontSize: wordSize(entry.w) }}>
                {entry.w}
              </p>
              <p className={`vx-pos tone-${tone}`}>{POS_LABEL[entry.p]}</p>
              <button type="button" className="vx-skip" onClick={() => setPhase('type')}>
                Got it, hide
              </button>
              <div className="vx-drain" aria-hidden="true">
                <span key={round.n} style={{ animationDuration: `${REVEAL_MS}ms` }} />
              </div>
            </div>
          )}

          {phase === 'type' && (
            <form key={`t${round.n}`} className="vx-panel vx-panel--type" onSubmit={onSubmit}>
              <div className="vx-stage__top">
                <span className="vx-eyebrow">
                  <Icon name="pen" size={14} /> Now write it
                </span>
                <span className="vx-len">{letters.length} letters</span>
              </div>
              <div className="vx-slots" aria-hidden="true">
                {letters.map((_, k) => (
                  <i key={k} className={k < [...typed.trim()].length ? 'is-filled' : ''} />
                ))}
              </div>
              <input
                ref={inputRef}
                className="vx-input"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                aria-label="Type the word you just saw"
                placeholder="Type the word"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="done"
              />
              <div className="vx-actions">
                <button type="button" className="btn vx-btn--quiet" onClick={() => check('')}>
                  Show answer
                </button>
                <button type="submit" className="btn vx-btn--gold" disabled={!clean(typed)}>
                  <Icon name="check" size={18} /> Check
                </button>
              </div>
            </form>
          )}

          {phase === 'result' && result && (
            <div key={`r${round.n}`} className="vx-panel vx-panel--result">
              <div className="vx-verdict">
                <span className={`vx-verdict__icon ${result.ok ? 'is-right' : 'is-wrong'}`}>
                  <Icon name={result.ok ? 'check' : 'cross'} size={26} />
                </span>
                <span className="vx-verdict__text">
                  <strong>{result.ok ? 'Correct!' : 'Not quite'}</strong>
                  <span>
                    {result.ok
                      ? progress.streak > 1
                        ? `${progress.streak} in a row`
                        : 'Spelled perfectly'
                      : 'It will come back soon for another try'}
                  </span>
                </span>
              </div>

              {result.ok ? (
                <p className="vx-word vx-word--right" style={{ fontSize: wordSize(entry.w) }}>
                  {result.viaAlt ? clean(typed) : entry.w}
                </p>
              ) : (
                <Diff typed={clean(typed)} word={entry.w} />
              )}
              {result.viaAlt && (
                <p className="vx-note">
                  US spelling accepted. The British form is <b>{entry.w}</b>; either is fine in IELTS if you stay consistent.
                </p>
              )}
              {!result.ok && entry.alt && (
                <p className="vx-note">
                  Also accepted: <b>{entry.alt.join(', ')}</b> (US spelling).
                </p>
              )}

              <Meaning entry={entry} />

              <button ref={nextRef} type="button" className="btn vx-btn--gold vx-next" onClick={() => startRound()}>
                Next word <Icon name="next" size={18} />
              </button>
            </div>
          )}
        </section>

        {missed.length > 0 && (
          <section className="vx-review">
            <h2 className="vx-h2">
              Words to fix <span>{missed.length}</span>
            </h2>
            <p className="vx-sub">Your last try at these was wrong. Tap one to practise it now.</p>
            <div className="vx-review__chips">
              {missed.slice(0, 18).map((e) => (
                <button
                  key={e.w}
                  type="button"
                  className={`vx-chip tone-${toneFor(e.s)}`}
                  onClick={() => startRound(e)}
                >
                  {e.w}
                  {progress.words[e.w].x > 1 && <b>×{progress.words[e.w].x}</b>}
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="vx-backup">
          <h2 className="vx-h2">Backup</h2>
          <p className="vx-sub">
            Progress is saved in this browser. Export a .json file to keep a copy or move it to another device, then Import it there.
          </p>
          <Backup onMessage={setMessage} />
          {message && (
            <p className={`vx-msg ${message.ok ? 'is-ok' : 'is-err'}`} role="status">
              {message.text}
            </p>
          )}
          <button type="button" className="vx-reset" onClick={onReset}>
            Reset progress
          </button>
        </section>

        <p className="vx-credit">
          Words: Academic Word List (Coxhead, 2000), via lpmi-13/machine_readable_wordlists (CC0).
        </p>
      </main>
    </div>
  )
}

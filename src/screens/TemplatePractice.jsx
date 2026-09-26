// Fill-in-the-blank essay template practice (#/writing/templates[/<type>]).
//
// Each paragraph is rendered as its fixed template text with inline editable
// blanks, so the sentence forms around what you type. Under it: a live word
// count per blank vs. its target, the paragraph total, flagged banned words,
// and the paragraph's checklist. Drafts persist via lib/templateDrafts.js.
//
// Blanks are *uncontrolled* inline contentEditable spans: React never rewrites
// their text while you type (no cursor jumps); the DOM is only synced from the
// store when the stored value differs (reset, another tab).
import { useLayoutEffect, useRef } from 'react'
import { findSection } from '../data/catalog.js'
import { templates, findTemplate, blanksOf } from '../data/templates/index.js'
import { navigate } from '../lib/router.js'
import { useTemplateDrafts, setBlank, toggleCheck, resetTemplate } from '../lib/templateDrafts.js'
import { countWords, statusOf, warningsFor, paragraphStats, essayWords } from '../lib/templateStats.js'
import { TopBar } from '../components/Chrome.jsx'
import { Icon } from '../components/Icons.jsx'

const TONES = ['amber', 'teal', 'violet', 'rose']
const STATUS_WORD = { empty: 'Empty', under: 'Under', ok: 'On target', over: 'Over' }

function sectionOf(paragraph) {
  return findSection('writing', paragraph.section)
}

// ---------------------------------------------------------------- blanks
const blankKey = (paragraphId, blankId) => `${paragraphId}:${blankId}`

function allBlankEls() {
  return [...document.querySelectorAll('.tp-blank')]
}

function focusBlank(el) {
  if (!el) return
  el.focus({ preventScroll: true })
  el.scrollIntoView({ block: 'center', behavior: 'smooth' })
  // Caret to the end of whatever is already there.
  const range = document.createRange()
  range.selectNodeContents(el)
  range.collapse(false)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

function Blank({ id, where, blank, value, status, flagged, onChange }) {
  const ref = useRef(null)

  // Sync store -> DOM only when they disagree (reset, other tab). While
  // typing they always agree, so the caret is never disturbed.
  useLayoutEffect(() => {
    const el = ref.current
    if (el && el.textContent !== value) el.textContent = value
  }, [value])

  function onInput(e) {
    const el = e.currentTarget
    // Emptied spans can keep a stray <br>, which would break the line.
    if (!el.textContent && el.firstChild) el.replaceChildren()
    onChange(el.textContent)
  }

  function onKeyDown(e) {
    if (e.key !== 'Enter') return
    e.preventDefault()
    const all = allBlankEls()
    const next = all[all.indexOf(e.currentTarget) + 1]
    if (next) focusBlank(next)
    else e.currentTarget.blur()
  }

  function onPaste(e) {
    // One line of plain text, whatever was copied.
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain').replace(/\s+/g, ' ')
    document.execCommand('insertText', false, text)
  }

  return (
    <span
      ref={ref}
      className={`tp-blank tp-blank--${status} ${flagged ? 'is-flagged' : ''} ${value ? '' : 'is-empty'}`}
      contentEditable="plaintext-only"
      role="textbox"
      tabIndex={0}
      aria-label={`${where} ${blank.label}, ${blank.words.label} words`}
      data-key={id}
      data-placeholder={`${blank.label} · ${blank.words.label}`}
      spellCheck
      autoCapitalize="off"
      enterKeyHint="next"
      onInput={onInput}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
    />
  )
}

// ---------------------------------------------------------------- pieces
function Meter({ value, words, className = '' }) {
  const status = statusOf(value, words)
  const pct = Math.min(100, (value / words.max) * 100)
  return (
    <div className={`tp-bar tp-bar--${status} ${className}`} aria-hidden="true">
      <span style={{ width: `${pct}%` }} />
      <i style={{ left: `${(words.min / words.max) * 100}%` }} />
    </div>
  )
}

function Count({ value, words }) {
  const status = statusOf(value, words)
  return (
    <span className={`tp-count tp-count--${status}`} title={STATUS_WORD[status]}>
      <b>{value}</b> / {words.label}
    </span>
  )
}

function FormulaWord({ section }) {
  const deck = section?.deck
  if (!deck?.formula?.word) return null
  return (
    <span className="wt-section__word" aria-hidden="true">
      {[...deck.formula.word].map((ch, k) => (
        <span key={k} className={`tone-${deck.families[k]?.tone}`}>
          {ch}
        </span>
      ))}
    </span>
  )
}

function Paragraph({ template, paragraph, index, draft, checks, sectionRef }) {
  const section = sectionOf(paragraph)
  const blanks = blanksOf(paragraph)
  const stats = paragraphStats(paragraph, draft)
  const tone = TONES[index % TONES.length]
  const totalStatus = statusOf(stats.shown, paragraph.total)
  const title = [section?.label || paragraph.id, paragraph.label].filter(Boolean).join(' · ')

  return (
    <section ref={sectionRef} className={`tp-para tone-${tone}`} aria-label={title}>
      <h2 className="wt-section tp-para__head">
        <FormulaWord section={section} />
        <span className="wt-section__label">{title}</span>
      </h2>

      <div className="tp-stage">
        <p className="tp-text">
          {paragraph.parts.map((part, i) => {
            if (typeof part === 'string') return <span key={i}>{part}</span>
            const value = draft?.[part.id] || ''
            return (
              <Blank
                key={part.id}
                id={blankKey(paragraph.id, part.id)}
                where={section?.label || paragraph.id}
                blank={part}
                value={value}
                status={statusOf(countWords(value), part.words)}
                flagged={warningsFor(part, value).some((w) => w.hits)}
                onChange={(text) => setBlank(template.type, paragraph.id, part.id, text)}
              />
            )
          })}
        </p>
        <div className="tp-total">
          <span className="tp-total__label">Paragraph</span>
          <Count value={stats.shown} words={paragraph.total} />
          <Meter value={stats.shown} words={paragraph.total} className="tp-bar--stage" />
          <span className="tp-total__note">
            {stats.fixed} template words + {stats.typed} yours
            {totalStatus !== 'empty' && ` · ${STATUS_WORD[totalStatus]}`}
          </span>
        </div>
      </div>

      <div className="tp-panel">
        <ul className="tp-meters">
          {blanks.map((b) => {
            const text = draft?.[b.id] || ''
            const n = countWords(text)
            const warnings = warningsFor(b, text)
            return (
              <li key={b.id} className="tp-meter">
                <button
                  type="button"
                  className="tp-meter__top"
                  onClick={() => focusBlank(document.querySelector(`[data-key="${blankKey(paragraph.id, b.id)}"]`))}
                >
                  <span className="tp-meter__label">{b.label}</span>
                  <Count value={n} words={b.words} />
                </button>
                <Meter value={n} words={b.words} />
                <p className="tp-meter__hint">{b.hint}</p>
                {warnings.map((w, k) => (
                  <p key={k} className="tp-warn" role="status">
                    <Icon name="alert" size={14} />
                    <span>
                      {w.hits && <b>{w.hits.map((h) => `“${h}”`).join(', ')} — </b>}
                      {w.message}
                    </span>
                  </p>
                ))}
              </li>
            )
          })}
        </ul>

        <div className="tp-checks">
          <p className="tp-checks__title">Checklist</p>
          <ul>
            {paragraph.checklist.map((c) => (
              <li key={c.id}>
                <label className={`tp-check ${checks?.[c.id] ? 'is-on' : ''}`}>
                  <input
                    type="checkbox"
                    checked={!!checks?.[c.id]}
                    onChange={() => toggleCheck(template.type, paragraph.id, c.id)}
                  />
                  <span>
                    <strong>{c.title}</strong> {c.text}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- screens
export function TemplateScreen({ skill, type }) {
  const template = findTemplate(type)
  const { drafts, checks } = useTemplateDrafts()
  const paraRefs = useRef([])

  if (!template) return <TemplatesIndex skill={skill} />

  const draft = drafts[template.type] || {}
  const tick = checks[template.type] || {}
  const total = essayWords(template, drafts)

  function onReset() {
    if (window.confirm(`Reset the ${template.label} template? This clears every blank and checklist tick on this device.`)) {
      resetTemplate(template.type)
    }
  }

  const back = templates.length > 1 ? `/${skill.id}/templates` : `/${skill.id}`

  return (
    <div className="screen tp">
      <TopBar title={`${template.label} template`} back={back} />
      <main className="tp__main">
        <div className="tp-essay">
          <div className="tp-essay__row">
            <span className="tp-essay__label">Essay</span>
            <Count value={total} words={template.essayTotal} />
            <span className="tp-essay__unit">words</span>
          </div>
          <Meter value={total} words={template.essayTotal} />
          <div className="tp-jump">
            {template.paragraphs.map((p, i) => {
              const n = paragraphStats(p, draft[p.id]).shown
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`tp-jump__chip tp-jump__chip--${statusOf(n, p.total)} tone-${TONES[i % TONES.length]}`}
                  onClick={() => paraRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <span aria-label={sectionOf(p)?.label}>{sectionOf(p)?.deck?.formula?.word || sectionOf(p)?.label || p.id}</span>
                  <b>{n}</b>
                </button>
              )
            })}
          </div>
        </div>

        <p className="tp-intro">
          Tap a gold blank and type — the sentence builds around you. <b>Enter</b> jumps to the next blank. Your draft
          saves on this device as you go.
        </p>

        {template.paragraphs.map((p, i) => (
          <Paragraph
            key={p.id}
            template={template}
            paragraph={p}
            index={i}
            draft={draft[p.id]}
            checks={tick[p.id]}
            sectionRef={(el) => {
              paraRefs.current[i] = el
            }}
          />
        ))}

        <button type="button" className="vx-reset tp-reset" onClick={onReset}>
          Reset this template
        </button>
      </main>
    </div>
  )
}

export function TemplatesIndex({ skill }) {
  const { drafts } = useTemplateDrafts()
  return (
    <div className="screen tp">
      <TopBar title="Templates" back={`/${skill.id}`} />
      <main className="tp__main">
        <p className="tp-intro">Word-for-word fill-in-the-blank templates, one per essay type.</p>
        {templates.map((t) => (
          <TemplateEntry key={t.type} skill={skill} template={t} words={essayWords(t, drafts)} />
        ))}
      </main>
    </div>
  )
}

/** Dark/gold call-to-action, used on the Writing screen and the index. */
export function TemplateEntry({ skill, template, words, title }) {
  return (
    <button
      type="button"
      className="tp-entry"
      onClick={() => navigate(`/${skill.id}/templates/${template.type}`)}
    >
      <span className="tp-entry__icon">
        <Icon name="pen" size={22} />
      </span>
      <span className="tp-entry__body">
        <span className="tp-entry__eyebrow">{title || 'Fill-in-the-blank'}</span>
        <strong>{template.label} template</strong>
        <span className="tp-entry__meta">
          {words ? `${words} / ${template.essayTotal.label} words drafted` : template.subtitle}
        </span>
      </span>
      <Icon name="next" size={20} />
    </button>
  )
}

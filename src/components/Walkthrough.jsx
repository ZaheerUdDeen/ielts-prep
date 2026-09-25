// Type-driven Writing walkthrough (the main content of #/writing).
//
// 1. The user taps the intro deck's first family (Spot) and picks one of its
//    tactics — each Spot tactic IS an essay type (S1 Opinion … S5 Two-part).
// 2. Every later family (rest of STAR, then CASE, PAIR, SEAL) becomes one step
//    of a linear accordion, filtered for that type.
//
// Nothing here is hand-written per type: the filtering reads two additive
// fields in the deck data files —
//   tactic.type           Spot tactics only: the essay-type key that tactic is.
//   visual.rows[].type    Grid rows that describe one essay type. The step
//                         surfaces only the selected type's row.
//   tactic.appliesToType  The tactic only applies to that one type; any other
//                         type sees it as a "skip" line.
// Type keys: 'opinion' | 'discussion' | 'adv-dis' | 'problem-solution' | 'two-part'.
//
// The one rule not expressible as a field: if the chosen Spot tactic's intro
// shape contains a `hold` block ("No answer yet", Two-part), the intro's
// Assert family gets a caveat — there is no stance to assert yet.
import { useEffect, useRef, useState } from 'react'
import { cardKey } from '../data/catalog.js'
import { Icon } from './Icons.jsx'
import { Marked } from './Marked.jsx'

const MARK_WORD = { yes: 'Yes', no: 'No', opt: 'Optional' }

const deckHref = (skillId, sectionId, tacticId) => `#/${skillId}/${sectionId}/deck?start=${tacticId}`

const typeRows = (t) => (t.visual?.rows || []).filter((r) => r.type)

/** Resolve one family for the selected type into renderable items. */
function resolveFamily(section, family, spot, labels) {
  const type = spot.type
  const all = section.deck.tactics
  const tactics = all.filter((t) => t.family === family.id)
  const rowTacticInFamily = tactics.find((t) => typeRows(t).length)
  let varies = false

  const items = tactics.map((t) => {
    if (t.appliesToType) {
      varies = true
      if (t.appliesToType === type) return { kind: 'tactic', t, forYou: true }
      return { kind: 'skip', t, only: labels[t.appliesToType], seeAlso: rowTacticInFamily }
    }
    const rows = typeRows(t)
    if (rows.length) {
      varies = true
      const row = rows.find((r) => r.type === type)
      if (row) return { kind: 'tactic', t, row }
      return { kind: 'skip', t, only: rows.map((r) => r.label).join(' and '), plain: section.id === 'conclusion' }
    }
    return { kind: 'tactic', t }
  })

  // Every tactic in this family is for some other type (PAIR's Answer for,
  // say, Discussion): collapse them into one pointer at the section's own
  // type table, which says what this paragraph's job is for the chosen type.
  if (items.length && items.every((i) => i.kind === 'skip')) {
    const table = all.find((t) => typeRows(t).some((r) => r.type === type))
    const row = table && typeRows(table).find((r) => r.type === type)
    return {
      varies,
      items: [{ kind: 'pointer', skipped: items, table, row }],
    }
  }

  let caveat = null
  if (section.id === 'intro' && family.id === 'A' && spot.visual?.blocks?.some((b) => b.kind === 'hold')) {
    varies = true
    caveat = spot
    items.forEach((i) => {
      if (i.kind === 'tactic') i.dim = true
    })
  }

  return { varies, caveat, items }
}

function RowCallout({ tactic, row, typeLabel }) {
  const head = tactic.visual.head || []
  const what = head[0]?.includes('·') ? head[0].split('·')[1].trim() : head[0]
  return (
    <div className="wt-row">
      <span className="wt-row__eyebrow">
        <Icon name="star" size={12} filled /> {typeLabel}
        {what ? ` · ${what}` : ''}
      </span>
      <Marked as="p" text={row.text} className="wt-row__text" />
      {row.mark && head[1] && (
        <span className={`wt-row__mark wt-row__mark--${row.mark}`}>
          {head[1]} {MARK_WORD[row.mark]}
        </span>
      )}
      {row.note && <span className="wt-row__note">{row.note}</span>}
    </div>
  )
}

function CardLink({ href, children = 'View full card' }) {
  return (
    <a className="wt-link" href={href}>
      {children} <Icon name="next" size={14} />
    </a>
  )
}

function TacticItem({ item, href, known, typeLabel }) {
  const { t, row, forYou, dim } = item
  return (
    <li className={`wt-tactic ${dim ? 'is-dim' : ''}`}>
      <div className="wt-tactic__top">
        <span className={`wt-id ${known ? 'is-known' : ''}`}>{t.id}</span>
        <span className={`wt-pol wt-pol--${t.polarity}`} aria-label={t.polarity === 'do' ? 'Do' : "Don't"}>
          <Icon name={t.polarity === 'do' ? 'check' : 'cross'} size={12} />
        </span>
        {forYou && <span className="wt-tag wt-tag--you">Just for {typeLabel}</span>}
      </div>
      <strong className="wt-tactic__title">{t.title}</strong>
      <p className="wt-tactic__hook">{t.hook}</p>
      {row && <RowCallout tactic={t} row={row} typeLabel={typeLabel} />}
      <CardLink href={href} />
    </li>
  )
}

function SkipItem({ item, href, typeLabel }) {
  const { t, only, seeAlso, plain } = item
  return (
    <li className="wt-skip">
      <span className="wt-id">{t.id}</span>
      <span className="wt-skip__body">
        <span className="wt-skip__title">{t.title}</span>
        <span className="wt-skip__why">
          Skip for {typeLabel} — only for {only}.
          {seeAlso && ` See ${seeAlso.id} for your type.`}
          {plain && ` For ${typeLabel}, a plain restatement is enough.`}
        </span>
        <a className="wt-link wt-link--small" href={href}>
          View card <Icon name="next" size={12} />
        </a>
      </span>
    </li>
  )
}

function PointerItem({ item, skill, section, typeLabel, labels }) {
  const { skipped, table, row } = item
  return (
    <li className="wt-pointer">
      <p className="wt-pointer__why">
        No card here applies to {typeLabel}:{' '}
        {skipped.map((s, i) => (
          <span key={s.t.id}>
            {i > 0 && ', '}
            <a href={deckHref(skill.id, section.id, s.t.id)}>{s.t.id}</a> is {labels[s.t.appliesToType]} only
          </span>
        ))}
        .
      </p>
      {table && row && (
        <>
          <p className="wt-pointer__lead">
            Your job here comes from <strong>{table.id}</strong> ({table.title}):
          </p>
          <RowCallout tactic={table} row={row} typeLabel={typeLabel} />
          <CardLink href={deckHref(skill.id, section.id, table.id)}>View {table.id}</CardLink>
        </>
      )}
    </li>
  )
}

export function Walkthrough({ skill, mastered }) {
  const [spotId, setSpotId] = useState(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [open, setOpen] = useState(0) // index of the expanded step, -1 = none
  const [reached, setReached] = useState(0) // furthest step reached
  const stepRefs = useRef([])
  const scrollTarget = useRef(null)

  // After Next / tapping a step, bring the newly opened step to the top.
  useEffect(() => {
    const i = scrollTarget.current
    if (i == null) return
    scrollTarget.current = null
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    stepRefs.current[i]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }, [open, spotId])

  // The first section's first family is the type picker (Spot).
  const intro = skill.sections[0]
  if (!intro?.deck) return null
  const spotFamily = intro.deck.families[0]
  const spots = intro.deck.tactics.filter((t) => t.family === spotFamily.id && t.type)
  const labels = Object.fromEntries(spots.map((t) => [t.type, t.title]))
  const spot = spots.find((t) => t.id === spotId)

  // Every family after Spot, in section order, is one step.
  const steps = []
  if (spot) {
    skill.sections.forEach((section) => {
      if (!section.deck) return
      section.deck.families.forEach((family) => {
        if (section === intro && family === spotFamily) return
        steps.push({ section, family, ...resolveFamily(section, family, spot, labels) })
      })
    })
  }

  function pick(id) {
    setSpotId(id)
    setPickerOpen(false)
    setOpen(0)
    setReached(0)
  }

  function goTo(i) {
    setOpen(i)
    setReached((r) => Math.max(r, i))
    scrollTarget.current = i
  }

  function changeType() {
    setSpotId(null)
    setPickerOpen(true)
  }

  const spotHref = spot && deckHref(skill.id, intro.id, spot.id)

  return (
    <section className="wt" aria-label="Essay walkthrough">
      {!spot && (
        <div className={`wt-spot tone-${spotFamily.tone} ${pickerOpen ? 'is-open' : ''}`}>
          <button
            type="button"
            className="wt-spot__btn"
            aria-expanded={pickerOpen}
            onClick={() => setPickerOpen((o) => !o)}
          >
            <span className="wt-letter">{spotFamily.star.letter}</span>
            <span className="wt-spot__text">
              <strong>{spotFamily.star.word}</strong>
              <span>{spotFamily.star.action} — tap to start</span>
            </span>
            <Icon name="next" size={20} />
          </button>
          {pickerOpen && (
            <div className="wt-spot__panel">
              <p className="wt-spot__tip">{spotFamily.tip}</p>
              <div className="wt-types" role="group" aria-label="Essay type">
                {spots.map((t) => (
                  <button key={t.id} type="button" className="wt-type" onClick={() => pick(t.id)}>
                    <span className="wt-type__id">{t.id}</span>
                    <span className="wt-type__body">
                      <strong>{t.title}</strong>
                      <Marked text={t.example.text} className="wt-type__cue" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {spot && (
        <>
          <div className={`wt-current tone-${spotFamily.tone}`}>
            <div className="wt-current__row">
              <span className="wt-letter wt-letter--sm">
                <Icon name="check" size={16} />
              </span>
              <span className="wt-current__text">
                <span>Your essay type</span>
                <strong>{spot.title}</strong>
              </span>
              <button type="button" className="wt-change" onClick={changeType}>
                Change
              </button>
            </div>
            <div className="wt-current__meter" aria-hidden="true">
              <span style={{ width: `${((reached + 1) / steps.length) * 100}%` }} />
            </div>
          </div>

          <div className={`wt-spotted tone-${spotFamily.tone}`}>
            <span className="wt-spotted__eyebrow">
              {spotFamily.star.letter} · {spotFamily.star.word} ✓ · {spot.id}
            </span>
            <p className="wt-spotted__hook">{spot.hook}</p>
            <p className="wt-spotted__shape">
              Intro shape: {spot.visual.blocks.map((b) => b.label).join(' + ')}
            </p>
            <CardLink href={spotHref} />
          </div>

          <ol className="wt-steps">
            {steps.map((s, i) => {
              const firstOfSection = i === 0 || steps[i - 1].section !== s.section
              const isOpen = open === i
              const done = i < reached
              const typeLabel = spot.title
              const next = steps[i + 1]
              return (
                <li key={`${s.section.id}:${s.family.id}`} className="wt-step-wrap">
                  {firstOfSection && (
                    <h2 className="wt-section">
                      <span className="wt-section__word" aria-hidden="true">
                        {[...(s.section.deck.formula?.word || '')].map((ch, k) => (
                          <span key={k} className={`tone-${s.section.deck.families[k]?.tone}`}>
                            {ch}
                          </span>
                        ))}
                      </span>
                      <span className="wt-section__label">{s.section.label}</span>
                    </h2>
                  )}
                  <div
                    ref={(el) => {
                      stepRefs.current[i] = el
                    }}
                    className={`wt-step tone-${s.family.tone} ${isOpen ? 'is-open' : ''} ${
                      i > reached ? 'is-ahead' : ''
                    }`}
                  >
                    <button
                      type="button"
                      className="wt-step__head"
                      aria-expanded={isOpen}
                      onClick={() => (isOpen ? setOpen(-1) : goTo(i))}
                    >
                      <span className="wt-letter">{s.family.star.letter}</span>
                      <span className="wt-step__titles">
                        <strong>{s.family.star.action}</strong>
                        <span className={`wt-tag ${s.varies ? 'wt-tag--varies' : ''}`}>
                          {s.varies ? `Changes for ${typeLabel}` : 'Same for every essay type'}
                        </span>
                      </span>
                      {done && !isOpen && (
                        <span className="wt-step__done" aria-label="Done">
                          <Icon name="check" size={14} />
                        </span>
                      )}
                    </button>

                    {isOpen && (
                      <div className="wt-step__body">
                        <p className="wt-step__tip">{s.family.tip}</p>
                        {s.caveat && (
                          <div className="wt-caveat">
                            <strong>Not the normal way for {typeLabel}.</strong> {s.caveat.id} says: “
                            {s.caveat.hook}” — the intro previews without answering, so there’s no decisive position
                            to assert at this stage.
                          </div>
                        )}
                        <ul className="wt-items">
                          {s.items.map((item, k) => {
                            if (item.kind === 'pointer') {
                              return (
                                <PointerItem
                                  key={k}
                                  item={item}
                                  skill={skill}
                                  section={s.section}
                                  typeLabel={typeLabel}
                                  labels={labels}
                                />
                              )
                            }
                            const href = deckHref(skill.id, s.section.id, item.t.id)
                            if (item.kind === 'skip') {
                              return <SkipItem key={item.t.id} item={item} href={href} typeLabel={typeLabel} />
                            }
                            return (
                              <TacticItem
                                key={item.t.id}
                                item={item}
                                href={href}
                                typeLabel={typeLabel}
                                known={!!mastered[cardKey(skill.id, s.section.id, item.t.id)]}
                              />
                            )
                          })}
                        </ul>
                        <div className="wt-step__foot">
                          <span className="wt-step__count">
                            Step {i + 1} of {steps.length}
                          </span>
                          {next ? (
                            <button type="button" className="btn btn--primary wt-next" onClick={() => goTo(i + 1)}>
                              {next.section !== s.section ? `${next.section.label}: ` : ''}
                              {next.family.star.word} <Icon name="next" size={18} />
                            </button>
                          ) : (
                            <button type="button" className="btn btn--ghost wt-next" onClick={changeType}>
                              Try another type
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </>
      )}
    </section>
  )
}

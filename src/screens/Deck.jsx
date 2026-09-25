// Swipeable card deck. Native CSS scroll-snap gives smooth, momentum-based
// touch swiping with zero dependencies; arrow buttons + keyboard for desktop.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cardKey } from '../data/catalog.js'
import { navigate } from '../lib/router.js'
import { useMastery } from '../lib/mastery.js'
import { TopBar } from '../components/Chrome.jsx'
import { Icon } from '../components/Icons.jsx'
import { TacticCard, FormulaCard, KnownToggle } from '../components/TacticCard.jsx'

export function Deck({ skill, section, params }) {
  const { families, tactics, formula } = section.deck
  const { mastered, toggle } = useMastery()
  const keyOf = (t) => cardKey(skill.id, section.id, t.id)
  const back = `/${skill.id}/${section.id}`

  // Freeze the card list on entry so marking a card "known" during a
  // "still learning" review doesn't yank it out from under your thumb.
  const [cards] = useState(() => {
    if (params.get('mode') === 'learning') {
      const rest = tactics.filter((t) => !mastered[keyOf(t)])
      if (rest.length) return rest
    }
    return tactics
  })
  // Slides = optional formula anchor card (position 0, no mastery) + tactic
  // cards. `cards` stays tactics-only so every count/denominator excludes it.
  const slides = formula ? [formula, ...cards] : cards
  const [startIndex] = useState(() => Math.max(0, slides.findIndex((t) => t.id === params.get('start'))))
  const [index, setIndex] = useState(startIndex)
  const indexRef = useRef(startIndex)
  const trackRef = useRef(null)
  const slideCount = slides.length + 1 // + completion slide

  const familyById = Object.fromEntries(families.map((f) => [f.id, f]))

  useLayoutEffect(() => {
    const el = trackRef.current
    el.scrollLeft = startIndex * el.clientWidth
  }, [startIndex])

  // keep the current card in place when the viewport resizes / rotates
  useEffect(() => {
    const onResize = () => {
      const el = trackRef.current
      if (el) el.scrollLeft = indexRef.current * el.clientWidth
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onScroll = () => {
    const el = trackRef.current
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== indexRef.current) {
      indexRef.current = i
      setIndex(i)
    }
  }

  const goTo = useCallback(
    (i) => {
      const el = trackRef.current
      const clamped = Math.max(0, Math.min(slideCount - 1, i))
      el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
    },
    [slideCount],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goTo(indexRef.current + 1)
      else if (e.key === 'ArrowLeft') goTo(indexRef.current - 1)
      else if (e.key === 'Escape') navigate(back)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, back])

  const knownInDeck = cards.filter((t) => mastered[keyOf(t)]).length
  const current = slides[index]
  const onDone = index >= slides.length
  const onFormula = current?.type === 'formula'
  const cardNo = onDone ? cards.length : cards.indexOf(current) + 1

  return (
    <div className="screen screen--deck">
      <TopBar
        title={section.label}
        back={back}
        right={
          <span className="counter">
            {onFormula ? (
              <Icon name="star" size={16} filled className="counter__star" />
            ) : (
              <>
                {cardNo}/{cards.length}
              </>
            )}
          </span>
        }
      />

      {/* progress strip, grouped + coloured by tactic family */}
      <nav className="strip" aria-label="Cards">
        {formula && (
          <button
            type="button"
            className={`strip__formula ${index === 0 ? 'is-current' : ''}`}
            onClick={() => goTo(0)}
            aria-label={`${formula.word}: ${formula.title}`}
            aria-current={index === 0 || undefined}
          >
            <Icon name="star" size={12} filled />
          </button>
        )}
        {families.map((f) => {
          const inFam = slides.map((t, i) => [t, i]).filter(([t]) => t.family === f.id)
          if (!inFam.length) return null
          return (
            <div key={f.id} className={`strip__group tone-${f.tone}`} style={{ '--n': inFam.length }}>
              {inFam.map(([t, i]) => (
                <button
                  key={t.id}
                  type="button"
                  className={`strip__dot ${i === index ? 'is-current' : ''} ${mastered[keyOf(t)] ? 'is-known' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`${t.id}: ${t.title}`}
                  aria-current={i === index || undefined}
                />
              ))}
            </div>
          )
        })}
      </nav>

      <div className="track" ref={trackRef} onScroll={onScroll}>
        {formula && (
          <section className="slide" key={formula.id}>
            <FormulaCard formula={formula} families={families} />
          </section>
        )}
        {cards.map((t) => {
          const fam = familyById[t.family]
          const famCards = cards.filter((c) => c.family === t.family)
          return (
            <section className="slide" key={t.id}>
              <TacticCard
                tactic={t}
                family={fam}
                familyIndex={famCards.indexOf(t)}
                familySize={famCards.length}
                known={!!mastered[keyOf(t)]}
              />
            </section>
          )
        })}
        <section className="slide">
          <div className="card card--done">
            <div className="done">
              <div className="done__icon">
                <Icon name="star" size={44} filled />
              </div>
              <h2>Deck complete</h2>
              <p>
                {knownInDeck} of {cards.length} marked known
              </p>
              <div className="done__actions">
                <button type="button" className="btn btn--primary" onClick={() => goTo(0)}>
                  Go again
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => navigate(back)}>
                  Back to overview
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="deck-nav">
        <button type="button" className="nav-btn" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous card">
          <Icon name="prev" />
        </button>
        {onFormula ? (
          <span className="deck-nav__hint">Swipe to start</span>
        ) : current ? (
          <KnownToggle
            known={!!mastered[keyOf(current)]}
            onToggle={() => toggle(keyOf(current))}
            label={current.id}
          />
        ) : (
          <span className="deck-nav__hint">Done</span>
        )}
        <button
          type="button"
          className="nav-btn nav-btn--next"
          onClick={() => goTo(index + 1)}
          disabled={onDone}
          aria-label="Next card"
        >
          <Icon name="next" />
        </button>
      </div>
    </div>
  )
}

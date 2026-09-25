// Swipeable card deck. Native CSS scroll-snap gives smooth, momentum-based
// touch swiping with zero dependencies; arrow buttons + keyboard for desktop.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cardKey } from '../data/catalog.js'
import { navigate } from '../lib/router.js'
import { useMastery } from '../lib/mastery.js'
import { TopBar } from '../components/Chrome.jsx'
import { Icon } from '../components/Icons.jsx'
import { TacticCard, KnownToggle } from '../components/TacticCard.jsx'

export function Deck({ skill, section, params }) {
  const { families, tactics } = section.deck
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
  const [startIndex] = useState(() => Math.max(0, cards.findIndex((t) => t.id === params.get('start'))))
  const [index, setIndex] = useState(startIndex)
  const indexRef = useRef(startIndex)
  const trackRef = useRef(null)
  const slideCount = cards.length + 1 // + completion slide

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
  const current = cards[index]
  const onDone = index >= cards.length

  return (
    <div className="screen screen--deck">
      <TopBar
        title={section.label}
        back={back}
        right={
          <span className="counter">
            {onDone ? cards.length : index + 1}/{cards.length}
          </span>
        }
      />

      {/* progress strip, grouped + coloured by tactic family */}
      <nav className="strip" aria-label="Cards">
        {families.map((f) => {
          const inFam = cards.map((t, i) => [t, i]).filter(([t]) => t.family === f.id)
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
        {current ? (
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

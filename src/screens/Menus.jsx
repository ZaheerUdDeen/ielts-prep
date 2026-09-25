// Home (skills), Skill (formula sentence + type-driven walkthrough) and Section overview screens.
import { skills, cardKey } from '../data/catalog.js'
import { navigate } from '../lib/router.js'
import { useMastery } from '../lib/mastery.js'
import { TopBar, Tile, ProgressRing } from '../components/Chrome.jsx'
import { Icon } from '../components/Icons.jsx'
import { Walkthrough } from '../components/Walkthrough.jsx'

function countKnown(skillId, section, mastered) {
  if (!section.deck) return 0
  return section.deck.tactics.filter((t) => mastered[cardKey(skillId, section.id, t.id)]).length
}

export function Home() {
  return (
    <div className="screen">
      <header className="hero">
        <p className="hero__eyebrow">IELTS Prep</p>
        <h1 className="hero__title">Tactic cards</h1>
        <p className="hero__sub">Swipe. Glance. Remember.</p>
      </header>
      <main className="grid grid--2">
        {skills.map((s, i) => (
          <Tile
            key={s.id}
            label={s.label}
            icon={s.icon}
            disabled={!s.enabled}
            accent={`skill-${i}`}
            onClick={() => navigate(`/${s.id}`)}
          />
        ))}
      </main>
    </div>
  )
}

// Fixed prose around the four section formula words (read from each deck).
const FORMULA_PROSE = ['Reach for a ', ', build your ', ', find its ', ', and ', ' the deal.']

function FormulaSentence({ skill }) {
  return (
    <p className="formula-line">
      {FORMULA_PROSE.map((text, i) => {
        const section = skill.sections[i]
        const word = section && (section.deck?.formula?.word || section.label)
        return (
          <span key={i}>
            {text}
            {word && (
              <a className="formula-line__word" href={`#/${skill.id}/${section.id}`} aria-label={`${word}: ${section.label}`}>
                {[...word].map((ch, k) => (
                  <span key={k} className={`tone-${section.deck?.families[k]?.tone || 'none'}`}>
                    {ch}
                  </span>
                ))}
              </a>
            )}
          </span>
        )
      })}
    </p>
  )
}

export function SkillScreen({ skill }) {
  const { mastered } = useMastery()
  return (
    <div className="screen">
      <TopBar title={skill.label} back="/" />
      <main className="skill">
        <FormulaSentence skill={skill} />
        <Walkthrough skill={skill} mastered={mastered} />
      </main>
    </div>
  )
}

export function SectionScreen({ skill, section }) {
  const { mastered } = useMastery()
  const base = `/${skill.id}/${section.id}`

  if (!section.deck) {
    return (
      <div className="screen">
        <TopBar title={section.label} back={`/${skill.id}`} />
        <main className="empty">
          <div className="empty__art" aria-hidden="true">
            <Icon name="cards" size={56} />
          </div>
          <h2>{section.label} cards are coming soon</h2>
          <p>Tactics for this section haven&rsquo;t been written yet. Check back after the next guide is added.</p>
          <button type="button" className="btn btn--ghost" onClick={() => navigate(`/${skill.id}`)}>
            Back to {skill.label}
          </button>
        </main>
      </div>
    )
  }

  const { families, tactics, formula } = section.deck
  const starred = families.filter((f) => f.star)
  const known = countKnown(skill.id, section, mastered)
  const learning = tactics.length - known

  return (
    <div className="screen">
      <TopBar title={section.label} back={`/${skill.id}`} />
      <main className="overview">
        <div className="overview__top">
          <ProgressRing value={known} total={tactics.length} />
          <div className="overview__actions">
            <button type="button" className="btn btn--primary" onClick={() => navigate(`${base}/deck`)}>
              Study all {tactics.length}
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              disabled={!learning}
              onClick={() => navigate(`${base}/deck?mode=learning`)}
            >
              {learning ? `Still learning (${learning})` : 'All mastered!'}
            </button>
          </div>
        </div>

        {formula && starred.length > 0 && (
          <button
            type="button"
            className="star-banner"
            onClick={() => navigate(`${base}/deck?start=${formula.id}`)}
            aria-label={`Open the ${formula.word} formula card`}
          >
            <span className="star-banner__icon">
              <Icon name="star" size={22} filled />
            </span>
            <span className="star-banner__body">
              <span className="star-banner__word" aria-hidden="true">
                {starred.map((f) => (
                  <span key={f.id} className={`tone-${f.tone}`}>
                    {f.star.letter}
                  </span>
                ))}
              </span>
              <span className="star-banner__chain">{starred.map((f) => f.star.word).join(' → ')}</span>
            </span>
            <Icon name="next" size={20} />
          </button>
        )}

        <ul className="families">
          {families.map((f) => {
            const items = tactics.filter((t) => t.family === f.id)
            return (
              <li key={f.id} className={`family tone-${f.tone}`}>
                <div className="family__head">
                  {f.star ? (
                    <span className="family__letter">{f.star.letter}</span>
                  ) : (
                    <span className="family__swatch" />
                  )}
                  <span className="family__titles">
                    <span className="family__name">{f.star ? f.star.action : f.name}</span>
                    {f.star && <span className="family__legacy">{f.name}</span>}
                  </span>
                </div>
                <p className="family__tip">{f.tip}</p>
                <div className="family__chips">
                  {items.map((t) => {
                    const isKnown = !!mastered[cardKey(skill.id, section.id, t.id)]
                    return (
                      <button
                        key={t.id}
                        type="button"
                        className={`chip ${isKnown ? 'chip--known' : ''}`}
                        onClick={() => navigate(`${base}/deck?start=${t.id}`)}
                        title={t.title}
                      >
                        {t.id}
                        {isKnown && <Icon name="star" size={11} filled />}
                      </button>
                    )
                  })}
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

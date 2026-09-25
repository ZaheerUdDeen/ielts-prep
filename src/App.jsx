import { useEffect } from 'react'
import { useRoute } from './lib/router.js'
import { findSkill, findSection } from './data/catalog.js'
import { Home, SkillScreen, SectionScreen } from './screens/Menus.jsx'
import { Deck } from './screens/Deck.jsx'

// Routes (hash-based):
//   #/                          Home
//   #/writing                   Skill -> sections
//   #/writing/intro             Section overview
//   #/writing/intro/deck        Card deck   (?start=T2  ?mode=learning)
export default function App() {
  const { parts, params } = useRoute()
  const [skillId, sectionId, view] = parts
  const skill = skillId && findSkill(skillId)
  const section = skill && sectionId && findSection(skillId, sectionId)
  const routeKey = parts.join('/') + '?' + params.toString()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [routeKey])

  if (!skill || !skill.enabled) return <Home />
  if (!sectionId || !section) return <SkillScreen skill={skill} />
  if (view === 'deck' && section.deck) {
    return <Deck key={routeKey} skill={skill} section={section} params={params} />
  }
  return <SectionScreen skill={skill} section={section} />
}

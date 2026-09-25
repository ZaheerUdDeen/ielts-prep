// App catalog: skills -> sections -> decks.
// To add a section's tactics later, create a data file shaped like
// `writing-intro-tactics.js` and assign it to `deck` below. That's it.

import writingIntro from './writing-intro-tactics.js'
import writingBody1 from './writing-body1-tactics.js'
import writingBody2 from './writing-body2-tactics.js'
import writingConclusion from './writing-conclusion-tactics.js'

export const skills = [
  {
    id: 'writing',
    label: 'Writing',
    icon: 'pen',
    enabled: true,
    sections: [
      { id: 'intro', label: 'Intro', subtitle: 'STAR formula', deck: writingIntro },
      { id: 'body1', label: 'Body 1', subtitle: 'CASE formula', deck: writingBody1 },
      { id: 'body2', label: 'Body 2', subtitle: 'PAIR formula', deck: writingBody2 },
      { id: 'conclusion', label: 'Conclusion', subtitle: 'SEAL formula', deck: writingConclusion },
    ],
  },
  { id: 'listening', label: 'Listening', icon: 'headphones', enabled: false, sections: [] },
  { id: 'reading', label: 'Reading', icon: 'book', enabled: false, sections: [] },
  { id: 'speaking', label: 'Speaking', icon: 'mic', enabled: false, sections: [] },
]

export function findSkill(skillId) {
  return skills.find((s) => s.id === skillId)
}

export function findSection(skillId, sectionId) {
  return findSkill(skillId)?.sections.find((s) => s.id === sectionId)
}

/** Namespaced key so S1 in Intro never collides with a future S1 in Body 1. */
export function cardKey(skillId, sectionId, tacticId) {
  return `${skillId}/${sectionId}:${tacticId}`
}

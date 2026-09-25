// App catalog: skills -> sections -> decks.
// To add a section's tactics later, create a data file shaped like
// `writing-intro-tactics.js` and assign it to `deck` below. That's it.

import writingIntro from './writing-intro-tactics.js'

export const skills = [
  {
    id: 'writing',
    label: 'Writing',
    icon: 'pen',
    enabled: true,
    sections: [
      { id: 'intro', label: 'Intro', subtitle: 'Paraphrase + position', deck: writingIntro },
      { id: 'body1', label: 'Body 1', subtitle: 'First argument', deck: null },
      { id: 'body2', label: 'Body 2', subtitle: 'Second argument', deck: null },
      { id: 'conclusion', label: 'Conclusion', subtitle: 'Land the position', deck: null },
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

/** Namespaced key so T11 in Intro never collides with a future T11 in Body 1. */
export function cardKey(skillId, sectionId, tacticId) {
  return `${skillId}/${sectionId}:${tacticId}`
}

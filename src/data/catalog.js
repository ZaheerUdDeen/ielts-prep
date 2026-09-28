// App catalog: skills -> sections -> decks.
// To add a section's tactics later, create a data file shaped like
// `writing-intro-tactics.js` and assign it to `deck` below. That's it.

import writingIntro from './writing-intro-tactics.js'
import writingBody1 from './writing-body1-tactics.js'
import writingConclusion from './writing-conclusion-tactics.js'
import writingFlow from './writing-flow-tactics.js'
import writingRich from './writing-rich-tactics.js'
import writingGrammar from './writing-grammar-tactics.js'

export const skills = [
  {
    id: 'writing',
    label: 'Writing',
    icon: 'pen',
    enabled: true,
    sections: [
      { id: 'intro', label: 'Intro', subtitle: 'STAR formula', deck: writingIntro },
      { id: 'body1', label: 'Body 1', subtitle: 'CASE formula', deck: writingBody1 },
      // Body 2 shares Body 1's CASE deck (PAIR retired: its template was
      // identical to CASE). Separate section = separate route and progress.
      // `pass: 2` tells the Walkthrough / overview to add the deck's
      // `secondParagraph` checks and E2's second-paragraph job.
      { id: 'body2', label: 'Body 2', subtitle: 'CASE — new angle', deck: writingBody1, pass: 2 },
      { id: 'conclusion', label: 'Conclusion', subtitle: 'SEAL formula', deck: writingConclusion },
      // Cross-cutting layers: no paragraph of their own, same for every essay
      // type. `layer: true` keeps them out of the per-type Walkthrough while
      // leaving them browsable like any other section.
      { id: 'flow', label: 'Flow', subtitle: 'FLOW formula', deck: writingFlow, layer: true },
      { id: 'lexical', label: 'Lexical', subtitle: 'RICH formula', deck: writingRich, layer: true },
      { id: 'grammar', label: 'Grammar', subtitle: 'SAVE formula', deck: writingGrammar, layer: true },
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

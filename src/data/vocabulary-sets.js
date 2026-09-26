// Combines the two vocabulary sources into one pool for the Vocabulary trainer,
// tagging each entry with `src` so the trainer can filter/label by set:
//   - "awl": Academic Word List (general academic English, grouped by sublist 1-10)
//   - "adv": IELTS Advanced Topics (Task 2 essay-topic collocations, grouped by topic)
import awl from './vocabulary.js'
import advanced, { TOPICS } from './vocabulary-advanced.js'

export const SETS = {
  awl: {
    id: 'awl',
    label: 'AWL',
    fullLabel: 'Academic Word List',
    groups: Array.from({ length: 10 }, (_, i) => String(i + 1)),
    groupLabel: (s) => `Sublist ${s}`,
    tagLabel: (s) => `AWL sublist ${s}`,
  },
  adv: {
    id: 'adv',
    label: 'IELTS Topics',
    fullLabel: 'IELTS Advanced Topics',
    groups: Object.keys(TOPICS),
    groupLabel: (s) => TOPICS[s],
    tagLabel: (s) => TOPICS[s],
  },
}

const vocabulary = [...awl.map((e) => ({ ...e, src: 'awl' })), ...advanced.map((e) => ({ ...e, src: 'adv' }))]

export default vocabulary

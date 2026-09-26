// Writing > Task 2 > Lexical Resource tactics (cross-cutting layer).
// Source: Obsidian note "Writing/Lexical-Guide.md".
//
// Job of RICH: word whatever STAR, CASE, PAIR and SEAL told you to write.
// Like FLOW, RICH has NO paragraph of its own — it runs underneath every
// paragraph at once, in every word choice. It does not vary by essay type, so
// none of these tactics carry `type` / `appliesToType` / typed grid rows, and
// the section is flagged `layer: true` in catalog.js so it stays out of the
// per-type Walkthrough on the Writing screen.
//
// MASTER FORMULA: RICH — Lexical Resource.
//   R  Replace   -> ids R1..R2 (no content word more than 4x; switch at the 3rd)
//   I  Improve   -> ids I1..I2 (word must fit the actual meaning and size)
//   C  Collocate -> ids C1..C2 (native pairings; safe pair when unsure)
//   H  Hold      -> ids H1..H2 (formal register: no contractions, you, filler)
// Array order below IS the deck order (R -> I -> C -> H), and each tactic's id
// starts with its RICH letter. Mastery keys are namespaced `writing/lexical:R1`
// (see cardKey in catalog.js), so RICH's R1 never collides with Intro's R1.
//
// Conventions are identical to `writing-intro-tactics.js` — read the comment
// block there. Summary:
//   [[double brackets]] highlight words in the family colour.
//   family.tone: 'teal' | 'violet' | 'amber' | 'rose'
//     (tones follow the guide's own assignment: R teal, I violet, C amber, H rose)
//   tactic.polarity: 'do' | 'dont'
//   tactic.visual.type: 'morph' | 'swap' | 'merge' | 'test' | 'dial' | 'blocks'
//     | 'banned' | 'contrast' | 'grid'   (renderers in src/components/Visual.jsx)

// Families are listed in RICH order. family.id is the RICH letter.
export const families = [
  {
    id: 'R',
    name: 'Repetition',
    tone: 'teal',
    star: { letter: 'R', word: 'Replace', action: 'Replace repeats' },
    tip: 'No content word more than 4 times. Swap it at the 3rd use, not in the proofread.',
  },
  {
    id: 'I',
    name: 'Precision',
    tone: 'violet',
    star: { letter: 'I', word: 'Improve', action: 'Improve precision' },
    tip: 'The word must match the actual meaning and size. Precise beats fancy.',
  },
  {
    id: 'C',
    name: 'Collocation',
    tone: 'amber',
    star: { letter: 'C', word: 'Collocate', action: 'Collocate correctly' },
    tip: 'Pair words the way native speakers pair them. If unsure, use the safe pair.',
  },
  {
    id: 'H',
    name: 'Register',
    tone: 'rose',
    star: { letter: 'H', word: 'Hold', action: 'Hold the register' },
    tip: 'Formal academic register throughout: no contractions, no “you”, no casual filler.',
  },
]

// Master-formula anchor card (deck position 0). Letters/actions come from
// `families[].star`, so they can never drift out of sync with the cards.
export const formula = {
  id: 'RICH',
  type: 'formula',
  word: 'RICH',
  title: 'The Lexical formula',
  why: 'Runs underneath every paragraph — not what claim you make, but how precisely you word it.',
}

export const tactics = [
  // ---------- R · Replace  Repetition ----------
  {
    id: 'R1',
    family: 'R',
    polarity: 'do',
    title: 'No content word more than 4 times',
    hook: 'Your range is already there — repetition, not a low ceiling, costs the marks.',
    visual: {
      type: 'grid',
      head: ['Overused · Use instead'],
      rows: [
        { label: 'positive', text: '[[beneficial]], constructive, valuable, advantageous' },
        { label: 'negative', text: '[[harmful]], detrimental, damaging, adverse' },
        { label: 'aim', text: '[[objective]], goal, purpose, priority' },
        { label: 'important', text: '[[significant]], crucial, vital, paramount' },
      ],
    },
    example: {
      label: 'Real failure · baseline essay',
      kind: 'fail',
      lines: [
        { tag: 'Counts', text: '[[positive]] ×14, [[aim]] ×13, [[negative]] ×10.' },
        { tag: 'Verdict', text: 'That alone holds Lexical Resource at [[6.0]] regardless of range elsewhere.' },
      ],
    },
  },
  {
    id: 'R2',
    family: 'R',
    polarity: 'do',
    title: 'Track it live, don’t wait for the proofread',
    hook: 'Keep a running count. At the 3rd use, switch to a synonym for the rest of the essay.',
    visual: {
      type: 'dial',
      left: 'Safe (1–2x)',
      middle: 'Flag it (3x)',
      right: 'Too late (5x+)',
    },
    example: {
      label: 'Real failure · Task 1 rewrite · LR 5.5',
      kind: 'fail',
      lines: [
        { tag: 'Counts', text: '[[improvement/improved]] ×8, [[accessibility]] ×7, [[access]] ×8.' },
        { tag: 'Lesson', text: 'A proofread can’t fix eight uses without rewriting half the essay. Switch [[while you draft]].' },
      ],
    },
  },

  // ---------- I · Improve  Precision ----------
  {
    id: 'I1',
    family: 'I',
    polarity: 'do',
    title: 'Fit the actual size, not just a fancier synonym',
    hook: 'A “sophisticated” word used wrongly costs more than a plain word used correctly.',
    visual: {
      type: 'morph',
      from: { text: 'marginal', label: 'means small' },
      to: { text: '[[substantial]]', label: 'fits a 67-point gap' },
    },
    example: {
      label: 'Real failure · Task 1 rewrite',
      kind: 'fail',
      lines: [
        { tag: 'Wrote', text: '[[marginal]] — for a 67-point gap, the largest fact in the table.' },
        { tag: 'Where', text: 'The overview sentence, which examiners [[weight most]].' },
        { tag: 'Use', text: '[[substantial]] · considerable · significant.' },
      ],
    },
  },
  {
    id: 'I2',
    family: 'I',
    polarity: 'do',
    title: 'Keep a confusable-pairs watch-list',
    hook: 'Spelled correctly and still wrong. Add a row every time one gets caught.',
    visual: {
      type: 'grid',
      head: ['Pair · Difference'],
      rows: [
        { label: 'affective / effective', text: 'affective = emotion · [[effective]] = produces the intended result' },
        { label: 'adapted / adopted', text: 'adapted = changed to fit · [[adopted]] = taken up and used' },
        { label: 'accessibility / access', text: 'accessibility = how easy to reach · [[access]] = the thing measured' },
        { label: 'marginal / substantial', text: 'marginal = small · [[substantial]] = large (see I1)' },
      ],
    },
  },

  // ---------- C · Collocate  Natural pairings ----------
  {
    id: 'C1',
    family: 'C',
    polarity: 'do',
    title: 'Pair words the way native speakers do',
    hook: 'Word-for-word translation gives pairings that are grammatical but sound wrong.',
    visual: {
      type: 'grid',
      head: ['✗ Translated → ✓ Natural collocation'],
      rows: [
        { label: '✗ make research', text: '→ [[conduct]] research' },
        { label: '✗ rise awareness', text: '→ [[raise]] awareness' },
        { label: '✗ arrive a conclusion', text: '→ [[reach]] a conclusion' },
      ],
    },
  },
  {
    id: 'C2',
    family: 'C',
    polarity: 'do',
    title: 'When unsure, pick the safe collocation',
    hook: 'A correct simple choice scores better than a broken complex one — applied to words.',
    visual: {
      type: 'test',
      question: 'Certain this high-level pairing is natural?',
      pass: 'Yes → use it',
      fail: 'Unsure → safe pair you know is correct',
    },
    example: {
      label: 'Safe pairs',
      text: '[[do]] research · [[increase]] awareness — beats a guessed fancy pairing.',
    },
  },

  // ---------- H · Hold  Formal register ----------
  {
    id: 'H1',
    family: 'H',
    polarity: 'dont',
    title: 'No contractions, no “you”',
    hook: 'Formal academic English throughout — your own Error-Fixes rule.',
    visual: {
      type: 'banned',
      phrase: '[[You]] [[don’t]] have to face traffic',
      badge: '’ · you',
    },
    example: {
      label: 'Instead',
      kind: 'fix',
      lines: [
        { text: '[[People]] do not have to face traffic' },
        { text: 'don’t / can’t / that’s / it’s → [[do not · cannot · that is · it is]]' },
        { tag: 'Check', text: 'Search for [[’]] and for the word [[you]]. Catch rate ~100%.' },
      ],
    },
  },
  {
    id: 'H2',
    family: 'H',
    polarity: 'dont',
    title: 'No casual filler words',
    hook: 'Replace everyday phrasing with its academic equivalent — both from your own essays.',
    visual: {
      type: 'banned',
      phrase: 'the [[looks]] of building · increasing [[day by day]]',
    },
    example: {
      label: 'Instead',
      kind: 'fix',
      lines: [{ text: 'the [[appearance]] of buildings' }, { text: 'increasing [[steadily]]' }],
    },
  },
]

export default { families, tactics, formula }

// Writing > Task 2 > Grammatical Range & Accuracy tactics (cross-cutting layer).
// Source: Obsidian note "Writing/Grammar-Guide.md", mined from "Error-Fixes.md"
// and the user's own graded practice essays.
//
// Job of SAVE: make every sentence STAR, CASE, PAIR and SEAL produced
// grammatically correct. Like FLOW and RICH, SAVE has NO paragraph of its own
// and does not vary by essay type, so none of these tactics carry `type` /
// `appliesToType` / typed grid rows, and the section is flagged `layer: true`
// in catalog.js so it stays out of the per-type Walkthrough.
// Unlike FLOW/RICH (tracked live while drafting), SAVE is a proofreading pass:
// run once over the whole essay after the last sentence, fastest check first.
//
// MASTER FORMULA: SAVE — Grammatical Range & Accuracy.
//   S  Subject  -> ids S1..S2 (subject-verb agreement: the it/they swap)
//   A  Article  -> ids A1..A2 (every singular noun needs a/an/the)
//   V  Verb     -> ids V1..V2 (verb form after its trigger: -ed, -ing, present)
//   E  Edit     -> ids E1..E2 (mechanics: missing verb, spelling, apostrophe)
// Array order below IS the deck order (S -> A -> V -> E), and each tactic's id
// starts with its SAVE letter. Mastery keys are namespaced `writing/grammar:S1`
// (see cardKey in catalog.js), so SAVE's S1 never collides with Intro's S1.
//
// Scope: register (contractions, "you", filler) belongs to RICH H1–H2, and
// "Whether X or Y" clause parallelism belongs to STAR T3 — not repeated here.
//
// Conventions are identical to `writing-intro-tactics.js` — read the comment
// block there. Summary:
//   [[double brackets]] highlight words in the family colour.
//   family.tone: 'teal' | 'violet' | 'amber' | 'rose'
//     (S teal, A violet, V amber, E rose — same slot order as every deck)
//   tactic.polarity: 'do' | 'dont'
//   tactic.visual.type: 'morph' | 'swap' | 'merge' | 'test' | 'dial' | 'blocks'
//     | 'banned' | 'contrast' | 'grid'   (renderers in src/components/Visual.jsx)

// Families are listed in SAVE order. family.id is the SAVE letter.
export const families = [
  {
    id: 'S',
    name: 'Agreement',
    tone: 'teal',
    star: { letter: 'S', word: 'Subject', action: 'Subject matches verb' },
    tip: 'Read verbs only. Swap each subject for it / they and say it aloud.',
  },
  {
    id: 'A',
    name: 'Articles',
    tone: 'violet',
    star: { letter: 'A', word: 'Article', action: 'Article on every noun' },
    tip: 'Every singular countable noun needs a / an / the. An adjective doesn’t count.',
  },
  {
    id: 'V',
    name: 'Verb forms',
    tone: 'amber',
    star: { letter: 'V', word: 'Verb', action: 'Verb form fits its trigger' },
    tip: 'The word before the verb decides its form: be → -ed, used to → -ing, until → present.',
  },
  {
    id: 'E',
    name: 'Mechanics',
    tone: 'rose',
    star: { letter: 'E', word: 'Edit', action: 'Edit the mechanics' },
    tip: 'A main verb in every sentence, your watch-list words, the owner’s apostrophe.',
  },
]

// Master-formula anchor card (deck position 0). Letters/actions come from
// `families[].star`, so they can never drift out of sync with the cards.
export const formula = {
  id: 'SAVE',
  type: 'formula',
  word: 'SAVE',
  title: 'The Grammar formula',
  why: 'One final pass over the whole essay, fastest check first — not what you argue, but whether every sentence is correct.',
}

export const tactics = [
  // ---------- S · Subject  Agreement ----------
  {
    id: 'S1',
    family: 'S',
    polarity: 'do',
    title: 'Swap the subject for it / they',
    hook: 'Your #1 error — 11 in one mock. Read the verbs only and say “it …” or “they …” aloud.',
    visual: {
      type: 'morph',
      from: { text: 'they [[needs]]', label: 'Consumers needs ✗' },
      to: { text: 'they [[need]]', label: 'Consumers need ✓' },
    },
    example: {
      label: 'Real failures · your essays',
      kind: 'fail',
      lines: [
        { tag: 'Wrote', text: 'how they [[looks]] a like → they [[look]]' },
        { tag: 'Wrote', text: 'Online shopping [[offer]] (×4) → it [[offers]]' },
        { tag: 'Wrote', text: 'the advantages [[outweighs]] → they [[outweigh]]' },
      ],
    },
  },
  {
    id: 'S2',
    family: 'S',
    polarity: 'do',
    title: 'Know the singular traps',
    hook: 'These subjects look plural or vague but take -s. Match the head noun, not the nearest one.',
    visual: {
      type: 'grid',
      head: ['Subject · Verb'],
      rows: [
        { label: 'This (…)', text: 'demonstrate[[s]] · show[[s]] — singular, always -s' },
        { label: '-ing subject', text: 'Online shopping offer[[s]] — one activity = it' },
        { label: 'X of Y', text: 'The advantages (of it) [[outweigh]] — agree with “advantages”' },
      ],
    },
    example: {
      label: 'Real failures · twice in two essays',
      kind: 'fail',
      lines: [
        { tag: 'Wrote', text: 'this … [[demonstrate]] → this … [[demonstrates]]' },
        { tag: 'Wrote', text: 'This [[show]] → This [[shows]]' },
      ],
    },
  },

  // ---------- A · Article  a / an / the ----------
  {
    id: 'A1',
    family: 'A',
    polarity: 'do',
    title: 'An adjective is not an article',
    hook: 'Every singular countable noun needs a word in front. The adjective hides the gap.',
    visual: {
      type: 'morph',
      from: { text: 'is widely debated issue', label: 'adjective, no article' },
      to: { text: 'is [[a]] widely debated issue', label: 'a / an / the first' },
    },
    example: {
      label: 'Real failures · recurring across essays',
      kind: 'fail',
      lines: [
        { tag: 'Wrote', text: 'huge burden → [[a]] huge burden' },
        { tag: 'Wrote', text: 'have focused personality → have [[a]] focused personality' },
        { tag: 'Wrote', text: 'getting job → getting [[a]] job' },
        { tag: 'Check', text: 'Find every singular noun. Word in front? If not, [[add one]].' },
      ],
    },
  },
  {
    id: 'A2',
    family: 'A',
    polarity: 'do',
    title: 'The for unique things and fixed phrases',
    hook: 'Four quick rules cover almost every case you have got wrong.',
    visual: {
      type: 'grid',
      head: ['Situation · Article'],
      rows: [
        { label: 'First mention', text: '[[a / an]] — mentioned again → [[the]]' },
        { label: 'Unique thing', text: '[[the]] internet · [[the]] government · [[the]] environment' },
        { label: 'Superlative / ordinal', text: '[[the]] highest · [[the]] first 10 years' },
        { label: 'Plural / uncountable, general', text: 'no article — students learn faster' },
      ],
    },
    example: {
      label: 'Real failures · Error-Fixes',
      kind: 'fail',
      lines: [
        { tag: 'Wrote', text: 'in longer run → in [[the]] long run' },
        { tag: 'Wrote', text: 'access to internet (×4) → access to [[the]] internet' },
        { tag: 'Wrote', text: 'in first 10 years → in [[the]] first 10 years' },
      ],
    },
  },

  // ---------- V · Verb  Form after the trigger ----------
  {
    id: 'V1',
    family: 'V',
    polarity: 'do',
    title: 'Find the missing -ed',
    hook: 'Three triggers demand the -ed form, and each one has caught you.',
    visual: {
      type: 'grid',
      head: ['Trigger · Form'],
      rows: [
        { label: 'be / been + verb', text: 'should be [[dismantled]] — passive' },
        { label: 'Verb describing a noun', text: '[[prolonged]] time — it’s an adjective now' },
        { label: '“compare to”', text: '[[compared]] to — always -ed' },
      ],
    },
    example: {
      label: 'Real failures · your essays',
      kind: 'fail',
      lines: [
        { tag: 'Wrote', text: 'should be [[dismantle]] → dismantled' },
        { tag: 'Wrote', text: '[[prolong]] time → prolonged time' },
        { tag: 'Wrote', text: '[[compare]] to (recurring) → compared to' },
      ],
    },
  },
  {
    id: 'V2',
    family: 'V',
    polarity: 'do',
    title: 'Three fixed patterns, no exceptions',
    hook: 'Spot the trigger word, and the form after it is decided for you.',
    visual: {
      type: 'grid',
      head: ['Trigger · What follows'],
      rows: [
        { label: 'be used to', text: '+ [[-ing]] — are used to [[living]]' },
        { label: 'until / if / when (future)', text: '+ [[present]] — until we [[find]]' },
        { label: 'too', text: '+ adjective — [[too restrictive]], never “too much”' },
      ],
    },
    example: {
      label: 'Real failures · your essays',
      kind: 'fail',
      lines: [
        { tag: 'Wrote', text: 'are used to [[live]] → are used to living' },
        { tag: 'Wrote', text: 'until we [[found]] → until we find' },
        { tag: 'Wrote', text: 'too [[much]] restrictive / small — twice in one essay → too restrictive / small' },
      ],
    },
  },

  // ---------- E · Edit  Mechanics ----------
  {
    id: 'E1',
    family: 'E',
    polarity: 'do',
    title: 'Point to the main verb in every sentence',
    hook: '“Be” is the verb you drop. Fragments start with Because · Compare to · Especially · Which · While.',
    visual: {
      type: 'test',
      question: 'Can you put a finger on this sentence’s main verb?',
      pass: 'Yes → next sentence',
      fail: 'No → add is / are, or attach the fragment',
    },
    example: {
      label: 'Real failures · your essays',
      kind: 'fail',
      lines: [
        { tag: 'Wrote', text: 'Zoos also source of awareness → Zoos [[are]] also [[a]] source of awareness' },
        { tag: 'Wrote', text: 'This, in turn [[correct]] that … → This, in turn[[,]] [[confirms]] that …' },
        { tag: 'Wrote', text: 'These student generally ambitious → These students [[are]] generally ambitious' },
      ],
    },
  },
  {
    id: 'E2',
    family: 'E',
    polarity: 'do',
    title: 'Proofread against your own watch-list',
    hook: 'No spell checker in the exam. These are your words — plus the apostrophe you keep dropping.',
    visual: {
      type: 'grid',
      head: ['✗ Wrote → ✓ Correct'],
      rows: [
        { label: 'wolve · righ · normaly', text: '→ [[wolf]] · [[right]] · [[normally]]' },
        { label: 'hunderd · meeters · boundry', text: '→ [[hundred]] · [[metres]] · [[boundary]]' },
        { label: 'exiting · preservarance', text: '→ [[existing]] · [[preservation]]' },
        { label: 'animals freedom (3+ times)', text: '→ animals[[’]] freedom — the owner gets an apostrophe' },
      ],
    },
    example: {
      label: 'The apostrophe check',
      text: 'Noun + noun where the first one owns the second? It needs [[’s]] (or [[s’]] for plurals). The opposite of RICH H1, which deletes contraction apostrophes.',
    },
  },
]

export default { families, tactics, formula }

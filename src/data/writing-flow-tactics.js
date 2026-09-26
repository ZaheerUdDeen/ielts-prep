// Writing > Task 2 > Coherence & Cohesion tactics (cross-cutting layer).
// Source: Obsidian note "Writing/Coherence-Guide.md".
//
// Job of FLOW: connect whatever STAR, CASE, PAIR and SEAL told you to write.
// Unlike those four decks, FLOW has NO paragraph of its own — it runs
// underneath every paragraph at once (between paragraphs, between sentences,
// inside every sentence). It does not vary by essay type, so none of these
// tactics carry `type` / `appliesToType` / typed grid rows, and the section is
// flagged `layer: true` in catalog.js so it stays out of the per-type
// Walkthrough on the Writing screen.
//
// MASTER FORMULA: FLOW — Coherence & Cohesion.
//   F  Flag   -> ids F1..F2 (name the relationship, then pick the linker)
//   L  Link   -> ids L1..L2 (every this/that/it points to one clear noun)
//   O  One    -> ids O1..O2 (one relationship per sentence, no linker pile-up)
//   W  Watch  -> ids W1..W2 (whole-essay repetition: linkers, openers)
// Array order below IS the deck order (F -> L -> O -> W), and each tactic's id
// starts with its FLOW letter. Mastery keys are namespaced `writing/flow:L1`
// (see cardKey in catalog.js), so FLOW's L1 never collides with other decks.
//
// Conventions are identical to `writing-intro-tactics.js` — read the comment
// block there. Summary:
//   [[double brackets]] highlight words in the family colour.
//   family.tone: 'teal' | 'violet' | 'amber' | 'rose'
//     (tones follow the guide's own assignment: F teal, L violet, O amber, W rose)
//   tactic.polarity: 'do' | 'dont'
//   tactic.visual.type: 'morph' | 'swap' | 'merge' | 'test' | 'dial' | 'blocks'
//     | 'banned' | 'contrast' | 'grid'   (renderers in src/components/Visual.jsx)

// Families are listed in FLOW order. family.id is the FLOW letter.
export const families = [
  {
    id: 'F',
    name: 'Linker category',
    tone: 'teal',
    star: { letter: 'F', word: 'Flag', action: 'Flag the relationship' },
    tip: 'Name the logical relationship first, then pick a linker from that category — never the reverse.',
  },
  {
    id: 'L',
    name: 'Clear reference',
    tone: 'violet',
    star: { letter: 'L', word: 'Link', action: 'Link back clearly' },
    tip: 'Every this / that / it points back to one clear noun and keeps pointing at it.',
  },
  {
    id: 'O',
    name: 'One per sentence',
    tone: 'amber',
    star: { letter: 'O', word: 'One', action: 'One relationship per sentence' },
    tip: 'No stacked linkers, and no linker glued to every sentence start.',
  },
  {
    id: 'W',
    name: 'Whole-essay repetition',
    tone: 'rose',
    star: { letter: 'W', word: 'Watch', action: 'Watch for repetition' },
    tip: 'The one whole-essay pass: the same linker, the same paragraph opener.',
  },
]

// Master-formula anchor card (deck position 0). Letters/actions come from
// `families[].star`, so they can never drift out of sync with the cards.
export const formula = {
  id: 'FLOW',
  type: 'formula',
  word: 'FLOW',
  title: 'The Coherence formula',
  why: 'Runs underneath every paragraph — STAR, CASE, PAIR and SEAL tell you what to write; FLOW tells you how to connect it.',
}

export const tactics = [
  // ---------- F · Flag  Name the relationship first ----------
  {
    id: 'F1',
    family: 'F',
    polarity: 'do',
    title: 'Categorize before choosing',
    hook: 'Work out the relationship first — a wrong-category linker misstates your logic.',
    visual: {
      type: 'grid',
      head: ['Relationship · Linking words'],
      rows: [
        { label: 'Addition', text: '[[furthermore]], moreover, in addition' },
        { label: 'Contrast', text: '[[however]], nevertheless, on the other hand' },
        { label: 'Cause–effect', text: '[[therefore]], consequently, as a result' },
        { label: 'Example', text: '[[for instance]], for example, such as' },
        { label: 'Sequence', text: '[[firstly]], subsequently, finally' },
      ],
    },
    example: {
      label: 'Baseline · CC 6.0',
      kind: 'fail',
      lines: [{ tag: 'Marker', text: '“[[Repetitive linkers]], some unclear reference.” Both faults start here.' }],
    },
  },
  {
    id: 'F2',
    family: 'F',
    polarity: 'do',
    title: 'Match the linker to the actual logic',
    hook: 'The classic slip: “however” where nothing is being contrasted.',
    visual: {
      type: 'contrast',
      rows: [
        {
          ok: false,
          icon: 'idea',
          label: 'Wrong category',
          text: 'Public transport reduces congestion. [[However]], it also lowers pollution.',
        },
        {
          ok: true,
          icon: 'idea',
          label: 'Addition — both benefits',
          text: 'Public transport reduces congestion. [[Furthermore]], it also lowers pollution.',
        },
      ],
    },
    example: {
      label: 'The test',
      text: 'Delete the linker. Do the sentences [[push against]], [[add to]], or [[cause]] each other? Choose only then.',
    },
  },

  // ---------- L · Link  Clear reference ----------
  {
    id: 'L1',
    family: 'L',
    polarity: 'do',
    title: 'Give every pronoun a noun to hold onto',
    hook: 'A bare “This” after two or three ideas makes the reader guess.',
    visual: {
      type: 'morph',
      from: { text: 'This shows…', label: 'which idea?' },
      to: { text: 'This [[concession]] shows…', label: 'noun anchors it' },
    },
    example: {
      label: 'Fix · one extra word',
      kind: 'fix',
      text: 'Put a noun after this: “this [[policy]]”, “this [[concession]]”, “this [[cost]]”.',
    },
  },
  {
    id: 'L2',
    family: 'L',
    polarity: 'dont',
    title: 'Don’t let a pronoun drift',
    hook: 'If “it” means public transport, it keeps meaning that until you clearly switch.',
    visual: {
      type: 'contrast',
      rows: [
        {
          ok: false,
          icon: 'idea',
          label: '“It” drifts',
          text: 'Public transport reduces congestion. It also cuts emissions, but [[it]] requires heavy government spending, and [[it]] rarely recovers its cost.',
        },
        {
          ok: true,
          icon: 'idea',
          label: 'Referent held',
          text: 'Public transport reduces congestion and cuts emissions. However, [[the investment it requires]] is heavy, and [[that spending]] rarely recovers its cost.',
        },
      ],
    },
    example: {
      label: 'Why it fails',
      text: 'The last two “it”s have quietly shifted from [[transport]] to [[spending]].',
    },
  },

  // ---------- O · One  One relationship per sentence ----------
  {
    id: 'O1',
    family: 'O',
    polarity: 'dont',
    title: 'Don’t stack two linking words',
    hook: 'Two linkers make two claims about the logic — and they usually contradict.',
    visual: {
      type: 'contrast',
      rows: [
        { ok: false, icon: 'idea', label: 'Stacked', text: '[[However, moreover]], this shows…' },
        { ok: true, icon: 'idea', label: 'Pick one relationship', text: '[[However]], this shows…' },
      ],
    },
    example: {
      label: 'Rule',
      text: 'Pick [[one]] relationship and cut the other linker.',
    },
  },
  {
    id: 'O2',
    family: 'O',
    polarity: 'dont',
    title: 'Don’t open every sentence with a linker',
    hook: 'A connective on every sentence reads like a machine wrote it.',
    visual: {
      type: 'dial',
      left: 'Bare (no signal)',
      middle: 'Natural (varied)',
      right: 'Mechanical (every sentence)',
    },
    example: {
      before:
        '[[Firstly]], buses carry more people. [[Moreover]], they emit less per passenger. [[Furthermore]], they serve those who cannot drive. [[Therefore]], investment is justified.',
      after:
        'Buses carry far more people per vehicle than cars. They also emit less per passenger and serve those who cannot drive. [[Therefore]], investment is justified.',
    },
  },

  // ---------- W · Watch  Whole-essay repetition ----------
  {
    id: 'W1',
    family: 'W',
    polarity: 'do',
    title: 'Vary linking words across the essay',
    hook: 'Four “however”s in 270 words reads as repetitive, not sophisticated.',
    visual: {
      type: 'grid',
      head: ['Category · Rotate between'],
      rows: [
        { label: 'Contrast', text: '[[however]] · nevertheless · that said · yet' },
        { label: 'Addition', text: '[[furthermore]] · moreover · in addition · also' },
        { label: 'Cause–effect', text: '[[therefore]] · consequently · as a result · thus' },
      ],
    },
    example: {
      label: 'Same rule as RICH R1',
      text: 'The linking-word version of the [[Repetition Killer]] — vary within the same category.',
    },
  },
  {
    id: 'W2',
    family: 'W',
    polarity: 'do',
    title: 'Vary paragraph-opening patterns',
    hook: 'A mechanical Firstly / Secondly / In conclusion template reads worse than natural variation.',
    visual: {
      type: 'grid',
      head: ['Paragraph · Template → varied opener'],
      rows: [
        { label: 'Body 1', text: '“Firstly, …” → open directly with the [[claim as subject]] (CASE C1)' },
        { label: 'Body 2', text: '“Secondly, …” → refer back to Body 1: “[[Beyond its economic value]], …”' },
        {
          label: 'Conclusion',
          text: '“In conclusion, …” is fine to keep, or “[[Overall]], …”',
          note: 'One signal, not a recap',
        },
      ],
    },
  },
]

export default { families, tactics, formula }

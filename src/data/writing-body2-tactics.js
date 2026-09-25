// Writing > Task 2 > Body paragraph 2 tactics.
// Source: Obsidian note "Writing/Body2-Guide.md".
//
// Job of Body 2: same paragraph mechanics as Body 1 (claim -> explain ->
// example, ~85 words — already taught by the CASE deck, NOT re-taught here).
// What's new is Body 2's relationship to Body 1: a genuinely different angle,
// the correct second half of the essay type's job, equal weight, and a
// verdict that still agrees with the intro and Body 1.
//
// MASTER FORMULA: PAIR — a completion check, not a rewrite of CASE.
//   P  Pick     -> ids P1..P2 (new angle + know which half of the job is yours)
//   A  Answer   -> ids A1..A2 (execute that job — the trap differs by type)
//   I  Instill  -> ids I1..I2 (equal weight to Body 1, no shortcuts)
//   R  Resolve  -> ids R1..R2 (verdict still agrees with intro + Body 1)
// Array order below IS the deck order (P -> A -> I -> R), and each tactic's
// id starts with its PAIR letter. Ids only need to be unique within this
// section: mastery keys are namespaced `writing/body2:A1` (see cardKey in
// catalog.js), so Body 2's A1 never collides with Body 1's or Intro's A1.
//
// Conventions are identical to `writing-intro-tactics.js` — read the comment
// block there. Summary:
//   [[double brackets]] highlight words in the family colour.
//   family.tone: 'teal' | 'violet' | 'amber' | 'rose'
//   tactic.polarity: 'do' | 'dont'
//   tactic.visual.type: 'morph' | 'swap' | 'merge' | 'test' | 'dial' | 'blocks'
//     | 'banned' | 'contrast' | 'grid'   (renderers in src/components/Visual.jsx)
//   `grid` rows may omit `mark` for a purely descriptive table (see P2), and
//     `head` may have a single entry when there is no verdict column.

// Families are listed in PAIR (exam-time) order. family.id is the PAIR letter.
export const families = [
  {
    id: 'P',
    name: 'New angle',
    tone: 'teal',
    star: { letter: 'P', word: 'Pick', action: 'Pick a new angle' },
    tip: 'A genuinely new angle — and know which half of the type’s job is yours.',
  },
  {
    id: 'A',
    name: 'Type-specific job',
    tone: 'violet',
    star: { letter: 'A', word: 'Answer', action: 'Answer the job' },
    tip: 'Execute that job correctly — the exact trap differs by essay type.',
  },
  {
    id: 'I',
    name: 'Equal weight',
    tone: 'amber',
    star: { letter: 'I', word: 'Instill', action: 'Instill equal weight' },
    tip: 'Same depth as Body 1, same word count, no shortcuts.',
  },
  {
    id: 'R',
    name: 'Verdict check',
    tone: 'rose',
    star: { letter: 'R', word: 'Resolve', action: 'Resolve the verdict' },
    tip: 'Confirm the verdict still agrees with the intro and Body 1 — last check before the conclusion.',
  },
]

// Master-formula anchor card (deck position 0). Letters/actions come from
// `families[].star`, so they can never drift out of sync with the cards.
export const formula = {
  id: 'PAIR',
  type: 'formula',
  word: 'PAIR',
  title: 'The Body 2 formula',
  why: 'CASE builds the paragraph — PAIR makes sure it correctly completes the pair with Body 1.',
}

export const tactics = [
  // ---------- P · Pick  New angle + which half is yours ----------
  {
    id: 'P1',
    family: 'P',
    polarity: 'do',
    title: 'The different-angle test',
    hook: 'If Body 2 collapses without Body 1’s exact wording, it’s not a new angle.',
    visual: {
      type: 'contrast',
      rows: [
        {
          ok: false,
          icon: 'idea',
          label: 'Restated angle',
          text: 'Public transport investment is [[economically beneficial]] and also very useful.',
        },
        {
          ok: true,
          icon: 'idea',
          label: 'New angle',
          text: 'Investment in public transport also [[reduces a city’s carbon footprint]], addressing an urgency Body 1’s economic argument does not.',
        },
      ],
    },
    example: {
      label: 'The test',
      text: 'Could you [[delete Body 1]] and still need Body 2 to make a distinct point?',
    },
  },
  {
    id: 'P2',
    family: 'P',
    polarity: 'do',
    title: 'Know Body 2’s job before drafting',
    hook: 'Body 2 is the second half of whatever shape you already Spotted.',
    visual: {
      type: 'grid',
      head: ['Essay type · Body 2’s job'],
      rows: [
        { label: 'Opinion', text: 'My second reason (or a concession, then rebuttal)' },
        { label: 'Discussion', text: 'View 2, presented fairly — same treatment as View 1' },
        { label: 'Advantages / Disadvantages', text: '2 disadvantages, developed' },
        { label: 'Problem / Solution', text: 'Solutions that map onto the specific problems named in Body 1' },
        { label: 'Two-part question', text: 'Answer to Question 2 only' },
      ],
    },
  },

  // ---------- A · Answer  Execute the type-specific job ----------
  {
    id: 'A1',
    family: 'A',
    polarity: 'do',
    title: 'Opinion type: concession-then-rebuttal beats a flat second reason',
    hook: 'Name the counterargument, then beat it — stronger than just adding a reason.',
    visual: {
      type: 'merge',
      inputs: ['Concede', 'Rebut'],
      output: 'Beats a flat 2nd reason',
    },
    example: {
      label: 'Real trap · Opinion essays',
      kind: 'fail',
      lines: [
        {
          tag: 'Model',
          text: '[[Critics argue]] that road-building spurs economic activity; [[however]], this activity is short-lived once congestion returns within a few years.',
        },
        { tag: 'Trap', text: 'Importing the Discussion structure here — giving each side a [[balanced paragraph]].' },
        { tag: 'Rule', text: 'Opinion is NOT a both-sides essay: [[pick a side and defend it]].' },
      ],
    },
  },
  {
    id: 'A2',
    family: 'A',
    polarity: 'do',
    title: 'Problem/Solution type: every solution maps to a named problem',
    hook: 'Solutions answer the problems you named — not a new topic.',
    visual: {
      type: 'grid',
      head: ['Body 1 problem → Body 2 solution', 'Maps?'],
      rows: [
        { label: 'Congestion', text: '→ [[Congestion pricing]]', mark: 'yes' },
        { label: 'Air pollution', text: '→ [[EV incentives]]', mark: 'yes' },
        {
          label: '(no problem named)',
          text: '→ Job creation',
          mark: 'no',
          note: 'Unrelated pivot — answers nothing you raised',
        },
      ],
    },
    example: {
      label: 'Real trap',
      kind: 'fail',
      lines: [
        { tag: 'Trap', text: 'Naming three problems then offering [[one unrelated solution]].' },
        { tag: 'Rule', text: 'Each solution must answer a problem you [[actually raised]].' },
      ],
    },
  },

  // ---------- I · Instill  Equal weight to Body 1 ----------
  {
    id: 'I1',
    family: 'I',
    polarity: 'do',
    title: 'Equal weight, always',
    hook: 'Same depth as Body 1 — a thin echo caps TR even with a good opinion.',
    visual: {
      type: 'dial',
      left: 'Thin echo',
      middle: 'Equal depth',
      right: 'Overshoots',
    },
    example: {
      label: 'Real failure · Mock Test 1',
      kind: 'fail',
      lines: [
        { tag: 'Verdict', text: 'Contradicted itself (P2 “disadvantages outweigh” vs P4 “offers more benefits”).' },
        { tag: 'Depth', text: 'Only [[one disadvantage]] was developed.' },
        { tag: 'Lesson', text: 'One-sided [[development]] — not just the contradiction — capped this essay.' },
      ],
    },
  },
  {
    id: 'I2',
    family: 'I',
    polarity: 'do',
    title: 'Full paragraph, not a subordinate clause',
    hook: 'Full paragraph for the second half — not a clause tacked onto Body 1.',
    visual: {
      type: 'blocks',
      paper: 'BODY 1',
      blocks: [
        { label: 'Part 1 answered fully', kind: 'view' },
        { label: 'Part 2 as a clause → own paragraph', kind: 'cut' },
      ],
    },
    example: {
      label: 'Real trap · Two-part & Adv/Disadv',
      kind: 'fail',
      lines: [
        { tag: 'Trap', text: 'Answering one part fully and the other [[in a clause]].' },
        { tag: 'Cost', text: 'Missing a part caps TR near [[5.0]].' },
        { tag: 'Rule', text: 'Equal space to each.' },
      ],
    },
  },

  // ---------- R · Resolve  Verdict still agrees ----------
  {
    id: 'R1',
    family: 'R',
    polarity: 'do',
    title: 'The verdict must still agree with Body 1 and the intro',
    hook: 'Reread your intro’s position before writing Body 2’s last sentence.',
    visual: {
      type: 'test',
      question: 'Does this verdict match the intro?',
      pass: 'Same side as intro + Body 1 → keep',
      fail: 'Opposite verdict → rewrite',
    },
    example: {
      label: 'Real failure · Mock Test 1 · −1 band',
      kind: 'fail',
      lines: [
        { tag: 'P2', text: 'Disadvantages [[outweigh]].' },
        { tag: 'P4', text: 'Advantages [[outweigh]].' },
        { tag: 'Verdict', text: 'Same essay, opposite verdicts. That contradiction alone cost a full band.' },
      ],
    },
  },
  {
    id: 'R2',
    family: 'R',
    polarity: 'do',
    title: 'Advantages/Disadvantages: land the verdict, don’t just list',
    hook: 'The question asks which outweighs — say it again here.',
    visual: {
      type: 'morph',
      from: { text: 'List', label: 'both sides' },
      to: { text: '[[Weigh]]', label: 'which outweighs' },
    },
    example: {
      label: 'Close the loop in Body 2',
      lines: [
        {
          tag: 'Trap',
          text: 'Listing both sides without ever answering which outweighs caps TR around [[5.5]] regardless of content quality.',
        },
        { tag: 'Close', text: '…these costs [[outweigh the benefits]] described above.' },
      ],
    },
  },
]

export default { families, tactics, formula }

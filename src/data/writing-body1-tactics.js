// Writing > Task 2 > Body paragraph 1 tactics.
// Source: Obsidian note "Writing/Body1-Guide.md".
//
// Job of Body 1: one claim -> explain it -> prove it with one example.
// ~85 words, one idea only.
//
// MASTER FORMULA: CASE — the exam-time order in which the tactics fire.
//   C  Claim   -> ids C1..C2 (topic sentence: the idea is the subject, one idea)
//   A  Argue   -> ids A1..A2 (reasoning: why the claim is true)
//   S  Sample  -> ids S1..S2 (one concrete example)
//   E  Edge    -> ids E1..E2 (subordinate the rival view + do the essay type's job)
// Array order below IS the deck order (C -> A -> S -> E), and each tactic's
// id starts with its CASE letter. Ids only need to be unique within this
// section: mastery keys are namespaced `writing/body1:C1` (see cardKey in
// catalog.js), so Body 1's S1 never collides with Intro's S1.
//
// Conventions are identical to `writing-intro-tactics.js` — read the comment
// block there. Summary:
//   [[double brackets]] highlight words in the family colour.
//   family.tone: 'teal' | 'violet' | 'amber' | 'rose'
//   tactic.polarity: 'do' | 'dont'
//   tactic.visual.type: 'morph' | 'swap' | 'merge' | 'test' | 'dial' | 'blocks'
//     | 'banned' | 'contrast' | 'grid'   (renderers in src/components/Visual.jsx)
//   `contrast` = wrong-vs-right rows with a small icon (people / idea).
//   `grid`     = labelled rows with a ✓ / ✗ / ~ verdict column.
//   `blocks` accepts an optional `paper` label (defaults to 'INTRO') and a
//     `cut` block kind for a struck-out block.

// Families are listed in CASE (exam-time) order. family.id is the CASE letter.
export const families = [
  {
    id: 'C',
    name: 'Topic sentence',
    tone: 'teal',
    star: { letter: 'C', word: 'Claim', action: 'Claim one idea' },
    tip: 'The idea is the subject — never a group of people. One idea only.',
  },
  {
    id: 'A',
    name: 'Reasoning',
    tone: 'violet',
    star: { letter: 'A', word: 'Argue', action: 'Argue why it’s true' },
    tip: 'Two sentences of reasoning, not restatement.',
  },
  {
    id: 'S',
    name: 'Example',
    tone: 'amber',
    star: { letter: 'S', word: 'Sample', action: 'Sample one case' },
    tip: 'Real, hypothetical, or personal — never another generalisation.',
  },
  {
    id: 'E',
    name: 'Concession & job',
    tone: 'rose',
    star: { letter: 'E', word: 'Edge', action: 'Edge out the rival' },
    tip: 'Subordinate the rival view — and do the job the essay type asked for.',
  },
]

// Master-formula anchor card (deck position 0). Letters/actions come from
// `families[].star`, so they can never drift out of sync with the cards.
export const formula = {
  id: 'CASE',
  type: 'formula',
  word: 'CASE',
  title: 'The Body 1 formula',
  why: 'You can’t argue a claim you haven’t stated, and the concession only makes sense once the case exists — Claim always comes first.',
}

export const tactics = [
  // ---------- C · Claim  Topic sentence ----------
  {
    id: 'C1',
    family: 'C',
    polarity: 'do',
    title: 'The idea is the subject, never the people',
    hook: 'Name the idea, not the identity.',
    visual: {
      type: 'contrast',
      rows: [
        {
          ok: false,
          icon: 'people',
          label: 'People as subject',
          text: '[[The people who think]] governments should invest in public transport are generally middle class.',
        },
        {
          ok: true,
          icon: 'idea',
          label: 'Idea as subject',
          text: '[[Investment in public transport]] reduces urban congestion more cheaply than road building.',
        },
      ],
    },
    example: {
      label: 'The test',
      text: 'Could this sentence be true and the view [[still be wrong]]? If yes, it’s not an argument.',
    },
  },
  {
    id: 'C2',
    family: 'C',
    polarity: 'do',
    title: 'One claim, no stacking',
    hook: 'One idea per paragraph. The second one belongs in Body 2.',
    visual: {
      type: 'blocks',
      paper: 'BODY 1',
      blocks: [
        { label: 'ONE claim', kind: 'view' },
        { label: 'Second claim → move to Body 2', kind: 'cut' },
      ],
    },
    example: {
      lines: [
        { tag: '✗ Two', text: 'Curiosity-driven research has intrinsic value, [[and it also drives economic growth]].' },
        { tag: '✓ One', text: 'Curiosity-driven research has [[intrinsic value]] independent of its applications.' },
        { tag: 'Body 2', text: 'Economic growth becomes the next paragraph’s claim.' },
      ],
    },
  },

  // ---------- A · Argue  Reasoning ----------
  {
    id: 'A1',
    family: 'A',
    polarity: 'do',
    title: 'Explain why, not just what',
    hook: 'State the claim, then prove it — don’t restate it.',
    visual: {
      type: 'morph',
      from: { text: 'What', label: 'claim' },
      to: { text: '[[Why]]', label: 'mechanism' },
    },
    example: {
      label: 'Claim → Argue',
      lines: [
        { tag: 'Claim', text: 'Investment in public transport reduces congestion.' },
        {
          tag: 'Argue',
          text: 'A single bus [[removes dozens of private cars]] from the road, so road capacity per commuter rises without new infrastructure.',
        },
      ],
    },
  },
  {
    id: 'A2',
    family: 'A',
    polarity: 'do',
    title: 'Pass the idea-not-identity test before moving on',
    hook: 'Same test, run again — on your reasoning sentence this time.',
    visual: {
      type: 'test',
      question: 'Read only your reasoning sentence…',
      pass: 'Answers the question → keep',
      fail: 'Adjacent point → rewrite',
    },
    example: {
      label: 'Real failure · TR capped at 6.0',
      kind: 'fail',
      lines: [
        { tag: 'Asked', text: 'Is improving lives the [[most important]] aim?' },
        { tag: 'Wrote', text: 'Science needs [[good intentions]].' },
        { tag: 'Verdict', text: 'Adjacent ≠ answer.' },
      ],
    },
  },

  // ---------- S · Sample  One concrete example ----------
  {
    id: 'S1',
    family: 'S',
    polarity: 'do',
    title: 'One concrete example, not another generalisation',
    hook: 'Zoom into one case — a place, a person, a number.',
    visual: {
      type: 'morph',
      from: { text: 'Many', label: 'generalisation' },
      to: { text: '[[One]]', label: 'place · person · number' },
    },
    example: {
      before: '[[Many countries]] have benefited from this policy.',
      after: '[[Singapore’s MRT]] expansion cut private car use by [[12%]] within five years.',
    },
  },
  {
    id: 'S2',
    family: 'S',
    polarity: 'do',
    title: 'People are allowed in the example — in three roles only',
    hook: 'Use people as an example, not as evidence for who’s right.',
    visual: {
      type: 'grid',
      head: ['Role people can play', 'OK?'],
      rows: [
        {
          label: 'Those affected by the outcome',
          text: '“Commuters without cars gain access to jobs across the city.”',
          mark: 'yes',
        },
        {
          label: 'A concrete illustration',
          text: '“Students who specialise early often struggle when their industry shifts.”',
          mark: 'yes',
        },
        {
          label: 'The topic itself (prompt is about a group)',
          text: '“Older employees bring knowledge that takes years to rebuild.”',
          mark: 'yes',
        },
        {
          label: 'Why the other side believes it',
          text: '“They rarely use public transport, so they cannot understand the issues.”',
          mark: 'no',
        },
      ],
    },
  },

  // ---------- E · Edge  Concession + essay-type job ----------
  {
    id: 'E1',
    family: 'E',
    appliesToType: 'opinion',
    polarity: 'do',
    title: 'The concession sentence (worth half a band)',
    hook: 'Name the rival, then subordinate it — one sentence.',
    visual: {
      type: 'dial',
      left: 'Ignore it',
      middle: 'Name + subordinate',
      right: 'Give in',
    },
    example: {
      label: 'Fill-in templates',
      lines: [
        { text: 'Curiosity-driven research has intrinsic value, [[but]] ___.' },
        { text: '[[While]] economic growth is a legitimate goal, ___.' },
      ],
    },
  },
  {
    id: 'E2',
    family: 'E',
    polarity: 'do',
    title: 'Match the job to the essay type',
    hook: 'Discussion ≠ Opinion — know which job this paragraph has.',
    visual: {
      type: 'grid',
      head: ['Essay type · Body 1’s job', 'Concede?'],
      rows: [
        { type: 'opinion', label: 'Opinion', text: 'State my first reason', mark: 'yes' },
        {
          type: 'discussion',
          label: 'Discussion',
          text: 'Present View 1 at its strongest, fairly — this IS the rival view',
          mark: 'no',
          note: 'Attacking / hedging caps TR at 6.0',
        },
        { type: 'adv-dis', label: 'Advantages / Disadvantages', text: 'One developed advantage (or disadvantage)', mark: 'opt' },
        { type: 'problem-solution', label: 'Problem / Solution', text: 'One developed problem', mark: 'no' },
        { type: 'two-part', label: 'Two-part question', text: 'Answer to Question 1 only', mark: 'no' },
      ],
      footer:
        'Discussion fairness test: could someone who actually holds this view read your paragraph and agree you were fair? If no, rewrite it.',
    },
    example: {
      label: 'Real failure · Discussion View 1',
      kind: 'fail',
      lines: [
        { tag: 'View 1', text: 'Studying broadly.' },
        {
          tag: 'Wrote',
          text: 'Students who “[[go with the flow of the wind]],” “[[don’t have certain opinion]],” “[[end up getting average scores]].”',
        },
        { tag: 'Verdict', text: 'A character sketch, not an argument.' },
      ],
    },
  },
]

export default { families, tactics, formula }

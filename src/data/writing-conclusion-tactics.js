// Writing > Task 2 > Conclusion tactics.
// Source: Obsidian note "Writing/Conclusion-Guide.md".
//
// Job of the conclusion: restate the position. No new content. ~45 words,
// usually 2 sentences. It runs once, right at the end — a closing check on
// everything above it, not new drafting work.
//
// MASTER FORMULA: SEAL — the closing check.
//   S  Summarize -> ids S1..S2 (restate only: no new content, no full recap)
//   E  Echo      -> ids E1..E2 (same verdict as the intro — paste it)
//   A  Answer    -> ids A1..A2 (the type-specific final job)
//   L  Lock      -> ids L1..L2 (close decisively, no drift from the position)
// Array order below IS the deck order (S -> E -> A -> L), and each tactic's
// id starts with its SEAL letter. Ids only need to be unique within this
// section: mastery keys are namespaced `writing/conclusion:S1` (see cardKey in
// catalog.js), so the Conclusion's S1/A1 never collide with Intro's, Body 1's
// or Body 2's identically-named ids.
//
// Conventions are identical to `writing-intro-tactics.js` — read the comment
// block there. Summary:
//   [[double brackets]] highlight words in the family colour.
//   family.tone: 'teal' | 'violet' | 'amber' | 'rose'
//   tactic.polarity: 'do' | 'dont'
//   tactic.visual.type: 'morph' | 'swap' | 'merge' | 'test' | 'dial' | 'blocks'
//     | 'banned' | 'contrast' | 'grid'   (renderers in src/components/Visual.jsx)
//   No new visual type was needed for this deck.

// Families are listed in SEAL (exam-time) order. family.id is the SEAL letter.
export const families = [
  {
    id: 'S',
    name: 'Restate only',
    tone: 'teal',
    star: { letter: 'S', word: 'Summarize', action: 'Summarize, don’t add' },
    tip: 'Restate only. No new arguments, no new examples, no new ideas.',
  },
  {
    id: 'E',
    name: 'Same verdict',
    tone: 'violet',
    star: { letter: 'E', word: 'Echo', action: 'Echo the intro’s verdict' },
    tip: 'The verdict here must be the exact same side as the intro — paste it, don’t reinvent it.',
  },
  {
    id: 'A',
    name: 'Type-specific job',
    tone: 'amber',
    star: { letter: 'A', word: 'Answer', action: 'Answer the final job' },
    tip: 'Deliver the type-specific final job — some types need more than a plain restatement.',
  },
  {
    id: 'L',
    name: 'Decisive close',
    tone: 'rose',
    star: { letter: 'L', word: 'Lock', action: 'Lock the position' },
    tip: 'Close decisively. No hedging, no fence-sitting, no drift from the position argued above.',
  },
]

// Master-formula anchor card (deck position 0). Letters/actions come from
// `families[].star`, so they can never drift out of sync with the cards.
export const formula = {
  id: 'SEAL',
  type: 'formula',
  word: 'SEAL',
  title: 'The Conclusion formula',
  why: 'SEAL runs once, right at the end — it’s a closing check, not new drafting work.',
}

export const tactics = [
  // ---------- S · Summarize  Restate only ----------
  {
    id: 'S1',
    family: 'S',
    polarity: 'do',
    title: 'No new content',
    hook: '45 words of pure restatement — a new idea here has nowhere to be developed.',
    visual: {
      type: 'blocks',
      paper: 'CONCLUSION',
      blocks: [
        { label: 'Restate', kind: 'view' },
        { label: 'New idea → delete', kind: 'cut' },
      ],
    },
    example: {
      label: 'Word budget',
      lines: [
        { tag: 'Paragraph', text: 'Conclusion' },
        { tag: 'Words', text: '[[45]]' },
        { tag: 'Job', text: 'Restate position. [[No new content.]]' },
      ],
    },
  },
  {
    id: 'S2',
    family: 'S',
    polarity: 'do',
    title: 'Two sentences, not a recap of every paragraph',
    hook: 'State the verdict and, if needed, the strongest reason — that’s the whole paragraph.',
    visual: {
      type: 'morph',
      from: { text: 'Recap', label: 'every paragraph' },
      to: { text: '[[Verdict]]', label: '+ 1 reason' },
    },
    example: {
      label: 'Padding, not conclusion',
      lines: [
        { tag: '✗ Recap', text: 'Re-walking Body 1’s example and Body 2’s example [[in miniature]].' },
        { tag: '✓ Close', text: 'The verdict, plus [[the strongest reason]] if needed. Two sentences.' },
      ],
    },
  },

  // ---------- E · Echo  Same verdict as the intro ----------
  {
    id: 'E1',
    family: 'E',
    polarity: 'do',
    title: 'Paste it, don’t reinvent it',
    hook: 'Write the verdict before the intro. Copy it into the conclusion. Done.',
    visual: {
      type: 'merge',
      inputs: ['Verdict first', 'Conclusion'],
      output: 'Same sentence, pasted',
    },
    example: {
      label: 'Highest-leverage tactic in the deck',
      kind: 'fix',
      text: 'Write the verdict/position as one sentence. Immediately [[copy it to where the conclusion will go]]. The essay then physically cannot contradict itself — which is exactly what cost Mock 1 a band on Task Response.',
    },
  },
  {
    id: 'E2',
    family: 'E',
    polarity: 'do',
    title: 'For binary types, echo the specific answer, not just the stance',
    hook: 'A general “I agree” isn’t enough when the question demands a specific comparison.',
    visual: {
      type: 'grid',
      head: ['Essay type · What to echo'],
      rows: [
        {
          type: 'adv-dis',
          label: 'Advantages / Disadvantages',
          text: 'The [[which-outweighs]] verdict must appear in the intro AND the conclusion — stating it once isn’t enough.',
        },
        {
          type: 'two-part',
          label: 'Two-part question',
          text: '[[Both answers]], one line each — not one full answer and one afterthought.',
        },
      ],
    },
  },

  // ---------- A · Answer  Type-specific final job ----------
  {
    id: 'A1',
    family: 'A',
    polarity: 'do',
    title: 'The conclusion’s job changes with the essay type',
    hook: 'Same principle as Spot and Pick — the last paragraph isn’t identical across types either.',
    visual: {
      type: 'grid',
      head: ['Essay type · Conclusion’s job'],
      rows: [
        { type: 'opinion', label: 'Opinion', text: 'Restate position, developed with the strongest reason' },
        { type: 'discussion', label: 'Discussion', text: 'State your opinion clearly — not a neutral recap of both views' },
        { type: 'adv-dis', label: 'Advantages / Disadvantages', text: 'Restate the verdict — which side outweighs' },
        { type: 'problem-solution', label: 'Problem / Solution', text: 'Restate' },
        { type: 'two-part', label: 'Two-part question', text: 'Both answers, one line each' },
      ],
    },
  },
  {
    id: 'A2',
    family: 'A',
    appliesToType: 'two-part',
    polarity: 'do',
    title: 'The Two-Part trap: equal space, even in one line each',
    hook: 'Both lines need to be complete — not one full sentence and one fragment.',
    visual: {
      type: 'blocks',
      paper: 'CONCLUSION',
      blocks: [
        { label: 'Answer 1 · full line', kind: 'view' },
        { label: 'Answer 2 · full line', kind: 'view' },
      ],
    },
    example: {
      label: 'Real trap · Two-part question',
      kind: 'fail',
      lines: [
        { tag: 'Trap', text: 'Answering one part fully and the other [[in a clause]].' },
        { tag: 'Cost', text: 'Missing a part caps TR near [[5.0]].' },
        { tag: 'Rule', text: 'Equal space to each — even at one line, [[both lines need to be complete]].' },
      ],
    },
  },

  // ---------- L · Lock  Decisive close ----------
  {
    id: 'L1',
    family: 'L',
    polarity: 'do',
    title: 'No hedging in the final sentence',
    hook: 'This is the last thing the examiner reads — don’t soften it now.',
    visual: {
      type: 'dial',
      left: 'Hedged',
      middle: 'Decisive',
      right: 'Extreme',
    },
    example: {
      label: 'Decided, not fence-sitting',
      lines: [
        {
          tag: 'OK',
          text: 'Partial agreement is fine and often stronger, but it has to read as decided ([[‘I largely agree, though…’]]) not as fence-sitting.',
        },
        {
          tag: 'Cost',
          text: 'An essay that never commits caps around [[5.5–6.0]] on TR regardless of language quality.',
        },
      ],
    },
  },
  {
    id: 'L2',
    family: 'L',
    polarity: 'do',
    title: 'Real failures this catches',
    hook: 'Both structural, not grammatical — SEAL exists specifically to stop these.',
    visual: {
      type: 'test',
      question: 'Does the conclusion match everything above it?',
      pass: 'Same verdict as intro + bodies → keep',
      fail: 'Contradicts what came before → rewrite',
    },
    example: {
      label: 'Real failures · structural',
      kind: 'fail',
      lines: [
        {
          tag: 'Mock 1',
          text: 'Paragraph 2 said disadvantages outweigh; paragraph 4 said advantages outweigh. Same essay, [[opposite verdicts]]. That contradiction alone cost a full band.',
        },
        {
          tag: 'Essay 4',
          text: 'Root cause: [[no planning step]]. The essay ran out of material at 245 words with the conclusion contradicting everything written above it. On an unfamiliar test-day topic, skipping the plan is what causes this.',
        },
      ],
    },
  },
]

export default { families, tactics, formula }

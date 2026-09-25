// Writing > Task 2 > Introduction tactics.
// Source: Obsidian note "Writing/Introduction-Guide.md".
//
// MASTER FORMULA: STAR — the exam-time order in which the tactics fire.
//   S  Spot the type       -> ids S1..S5 (intro shape by question type)
//   T  Twist the sentence  -> ids T1..T3 (paraphrase by restructuring)
//   A  Assert your stance  -> ids A1..A2 (decided position)
//   R  Refuse clichés      -> ids R1..R4 (banned openers)
// Array order below IS the deck order (S -> T -> A -> R), and each tactic's
// own id now starts with its STAR letter, so the id alone tells you both the
// family and the step — no separate lookup needed.
//
// HOW TO AUTHOR A NEW SECTION (e.g. Body 1):
//   1. Copy this file to `writing-body1-tactics.js`.
//   2. Edit `families` and `tactics` below (and `formula`, or drop it).
//      Pick a fresh set of family ids/letters if Body 1 needs its own STAR-like
//      formula, or reuse S/T/A/R if the same shape applies.
//   3. Import it in `src/data/catalog.js` and set it as that section's `deck`.
// No component changes are needed.
//
// Text markup: wrap words in [[double brackets]] to highlight them in the
// family colour (works in visual text fields and example text).
//
// family.tone must be one of: 'teal' | 'violet' | 'amber' | 'rose'
//   (palette lives in src/index.css as --teal, --violet, ...)
// family.star (optional): { letter, word, action } — the formula letter shown
//   large on every card of that family and on the overview screen.
// tactic.polarity: 'do' (green check) | 'dont' (red cross)
// tactic.visual.type: 'morph' | 'swap' | 'merge' | 'test' | 'dial' | 'blocks' | 'banned'
//   | 'contrast' | 'grid'   (renderers live in src/components/Visual.jsx;
//   see writing-body1-tactics.js for contrast/grid examples)
//
// formula (optional): a `type: 'formula'` anchor card shown before the first
// tactic. It is a reference card only: it has no Known toggle and never counts
// toward mastery (it is not part of `tactics`).

// Families are listed in STAR (exam-time) order. family.id is the STAR letter
// itself, and every tactic id in that family starts with the same letter.
export const families = [
  {
    id: 'S',
    name: 'Intro shape',
    tone: 'amber',
    star: { letter: 'S', word: 'Spot', action: 'Spot the type' },
    tip: 'Read the last line first. Count the question marks.',
  },
  {
    id: 'T',
    name: 'Paraphrase',
    tone: 'teal',
    star: { letter: 'T', word: 'Twist', action: 'Twist the sentence' },
    tip: 'Change the structure first, the words second.',
  },
  {
    id: 'A',
    name: 'Position',
    tone: 'violet',
    star: { letter: 'A', word: 'Assert', action: 'Assert your stance' },
    tip: 'A stranger must be able to name your side.',
  },
  {
    id: 'R',
    name: 'Banned openers',
    tone: 'rose',
    star: { letter: 'R', word: 'Refuse', action: 'Refuse clichés' },
    tip: 'Open with the topic itself, not a wrapper about it.',
  },
]

// Master-formula anchor card (deck position 0). Letters/actions come from
// `families[].star`, so they can never drift out of sync with the cards.
export const formula = {
  id: 'STAR',
  type: 'formula',
  word: 'STAR',
  title: 'The intro formula',
  why: 'You can’t paraphrase until you know the shape — Spot always comes first.',
}

export const tactics = [
  // ---------- S · Spot  Intro shape by question type ----------
  {
    id: 'S1',
    family: 'S',
    type: 'opinion',
    polarity: 'do',
    title: 'Opinion',
    hook: 'Paraphrase + your position.',
    visual: {
      type: 'blocks',
      blocks: [
        { label: 'Paraphrase', kind: 'para' },
        { label: 'My view', kind: 'view' },
      ],
    },
    example: { label: 'Spot it by', text: '"To what extent do you [[agree]]?"' },
  },
  {
    id: 'S2',
    family: 'S',
    type: 'discussion',
    polarity: 'do',
    title: 'Discussion',
    hook: 'Paraphrase BOTH views + your position.',
    visual: {
      type: 'blocks',
      blocks: [
        { label: 'View A', kind: 'para' },
        { label: 'View B', kind: 'para' },
        { label: 'My view', kind: 'view' },
      ],
    },
    example: { label: 'Spot it by', text: '"Discuss [[both views]] and give your own opinion."' },
  },
  {
    id: 'S3',
    family: 'S',
    type: 'adv-dis',
    polarity: 'do',
    title: 'Advantages / Disadvantages',
    hook: 'Paraphrase + say which side outweighs.',
    visual: {
      type: 'blocks',
      blocks: [
        { label: 'Paraphrase', kind: 'para' },
        { label: '⚖ Which outweighs', kind: 'view' },
      ],
    },
    example: { label: 'Spot it by', text: '"Do the advantages [[outweigh]] the disadvantages?"' },
  },
  {
    id: 'S4',
    family: 'S',
    type: 'problem-solution',
    polarity: 'do',
    title: 'Problem / Solution',
    hook: 'Paraphrase + signal problems AND solutions are coming.',
    visual: {
      type: 'blocks',
      blocks: [
        { label: 'Paraphrase', kind: 'para' },
        { label: 'Problems ▸', kind: 'signal' },
        { label: 'Solutions ▸', kind: 'signal' },
      ],
    },
    example: { label: 'Spot it by', text: '"What are the [[problems]]… what [[solutions]]…?"' },
  },
  {
    id: 'S5',
    family: 'S',
    type: 'two-part',
    polarity: 'do',
    title: 'Two-part question',
    hook: 'Paraphrase both questions. Don’t answer yet.',
    visual: {
      type: 'blocks',
      blocks: [
        { label: 'Q1', kind: 'para' },
        { label: 'Q2', kind: 'para' },
        { label: 'No answer yet', kind: 'hold' },
      ],
    },
    example: { label: 'Spot it by', text: 'Two question marks [[?]] [[?]] = preview two things.' },
  },

  // ---------- T · Twist  Paraphrase by restructuring ----------
  {
    id: 'T1',
    family: 'T',
    polarity: 'do',
    title: 'Nominalize the verb',
    hook: 'Turn the action into a thing.',
    visual: {
      type: 'morph',
      from: { text: 'invest', label: 'verb · action' },
      to: { text: 'invest[[ment]]', label: 'noun · thing' },
    },
    example: {
      before: 'Governments should [[invest]] in public transport',
      after: '[[Investment]] in public transport by governments…',
    },
  },
  {
    id: 'T2',
    family: 'T',
    polarity: 'do',
    title: 'Flip the clause order',
    hook: 'Lead with the effect, trail the cause.',
    visual: {
      type: 'swap',
      top: ['X', 'causes', 'Y'],
      bottom: ['Y', 'results from', 'X'],
    },
    example: {
      before: 'X [[causes]] Y',
      after: 'Y [[results largely from]] X',
    },
  },
  {
    id: 'T3',
    family: 'T',
    polarity: 'do',
    title: 'Merge the two views',
    hook: 'Two prompt sentences in, one sentence out.',
    visual: {
      type: 'merge',
      inputs: ['View A', 'View B'],
      output: 'Whether A or B…',
    },
    example: {
      label: 'One sentence, both views',
      text: '[[Whether]] school curricula should stay broad [[or]] narrow is debated.',
    },
  },

  // ---------- A · Assert  Decided position ----------
  {
    id: 'A1',
    family: 'A',
    polarity: 'do',
    title: 'Pass the stranger test',
    hook: 'If they have to guess your side, rewrite it.',
    visual: {
      type: 'test',
      question: 'A stranger reads only your position sentence…',
      pass: 'Names it → keep',
      fail: 'Guesses → rewrite',
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
  {
    id: 'A2',
    family: 'A',
    polarity: 'do',
    title: 'Decisive, not hedged',
    hook: 'Soften the tone, never the side.',
    visual: {
      type: 'dial',
      left: 'Hedged',
      middle: 'Decisive',
      right: 'Extreme',
    },
    example: {
      label: 'Fill-in templates',
      lines: [
        { text: 'While there are merits to both sides, I believe [[___]] is the more important factor.' },
        { text: 'In my view, the disadvantages of [[___]] outweigh the benefits, primarily because [[___]].' },
        { text: 'I largely agree that [[___]], although [[___]] deserves some consideration.' },
      ],
    },
  },

  // ---------- R · Refuse  Banned opening moves ----------
  {
    id: 'R1',
    family: 'R',
    polarity: 'dont',
    title: 'Never open with “Nowadays…”',
    hook: 'A memorized wrapper — costs naturalness marks.',
    visual: {
      type: 'banned',
      phrase: 'Nowadays, it is a well-known fact that…',
    },
    example: {
      label: 'Instead, open with the topic',
      kind: 'fix',
      text: 'Whether school curricula should stay broad or narrow is debated.',
    },
  },
  {
    id: 'R2',
    family: 'R',
    polarity: 'dont',
    title: 'No “many controversial opinions”',
    hook: 'Talks about opinions. Says nothing.',
    visual: {
      type: 'banned',
      phrase: 'There are many controversial opinions regarding whether…',
    },
    example: {
      label: 'Instead, open with the topic',
      kind: 'fix',
      text: 'Investment in public transport by governments…',
    },
  },
  {
    id: 'R3',
    family: 'R',
    polarity: 'dont',
    title: 'Don’t copy 3+ prompt words',
    hook: 'Three prompt words in a row = copying.',
    visual: {
      type: 'banned',
      phrase: 'Governments should [[invest in public transport]]…',
      badge: '3+ in a row',
    },
    example: {
      label: 'Instead, restructure',
      kind: 'fix',
      text: '[[Investment]] in public transport by governments…',
    },
  },
  {
    id: 'R4',
    family: 'R',
    polarity: 'dont',
    title: 'No rhetorical-question opener',
    hook: 'Asking isn’t answering. State, don’t ask.',
    visual: {
      type: 'banned',
      phrase: 'Should governments invest in public transport?',
      badge: '?',
    },
    example: {
      label: 'Instead, make a statement',
      kind: 'fix',
      text: 'Investment in public transport by governments…',
    },
  },
]

export default { families, tactics, formula }

// Writing > Task 2 > Introduction tactics.
// Source: Obsidian note "Writing/Introduction-Guide.md".
//
// HOW TO AUTHOR A NEW SECTION (e.g. Body 1):
//   1. Copy this file to `writing-body1-tactics.js`.
//   2. Edit `families` and `tactics` below.
//   3. Import it in `src/data/catalog.js` and set it as that section's `deck`.
// No component changes are needed.
//
// Text markup: wrap words in [[double brackets]] to highlight them in the
// family colour (works in visual text fields and example text).
//
// family.tone must be one of: 'teal' | 'violet' | 'amber' | 'rose'
//   (palette lives in src/index.css as --teal, --violet, ...)
// tactic.polarity: 'do' (green check) | 'dont' (red cross)
// tactic.visual.type: 'morph' | 'swap' | 'merge' | 'test' | 'dial' | 'blocks' | 'banned'
//   (renderers live in src/components/Visual.jsx)

export const families = [
  {
    id: 'T1',
    name: 'Paraphrase',
    tone: 'teal',
    tip: 'Change the structure first, the words second.',
  },
  {
    id: 'T2',
    name: 'Position',
    tone: 'violet',
    tip: 'A stranger must be able to name your side.',
  },
  {
    id: 'T3',
    name: 'Intro shape',
    tone: 'amber',
    tip: 'Read the last line first. Count the question marks.',
  },
  {
    id: 'T4',
    name: 'Banned openers',
    tone: 'rose',
    tip: 'Open with the topic itself, not a wrapper about it.',
  },
]

export const tactics = [
  // ---------- T1x  Paraphrase by restructuring ----------
  {
    id: 'T11',
    family: 'T1',
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
    id: 'T12',
    family: 'T1',
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
    id: 'T13',
    family: 'T1',
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

  // ---------- T2x  Decided position ----------
  {
    id: 'T21',
    family: 'T2',
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
    id: 'T22',
    family: 'T2',
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

  // ---------- T3x  Intro shape by question type ----------
  {
    id: 'T31',
    family: 'T3',
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
    id: 'T32',
    family: 'T3',
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
    id: 'T33',
    family: 'T3',
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
    id: 'T34',
    family: 'T3',
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
    id: 'T35',
    family: 'T3',
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

  // ---------- T4x  Banned opening moves ----------
  {
    id: 'T41',
    family: 'T4',
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
    id: 'T42',
    family: 'T4',
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
    id: 'T43',
    family: 'T4',
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
    id: 'T44',
    family: 'T4',
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

export default { families, tactics }

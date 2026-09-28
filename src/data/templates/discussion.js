// Writing > Task 2 > fill-in-the-blank template: DISCUSSION essays
// ("Discuss both views and give your own opinion").
//
// HOW TO ADD ANOTHER ESSAY TYPE (e.g. Opinion):
//   1. Copy this file to `opinion.js` and edit `type`, `label`, `paragraphs`.
//   2. Import it in `src/data/templates/index.js` and add it to `templates`.
// No component changes are needed: TemplatePractice renders whatever is here.
//
// Shape
//   paragraph.section  catalog section id ('intro' | 'body1' | 'body2' | 'conclusion');
//                      the screen borrows that deck's formula word + tones.
//   paragraph.parts    the paragraph in reading order: strings are fixed text,
//                      objects are blanks (rendered inline, in place).
//   blank.id           storage key, unique within its paragraph.
//   blank.words        { min, max, label } target range (see `about` / `range`).
//   blank.hint         shown under the blank's live word count.
//   blank.flags        optional machine checks: [{ phrases, message }]. Any
//                      phrase present (whole word, case-insensitive) raises a
//                      warning. Warnings flag, they never block.
//   paragraph.total    target for the whole paragraph INCLUDING the fixed
//                      template words (it's the paragraph's real word count).
//   paragraph.checklist  reminders the user ticks off by hand. Conceptual rules
//                      (parallelism, concession direction, fairness) live here
//                      because they can't be checked mechanically.

/** "~15 words": a +/-2 window around a single target. */
const about = (n) => ({ min: n - 2, max: n + 2, label: `~${n}` })
/** "10–12 words": an explicit range. */
const range = (min, max) => ({ min, max, label: `${min}–${max}` })

const CONCESSION_WORDS = ['but', 'however', 'although']
const HEDGES = ['perhaps', 'maybe', 'possibly', 'arguably', 'to some extent', 'to a certain extent', 'somewhat']

export default {
  type: 'discussion',
  label: 'Discussion',
  subtitle: 'Discuss both views + give your opinion',
  essayTotal: { min: 250, max: 290, label: '~260' },
  paragraphs: [
    {
      id: 'intro',
      section: 'intro',
      total: range(52, 60),
      parts: [
        'Whether ',
        {
          id: 'viewA',
          label: 'View A',
          words: range(10, 12),
          hint: 'A full clause with its own subject + verb — never a bare noun phrase.',
        },
        ' or ',
        {
          id: 'viewB',
          label: 'View B',
          words: range(10, 12),
          hint: 'Same rule as View A: a full clause with its own subject + verb.',
        },
        ' is a widely debated issue. In this debate, I largely agree that ',
        {
          id: 'position',
          label: 'Position',
          words: range(8, 10),
          hint: 'Your side, stated plainly.',
        },
        ', although ',
        {
          id: 'condition',
          label: 'Condition',
          words: range(6, 8),
          hint: 'Concede something to the OPPOSITE side from your Position — don’t intensify it.',
        },
        ' deserves some consideration.',
      ],
      checklist: [
        {
          id: 'parallel',
          title: 'Parallelism rule',
          text: 'View A and View B are both full clauses with their own subject + verb (e.g. “zoos should be dismantled” / “they serve a valuable role in…”) — never a bare noun phrase on one side. The single most common error in testing.',
        },
        {
          id: 'concession',
          title: 'Concession-direction rule',
          text: 'Condition concedes merit to the view OPPOSITE to your Position — it doesn’t double down on the same side.',
        },
        { id: 'total', title: 'Total target', text: '~52–60 words (18 fixed template words + the 4 blanks above).' },
      ],
    },
    {
      id: 'body1',
      section: 'body1',
      label: 'View 1',
      total: range(80, 90),
      parts: [
        'Proponents of this view argue that ',
        {
          id: 'claim',
          label: 'Claim',
          words: about(15),
          hint: 'ONE idea. The idea/institution is the grammatical subject — never “the people who…”.',
          flags: [
            {
              phrases: ['people who', 'those who'],
              message: 'Subject looks like a group of people — make the idea/institution the subject.',
            },
          ],
        },
        '. This is because ',
        { id: 'argue1', label: 'Argue 1', words: about(11), hint: 'The mechanism: why the claim holds.' },
        '. Consequently, ',
        {
          id: 'argue2',
          label: 'Argue 2',
          words: about(11),
          hint: 'Continue the SAME mechanism as Argue 1 — not a different point.',
        },
        '. For example, ',
        { id: 'sample', label: 'Sample', words: about(19), hint: 'One concrete, specific case.' },
        '. Overall, this clearly demonstrates that ',
        {
          id: 'closer',
          label: 'Closer',
          words: about(15),
          hint: 'No “but / however / although” — Discussion Body 1 gets no concession.',
          flags: [
            {
              phrases: CONCESSION_WORDS,
              message: 'Smuggled concession — Body 1’s Closer bans “but / however / although”.',
            },
          ],
        },
        '.',
      ],
      checklist: [
        {
          id: 'oneClaim',
          title: 'One-claim rule',
          text: 'Claim expresses exactly ONE idea. If Argue 1 and Argue 2 end up supporting two different facets, the Claim is doing too much — cut it back to one facet.',
        },
        {
          id: 'subject',
          title: 'Idea-as-subject rule',
          text: 'Claim’s grammatical subject is the idea/institution, never a group of people.',
        },
        { id: 'noConcession', title: 'No smuggled concession', text: 'Closer bans “but / however / although”.' },
        {
          id: 'fairness',
          title: 'Fairness test',
          text: 'Could someone who genuinely holds View 1 read this and feel fairly represented?',
        },
        { id: 'total', title: 'Total target', text: '~85 words.' },
      ],
    },
    {
      id: 'body2',
      section: 'body2',
      label: 'View 2',
      total: range(80, 90),
      parts: [
        'Opponents of this view, however, maintain that ',
        {
          id: 'claim',
          label: 'Claim',
          words: about(14),
          hint: 'Genuinely distinct from Body 1’s claim — a different angle, one idea.',
        },
        '. This arises because ',
        { id: 'argue1', label: 'Argue 1', words: about(11), hint: 'The mechanism: why the claim holds.' },
        '. This, in turn, ',
        {
          id: 'argue2',
          label: 'Argue 2',
          words: about(10),
          hint: 'Continue the SAME mechanism as Argue 1.',
        },
        '. For example, ',
        { id: 'sample', label: 'Sample', words: about(19), hint: 'One concrete, specific case.' },
        '. Overall, this equally demonstrates that ',
        {
          id: 'closer',
          label: 'Closer',
          words: about(15),
          hint: 'Just as fair and strong as Body 1’s Closer.',
        },
        '.',
      ],
      checklist: [
        {
          id: 'angle',
          title: 'Different-angle test (P1)',
          text: 'Could you delete Body 1 and Body 2 would still stand as its own complete argument?',
        },
        {
          id: 'oneClaim',
          title: 'One-claim rule',
          text: 'Same as Body 1 — don’t let Claim smuggle in two facets.',
        },
        {
          id: 'equal',
          title: 'Equal-weight rule (I1)',
          text: 'Word count and depth roughly match Body 1’s.',
        },
        {
          id: 'noBias',
          title: 'No-bias-leak rule (R1)',
          text: 'Closer reads just as fair and strong as Body 1’s Closer, regardless of your private opinion.',
        },
        { id: 'total', title: 'Total target', text: '~85 words.' },
      ],
    },
    {
      id: 'conclusion',
      section: 'conclusion',
      total: range(40, 50),
      parts: [
        'In conclusion, ',
        {
          id: 'echo',
          label: 'Echo',
          words: range(22, 25),
          hint: 'Same position AND same scope as the intro’s Position/Condition — reworded, not copied.',
        },
        '. Ultimately, ',
        {
          id: 'lock',
          label: 'Lock',
          words: range(17, 20),
          hint: 'One decisive closing line. No hedging, nothing not already argued.',
          flags: [{ phrases: HEDGES, message: 'Hedging in the Lock — make it decisive (L1).' }],
        },
        '.',
      ],
      checklist: [
        {
          id: 'noNew',
          title: 'No new content (S1)',
          text: 'Nothing here is an idea not already raised in Body 1 / Body 2.',
        },
        {
          id: 'scope',
          title: 'Same-scope rule',
          text: 'Echo matches the intro’s Position in both side AND scope (if the intro said “restrictive/small zoos”, Echo must not broaden to “all zoos”).',
        },
        {
          id: 'job',
          title: 'Discussion-specific job (A1)',
          text: 'State your opinion clearly — don’t re-summarize “some believe X, others Y”; the intro already did that.',
        },
        { id: 'hedge', title: 'No hedging (L1)', text: 'No “perhaps”, “to some extent”, etc. in Lock.' },
        { id: 'total', title: 'Total target', text: '~45 words, 2 sentences only.' },
      ],
    },
  ],
}

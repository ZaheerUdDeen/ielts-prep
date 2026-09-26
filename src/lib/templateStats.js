// Word counting + live checks for fill-in-the-blank templates.

export function countWords(text) {
  return String(text || '')
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length
}

/** 'empty' | 'under' | 'ok' | 'over' against a { min, max } target. */
export function statusOf(n, { min, max }) {
  if (!n) return 'empty'
  if (n < min) return 'under'
  if (n > max) return 'over'
  return 'ok'
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Warnings for one blank's text: its data-defined flags + a punctuation check. */
export function warningsFor(blank, text) {
  const out = []
  if (!text) return out
  for (const flag of blank.flags || []) {
    const hits = flag.phrases.filter((p) =>
      new RegExp(`(^|[^\\p{L}])${escape(p).replace(/ /g, '\\s+')}(?=$|[^\\p{L}])`, 'iu').test(text),
    )
    if (hits.length) out.push({ hits, message: flag.message })
  }
  if (/[.!?]\s+\S/.test(text)) {
    out.push({ message: 'This blank sits inside one sentence — no full stop in the middle of it.' })
  }
  return out
}

/**
 * Word totals for a paragraph. `shown` is fixed template words + typed words,
 * but stays 0 until something has been typed (an untouched paragraph isn't
 * "18 words, under target").
 */
export function paragraphStats(paragraph, draft) {
  let fixed = 0
  let typed = 0
  for (const part of paragraph.parts) {
    if (typeof part === 'string') fixed += countWords(part)
    else typed += countWords(draft?.[part.id])
  }
  return { fixed, typed, shown: typed ? fixed + typed : 0 }
}

/** Whole-essay word count for one template type. */
export function essayWords(template, drafts) {
  const d = drafts[template.type] || {}
  return template.paragraphs.reduce((sum, p) => sum + paragraphStats(p, d[p.id]).shown, 0)
}

// Fill-in-the-blank essay templates, one file per essay type.
// To add a type: create `<type>.js` shaped like `discussion.js`, import it
// here and append it to `templates`. The screen and entry points pick it up.
import discussion from './discussion.js'

export const templates = [discussion]

export function findTemplate(type) {
  return templates.find((t) => t.type === type)
}

/** The blanks of a paragraph, in reading order. */
export function blanksOf(paragraph) {
  return paragraph.parts.filter((p) => typeof p === 'object')
}

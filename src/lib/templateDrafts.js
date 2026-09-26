// Fill-in-the-blank template drafts, persisted in localStorage (same
// external-store pattern as mastery.js). Draft text, not booleans:
//   drafts: { [type]: { [paragraphId]: { [blankId]: 'typed text' } } }
//   checks: { [type]: { [paragraphId]: { [checklistId]: true } } }
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'ielts-prep:v1:template-drafts'
const listeners = new Set()
const EMPTY = { drafts: {}, checks: {} }

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!raw || typeof raw !== 'object') return EMPTY
    return {
      drafts: raw.drafts && typeof raw.drafts === 'object' ? raw.drafts : {},
      checks: raw.checks && typeof raw.checks === 'object' ? raw.checks : {},
    }
  } catch {
    return EMPTY
  }
}

let snapshot = read()

function write(next) {
  snapshot = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* storage full or disabled: keep in-memory state */
  }
  listeners.forEach((l) => l())
}

function subscribe(cb) {
  listeners.add(cb)
  const onStorage = (e) => {
    if (e.key === STORAGE_KEY) {
      snapshot = read()
      cb()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
  }
}

export function useTemplateDrafts() {
  return useSyncExternalStore(subscribe, () => snapshot, () => snapshot)
}

/** Set one nested leaf: snapshot[branch][type][paragraph][leaf] = value. */
function setLeaf(branch, type, paragraph, leaf, value) {
  const byType = snapshot[branch][type] || {}
  const byPara = { ...(byType[paragraph] || {}) }
  if (value) byPara[leaf] = value
  else delete byPara[leaf]
  write({ ...snapshot, [branch]: { ...snapshot[branch], [type]: { ...byType, [paragraph]: byPara } } })
}

export function setBlank(type, paragraph, blank, text) {
  setLeaf('drafts', type, paragraph, blank, text)
}

export function toggleCheck(type, paragraph, id) {
  setLeaf('checks', type, paragraph, id, !snapshot.checks[type]?.[paragraph]?.[id])
}

/** Clear every blank and tick for one essay type. */
export function resetTemplate(type) {
  const drafts = { ...snapshot.drafts }
  const checks = { ...snapshot.checks }
  delete drafts[type]
  delete checks[type]
  write({ drafts, checks })
}

// Vocabulary trainer progress, persisted in localStorage (same pattern as mastery.js),
// plus a manual JSON export/import so progress can move between devices.
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'ielts-prep:v1:vocab'
const EXPORT_KIND = 'ielts-prep/vocab-progress'
const listeners = new Set()

// words: { [word]: { c: correct, x: wrong, run: correct-in-a-row, miss: last attempt was wrong } }
const EMPTY = { attempted: 0, correct: 0, wrong: 0, streak: 0, best: 0, words: {}, level: 'all' }

function normalise(raw) {
  const n = (v) => (Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0)
  const words = {}
  if (raw.words && typeof raw.words === 'object') {
    for (const [w, h] of Object.entries(raw.words)) {
      if (h && typeof h === 'object') words[w] = { c: n(h.c), x: n(h.x), run: n(h.run), miss: !!h.miss }
    }
  }
  return {
    attempted: n(raw.attempted),
    correct: n(raw.correct),
    wrong: n(raw.wrong),
    streak: n(raw.streak),
    best: n(raw.best),
    words,
    level: typeof raw.level === 'string' ? raw.level : 'all',
  }
}

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return raw && typeof raw === 'object' ? normalise(raw) : EMPTY
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

export function useVocabProgress() {
  return useSyncExternalStore(subscribe, () => snapshot, () => snapshot)
}

export function recordAttempt(word, ok) {
  const prev = snapshot.words[word] || { c: 0, x: 0, run: 0, miss: false }
  const streak = ok ? snapshot.streak + 1 : 0
  write({
    ...snapshot,
    attempted: snapshot.attempted + 1,
    correct: snapshot.correct + (ok ? 1 : 0),
    wrong: snapshot.wrong + (ok ? 0 : 1),
    streak,
    best: Math.max(snapshot.best, streak),
    words: {
      ...snapshot.words,
      [word]: ok
        ? { c: prev.c + 1, x: prev.x, run: prev.run + 1, miss: false }
        : { c: prev.c, x: prev.x + 1, run: 0, miss: true },
    },
  })
}

export function setLevel(level) {
  write({ ...snapshot, level })
}

export function resetProgress() {
  write({ ...EMPTY, level: snapshot.level })
}

/** Download the current progress as a dated .json file. */
export function exportProgress() {
  const now = new Date()
  const pad = (v) => String(v).padStart(2, '0')
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  const payload = { kind: EXPORT_KIND, version: 1, exportedAt: new Date().toISOString(), progress: snapshot }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `vocab-progress-${date}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * Restore progress from the text of an exported file. Throws an Error with a
 * user-facing message if the file doesn't look like an export; state is only
 * replaced once the whole file has validated.
 */
export function importProgress(text) {
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('That file isn’t valid JSON.')
  }
  const p = data && data.kind === EXPORT_KIND ? data.progress : null
  const keys = ['attempted', 'correct', 'wrong', 'words']
  if (!p || typeof p !== 'object' || !keys.every((k) => k in p) || typeof p.words !== 'object') {
    throw new Error('That file doesn’t look like a vocabulary progress export.')
  }
  const next = normalise(p)
  write(next)
  return next
}

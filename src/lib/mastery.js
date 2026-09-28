// "Known" / "still learning" state, persisted in localStorage.
import { useSyncExternalStore, useCallback } from 'react'

const STORAGE_KEY = 'ielts-prep:v1:mastered'
const listeners = new Set()

function read() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

// One-time cleanup (2026-09): Body 2's PAIR deck was retired and `body2` now
// shows the CASE deck. Old `writing/body2:*` keys were PAIR progress — and
// PAIR's A1/A2 share ids with CASE's A1/A2 — so they'd misreport Body 2 as
// partly mastered. Drop them once; Body 1's keys are untouched.
const PAIR_RETIRED_KEY = 'ielts-prep:v1:migrated-pair-retired'
function dropPairProgress(state) {
  try {
    if (localStorage.getItem(PAIR_RETIRED_KEY)) return state
    const next = Object.fromEntries(Object.entries(state).filter(([k]) => !k.startsWith('writing/body2:')))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    localStorage.setItem(PAIR_RETIRED_KEY, '1')
    return next
  } catch {
    return state
  }
}

let snapshot = dropPairProgress(read())

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

export function useMastery() {
  const mastered = useSyncExternalStore(subscribe, () => snapshot, () => snapshot)
  const toggle = useCallback((key) => {
    const next = { ...snapshot }
    if (next[key]) delete next[key]
    else next[key] = true
    write(next)
  }, [])
  return { mastered, toggle }
}

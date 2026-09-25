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

// Tiny hash router. Hash URLs (#/writing/intro) work on GitHub Pages
// without any 404.html redirect tricks.
import { useSyncExternalStore } from 'react'

function subscribe(cb) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

function getHash() {
  return window.location.hash.replace(/^#/, '') || '/'
}

export function useRoute() {
  const hash = useSyncExternalStore(subscribe, getHash, () => '/')
  const [path, query = ''] = hash.split('?')
  return {
    parts: path.split('/').filter(Boolean),
    params: new URLSearchParams(query),
  }
}

export function navigate(path) {
  window.location.hash = path
}

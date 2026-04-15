import { useCallback, useEffect, useState } from 'react'
import { AUTHOR_STORAGE_KEY } from '../constants/storageKeys'

function readStoredAuthor(): string {
  if (typeof window === 'undefined') return 'You'
  return window.localStorage.getItem(AUTHOR_STORAGE_KEY) ?? 'You'
}

// Display name in localStorage, POST body uses it as `author`, bubbles use it to spot "you"
export function useLocalStorageAuthor() {
  const [author, setAuthorState] = useState<string>(readStoredAuthor)

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === AUTHOR_STORAGE_KEY || e.key === null) {
        setAuthorState(readStoredAuthor())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setAuthor = useCallback((next: string) => {
    window.localStorage.setItem(AUTHOR_STORAGE_KEY, next)
    setAuthorState(next)
  }, [])

  return { author, setAuthor }
}

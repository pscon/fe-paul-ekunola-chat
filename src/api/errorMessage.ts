import { ApiError } from './client'

// POST/GET 400 body shape from the backend API
type ValidationItem = { field?: string; message?: string }

function parseErrorPayload(body: string): string | null {
  try {
    const json = JSON.parse(body) as unknown
    if (!json || typeof json !== 'object') return null
    const err = (json as { error?: { message?: unknown } }).error
    if (!err?.message) return null

    if (Array.isArray(err.message)) {
      const items = err.message as ValidationItem[]
      const lines = items.map((i) => i.message).filter(Boolean)
      if (lines.length) return lines.join(' · ')
    }
    if (typeof err.message === 'string') return err.message
  } catch {
    return null
  }
  return null
}

// Turns fetch failures + API JSON into a single line for toasts / alerts
export function formatErrorForToast(error: unknown): string {
  if (error instanceof ApiError && error.body) {
    const parsed = parseErrorPayload(error.body)
    if (parsed) return parsed
    return error.message
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong. Try again.'
}

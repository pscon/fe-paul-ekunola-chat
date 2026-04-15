import { getEnv } from '../constants/env'

export class ApiError extends Error {
  status: number
  body?: string

  constructor(message: string, status: number, body?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { apiBaseUrl, authToken } = getEnv()
  const url = `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${authToken}`)
  if (init.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(url, { ...init, headers })
  const text = await response.text()
  if (!response.ok) {
    throw new ApiError(
      `Request failed: ${response.status} ${response.statusText}`,
      response.status,
      text,
    )
  }
  if (!text) {
    return undefined as T
  }
  try {
    return JSON.parse(text) as T
  } catch {
    const looksLikeHtml = /^\s*</.test(text)
    const hint = looksLikeHtml
      ? ' Response looks like HTML — check VITE_API_BASE_URL points at the API (e.g. http://localhost:3000), not the Vite dev server. Restart npm run dev after changing .env.'
      : ''
    throw new ApiError(`Invalid JSON response.${hint}`, response.status, text)
  }
}

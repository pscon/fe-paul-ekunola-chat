import type { ChatMessage } from '../types/message'
import type { MessageDto } from '../types/api'
import { decodeHtmlEntities } from '../utils'
import { apiRequest } from './client'

export function mapApiMessage(raw: MessageDto, index: number): ChatMessage {
  const rawId = raw.id ?? raw._id
  const id = rawId !== undefined && rawId !== '' ? String(rawId) : `msg-${index}`
  const text = decodeHtmlEntities(raw.message ?? raw.text ?? raw.body ?? '')
  const author = decodeHtmlEntities(raw.author?.trim() || 'Unknown')
  const iso = raw.createdAt ?? raw.created_at ?? raw.timestamp
  const createdAt = iso ? new Date(iso) : new Date()
  return { id, text, author, createdAt }
}

function normalizeMessagesPayload(data: unknown): ChatMessage[] {
  if (Array.isArray(data)) {
    return data.map((item, i) => mapApiMessage(item as MessageDto, i))
  }
  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>
    const nested = record.messages ?? record.data ?? record.items
    if (Array.isArray(nested)) {
      return nested.map((item, i) => mapApiMessage(item as MessageDto, i))
    }
  }
  return []
}

export type ListMessagesParams = {
  limit?: number
  after?: string
}

export async function listMessages(params?: ListMessagesParams): Promise<ChatMessage[]> {
  const search = new URLSearchParams()
  if (params?.limit !== undefined) search.set('limit', String(params.limit))
  if (params?.after) search.set('after', params.after)
  const qs = search.toString()
  const path = `/api/v1/messages${qs ? `?${qs}` : ''}`
  const data = await apiRequest<unknown>(path, { method: 'GET' })
  return normalizeMessagesPayload(data)
}

export type CreateMessageBody = {
  message: string
  author: string
}

export async function createMessage(body: CreateMessageBody): Promise<void> {
  await apiRequest<unknown>('/api/v1/messages', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

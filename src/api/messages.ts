import type { ChatMessage } from '../types/message'
import type { MessageDto } from '../types/api'
import { decodeHtmlEntities } from '../utils'
import { apiRequest } from './client'

export function mapApiMessage(raw: MessageDto, index: number): ChatMessage {
  const id = raw._id ? String(raw._id) : `msg-${index}`
  const text = decodeHtmlEntities(raw.message ?? '')
  const author = decodeHtmlEntities(raw.author?.trim() || 'Unknown')
  const createdAt = raw.createdAt ? new Date(raw.createdAt) : new Date()
  return { id, text, author, createdAt }
}

function normalizeMessagesPayload(data: unknown): ChatMessage[] {
  if (!Array.isArray(data)) return []
  return data.map((item, i) => mapApiMessage(item as MessageDto, i))
}

export type ListMessagesParams = {
  limit?: number
  after?: string
  before?: string
}

export async function listMessages(params?: ListMessagesParams): Promise<ChatMessage[]> {
  const search = new URLSearchParams()
  if (params?.limit !== undefined) search.set('limit', String(params.limit))
  if (params?.after) search.set('after', params.after)
  if (params?.before) search.set('before', params.before)
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

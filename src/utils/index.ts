import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { decode } from 'he'
import { twMerge } from 'tailwind-merge'
import type { ChatMessage } from '../types/message'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Decodes HTML entities in API/plain text for safe display.
export function decodeHtmlEntities(value: string): string {
  return decode(value)
}

// Formats time like "10 Mar 2018 9:55"
export function formatMessageTime(date: Date): string {
  return format(date, 'd MMM yyyy HH:mm')
}

export function isOwnMessage(messageAuthor: string, currentAuthor: string): boolean {
  return messageAuthor.trim().toLowerCase() === currentAuthor.trim().toLowerCase()
}

// API returns reverse chronological; chat UI shows oldest at top.
export function sortMessagesChronological(messages: ChatMessage[]): ChatMessage[] {
  return [...messages].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}

export function toError(value: unknown): Error | null {
  if (value === null || value === undefined) return null
  if (value instanceof Error) return value
  return new Error(typeof value === 'string' ? value : JSON.stringify(value))
}

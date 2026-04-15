import { useEffect, useRef } from 'react'
import type { ChatMessage } from '../../../types/message'
import { formatMessageTime, isOwnMessage } from '../../../utils'
import { ChatSkeleton } from './ChatSkeleton'
import { MessageBubble } from './MessageBubble'

export type MessageListProps = {
  messages: ChatMessage[]
  currentAuthor: string
  isLoading: boolean
  errorMessage: string | null
}

export function MessageList({ messages, currentAuthor, isLoading, errorMessage }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) {
    return <ChatSkeleton />
  }

  if (errorMessage) {
    return (
      <div
        className="border-chat-send/40 bg-chat-surface text-chat-body m-2 rounded border px-3 py-4 text-sm shadow-sm"
        role="alert"
      >
        <p className="font-medium">Could not load messages.</p>
        <p className="text-chat-muted mt-1">{errorMessage}</p>
        <p className="text-chat-muted mt-2 text-xs">
          Ensure the API is running and <code className="rounded bg-black/5 px-1">.env</code> matches{' '}
          <code className="rounded bg-black/5 px-1">.env.example</code>.
        </p>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-chat-muted flex flex-1 items-center justify-center py-12 text-sm">
        No messages yet. Say hello below.
      </div>
    )
  }

  return (
    <section
      className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
      aria-label="Chat messages"
      aria-live="polite"
    >
      <ul className="flex flex-col gap-4 pb-4">
        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            author={m.author}
            text={m.text}
            timeLabel={formatMessageTime(m.createdAt)}
            isOwn={isOwnMessage(m.author, currentAuthor)}
          />
        ))}
      </ul>
      <div ref={bottomRef} />
    </section>
  )
}

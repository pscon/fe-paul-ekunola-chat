import { useEffect, useRef } from 'react'
import type { ChatMessage } from '../../../types/message'
import { formatMessageTime, isOwnMessage } from '../../../utils'
import { ChatSkeleton } from './ChatSkeleton'
import { MessageLoadError } from './MessageLoadError'
import { MessageBubble } from './MessageBubble'

export type MessageListProps = {
  messages: ChatMessage[]
  currentAuthor: string
  isLoading: boolean
  errorMessage: string | null
  onRetry: () => void
  isRetrying: boolean
}

export function MessageList({
  messages,
  currentAuthor,
  isLoading,
  errorMessage,
  onRetry,
  isRetrying,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) {
    return <ChatSkeleton />
  }

  if (errorMessage) {
    return (
      <MessageLoadError technicalMessage={errorMessage} onRetry={onRetry} isRetrying={isRetrying} />
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

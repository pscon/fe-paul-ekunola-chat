import { memo } from 'react'
import { cn } from '../../../utils'

export type MessageBubbleProps = {
  author: string
  text: string
  timeLabel: string
  isOwn: boolean
}

export const MessageBubble = memo(function MessageBubble({
  author,
  text,
  timeLabel,
  isOwn,
}: MessageBubbleProps) {
  if (isOwn) {
    return (
      <li className="flex justify-end">
        <article
          className={cn(
            'w-fit max-w-[min(100%,26.25rem)] rounded-md border p-4 shadow-sm',
            'border-bubble-outgoing-border bg-bubble-outgoing text-chat-body',
          )}
          aria-label={`You said: ${text}`}
        >
          <p className="text-chat-muted mb-1 text-xs">You</p>
          <p className="whitespace-pre-wrap break-words text-sm leading-snug">{text}</p>
          <p className="text-chat-muted mt-2 text-right text-xs">{timeLabel}</p>
        </article>
      </li>
    )
  }

  return (
    <li className="flex justify-start">
      <article
        className={cn(
          'w-fit max-w-[min(100%,40rem)] rounded-md border p-4 shadow-sm',
          'border-bubble-incoming-border bg-bubble-incoming text-chat-body',
        )}
        aria-label={`${author} said: ${text}`}
      >
        <p className="text-chat-muted mb-1 text-xs">{author}</p>
        <p className="whitespace-pre-wrap break-words text-sm leading-snug">{text}</p>
        <p className="text-chat-muted mt-2 text-xs">{timeLabel}</p>
      </article>
    </li>
  )
})

import { cn } from '../../../utils'

function SkeletonBubble({ outgoing }: { outgoing?: boolean }) {
  return (
    <li className={cn('flex', outgoing ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'w-fit rounded-md border p-4 shadow-sm animate-pulse',
          outgoing
            ? 'max-w-[min(100%,26.25rem)] border-bubble-outgoing-border/60 bg-bubble-outgoing/70'
            : 'max-w-[min(100%,40rem)] border-bubble-incoming-border bg-bubble-incoming',
        )}
        aria-hidden
      >
        {!outgoing && <div className="mb-2 h-3 w-16 rounded bg-chat-muted/35" />}
        <div className="space-y-2">
          <div className="h-3 max-w-[min(100%,280px)] rounded bg-chat-muted/25" />
          <div className="h-3 max-w-[min(100%,200px)] rounded bg-chat-muted/20" />
        </div>
        <div className={cn('mt-3 h-2.5 w-28 rounded bg-chat-muted/20', outgoing && 'ml-auto')} />
      </div>
    </li>
  )
}

export function ChatSkeleton() {
  return (
    <section
      className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-hidden"
      role="status"
      aria-busy="true"
      aria-label="Loading messages"
    >
      <ul className="flex flex-col gap-4 pb-4">
        <SkeletonBubble />
        <SkeletonBubble outgoing />
        <SkeletonBubble />
        <SkeletonBubble />
        <SkeletonBubble outgoing />
      </ul>
    </section>
  )
}

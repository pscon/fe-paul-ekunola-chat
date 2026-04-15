import { type FormEvent, useRef, useState } from 'react'
import { cn } from '../../../utils'
import { Spinner } from './Spinner'

export type ChatInputProps = {
  onSend: (text: string) => Promise<void>
  isSending?: boolean
}

export function ChatInput({ onSend, isSending = false }: ChatInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || isSending) return
    try {
      await onSend(trimmed)
      setValue('')
      queueMicrotask(() => inputRef.current?.focus())
    } catch {
      // keep draft so user can fix validation / retry after a failed POST
      queueMicrotask(() => inputRef.current?.focus())
    }
  }

  const empty = value.trim() === ''
  const submitDisabled = isSending || empty

  return (
    <form onSubmit={handleSubmit} className="flex gap-2" aria-busy={isSending}>
      <label htmlFor="chat-message" className="sr-only">
        Message
      </label>
      <input
        ref={inputRef}
        id="chat-message"
        name="message"
        type="text"
        autoComplete="off"
        placeholder="Message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isSending}
        className={cn(
          'min-h-11 flex-1 rounded-md border border-white/40 bg-white px-3 py-2 text-sm text-chat-body shadow-inner outline-none',
          'placeholder:text-chat-muted focus-visible:ring-2 focus-visible:ring-white/80',
          isSending && 'cursor-wait opacity-80',
        )}
      />
      <button
        type="submit"
        disabled={submitDisabled}
        aria-label={isSending ? 'Sending message' : 'Send message'}
        className={cn(
          'flex min-h-11 min-w-[7.25rem] shrink-0 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors',
          'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-chat-footer',
          isSending
            ? 'bg-chat-send cursor-wait'
            : 'bg-chat-send hover:bg-chat-send-hover disabled:opacity-50',
        )}
      >
        {isSending ? (
          <>
            <Spinner className="h-4 w-4 text-white" />
            <span>Sending…</span>
          </>
        ) : (
          'Send'
        )}
      </button>
    </form>
  )
}

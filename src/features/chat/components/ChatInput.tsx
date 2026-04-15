import { type FormEvent, useRef, useState } from 'react'
import { cn } from '../../../utils'

export type ChatInputProps = {
  onSend: (text: string) => Promise<void>
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    await onSend(trimmed)
    setValue('')
    queueMicrotask(() => inputRef.current?.focus())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
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
        disabled={disabled}
        className={cn(
          'min-h-11 flex-1 rounded-md border border-white/40 bg-white px-3 py-2 text-sm text-chat-body shadow-inner outline-none',
          'placeholder:text-chat-muted focus-visible:ring-2 focus-visible:ring-white/80',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      />
      <button
        type="submit"
        disabled={disabled || value.trim() === ''}
        className={cn(
          'bg-chat-send hover:bg-chat-send-hover min-h-11 shrink-0 rounded-md px-5 text-sm font-semibold text-white transition-colors',
          'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-chat-footer',
          'disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        Send
      </button>
    </form>
  )
}

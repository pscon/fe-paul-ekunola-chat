import { useCallback } from 'react'
import { toast } from 'sonner'
import { formatErrorForToast } from '../../api/errorMessage'
import { DEFAULT_AUTHOR_NAME } from '../../constants/storageKeys'
import { useLocalStorageAuthor } from '../../hooks/useLocalStorageAuthor'
import { useMessages } from '../../hooks/useMessages'
import { useSendMessage } from '../../hooks/useSendMessage'
import { ChatInput } from './components/ChatInput'
import { MessageList } from './components/MessageList'

export function ChatPage() {
  const { author, setAuthor } = useLocalStorageAuthor()
  const { data: messages = [], isPending, error: messagesError } = useMessages()
  const sendMessage = useSendMessage()

  const handleSend = useCallback(
    async (text: string) => {
      const name = author.trim()
      if (!name) {
        toast.error('Add your name in the header before sending a message.')
        throw new Error('Author required')
      }
      try {
        await sendMessage.mutateAsync({ message: text, author: name })
      } catch (e) {
        toast.error(formatErrorForToast(e))
        throw e
      }
    },
    [author, sendMessage],
  )

  const loadErrorMessage = messagesError ? formatErrorForToast(messagesError) : null

  return (
    <div className="bg-chat-bg flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="bg-chat-header-bar shrink-0 text-white shadow-sm">
        <div className="mx-auto flex w-full max-w-[640px] flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-semibold tracking-tight">Chat</h1>
          <div className="flex flex-col gap-1 sm:items-end">
            <label htmlFor="author-name" className="text-xs text-white/90">
              Your name
            </label>
            <input
              id="author-name"
              name="author"
              type="text"
              autoComplete="nickname"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="min-h-9 w-full min-w-48 rounded border border-white/40 bg-white/10 px-2 py-1 text-sm text-white placeholder:text-white/60 outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:max-w-xs"
              placeholder={`e.g. ${DEFAULT_AUTHOR_NAME}`}
            />
          </div>
        </div>
      </header>

      <main className="chat-pattern-bg flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="mx-auto flex min-h-0 w-full max-w-[640px] flex-1 flex-col px-6 pt-4">
          <MessageList
            messages={messages}
            currentAuthor={author}
            isLoading={isPending}
            errorMessage={loadErrorMessage}
          />
        </div>
      </main>

      <footer className="bg-chat-footer shrink-0 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
        <div className="mx-auto w-full max-w-[640px] px-6 py-2">
          <ChatInput onSend={handleSend} isSending={sendMessage.isPending} />
        </div>
      </footer>
    </div>
  )
}

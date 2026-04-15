import { WarningTriangleIcon } from '../../../assets/icons'
import { Spinner } from './Spinner'

export type MessageLoadErrorProps = {
  technicalMessage: string
  onRetry: () => void
  isRetrying: boolean
}

export function MessageLoadError({ technicalMessage, onRetry, isRetrying }: MessageLoadErrorProps) {
  return (
    <div
      className="flex min-h-0 flex-1 flex-col items-center justify-center px-2 py-8"
      role="alert"
    >
      <div className="border-chat-muted/25 w-full max-w-md rounded-xl border bg-chat-surface px-6 py-8 text-center shadow-lg">
        <div
          className="bg-chat-send/10 text-chat-send mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          aria-hidden
        >
          <WarningTriangleIcon className="h-8 w-8" />
        </div>

        <h2 className="text-chat-body text-lg font-semibold tracking-tight">Unable to load messages</h2>
        <p className="text-chat-muted mt-3 text-sm leading-relaxed">
          We couldn&apos;t reach the chat API. Start the backend from the challenge repo, copy{' '}
          <code className="rounded bg-black/[0.06] px-1.5 py-0.5 text-xs font-medium text-chat-body">
            .env.example
          </code>{' '}
          to{' '}
          <code className="rounded bg-black/[0.06] px-1.5 py-0.5 text-xs font-medium text-chat-body">
            .env
          </code>
          , then restart this app. Setup steps are in the README.
        </p>

        <button
          type="button"
          onClick={() => void onRetry()}
          disabled={isRetrying}
          className="bg-chat-footer cursor-pointer hover:bg-chat-footer/90 mt-6 inline-flex min-h-11 min-w-[8.5rem] items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isRetrying ? (
            <>
              <Spinner className="h-4 w-4 text-white" />
              Retrying…
            </>
          ) : (
            'Try again'
          )}
        </button>

        <details className="border-chat-muted/20 mt-8 border-t pt-4 text-left">
          <summary className="text-chat-muted cursor-pointer text-xs font-medium select-none">
            Technical details
          </summary>
          <pre className="text-chat-muted mt-2 max-h-32 overflow-x-auto overflow-y-auto rounded-md bg-black/[0.04] p-3 text-left text-[11px] leading-relaxed whitespace-pre-wrap">
            {technicalMessage}
          </pre>
        </details>
      </div>
    </div>
  )
}

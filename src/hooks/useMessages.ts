import { useQuery } from '@tanstack/react-query'
import { listMessages } from '../api/messages'
import { queryKeys } from '../constants/queryKeys'
import { sortMessagesChronological } from '../utils'

const DEFAULT_LIMIT = 50

// Loads the thread from the API
export function useMessages() {
  return useQuery({
    queryKey: queryKeys.messages.list({ limit: DEFAULT_LIMIT }),
    queryFn: async () => {
      const raw = await listMessages({ limit: DEFAULT_LIMIT })
      return sortMessagesChronological(raw)
    },
  })
}

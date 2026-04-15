import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMessage } from '../api/messages'
import { queryKeys } from '../constants/queryKeys'

export function useSendMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createMessage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.messages.all })
    },
  })
}

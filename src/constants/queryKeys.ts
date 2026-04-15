// TanStack Query keys 
export const queryKeys = {
  messages: {
    all: ['messages'] as const,
    list: (params?: { limit?: number; after?: string }) =>
      [...queryKeys.messages.all, 'list', params] as const,
  },
} as const

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL

interface Conversation {
  id: string;
  messages: { role: string; content: string }[];
}

export const assistantApi = createApi({
  reducerPath: 'assistantApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_BACKEND_URL}/assistant`, credentials: 'include' }),
  tagTypes: ['Conversation'],
  endpoints: (builder) => ({
    getConversation: builder.query<Conversation['messages'][], void>({
      query: () => '/conversation',
      providesTags: ['Conversation'],
    }),
    saveConversation: builder.mutation<{ success: boolean }, any[]>({
      query: (conversation) => ({
        url: '/conversation',
        method: 'POST',
        body: { conversation },
      }),
      invalidatesTags: ['Conversation'],
    }),
  }),
})

export const { useGetConversationQuery, useSaveConversationMutation } = assistantApi
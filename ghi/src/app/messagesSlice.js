import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        body: data,
        credentials: "include",
        method: "post",
      }),
      invalidatesTags: ["Message"],
    }),

    getAllMessages: builder.query({
      query: () => "/messages",
      providesTags: ["Message"],
    }),

    getMessageById: builder.query({
      query: (id) => `/messages/${id}`,
    }),

    updateMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/messages/${id}`,
        body: data,
        credentials: "include",
        method: "PUT",
      }),
      invalidatesTags: ["Message"],
    }),

    deleteMessage: builder.mutation({
      query: ({ id }) => ({
        url: `/messages/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetAllMessagesQuery,
  useGetMessageByIdQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;

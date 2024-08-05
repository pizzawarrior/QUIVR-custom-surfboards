import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  tagTypes: ["Account", "Token"],
  endpoints: (builder) => ({
    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      transformResponse: (response) => response?.account || null,
      providesTags: ["Account"],
    }),

    signup: builder.mutation({
      query: (body) => ({
        url: "/accounts",
        body,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),

    signupWithoutLogin: builder.mutation({
      query: (body) => ({
        url: "/accounts/add",
        body,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),

    login: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);
        return {
          url: "/token",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Account"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Account", "Token"],
    }),

    getAccountsByUsername: builder.query({
      query: (username) => `/accounts/username/${username}`,
    }),

    getAllAccounts: builder.query({
      query: () => ({
        url: "/accounts",
        credentials: "include",
      }),
      providesTags: ["Account"],
    }),

    getAccountsByRole: builder.query({
      query: (role) => ({
        url: `/accounts/${role}`,
        credentials: "include",
      }),
    }),

    updateAccount: builder.mutation({
      query: ({ username, data }) => ({
        url: `/accounts/${username}`,
        body: data,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),

    deleteAccount: builder.mutation({
      query: (username) => ({
        url: `/accounts/${username}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Account", "Token"],
    }),
  }),
});

export const {
  useGetTokenQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useSignupWithoutLoginMutation,
  useGetAllAccountsQuery,
  useGetAccountsByRoleQuery,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = authApi;

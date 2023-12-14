import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
    }),
    tagTypes: ['Review'],
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (data) => ({
                url: '/reviews',
                body: data,
                credentials: 'include',
                method: 'post',
            }),
            invalidatesTags: ['Review'],
        }),

        getAllReviews: builder.query({
            query: () => '/reviews',
            providesTags: ['Review'],
        }),

        getReviewById: builder.query({
            query: (id) => `/reviews/${id}`,
        }),

        updateReview: builder.mutation({
            query: ({ id, data }) => ({
                url: `/reviews/${id}`,
                body: data,
                credentials: 'include',
                method: 'PUT',
            }),
            invalidatesTags: ['Review'],
        }),

        deleteReview: builder.mutation({
            query: ({ id }) => ({
                url: `/reviews/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Review'],
        }),
    }),
});

export const {
    useCreateReviewMutation,
    useGetAllReviewsQuery,
    useGetReviewByIdQuery,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewsApi;

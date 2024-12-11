import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://steamshop-api.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getGames: builder.query({
      query: (offset) => `/games?offset=${offset}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      keepUnusedDataFor: 300,
    }),
    getGameById: builder.query({
      query: (id) => `/games/${id}`,
    }),
    getGamesByName: builder.query({
      query: (name) => `/games/${name}`,
    }),
  }),
})

export const { useGetGamesQuery, useGetGameByIdQuery, useGetGamesByNameQuery } =
  gamesApi

import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/groups";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
    getUserGroup: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGroupsQuery, useGetUserGroupQuery } = userApiSlice;

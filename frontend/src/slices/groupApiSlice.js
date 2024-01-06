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
  }),
});

export const { useGetGroupsQuery } = userApiSlice;

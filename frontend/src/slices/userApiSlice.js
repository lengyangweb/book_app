import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    signOut: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updateUserInfo: builder.mutation({
      query: ({ _id, name, email }) => ({
        url: `${USERS_URL}/${_id}`,
        method: "PUT",
        body: { name, email },
      }),
    }),
    addGroup: builder.mutation({
      query: (id, group) => ({
        url: `${USERS_URL}/group/${id}`,
        method: "POST",
        body: group,
      }),
    }),
    removeGroup: builder.mutation({
      query: (id, group) => ({
        url: `${USERS_URL}/group/${id}`,
        method: "DELETE",
        body: group,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignOutMutation,
  useUpdateUserProfileMutation,
  useUpdatePasswordMutation,
  useRegisterUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserInfoMutation,
  useAddGroupMutation,
  useRemoveGroupMutation,
} = userApiSlice;

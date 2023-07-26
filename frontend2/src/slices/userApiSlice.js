import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        signOut: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        getUsers: builder.query({
            query: (data) => ({
                url: `https://jsonplaceholder.typicode.com/users`,
                method: 'GET',
                body: data
            })
        })
     })
});

export const { 
    useLoginMutation, 
    useSignOutMutation,
    useUpdateUserMutation,
    useUpdatePasswordMutation,
    useRegisterMutation,
    useGetUsersQuery
} = userApiSlice;
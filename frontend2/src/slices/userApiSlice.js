import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
                method: 'GET'
            })
        }),
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
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE'
            })
        }),
        updateUserInfo: builder.mutation({
            query: (id, data) => ({
                url: `${USERS_URL}/${id}`,
                method: 'PUT',
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
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserInfoMutation
} = userApiSlice;
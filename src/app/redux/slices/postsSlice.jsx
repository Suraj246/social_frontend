import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../API";
import Cookies from "js-cookie";

const initialState = {
    status: 'loading',
    error: null,
    postsData: []
}

const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}

export const allPostApi = createAsyncThunk("postsData/allPostApi", async () => {
    const { data } = await axios.get(`${API}/user/posts/posts`,
        { headers: { "authorization": `${user?.token}` } })
    return data
})

export const createPostApi = createAsyncThunk("postsData/createPostApi", async ({ formData }) => {
    const { data } = await axios.post(`${API}/user/posts/create`, formData,
        { headers: { "authorization": `${user?.token}` } }
    )
    return data
})
export const storePostIdApi = createAsyncThunk("postsData/storePostIdApi", async (postId) => {
    const { data } = await axios.put(`${API}/user/posts/${user?.userId}`, { postId: postId },
        { headers: { "authorization": `${user?.token}` } }
    )

    return data
})

export const likePostApi = createAsyncThunk("postsData/likePostApi", async (postId) => {
    const { data } = await axios.put(`${API}/user/posts/like/${postId}`, { userId: user?.userId },
        { headers: { "authorization": `${user?.token}` } }
    )
    return data
})

export const createCommentPostApi = createAsyncThunk("postsData/createCommentPostApi", async (comment) => {
    const { data } = await axios.post(`${API}/user/post/create/comment/`, { userId: user?.userId, title: comment },
        { headers: { "authorization": `${user?.token}` } }
    )
    return data
})

export const commentPostApi = createAsyncThunk("postsData/commentPostApi", async ({ postId, commentId }) => {
    const { data } = await axios.put(`${API}/user/post/comment/${postId}`, { commentId: commentId },
        { headers: { "authorization": `${user?.token}` } }
    )
    // console.log(data)
    return data
})

export const postDeleteUserScreen = createAsyncThunk("postsData/postDeleteUserScreen", async ({ post_index, postId }) => {
    console.log("postDeleteUserScreen", post_index, postId)
    const { data } = await axios.delete(`${API}/user/posts/${user?.userId}/${postId}/${post_index}`,
        { headers: { "authorization": `${user?.token}` } }
    )
    return data
})

export const postsSlice = createSlice({
    name: "postsData",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(allPostApi.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(allPostApi.fulfilled, (state, action) => {
                state.status = 'success'
                state.postsData = action.payload
                state.error = ''
            })
            .addCase(allPostApi.rejected, (state, action) => {
                state.status = 'failed'
                state.postsData = []
                state.error = action.error.message || 'something went wrong'
            })
            .addCase(likePostApi.fulfilled, (state, action) => {
                const { post } = action.payload;
                state.status = 'success'
                state.postsData = post
                state.error = ''
            })
            .addCase(commentPostApi.fulfilled, (state, action) => {
                const { updatedPostComments } = action.payload;
                state.status = 'success'
                state.postsData = updatedPostComments
                state.error = ''
            })
        // .addCase(postDeleteUserScreen.fulfilled, (state, action) => {
        //     console.log('delete user', action)
        // });

        // .addCase(createPostApi.fulfilled, (state, action) => {
        //     state.status = 'success'
        //     // state.postsData = [...state.postsData, action.payload]
        //     state.postsData.unshift(action.payload)
        //     // state.postsData = [...state.postsData, action.payload.new_post]
        //     state.error = ''
        // })


    }
})
export default postsSlice.reducer
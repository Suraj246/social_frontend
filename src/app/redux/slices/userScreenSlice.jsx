import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../API";
import Cookies from "js-cookie";

const initialState = {
    status: 'loading',
    error: null,
    userProfileScreenData: {},
    userFriendList: {}
}

const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}


export const userProfileById = createAsyncThunk("userProfileScreenData/userProfileById", async (id) => {
    const { data } = await axios.get(`${API}/user/${id}`,
        { headers: { "authorization": `${user?.token}` } }
    )
    return data
})

export const userProfileFriendList = createAsyncThunk("userFriendList/userProfileFriendList", async () => {

    if (!user || !user.userId || !user.token) {
        throw new Error('User data is missing or incomplete.');
    }
    const { data } = await axios.get(`${API}/user/get-data/${user?.userId}`,
        { headers: { "authorization": `${user?.token}` } }
    )
    return data
})

export const sendFriendRequestApi = createAsyncThunk("userFriendList/sendFriendRequestApi", async (friendId) => {
    const { data } = await axios.put(`${API}/user/update/friend/${user?.userId}`, { friendId: friendId },
        { headers: { "authorization": `${user?.token}` } }
    )
    return data
})



export const userProfileScreenSlice = createSlice({
    name: "userProfileScreenData",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(userProfileById.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userProfileById.fulfilled, (state, action) => {
                state.status = 'success'
                state.userProfileScreenData = action.payload
                state.error = null
            })
            .addCase(userProfileById.rejected, (state, action) => {
                state.status = 'failed'
                state.userProfileScreenData = {}
                state.error = action.error.message || 'something went wrong'
            })


            .addCase(userProfileFriendList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userProfileFriendList.fulfilled, (state, action) => {
                state.status = 'success'
                state.userFriendList = action.payload
                state.error = null
            })
            .addCase(userProfileFriendList.rejected, (state, action) => {
                state.status = 'failed'
                state.userFriendList = {}
                state.error = action.error.message || 'something went wrong'
            })


    }
})

export default userProfileScreenSlice.reducer
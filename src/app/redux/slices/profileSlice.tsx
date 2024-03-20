import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../API";
import Cookies from "js-cookie";

const initialState = {
    status: 'loading',
    error: null,
    userProfileData: {}
}

const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}

export const userProfile = createAsyncThunk("userProfileData/userProfile", async () => {

    if (!user || !user.userId || !user.token) {
        throw new Error('User data is missing or incomplete.');
    }
    const { data } = await axios.get(`${API}/user/get-data/${user?.userId}`,
        { headers: { "authorization": `${user?.token}` } }
    )
    return data
})
export const userProfileUpdate = createAsyncThunk("userProfileData/userProfileUpdate", async (formData) => {
    const { data } = await axios.put(`${API}/user/update/${user?.userId}`, formData,
        { headers: { "authorization": `${user?.token}` } }
    )
    return data
})




export const profileSlice = createSlice({
    name: "userProfileData",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(userProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.status = 'success'
                state.userProfileData = action.payload
                state.error = ''
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.userProfileData = {}
                state.error = action.error.message || 'something went wrong'
            })


    }
})

export default profileSlice.reducer
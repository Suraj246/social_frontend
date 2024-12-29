import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../API";
import Cookies from "js-cookie"

const initialState = {
    status: 'loading',
    error: null,
    userData: {}
}

export const signUpUser = createAsyncThunk("userData/signUpUser", async ({ username, email, password }) => {
    const { data } = await axios.post(`${API}/user/signup`, { username: username, email: email, password: password })
    return data
})

export const validUserEmail = createAsyncThunk("userData/validUserEmail", async (email) => {
    const { data } = await axios.post(`${API}/user/email_validation`, email)
    localStorage.setItem("reset_password_email_id", data.userid)
    return data
})

export const resetUserPassword = createAsyncThunk("userData/resetUserPassword", async (newPassword) => {
    const get_email_id = localStorage.getItem("reset_password_email_id")

    const { data } = await axios.put(`${API}/user/reset_password/${get_email_id}`, { newPassword: newPassword })
    return data
})

export const fetchUser = createAsyncThunk("userData/fetchUser", async ({ username, password }) => {
    const { data } = await axios.post(`${API}/user/login`, { username: username, password: password })
    Cookies.set('user', JSON.stringify(data))
    localStorage.setItem("user", JSON.stringify(data.token))
    return data
})

export const removeFriendIdApi = createAsyncThunk("userData/removeFriendIdApi", async (friend_index) => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null
    const { data } = await axios.delete(`${API}/user/${user?.userId}/${friend_index}`,
        { headers: { "authorization": `${user?.token}` } }
    )
    return data
})




export const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {

        logout: (state, action) => {
            localStorage.clear()
            Cookies.remove('user')
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.userData = action.payload
                state.error = ''
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.status = 'failed'
                state.userData = {}
                state.error = action.error.message || 'something went wrong'
            })


            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.userData = action.payload
                state.error = ''
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
                state.userData = {}
                state.error = action.error.message || 'something went wrong'
            })

            .addCase(validUserEmail.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(validUserEmail.fulfilled, (state, action) => {
                state.status = 'success'
                state.userData = action.payload
                state.error = ''
            })

            .addCase(validUserEmail.rejected, (state, action) => {
                state.status = 'failed'
                state.userData = {}
                state.error = action.error.message || 'something went wrong'
            })



            .addCase(resetUserPassword.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(resetUserPassword.fulfilled, (state, action) => {
                state.status = 'success'
                state.userData = action.payload
                state.error = ''
            })

            .addCase(resetUserPassword.rejected, (state, action) => {
                state.status = 'failed'
                state.userData = {}
                state.error = action.error.message || 'something went wrong'
            })
    }
})
export const { logout } = userSlice.actions;
export default userSlice.reducer
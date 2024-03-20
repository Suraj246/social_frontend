import { configureStore } from '@reduxjs/toolkit'
import inputSearchSlice from './slices/inputSearchSlice'
import userReducer from "./slices/userSlice"
import userProfileReducer, { userProfile } from './slices/profileSlice'
import postReducer from './slices/postsSlice'
import userProfileScreenReducer from './slices/userScreenSlice'
const store = configureStore({
    reducer: {
        input: inputSearchSlice,
        userInfo: userReducer,
        userProfileData: userProfileReducer,
        postsData: postReducer,
        userProfileScreen: userProfileScreenReducer


    },
})

export default store
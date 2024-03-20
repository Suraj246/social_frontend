import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: '',
};

export const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setInputValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setInputValue } = inputSlice.actions;

export const selectInputValue = (state) => state.input.value;

export default inputSlice.reducer;

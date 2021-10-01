import { createSlice } from "@reduxjs/toolkit";

export const proffessionSlice = createSlice({
    name: "occupation",
    initialState: {
        proffessions: null,
        categories: null,
    },
    reducers: {
        getProffessions: (state, action) => {
            state.proffessions = action.payload;
        },
        getCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
});

export const { 
    getProffessions,
    getCategories
} = proffessionSlice.actions;

export const proffessionData = (state) => state.proffessions;

export default proffessionSlice.reducer;
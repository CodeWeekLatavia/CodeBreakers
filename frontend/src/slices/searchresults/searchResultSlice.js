import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        info: null,
    },
    reducers: {
        setSearchInfo: (state, action) => {
            state.info = action.payload;
        },
        setUserJobCategory: (state, action) => {
            state.info.profile.jobCategory = action.payload;
        },
        setUserJob: (state, action) => {
            state.info.profile.job = action.payload;
        },
    },
});

export const { 
    setSearchInfo,
    setUserJobCategory,
    setUserJob
} = searchSlice.actions;

export const searchData = (state) => state.search;

export default searchSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
    name: "info",
    initialState: {
        jobOffers: null,
        profileAds: null,
        filterTags: null,
    },
    reducers: {
        setJobOffers: (state, action) => {
            state.jobOffers = action.payload;
        },
        setProfileAds: (state, action) => {
            state.profileAds = action.payload;
        },
        setFilterTags: (state, action) => {
            state.filterTags = action.payload;
        },
    },
});

export const { 
    setJobOffers,
    setProfileAds,
    setFilterTags
} = infoSlice.actions;

export const infoData = (state) => state.info;

export default infoSlice.reducer;
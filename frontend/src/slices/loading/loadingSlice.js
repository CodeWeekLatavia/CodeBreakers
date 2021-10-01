import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        loadingStage: 0,
        isLoading: true,
        loadingMessage: "",
        totalStages: 0,
    },
    reducers: {
        handleLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateLoadingStage: (state, action) => {
            state.loadingStage = action.payload;
        },
        updateLoadingMessage: (state, action) => {
            state.loadingStage = action.payload;
        },
        updateTotalStages: (state, action) => {
            state.totalStages = action.payload;
        },
        resetLoadingState: (state) => {
            state.loadingStage = 0;
            state.isLoading = false;
            state.loadingMessage = "";
            state.totalStages = 0;
        },
    },
});

export const { 
    handleLoading, 
    updateLoadingStage, 
    updateLoadingMessage,
    resetLoadingState,
    updateTotalStages,
} = loadingSlice.actions;

export const loadingData = (state) => state.loading;

export default loadingSlice.reducer;
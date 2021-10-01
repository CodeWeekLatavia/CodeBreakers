import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        info: null,
        accessToken: "",
        allUsers: null,
        swipedPossitions: null,
    },
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        setUserInfo: (state, action) => {
            state.info = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUserProffession: (state, action) => {
            state.info.profile.user_proffession = action.payload;
        },
        setUserProffessionCategory: (state, action) => {
            state.info.profile.user_proffession_category = action.payload;
        },
        logoutUser: (state) => {
            state.loggedIn = false;
            state.info = null;
            state.accessToken = "";
            state.allUsers = null;
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setSwipedPossitions: (state, action) => {
            state.swipedPossitions = action.payload
        },
        removeSwipedPossition: (state, action) => {
            state.swipedPossitions.filter(p => p !== action.payload);
        },
        addSwipedPossition: (state, action) => {
            state.swipedPossitions = [...state.swipedPossitions, action.payload]
        },
    },
});

export const { 
    login,
    setUserInfo,
    setAccessToken,
    logoutUser,
    setUserProffession,
    setUserProffessionCategory,
    setAllUsers,
    setSwipedPossitions,
    removeSwipedPossition,
    addSwipedPossition
} = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlice";
import loadingReducer from "../slices/loading/loadingSlice";
import proffessionReducer from "../slices/proffessions/proffessionSlice";
import searchReducer from "../slices/searchresults/searchResultSlice";
import locationReducer from "../slices/locations/locationSlice";
import infoReducer from "../slices/info/infoSlice";
import chatReducer from "../slices/chat/chatSlice";
import socketReducer from "../slices/socket/socketSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        loading: loadingReducer,
        proffessions: proffessionReducer,
        search: searchReducer,
        locations: locationReducer,
        info: infoReducer,
        chat: chatReducer,
        socket: socketReducer,
    },
});
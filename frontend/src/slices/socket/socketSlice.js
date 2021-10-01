import { createSlice } from "@reduxjs/toolkit";
import {io} from "socket.io-client";

let socket = null;

export function getSocket() {
    return socket;
}

export const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null,
        onlineUsers: null,
    },
    reducers: {
        connect: (state, action) => {
            socket = io(action.payload);
            state.socket = true;
        },
        getOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
    },
});

export const { 
    connect,
    getOnlineUsers
} = socketSlice.actions;

export const socketData = (state) => state.socket;

export default socketSlice.reducer;
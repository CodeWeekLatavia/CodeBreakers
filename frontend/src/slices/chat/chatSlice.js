import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: null,
        chats: null,
        onlineUsers: null,
        activeChat: null,
        activeChatID: null,
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setMessages: (state, action) => {
            console.log(action.payload)

            state.messages = action.payload.map(m => {
                if(m.sender){
                    return {
                        ...m,
                        senderId: parseInt(m.sender, 10),
                    }
                }

                if(m.senderID){
                    return {
                        ...m,
                        senderId: parseInt(m.senderID, 10),
                    }
                }

                return m;
            }); 
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
        },
        setActiveChatMessages: (state, action) => {
            state.messages = action.payload.filter(m => m.text !== "").map(m => {
                if(m.sender){
                    return {
                        ...m,
                        senderId: parseInt(m.sender, 10),
                    }
                }

                if(m.senderID){
                    return {
                        ...m,
                        senderId: parseInt(m.senderID, 10),
                    }
                }

                return m;
            });
        },
        setActiveChatID: (state, action) => {
            state.activeChatID = action.payload;
        },
        deleteActiveChat: (state) => {
            state.activeChat = null;
        },
        addMessage: (state, action) => {
            const message = {
                senderId: action.payload.senderId,
                receiverId: action.payload.receiverId,
                text: action.payload.text,
            }

            if(state.messages){
                state.messages = [...state.messages, message];
            }else{
                state.messages = [message];
            }
        },
        recieveMessage: (state, action) => {
            if(state.messages && action.payload.text !== ""){
                const message = {
                    senderId: action.payload.senderId,
                    text: action.payload.text,
                    createdAt: action.payload.createdAt
                }

                if(state.messages[state.messages.length - 1].text !== action.payload.text && state.messages[state.messages.length - 1].senderId !== action.payload.senderId){
                    
                    state.messages = [...state.messages, message];
                }
            }else{
                const message = {
                    senderId: action.payload.senderId,
                    text: action.payload.text,
                    createdAt: action.payload.createdAt
                }
                
                state.messages = [message];
            }
            
        }
    },
});

export const { 
    setChats,
    setMessages,
    setOnlineUsers,
    setActiveChat,
    setActiveChatMessages,
    setActiveChatID,
    deleteActiveChat,
    addMessage,
    recieveMessage
} = chatSlice.actions;

export const chatData = (state) => state.chat;

export default chatSlice.reducer;
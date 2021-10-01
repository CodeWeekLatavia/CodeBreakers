import { CHAT_ID_OPTIONS, MESSAGE_OPTIONS, NEW_CHAT, USER_CHATS } from "./chatRoutes"
import axios from "axios"
import { handleLoading, resetLoadingState } from "../../slices/loading/loadingSlice";
import { deleteActiveChat, setActiveChat, setActiveChatID, setActiveChatMessages, setChats } from "../../slices/chat/chatSlice";
import { getUserChatHeaderInfo } from "../user/info/getUserInfo";

export const getUserChats = (accessToken, dispatch) => {
    dispatch(handleLoading(true));

    if(accessToken){
        axios.get(`${USER_CHATS}/${accessToken}`).then((res) => {
            dispatch(setChats(res.data));
            dispatch(resetLoadingState());
        }).catch((err) => {
            console.log(err);
            dispatch(resetLoadingState());
        });
    }else{
        dispatch(resetLoadingState());
    }
};

export const NewChat = (senderID, receiverID, history, dispatch) => {
    dispatch(handleLoading(true));

    if(senderID && receiverID){
        const data = {
            senderAccesstoken: senderID,
            receiverAccessToken: receiverID,
        };
    
        axios.post(`${NEW_CHAT}`, data).then((res) => {
            history.push("/chat");
            getUserChats(senderID, dispatch);
        }).catch((err) => {
            console.log(err);
            history.push("/chat");
            dispatch(resetLoadingState());
        });
    }else{
        dispatch(resetLoadingState());
    }
};

export const deleteChat = (id, userID, dispatch) => {
    if(id){
        axios.delete(`${CHAT_ID_OPTIONS}/${id}`).then((res) => {
            getUserChats(userID, dispatch);
            dispatch(deleteActiveChat());
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const getChatByID = (id, userID, dispatch, history) => {
    if(id){
        axios.get(`${CHAT_ID_OPTIONS}/${id}`).then((res) => {
            dispatch(setActiveChatID(res.data._id));
            getUserChatHeaderInfo(res.data.users.find(m => parseInt(m.user) !== parseInt(userID)).user, dispatch);
        }).catch((err) => {
            history.push("/chat");
        });
    }
};

export const newMessage = (senderID, receiverID, chatID, text, dispatch, setMessageSent) => {
    if(senderID && receiverID && chatID && text){
        const data = {
            senderAccesstoken: senderID, 
            receiverAccessToken: receiverID,
            chatID: chatID,
            text: text
        };

        axios.post(MESSAGE_OPTIONS, data).then((res) => {
            getChatMessages(chatID, dispatch);
            setMessageSent(true);
        }).catch((err) => {
            console.log(err);
            setMessageSent(true);
        });
    }
};

export const getChatMessages = (chatID, dispatch) => {
    if(chatID){
        axios.get(`${MESSAGE_OPTIONS}/${chatID}`).then((res) => {
            dispatch(setActiveChatMessages(res.data));
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const updateChatMessage = (id, text) => {
    if(id && text){
        const data = {
            text: text
        };

        axios.put(`${MESSAGE_OPTIONS}/${id}`, data).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const deleteChatMessage = (id) => {
    if(id){
        axios.delete(`${MESSAGE_OPTIONS}/${id}`).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const activateChat = (id, profileImage, profileName, dispatch, history) => {
    if(id && profileImage && profileName){
        const data = {
            chatID: id,
            profileImage: profileImage,
            profileName: profileName,
        }

        history.push(`/chats/${id}`);
        dispatch(setActiveChat(data));
    }
};
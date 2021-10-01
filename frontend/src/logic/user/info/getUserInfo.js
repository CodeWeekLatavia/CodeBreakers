import axios from "axios";
import { setActiveChat } from "../../../slices/chat/chatSlice";
import { handleLoading, resetLoadingState, updateLoadingMessage, updateLoadingStage, updateTotalStages } from "../../../slices/loading/loadingSlice";
import { setSearchInfo } from "../../../slices/searchresults/searchResultSlice";
import { login, setUserInfo } from "../../../slices/user/userSlice";
import { USER_INFO, USER_PROFILE } from "../../api/apiRoutes";


export const getUserInfo = (accessToken, dispatch, totalStages) => {
    dispatch(handleLoading(true));
    dispatch(updateLoadingStage(2));
    dispatch(updateTotalStages(totalStages));
    dispatch(updateLoadingMessage("Getting user info"));

    const headers = {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    };

    axios.get(USER_INFO, headers).then((res) => {
        dispatch(setUserInfo(res.data));
        dispatch(login());
        dispatch(resetLoadingState());
    }).catch((err) => {
        window.localStorage.removeItem("accessToken");
        dispatch(resetLoadingState());
    });
};

export const getUserInfoByID = (userID, dispatch) => {
    dispatch(handleLoading(true));

    axios.get(`${USER_INFO}/${userID}/`).then((res) => {
        dispatch(setSearchInfo(res.data));
        dispatch(handleLoading(false));
    }).catch((err) => {
        dispatch(handleLoading(false));
    });
};

export const getUserChatInfo = (userID, setChatMemberInfo) => {
    axios.get(`${USER_INFO}/${userID}/`).then((res) => {
        setChatMemberInfo(res.data)
    }).catch((err) => {
        setChatMemberInfo(null)
    });
};


export const getUserChatHeaderInfo = (user, dispatch) => {
    axios.get(`${USER_INFO}/${user}`).then((res) => {
        dispatch(setActiveChat(res.data));
    }).catch((err) => {
        console.log(err)
    });
};

export const getJobseekerInfo = (id, setInfo) => {
    axios.get(`${USER_PROFILE}/${id}`).then((res) => {
        setInfo(res.data);
    }).catch((err) => {
        console.log(err)
    });
};


export const getJobOfferUserinfo = (userID, setInfo) => {
    axios.get(`${USER_INFO}/${userID}/`).then((res) => {
        setInfo(res.data);
    }).catch((err) => {
        console.log(err);
    });
};
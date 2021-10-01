import axios from "axios"
import { handleLoading, resetLoadingState, updateLoadingMessage, updateLoadingStage, updateTotalStages } from "../../slices/loading/loadingSlice";
import { setAccessToken } from "../../slices/user/userSlice";
import { LOGIN } from "../api/apiRoutes"
import { getUserInfo } from "../user/info/getUserInfo";


export const login = (e, email, password, dispatch) => {
    e.preventDefault();
    dispatch(handleLoading(true));
    dispatch(updateTotalStages(2));
    dispatch(updateLoadingStage(1));
    dispatch(updateLoadingMessage("Logging in"));

    const data = {
        username: email,
        password: password
    };

    axios.post(LOGIN, data).then((res) => {
        const token = res.data.token;
        window.localStorage.setItem("accessToken", token);
        dispatch(setAccessToken(token));
        getUserInfo(token, dispatch, 2);
    }).catch((err) => {
        console.log(err);
        dispatch(resetLoadingState());
    });
};
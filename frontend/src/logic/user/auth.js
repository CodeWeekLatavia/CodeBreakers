import axios from "axios";
import { handleLoading, resetLoadingState } from "../../slices/loading/loadingSlice";
import { setAccessToken } from "../../slices/user/userSlice";

import { REGISTER } from "../api/apiRoutes";

export const registerUser = (
    email,
    password,
    name,
    surname,
    dispatch
) => {
    dispatch(handleLoading(true));

    const registerData = {
        email: email,
        password: password,
        password2: password,
        is_employer: false,
        first_name: name,
        last_name: surname
    };

    axios.post(REGISTER, registerData).then((res) => {
        if(res.data.token && res.data.token !== ""){
            window.localStorage.setItem("accessToken", res.data.token);
            dispatch(setAccessToken(res.data.token));
            dispatch(resetLoadingState());
        }
    }).catch((err) => {
        console.log(err);
        dispatch(resetLoadingState());
    });
}
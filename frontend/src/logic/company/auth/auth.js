import axios from 'axios';
import { handleLoading, resetLoadingState } from '../../../slices/loading/loadingSlice';
import { login, setAccessToken } from '../../../slices/user/userSlice';
import { COMPANY_PROFILE, REGISTER } from '../../api/apiRoutes';

export const registerCompany = (
    companyEmail,
    password,
    companyName,
    dispatch
) => {
    dispatch(handleLoading(true));

    const registerData = {
        email: companyEmail,
        password: password,
        password2: password,
        is_employer: true,
        first_name: "company",
        last_name: "company"
    };

    axios.post(REGISTER, registerData).then((res) => {
        const token = res.data.token;
        const profileID = res.data.profile_id;

        const headers = {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }

        const data = new FormData();
        data.append("company_name", companyName);

        axios.put(`${COMPANY_PROFILE}/${profileID}`, data, headers).then((res) => {
            window.localStorage.setItem("accessToken", token);
            dispatch(setAccessToken(token));
            dispatch(login());
            dispatch(resetLoadingState());
        }).catch((err) => {
            console.log(err.message);
            dispatch(resetLoadingState());
        });
    }).catch((err) => {
        console.log(err.message);
        dispatch(resetLoadingState());
    });
};
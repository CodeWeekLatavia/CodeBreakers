import axios from "axios";
import { COMPANY_SWIPING, COMPANY_SWIPING_LIST_VIEW } from "../api/apiRoutes";
import {setSwipedPossitions} from "../../slices/user/userSlice"

export const jobSeekerAcceptJobOffer = (accepted, positionId, token, dispatch) => {
    const data = new FormData()
    
    data.append("position_id", positionId);
    data.append("accepted", accepted);

    const headers = {
        headers: {
            Authorization: `Token ${token}`
        }
    }

    axios.post(
        COMPANY_SWIPING,
        data,
        headers,
    ).then((res) => {
        getUserAcceptedJobOffers(token, dispatch);
    }).catch((err) => {
        console.log(err)
    });
};

export const companyChooseJobSeekerRequest = (positionId, accepted, userID, token) => {
    const data = new FormData()
    data.append("position_id", positionId);
    data.append("accepted", accepted);
    data.append("jobseeker_profile", userID);

    const headers = {
        headers: {
            Authorization: `Token ${token}`
        }
    }

    axios.post(
        COMPANY_SWIPING,
        data,
        headers
    ).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    });
};

export const getUserAcceptedJobOffers = (token, dispatch) => {
    const headers = {
        headers: {
            Authorization: `Token ${token}`
        }
    };

    axios.get(
        `${COMPANY_SWIPING_LIST_VIEW}`,
        headers
    ).then((res) => {
        dispatch(setSwipedPossitions(res.data));
    }).catch((err) => {
        console.log(err);
    });
};

export const removeFromSaved = (swiped, token, dispatch, all) => {
    const data = new FormData()
    
    data.append("position_id", swiped.position);
    data.append("accepted", 0);

    const headers = {
        headers: {
            Authorization: `Token ${token}`
        }
    }

    let filtered = all.filter(s => s !== swiped);
    console.log(filtered)

    axios.post(
        COMPANY_SWIPING,
        data,
        headers,
    ).then((res) => {
        dispatch(setSwipedPossitions(filtered));
    }).catch((err) => {
        console.log(err)
    });
};

export const companyGetUsersSwiped = (token, dispatch) => {
    const headers = {
        headers: {
            Authorization: `Token ${token}`
        }
    }

    axios.get(
        `${COMPANY_SWIPING_LIST_VIEW}?jobseeker_accepted=True`,
        headers,
    ).then((res) => {
        dispatch(setSwipedPossitions(res.data));
    }).catch((err) => {

    });
}
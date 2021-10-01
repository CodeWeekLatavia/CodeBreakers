import axios from "axios";
import { getCountrys, getCountryCitys, setToken } from "../../slices/locations/locationSlice";
import { GET_COUNTRYS_ROUTE, GET_STATES_ROUTE, TOKEN_ROUTE } from "../api/locationRoutes";

const API_EMAIL = process.env.REACT_APP_LOCATION_API_EMAIL;
const API_TOKEN = process.env.REACT_APP_LOCATION_API_TOKEN;

export const getLocationToken = (dispatch) => {
    if(API_EMAIL && API_TOKEN){
        const headers = {
            headers: {
                "Accept": "application/json",
                "api-token": API_TOKEN,
                "user-email": API_EMAIL,
            }
        };

        axios.get(TOKEN_ROUTE, headers).then((res) => {
            dispatch(setToken(res.data.auth_token));
        }).catch((err) => {
            console.log(err);
        });
    }
}

export const getCountries = (token, dispatch) => {
    const headers = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    };

    axios.get(GET_COUNTRYS_ROUTE, headers).then((res) => {
        dispatch(getCountrys(res.data));
    }).catch((err) => {
        console.log(err);
    });
};

export const getCountryCities = (country, dispatch, token) => {
    const headers = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    };

    axios.get(`${GET_STATES_ROUTE}/${country}`, headers).then((res) => {
        if(res.data.length > 0){
            dispatch(getCountryCitys(res.data));
        }else{
            dispatch(getCountryCitys(null));
        }
    }).catch((err) => {
        console.log(err);
    });
};
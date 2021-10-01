import axios from "axios"
import { OCCUPATIONS, OCCUPATION_CATEGORIES } from "../api/apiRoutes"
import { getProffessions as importedGetProffessions, getCategories } from "../../slices/proffessions/proffessionSlice";


export const getProffessions = (dispatch) => {
    axios.get(OCCUPATIONS).then((res) => {
        dispatch(importedGetProffessions(res.data));
    }).catch((err) => {
        console.log(err.message);
    });
}

export const getProffessionCategories = (dispatch) => {
    axios.get(OCCUPATION_CATEGORIES).then((res) => {
        dispatch(getCategories(res.data));
    }).catch((err) => {
        console.log(err.message);
    });
}
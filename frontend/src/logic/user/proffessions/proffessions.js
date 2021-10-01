import axios from "axios";
import { setUserJobCategory, setUserJob } from "../../../slices/searchresults/searchResultSlice";
import { setUserProffession, setUserProffessionCategory } from "../../../slices/user/userSlice";
import { ONE_OCCUPATION } from "../../api/apiRoutes";

export const getUserProffession = (id, dispatch, allOccupations) => {
    if(id){
        axios.get(`${ONE_OCCUPATION}/${id}/`).then((res) => {
            dispatch(setUserJob(res.data.title));

            allOccupations.forEach((occupation) => {
                if(res.data.category === occupation.id){
                    dispatch(setUserJobCategory(occupation.title));
                }
            });
        }).catch((err) => {
            console.log(err.message);
        });
    }
}

export const getUserJobNoSearch = (id, dispatch, allOccupations) => {
    if(id){
        axios.get(`${ONE_OCCUPATION}/${id}/`).then((res) => {
            dispatch(setUserProffession(res.data.title));

            allOccupations.forEach((occupation) => {
                if(res.data.category === occupation.id){
                    dispatch(setUserProffessionCategory(occupation.title));
                }
            });
        }).catch((err) => {
            console.log(err.message);
        });
    }
}

export const getPossitionProffession = (id, setData) => {
    if(id){
        axios.get(`${ONE_OCCUPATION}/${id}/`).then((res) => {
            setData(res.data.title);
        }).catch((err) => {
            console.log(err.message);
        });
    }
}
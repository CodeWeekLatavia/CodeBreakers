import axios from "axios";
import { JOB_OFFER_OPTIONS } from "../api/apiRoutes";


export const filterJobOffersByCategory = (category) => {
    axios.get(`${JOB_OFFER_OPTIONS}?job_title__category=${category}`).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    });
};

export const filterJobOffersByPossition = (possition) => {
    axios.get(`${JOB_OFFER_OPTIONS}?job_title=${possition}`).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    });
};
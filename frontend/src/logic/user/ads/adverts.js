
import axios from 'axios';
import { JOB_OFFERS, JOB_OFFER_OPTIONS } from '../../api/apiRoutes';

export const getAdverts = () => {
    axios.get(JOB_OFFER_OPTIONS).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    });
};

export const newAdvert = (title, skills, knowledge, contractType, accessToken) => {
    const data = {
        job_title: title,
        skills: skills,
        knowledge: knowledge,
        info: info,
        contract_type: contractType,
    }

    const headers = {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    }

    axios.post(
        JOB_OFFER_OPTIONS,
        data,
        headers
    ).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    });
};

export const updateAdvert = (id, title, skills, knowledge, contractType, accessToken) => {
    const data = {
        job_title: title,
        skills: skills,
        knowledge: knowledge,
        info: info,
        contract_type: contractType,
    }

    const headers = {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    }

    axios.put(
        `${JOB_OFFERS}/${id}/`,
        data,
        headers
    ).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    });
};

export const deleteAdvert = (id, accessToken) => {
    const headers = {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    }

    axios.delete(
        `${JOB_OFFERS}/${id}/`,
        headers
    ).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    });
};
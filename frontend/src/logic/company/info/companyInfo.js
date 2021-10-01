import axios from "axios";
import { handleLoading } from "../../../slices/loading/loadingSlice";
import { COMPANY_PROFILE } from "../../api/apiRoutes";
import { getUserInfo } from "../../user/info/getUserInfo";

export const getCompanyInfoById = (id, setCompanyInfo) => {
    axios.get(`${COMPANY_PROFILE}/${id}/`).then((res) => {
        setCompanyInfo(res.data);
    }).catch((err) => {
        console.log(err);
    });
};

export const updateCompanyInfo = (id, token, name, logo, country, city, phoneNumber, companySize, description, websiteURL, dispatch) => {
    dispatch(handleLoading(true));

    const url = `${COMPANY_PROFILE}/${id}/`;

    const formData = new FormData();
    
    if(typeof(logo) === "object"){
        formData.append("logo", logo);
    }
    formData.append("country", country);
    formData.append("city", city);
    formData.append("company_name", name);
    formData.append("phone_number", phoneNumber);
    formData.append("company_size", companySize);
    formData.append("description", description);
    formData.append("website_url", websiteURL);
    
    const headers = {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data"
        }
    }

    axios.put(
        url,
        formData,
        headers
    ).then((res) => {
        getUserInfo(token, dispatch, 2)
    }).catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
    });
};
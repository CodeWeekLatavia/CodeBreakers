import axios from "axios";
import { COMPANY_POSITION_OPTIONS } from "../../api/apiRoutes";

export const getCompanysPositions = (companyID, setCompanyPositions) => {
    axios.get(`${COMPANY_POSITION_OPTIONS}?company=${companyID}`).then((res) => {
        setCompanyPositions(res.data);
    }).catch((err) => {
        console.log(err);
    });
};
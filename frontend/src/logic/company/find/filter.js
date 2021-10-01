import axios from "axios";
import { USER_LIST_OPTIONS } from "../../api/apiRoutes";


export const filterCompanysByName = (companyName, searchResults, setResults) => {
    axios.get(`${USER_LIST_OPTIONS}?company=${companyName}`).then((res) => {
        res.data.forEach((c) => {
            setResults([...searchResults, c]);
        });
    }).catch((err) => {
        console.log(err);
    });
};
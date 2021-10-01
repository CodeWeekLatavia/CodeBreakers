import axios from "axios";
import { UPLOAD_AVATAR } from "../api/apiRoutes";

export const UploadAvatar = (formData, setEditAvatar, accessToken, setLoading) => {
    axios.post(UPLOAD_AVATAR, formData, {
        headers: {"content-type": "multipart/form-data", Authorization: accessToken}
    }).then((res) => {
        setEditAvatar(res.data.url);
        setLoading(false);
    }).catch((err) => {
        console.log(err.message);
        setLoading(false);
    });
}
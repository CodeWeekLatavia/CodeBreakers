import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { userData } from '../../slices/user/userSlice';
import LoadingPopup from '../popups/loading/LoadingPopup';
import "./Admin.scss";
import AdminPositionScreen from './positions/AdminPositionScreen';
import AdminUserScreen from './users/AdminUserScreen';
import {useHistory} from "react-router-dom"

function AdminPage() {
    const [adminScreen, setAdminScreen] = useState("users");

    const userInfo = useSelector(userData);
    const history = useHistory();

    useEffect(() => {
        if(userInfo.info && !userInfo.info.isAdmin){
            history.push("/");
        }
    }, [userInfo.info, history]);

    if(userInfo.info){
        return (
            <div className="admin">
                <header className="admin__header">
                    <p>admin panelis</p>
                    <ul>
                        <li
                            onClick={() => setAdminScreen("proffessions/categories")}
                        >proffessions/categories</li>
                        <li
                            onClick={() => setAdminScreen("users")}
                        >users</li>
                    </ul>
                </header>
                <div className="admin__screen">
                    {adminScreen === "users" ? (
                        <AdminUserScreen />
                    ) : adminScreen === "proffessions/categories" && (
                        <AdminPositionScreen />
                    )}
                </div>
            </div>
        )
    }else{
        return(
            <LoadingPopup />
        )
    }
    
}

export default AdminPage

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../logic/admin/adminOptions';
import { userData } from '../../../slices/user/userSlice';
import AdminUserScreenUser from './user/AdminUserScreenUser';

function AdminUserScreen() {
    const userInfo = useSelector(userData);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!userInfo.allUsers){
            getAllUsers(userInfo.accessToken, dispatch);
        }
    }, [userInfo.accessToken, dispatch, userInfo.allUsers]);

    return (
        <div className="admin__screen__users">
            {userInfo.allUsers && userInfo.allUsers.map((user, i) => (
                <AdminUserScreenUser 
                    key={i}
                    user={user}
                />
            ))}
        </div>
    )
}

export default AdminUserScreen

import React from 'react'
import Avatar from '../../../../assets/svg/avatar.svg';
import CompanyAvatar from '../../../../assets/svg/company.svg';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { deleteUser } from '../../../../logic/user/profile';
import { userData } from '../../../../slices/user/userSlice'
import { useHistory } from 'react-router-dom';

function AdminUserScreenUser({user}) {
    const userInfo = useSelector(userData);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className="admin__screen__users__user">
            {user.is_employer ? (
                <div className="admin__screen__users__user__info" onClick={() => history.push(`/profile/${user.id}`)}>
                    <img src={user.profile.logo ? user.profile.logo : CompanyAvatar} alt="profile" />
                    {user.profile.company_name ?
                        <h4>{user.profile.company_name}</h4> :
                        <span>No name</span>
                    }
                </div>
            ) : (
                <div className="admin__screen__users__user__info" onClick={() => history.push(`/profile/${user.id}`)}>
                    <img src={user.profile.photo ? user.profile.photo : Avatar} alt="profile" />
                    {(!user.first_name && !user.last_name) ?
                        <span>No name</span> :
                        <h4>{user.first_name} {user.last_name}</h4>
                    }
                </div>
            )}
            {user.isAdmin && (<h3>Admin</h3>)}
            <button onClick={() => deleteUser(user.id, userInfo.accessToken, dispatch, userInfo.info.id)}>Delete user</button>
        </div>
    )
}

export default AdminUserScreenUser

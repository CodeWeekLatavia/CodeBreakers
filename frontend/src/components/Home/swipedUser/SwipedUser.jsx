import React, { useEffect, useState } from 'react'
import './SwipedUser.scss';
import { getJobOfferUserinfo, getJobseekerInfo } from '../../../logic/user/info/getUserInfo';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { chatData } from '../../../slices/chat/chatSlice';
import { NewChat } from '../../../logic/chat/chatOptions';
import { userData } from '../../../slices/user/userSlice';
import { useDispatch } from 'react-redux';

function SwipedUser({info}) {
    const [user, setUser] = useState(null);
    const [hasChat, setHasChat] = useState(null);
    const [userBaseInfo, setUserBaseInfo] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();
    const chatInfo = useSelector(chatData);
    const userInfo = useSelector(userData);

    useEffect(() => {
        if (!user) {
            getJobseekerInfo(info.jobseeker, setUser);
        } else if (user && !userBaseInfo) {
            getJobOfferUserinfo(user.user, setUserBaseInfo)
        }
    }, [user, info.jobseeker, userBaseInfo]);

    useEffect(() => {
        if (chatInfo.chats && user && hasChat === null) {
            setHasChat(chatInfo.chats.some(c => c.users.includes(user.id.toString())));
        }
    }, [chatInfo.chats, user, hasChat]);

    if (user && userBaseInfo) {
        console.log(userBaseInfo);
        return (
            <div className="user">
                <img src={user.photo} alt="user" onClick={() => history.push(`/profile/${user.user}`)} />
                <div className="user__info" onClick={() => history.push(`/profile/${user.user}`)}>
                    <p id="username">{userBaseInfo.first_name} {userBaseInfo.last_name} {user.is_active_jobseeker ? <span>#ADM</span> : ''}</p>
                </div>
                <button onClick={() => {
                    if (hasChat) {
                        history.push("/chat");
                    } else {
                        NewChat(userInfo.info.id, user.id, history, dispatch);
                    }
                }}>{hasChat ? "Sarakste" : "Sākt saraksti"}</button>
            </div>
        )
    }
    return null;
}

export default SwipedUser

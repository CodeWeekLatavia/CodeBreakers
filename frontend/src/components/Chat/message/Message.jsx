import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { MESSAGE_OPTIONS } from '../../../logic/chat/chatRoutes';
import { userData } from '../../../slices/user/userSlice';
import { languageData } from '../../../slices/languages/languageSlice';
import relativeTime from '../../RelativeTime/RelativeRime';

function Message({msg}) {
    const userInfo = useSelector(userData);
    const languageInfo = useSelector(languageData);

    useEffect(() => {
        if(!msg.isRead){
            axios.post(`${MESSAGE_OPTIONS}/${msg._id}`);
        }
    }, [msg.isRead, msg._id]);

    return(
        <div className={`chat__messages__message ${msg.senderId === userInfo.info.id ? 'my-msg' : 'target-msg'} ${msg.isRead && 'seen-msg'}`}>
            <div className="chat__messages__message__text-box">
                <p id='msg'>{msg.text}</p>
                <small id='time'>{relativeTime(msg.createdAt, languageInfo.langShort)}</small>
            </div>
        </div>
    )
}

export default Message

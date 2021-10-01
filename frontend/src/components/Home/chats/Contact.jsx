import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserChatInfo } from '../../../logic/user/info/getUserInfo';
import { userData } from '../../../slices/user/userSlice';
import Avatar from '../../../assets/svg/avatar.svg';
import { socketData } from '../../../slices/socket/socketSlice';

function Contact({contact}) {
    const [chatMemberInfo, setChatMemberInfo] = useState(null);
    const [otherMembers, setOtherMembers] = useState(null);
    const [name, setName] = useState(null);

    const history = useHistory();
    const userInfo = useSelector(userData);
    const socketInfo = useSelector(socketData);

    useEffect(() => {
        if(!otherMembers){
            setOtherMembers(parseInt(contact.users.find(m => m !== userInfo.info.id.toString())))
        }
    }, [otherMembers, userInfo.info.id, contact.users]);


    useEffect(() => {
        if(!chatMemberInfo && otherMembers){
            getUserChatInfo(otherMembers, setChatMemberInfo);
        }else if(chatMemberInfo){
            if(chatMemberInfo.is_employer){
                setName(`${chatMemberInfo.profile.company_name}`);
            }else{
                setName(`${chatMemberInfo.first_name} ${chatMemberInfo.last_name}`);
            }
        }
    }, [chatMemberInfo, otherMembers]);

    if(chatMemberInfo){
        return (
            <div className="auth-home__right__chat__contact" onClick={() => history.push(`/chats/${contact._id}`)}>
                {chatMemberInfo.profile && (
                    <img src={chatMemberInfo.profile.photo ? chatMemberInfo.profile.photo : Avatar} alt="profile" />
                )}
                <div className="auth-home__right__chat__contact__info">
                    <p id="username">{name}</p>
                    {socketInfo.onlineUsers && socketInfo.onlineUsers.some(u => u.userId === chatMemberInfo.id) ? "online" : "offline"}
                </div>
            </div>
        )
    }else{
        return null;
    }
    
}

export default Contact

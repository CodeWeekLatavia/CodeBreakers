import React, {useState, useEffect, useRef} from 'react';
import './Chat.scss'
import sendIcon from '../../../src/assets/svg/send.svg'
import smileEmoji from '../../../src/assets/svg/emoji/smile.svg'
import Contacts from './Contacts/Contacts';
import {useDispatch, useSelector} from "react-redux";
import {userData} from "../../slices/user/userSlice"
import ContactBook from '../../assets/svg/chat/contact-book.svg'
import { useParams } from 'react-router-dom';
import { getChatByID, newMessage } from '../../logic/chat/chatOptions';
import { addMessage, chatData, recieveMessage, setActiveChatMessages } from '../../slices/chat/chatSlice';
import AvatarIcon from "../../assets/svg/avatar.svg"
import { getChatMessages } from '../../logic/chat/chatOptions';
import {useHistory} from "react-router-dom"
import { getSocket, socketData } from '../../slices/socket/socketSlice';
import NoChatIcon from "../../assets/svg/chat/nochat.svg";
import CloseIcon from "../../assets/svg/close-black.svg";
import { languageData } from '../../slices/languages/languageSlice';
import Message from './message/Message';

function Chat() {
    const {id} = useParams();
    const userInfo = useSelector(userData);
    const chatInfo = useSelector(chatData);
    const socketInfo = useSelector(socketData);
    const languageInfo = useSelector(languageData);

    const [contactsToggled, setContactsToggled] = useState(false)
    const [messageText, setMessageText] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messageSent, setMessageSent] = useState(false);
    const [emojisOpen, setEmojisOpen] = useState(false);
    const [delivered, setDelivered] = useState(true);

    const scrollRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(id && userInfo.info){
            getChatByID(id, userInfo.info.id, dispatch, history);
            dispatch(setActiveChatMessages([]));
        }
    }, [id, dispatch, userInfo.info, history]);

    useEffect(() => {
        if(socketInfo.socket){
            const socket = getSocket();
            socket.on("getMessage", (data) => {
                setArrivalMessage({
                    senderId: data.senderId,
                    text: data.text,
                    createdAt: Date.now(),
                });
            });

        }
    }, [socketInfo.socket]);

    useEffect(() => {
        if(arrivalMessage && chatInfo.messages && chatInfo.activeChat && chatInfo.activeChat.id === arrivalMessage.senderId){
            dispatch(recieveMessage(arrivalMessage));
            scrollRef.current.scrollIntoView({
                behavior: "smooth",
            });
            if(arrivalMessage.text !== ""){
                setArrivalMessage(null);
            }
        }
    }, [arrivalMessage, chatInfo.messages, chatInfo.activeChat, dispatch]);

    useEffect(() => {
        if(chatInfo.activeChatID && chatInfo.activeChat){
            if(!chatInfo.messages || chatInfo.messages.length === 0){
                getChatMessages(chatInfo.activeChatID, dispatch);
            
                scrollRef.current.scrollIntoView({
                    behavior: "smooth",
                });

            }
        }
    }, [chatInfo.activeChatID, chatInfo.activeChat, dispatch, chatInfo.messages]);

    useEffect(() => {
        if(messageSent){
            setMessageText("");

            scrollRef.current.scrollIntoView({
                behavior: "smooth",
            });
            setMessageSent(false);

        }
    }, [messageSent]);

    useEffect(() => {
        if(chatInfo.messages && chatInfo.activeChat && userInfo.info){
            let lastMesage = chatInfo.messages[chatInfo.messages.length - 1];

            if(lastMesage && lastMesage.senderId === userInfo.info.id && !delivered){
                const socket = getSocket();

                socket.emit("sendMessage", {
                    senderId: userInfo.info.id,
                    receiverId: chatInfo.activeChat.id,
                    text: messageText,
                });

                setDelivered(true);
                setMessageText("");
            }
        }
    }, [chatInfo.messages, userInfo.info, messageText, chatInfo.activeChat, delivered]);


    function handleContactsToggle() {
        setContactsToggled(!contactsToggled);
    }

    const sendMessage = (e) => {
        e.preventDefault();

        if(socketInfo.socket && messageText !== ""){
            dispatch(addMessage({
                senderId: userInfo.info.id,
                receiverId: chatInfo.activeChat.id,
                text: messageText,
            }));

            setDelivered(false);    
            newMessage(userInfo.info.id, chatInfo.activeChat.id, chatInfo.activeChatID, messageText, dispatch, setMessageSent);
        }
    };

    const addEmoji = (emoji) => {
        setMessageText(`${messageText}${emoji}`);
    }

    return (
        <div id={'chat-container'}>
            <Contacts 
                active={contactsToggled} 
                handleToggle={handleContactsToggle} 
            />
            {chatInfo.activeChat ? (
                <form className="chat">
                    <img src={ContactBook} alt="contacts" onClick={handleContactsToggle} className="chat__contacts-toggle" />
                    <div className="chat__header">
                        <div className="chat__header__profile-info">
                            {chatInfo.activeChat.profile && (
                                <img src={chatInfo.activeChat.is_employer ? chatInfo.activeChat.profile.logo ? chatInfo.activeChat.profile.logo : AvatarIcon : chatInfo.activeChat.profile.photo ? chatInfo.activeChat.profile.photo : AvatarIcon} alt="renault" onClick={() => history.push(`/profile/${chatInfo.activeChat.id}`)} />
                            )}
                            <div className="chat__header__profile-info__text" onClick={() => history.push(`/profile/${chatInfo.activeChat.id}`)} >
                                <p id="username">{chatInfo.activeChat.is_employer ? `${chatInfo.activeChat.profile.company_name}` : `${chatInfo.activeChat.first_name} ${chatInfo.activeChat.last_name}`}</p>
                                <small id="activity-status">{socketInfo.onlineUsers && socketInfo.onlineUsers.some(u => u.userId === chatInfo.activeChat.id) ? "online" : "offline"}</small>
                            </div>
                        </div>
                    </div>
                    <div className={`chat__messages ${chatInfo.messages.length < 1 ? 'empty' : ''}`}>
                        {!chatInfo.messages &&
                            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                        }
                        {chatInfo.messages && chatInfo.messages.map((msg, i) => {
                            if(msg){
                                return(
                                    <Message 
                                        key={i}
                                        msg={msg}
                                    />
                                )
                            }
                            return null
                        })}
                        <div ref={scrollRef}></div>
                    </div>
                    <div className="chat__input-container">
                        <div className="chat__input-container__options">
                            <img src={smileEmoji} alt="smile" onClick={() => setEmojisOpen(!emojisOpen)} />
                            {emojisOpen && (
                                <div className="chat__input-container__options__emojiOptions">
                                    <div className="chat__input-container__options__emojiOptions__header">
                                        Emoji
                                        <img src={CloseIcon} alt="close" onClick={() => setEmojisOpen(false)} />
                                    </div>
                                    <small>Sejas</small>
                                    <ul>
                                        <li onClick={() => addEmoji("😃")}>😃</li>
                                        <li onClick={() => addEmoji("😄")}>😄</li>
                                        <li onClick={() => addEmoji("😅")}>😅</li>
                                        <li onClick={() => addEmoji("😂")}>😂</li>
                                        <li onClick={() => addEmoji("😇")}>😇</li>
                                        <li onClick={() => addEmoji("😊")}>😊</li>
                                        <li onClick={() => addEmoji("😱")}>😱</li>
                                        <li onClick={() => addEmoji("😯")}>😯</li>
                                        <li onClick={() => addEmoji("🤨")}>🤨</li>
                                        <li onClick={() => addEmoji("😳")}>😳</li>
                                        <li onClick={() => addEmoji("😟")}>😟</li>
                                        <li onClick={() => addEmoji("😔")}>😔</li>
                                        <li onClick={() => addEmoji("🙁")}>🙁</li>
                                    </ul>
                                    <small>Žesti</small>
                                    <ul>
                                        <li onClick={() => addEmoji("👋")}>👋</li>
                                        <li onClick={() => addEmoji("👌")}>👌</li>
                                        <li onClick={() => addEmoji("👍")}>👍</li>
                                        <li onClick={() => addEmoji("👎")}>👎</li>
                                        <li onClick={() => addEmoji("🙏")}>🙏</li>
                                        <li onClick={() => addEmoji("✌️")}>✌️</li>
                                        <li onClick={() => addEmoji("🤞")}>🤞</li>
                                        <li onClick={() => addEmoji("🤟")}>🤟</li>
                                        <li onClick={() => addEmoji("🤘")}>🤘</li>
                                        <li onClick={() => addEmoji("🤝")}>🤝</li>
                                    </ul>
                                    <small>Simboli</small>
                                    <ul>
                                        <li onClick={() => addEmoji("❤️")}>❤️</li>
                                        <li onClick={() => addEmoji("💚")}>💚</li>
                                        <li onClick={() => addEmoji("❌")}>❌</li>
                                        <li onClick={() => addEmoji("✅")}>✅</li>
                                        <li onClick={() => addEmoji("⛔️")}>⛔️</li>
                                        <li onClick={() => addEmoji("💯")}>💯</li>
                                        <li onClick={() => addEmoji("💢")}>💢</li>
                                        <li onClick={() => addEmoji("❗️")}>❗️</li>
                                        <li onClick={() => addEmoji("❓")}>❓</li>
                                        <li onClick={() => addEmoji("⁉️")}>⁉️</li>
                                        <li onClick={() => addEmoji("🆗")}>🆗</li>
                                        <li onClick={() => addEmoji("🆓")}>🆓</li>
                                    </ul>
                                </div>
                            )}
                            <label htmlFor="fileMessage">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26.89" height="26.89" viewBox="0 0 26.89 26.89">
                                    <g id="link" transform="translate(-0.007 0)" opacity="0.8">
                                        <g id="Group_33" data-name="Group 33" transform="translate(0.007 0)">
                                            <g id="Group_32" data-name="Group 32">
                                                <g id="Group_31" data-name="Group 31">
                                                    <path id="Path_361" data-name="Path 361" d="M10.154,188.134,6.986,191.3a3.361,3.361,0,0,1-4.754-4.753l6.338-6.338a3.36,3.36,0,0,1,4.753,0,1.12,1.12,0,0,0,1.585-1.585,5.6,5.6,0,0,0-7.922,0L.647,184.965a5.6,5.6,0,1,0,7.923,7.922l3.169-3.169a1.12,1.12,0,1,0-1.585-1.584Z" transform="translate(0.994 -167.639)" fill="#6d6d6d"/>
                                                    <path id="Path_362" data-name="Path 362" d="M205.157.64a5.6,5.6,0,0,0-7.923,0l-3.8,3.8a1.12,1.12,0,0,0,1.585,1.585l3.8-3.8a3.361,3.361,0,1,1,4.754,4.753L196.6,13.949a3.36,3.36,0,0,1-4.753,0,1.12,1.12,0,0,0-1.585,1.585,5.6,5.6,0,0,0,7.922,0l6.971-6.971A5.6,5.6,0,0,0,205.157.64Z" transform="translate(-179.908 1)" fill="#6d6d6d"/>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </label>
                            <input type="file" name="fileMessage" id="fileMessage" />
                        </div>
                        <div className="chat__input-container__input">
                            <input type="text" placeholder={languageInfo.text.chat.typeHere} value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                        </div>
                        <div className="chat__input-container__send">
                            <img src={sendIcon} alt="send icon" onClick={(e) => sendMessage(e)} />
                        </div>
                    </div>
                    <button className="chat__invizButton" onClick={(e) => sendMessage(e)}></button>
                </form>    
            ) : (
                <div className="noChatSelected">
                    <img src={ContactBook} alt="contacts" onClick={handleContactsToggle} className="chat__contacts-toggle" />
                    <p>{languageInfo.text.chat.noChat}</p>
                    <img src={NoChatIcon} alt="no chat" className="noChatSelected__no-chat-img" />
                </div>
            )}
        </div>
    )
}

export default Chat;
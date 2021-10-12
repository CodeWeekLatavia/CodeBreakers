import React, { useState } from 'react';
import './Contacts.scss'
import searchIcon from '../../../assets/svg/search-icon.svg'
import { useSelector } from 'react-redux';
import { chatData } from '../../../slices/chat/chatSlice';
import { userData } from '../../../slices/user/userSlice';
import Contact from './contact/Contact';
import Close from '../../../assets/svg/close.svg'
import { languageData } from '../../../slices/languages/languageSlice';

function Contacts({ active, handleToggle }) {
    const [search, setSearch] = useState("");

    const chatInfo = useSelector(chatData);
    const userInfo = useSelector(userData);
    const languageInfo = useSelector(languageData);
    
    return(
        <div className={`contacts-container ${active ? 'active' : ''}`}>
            <header className="contacts-container__header">
                <p>{languageInfo.text.chat.lastContacts}</p>
                <img src={Close} alt="close" onClick={() => handleToggle()} className="contacts-container__header__close" />
            </header>
            <div className="contacts-container__contacts">
                
                <div className="contacts-container__contacts__find-contacts">
                    <div className="input-group">
                        <img src={searchIcon} alt="searchIcon" />
                        <input type="text" placeholder={languageInfo.text.chat.searchContacts} value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="contacts-container__contacts__contacts-list">
                    {chatInfo.chats && userInfo.info && chatInfo.chats.map((chat, i) => (
                        <Contact 
                            chat={chat}
                            key={i}
                            search={search}
                            setSearch={setSearch}
                            handleToggle={handleToggle}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Contacts
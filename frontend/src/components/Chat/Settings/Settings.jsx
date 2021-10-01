import React, { useState } from 'react';
import './Settings.scss'
import unblockLock from '../../../assets/svg/lock-unblock.svg'

function Settings({closePopup}){

    const [stage, setStage] = useState(0);
    const [userToUnblock, setUserToUnblock] = useState(null);
    // demo blocked users for test
    const [blockedUsers] = useState([
        {id: 0, img: 'https://avatarfiles.alphacoders.com/165/165968.jpg', username: 'Mareks'},
        {id: 1, img: 'https://avatarfiles.alphacoders.com/165/165968.jpg', username: 'Poseidons'},
        {id: 2, img: 'https://avatarfiles.alphacoders.com/165/165968.jpg', username: 'Bob'},
    ]);

    function handleUnblockUserPopup(userID, unblock){
        if (!userID && unblock) {
            return console.log('unblocking functionality starts')
        } 
         setUserToUnblock(userID)
    }

    return(
        <div className='settings'>
            <div className="settings__inner">
                {userToUnblock !== null ? (
                    <div className="settings__inner__unblock-popup">
                        <img src={unblockLock} alt="unblock-lock" />
                        <p className='settings__inner__unblock-popup__text'>Atbloķēt kontaktu?</p>
                         <div className="settings__inner__unblock-popup__options">
                            <button id='unblock' onClick={() => handleUnblockUserPopup(null, true)}>Atbloķēt</button>
                            <button id='cancel' onClick={() => handleUnblockUserPopup(null, false)}>Atcelt</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <header className="settings__inner__header">
                        {stage > 0 && (
                            <svg onClick={() => setStage(0)} className="settings__inner__header__back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12.947">
                                <g id="left-chevron_9_" data-name="left-chevron(9)" transform="translate(-48.907)">
                                <g id="Group_56" data-name="Group 56" transform="translate(48.907)">
                                    <g id="Group_55" data-name="Group 55">
                                    <path id="Path_386" data-name="Path 386" d="M56.907,1.527,56.1.717,55.381,0,48.907,6.474l6.474,6.474,1.527-1.527L51.96,6.474Z" transform="translate(-48.907)" fill="#b2b2b2"/>
                                    </g>
                                </g>
                                </g>
                            </svg>
                        )}
                        <p className="settings__inner__header__title">
                            {stage === 0 && 'Iestatījumi'}
                            {stage === 1 && 'Čata paziņojumi'}
                            {stage === 2 && 'Bloķētie kontakti'}
                            {stage === 3 && 'Palīdzība'}
                        </p>
                        <svg className='settings__inner__header__close' onClick={closePopup} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.615 11.452">
                            <line id="Line_36" data-name="Line 36" y2="12.195" transform="translate(1.414 1.414) rotate(-45)" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-width="2"/>
                            <path id="Path_353" data-name="Path 353" d="M0,0H12.195" transform="translate(1.577 10.037) rotate(-45)" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-width="2"/>
                        </svg>
                    </header>
                    <main className="settings__inner__main">

                        {stage === 1 && (
                            <div className="settings__inner__main__stage" id='chat-notifications'>
                                <div className="settings__inner__main__stage__options">
                                    <div className="settings__inner__main__stage__options__input-group">
                                        <input type="checkbox" name='enable-notifications' id='enable-notifications' />
                                        <label htmlFor="enable-notifications">Ieslēgt paziņojumus</label>
                                    </div>
                                    <div className="settings__inner__main__stage__options__input-group">
                                        <input type="checkbox" name='notifiy-sound' id='notifiy-sound' />
                                        <label htmlFor="notifiy-sound">Paziņojumi ar skaņu</label>
                                    </div>
                                    <div className="settings__inner__main__stage__options__input-group">
                                        <input type="checkbox" name='notify-preview' id='notify-preview' />
                                        <label htmlFor="notify-preview">Paziņojumu priekšskatījums</label>
                                    </div>
                                </div>
                            </div>  
                        )}
                        {stage === 2 && (
                            <div className="settings__inner__main__stage" id='blocked-users'>
                                {blockedUsers.map(user => (
                                    <div key={user.id} className="settings__inner__main__stage__blocked-user">
                                        <img src={user.img} className="settings__inner__main__stage__blocked-user__avatar" alt='user-avatar' />
                                        <p className="settings__inner__main__stage__blocked-user__username">{user.username}</p>
                                        <svg onClick={() => handleUnblockUserPopup(user.id, false)}className="settings__inner__main__stage__blocked-user__unblock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11">
                                            <circle id="Ellipse_164" data-name="Ellipse 164" cx="5.5" cy="5.5" r="5.5" fill="#ff8183"/>
                                            <line id="Line_52" data-name="Line 52" y2="5.798" transform="translate(3.322 3.389) rotate(-45)" fill="none" stroke="#ff0007" stroke-linecap="round" stroke-width="1"/>
                                            <path id="Path_388" data-name="Path 388" d="M0,0H5.8" transform="translate(3.4 7.489) rotate(-45)" fill="#f90007" stroke="#ff0007" stroke-linecap="round" stroke-width="1"/>
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        )}

                        {stage <= 0 && (
                            <div className="settings__inner__main__profile">
                                <img src="https://group.renault.com/wp-content/uploads/2021/03/nouveau_logo_renault_banner.jpg" alt="renault" />
                                
                                <div className="settings__inner__main__profile__text">
                                    <p id="username">Poseidons</p>
                                    <small id="activity-status">online</small>
                                </div>
                            </div>
                        )}
                        
                        {stage <= 0 && (
                            <div className="settings__inner__main__stages">
                                <p onClick={() => setStage(1)}>Čata paziņojumi</p>
                                <p onClick={() => setStage(2)}>Bloķētie cilvēki</p>
                                <p onClick={() => setStage(3)}>Palīdzība</p>
                            </div>
                        )}

                    </main> 
                </> 
                )}
            </div>
        </div>
    )
}

export default Settings;
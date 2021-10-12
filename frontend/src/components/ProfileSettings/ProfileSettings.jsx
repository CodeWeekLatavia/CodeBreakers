import React, { useState, useEffect } from 'react';
import './ProfileSettings.scss';
import notifications from '../../assets/svg/profileSettings/notifications.svg'
import payment from '../../assets/svg/profileSettings/payment.svg'
import premium from '../../assets/svg/profileSettings/premium.svg'
import profile from '../../assets/svg/profileSettings/profile.svg'
import security from '../../assets/svg/profileSettings/security.svg'

import Profile from './settings/Profile/Profile';
import Security from './settings/Security/Security';
import Premium from './settings/Premium/Premium';
import Payment from './settings/Payment/Payment'
import Notifications from './settings/Notifications/Notifications'

import { useSelector } from 'react-redux';
import { languageData } from '../../slices/languages/languageSlice';

function ProfileSettings(){
    const [activePage, setActivePage] = useState(<Profile />);
    const [activeLink, setActiveLink] = useState('profile');
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    const languageInfo = useSelector(languageData)

    useEffect(() => {
        window.addEventListener('resize', function (e) {
            setInnerWidth(e.target.innerWidth);
        });
    }, [])

    return (
        <div className='profileSettings'>
            <aside className='profileSettings__aside'>
                {innerWidth > 800 &&
                    <nav className='profileSettings__aside__nav'>
                    <span
                        className={`profileSettings__aside__nav__link ${activeLink === 'profile' ? 'active' : ''}`}
                        onClick={() => {
                            setActivePage(<Profile />);
                            setActiveLink('profile');
                        }}
                    > <img src={profile} alt="profile" /> {languageInfo.text.settings.profile.heading}</span>
                    <span
                        className={`profileSettings__aside__nav__link ${activeLink === 'security' ? 'active' : ''}`}
                        onClick={() => {
                            setActivePage(<Security />);
                            setActiveLink('security');
                        }}
                    > <img src={security} alt="security" /> {languageInfo.text.settings.security.heading}</span>
                    <span
                        className={`profileSettings__aside__nav__link ${activeLink === 'premium' ? 'active' : ''}`}
                        onClick={() => {
                            setActivePage(<Premium />);
                            setActiveLink('premium');
                        }}
                    > <img src={premium} alt="premium" /> {languageInfo.text.settings.premium.heading}</span>
                    <span
                        className={`profileSettings__aside__nav__link ${activeLink === 'payment' ? 'active' : ''}`}
                        onClick={() => {
                            setActivePage(<Payment />);
                            setActiveLink('payment');
                        }}
                    > <img src={payment} alt="payment" /> {languageInfo.text.settings.payments.heading1}</span>
                    <span
                        className={`profileSettings__aside__nav__link ${activeLink === 'notifications' ? 'active' : ''}`}
                        onClick={() => {
                            setActivePage(<Notifications />);
                            setActiveLink('notifications');
                        }}
                    > <img src={notifications} alt="notifications" /> {languageInfo.text.settings.notifications.heading}</span>
                </nav>
                }
            </aside>
            <main>
                {innerWidth > 800 ? activePage :
                    <div className="settings-wrapper">
                        <Profile />
                        <Security />
                        <Premium />
                        <Payment />
                        < Notifications />
                    </div>
                }
            </main>
        </div>
    )
}

export default ProfileSettings;
import React, {useEffect, useState} from 'react'
import './Cookie.scss'
import cookie from '../../assets/svg/cookie.svg';
import { useSelector } from 'react-redux';
import { languageData } from '../../slices/languages/languageSlice';

function Cookie(){
    const [showPopup, setShowPopup] = useState(false);
    const languageInfo = useSelector(languageData);

    useEffect(() => {
        const alreadyUsingCookies = window.localStorage.getItem('usingcookies');
        if (alreadyUsingCookies === 'true' || alreadyUsingCookies === 'false') return null;
        setShowPopup(true)
    }, [])

    function handleCookieOptions(save) {
        window.localStorage.setItem('usingcookies', save)
        setShowPopup(false)
    }

    return (
        <div className={`cookie ${showPopup ? 'active' : ''}`}>
            <p className='cookie__title'>{languageInfo.text.cookie.heading}</p>
            <p className="cookie__info">{languageInfo.text.cookie.info} <u>{languageInfo.text.cookie.infoLink}</u>.</p>
            <div className="cookie__options">
                <button onClick={() => handleCookieOptions(true)} id={'accept-cookies'}>
                    <img src={cookie} alt="cookie"/> {languageInfo.text.cookie.button1}
                </button>
                <button onClick={() => handleCookieOptions(false)} id={'decline-cookies'}>{languageInfo.text.cookie.button2}</button>
            </div>
        </div>
    )
}

export default Cookie
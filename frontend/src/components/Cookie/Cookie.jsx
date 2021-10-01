import React, {useEffect, useState} from 'react'
import './Cookie.scss'
import cookie from '../../assets/svg/cookie.svg';

function Cookie(){
    const [showPopup, setShowPopup] = useState(false);

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
            <p className='cookie__title'>Sveiki!</p>
            <p className="cookie__info">Mēs izmantojam savus un trešo pušu sīkfailus, lai personalizētu saturu un analizētu tīmekļa trafiku. Nospiežot uz "Piekrītu", Jūs piekrītat mūsu <u>Privātuma Politikai</u>.</p>
            <div className="cookie__options">
                <button onClick={() => handleCookieOptions(true)} id={'accept-cookies'}>
                    <img src={cookie} alt="cookie"/> Piekrītu
                </button>
                <button onClick={() => handleCookieOptions(false)} id={'decline-cookies'}>Nepiekrītu</button>
            </div>
        </div>
    )
}

export default Cookie
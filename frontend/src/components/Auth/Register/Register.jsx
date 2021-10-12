import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

import './Register.scss'
import RegisterIcon from '../../../assets/svg/register.svg';
import rightArrow from '../../../assets/svg/home/rightArrow.svg';
import Whitearrow from '../../../assets/svg/home/next.svg';
import { useSelector } from 'react-redux';
import { userData } from '../../../slices/user/userSlice';
import {useHistory} from "react-router-dom";
import { languageData } from '../../../slices/languages/languageSlice';

function Register() {
    const userInfo = useSelector(userData);
    const languageInfo = useSelector(languageData);
    const history = useHistory();

    useEffect(() => {
        if(userInfo.loggedIn){
            history.push("/");
        }
    }, [history, userInfo.loggedIn]);

    return (
        <div className='register'>
            <main className="register__main">
                <div data-aos='fade-right' className="register__main__left">
                    <div className="register__main__left__title">{languageInfo.text.registerChoose.heading}</div>
                    <div className="register__main__left__undertitle">{languageInfo.text.registerChoose.subHeading}</div>
                    <Link to='/register/jobGiver'>
                        <button id='job-giver'>
                            {languageInfo.text.registerChoose.button1}<img src={rightArrow} alt="" />
                        </button>
                    </Link>
                    <Link to='/register/jobTaker'>
                        <button id='job-taker'>
                            {languageInfo.text.registerChoose.button2} <img src={Whitearrow} alt="" />
                        </button>
                    </Link>
                </div>
                <div data-aos="fade-left" className="register__main__right">
                    <img src={RegisterIcon} alt="register" />
                </div>
            </main>
            <div className='register__info'>
                <p>(Visus datus tu varēsi nomainīt pēc tam iestatījumos)</p>
            </div>
        </div>
    )
}

export default Register;
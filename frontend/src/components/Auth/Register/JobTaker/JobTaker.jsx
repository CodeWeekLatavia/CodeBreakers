import React, { useEffect, useState } from 'react';
import './JobTaker.scss'
import jobTaker from '../../../../assets/svg/jobTaker/jobTaker.svg';
import showPwdImg from '../../../../assets/svg/eye.svg';
import hidePwdImg from '../../../../assets/svg/eye_hide.svg';
import facebook from '../../../../assets/svg/socials/facebook.svg';
import google from '../../../../assets/svg/socials/google.svg';
import { registerUser } from '../../../../logic/user/auth';
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userData } from '../../../../slices/user/userSlice';
import { Link } from 'react-router-dom';
import { languageData } from '../../../../slices/languages/languageSlice';

function JobTaker(){
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
   
    const [emailDirty, setEmailDirty] = useState('');
    const [passwordDirty, setPasswordDirty] = useState('');
    const [emailError, setEmailError] = useState('E-pasts nevar būt tukšs!');
    const [passwordError,setPasswordError] = useState('Parole nevar būt tukša!')

    const history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector(userData);
    const languageInfo = useSelector(languageData);

    useEffect(() => {
        window.addEventListener('resize', function(e){
            setInnerWidth(e.target.innerWidth)
        })
    }, [])

    useEffect(() => {
        if(userInfo.loggedIn){
            history.push("/");
        }
    }, [userInfo.loggedIn, history]);

    useEffect(() => {
        if(userInfo.loggedIn){
            history.push("/");
        }
    }, [history, userInfo.loggedIn]);

    const emailHandler = (e) =>{
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Not valid E-mail!')
        }
        else{
            setEmailError('')
        }
        
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value)
        
        if(e.target.value.length < 5 ) {
            setPasswordError('Password must be at least 5 characters long!')
            if(!e.target.value){
                setPasswordError('Password cannot be empty!')
            }
        }
        else{
            setPasswordError('')
        }
    }
    const blurHandler = (e) => {
        switch (e.target.name) {
            default:
                setEmailDirty(false);
                setPasswordDirty(false);
            break

            case 'email':
                setEmailDirty(true)
            break

            case 'password':
                setPasswordDirty(true)
            break
        }
    }

    const checkRegisterInfo = (e) => {
        e.preventDefault();
        if (name !== "" && surname !== "" && email !== "" && password !== "") {
            registerUser(
                email,
                password,
                name,
                surname,
                dispatch
            );
        }
    }

    return (
        <div id='jobTaker' className='main'>
            <div className='job'>
                <div className='job__left'> 
                        <h1 className="job__left__title">{languageInfo.text.registerJobseekerPage.header}</h1>
                        <p className="job__left__desc">{languageInfo.text.registerJobseekerPage.subHeader}</p>
                        <img src={jobTaker} alt="jobTaker_image"/>
                        <div className="job__left__login">
                            <p>{languageInfo.text.registerJobseekerPage.alreadyRegistered}</p> <Link to="/login">{languageInfo.text.registerJobseekerPage.login}</Link>
                        </div>
                </div>
                
                <form onSubmit={(e) => checkRegisterInfo(e)} className="job__right">
                    <div className="job__right__input-group">
                        <input className="job__right__input-group__input" value={name} onChange={(e) => setName(e.target.value)} type="text" id='name' placeholder='' required/>
                        <label className="job__right__input-group__label" htmlFor="name">{languageInfo.text.registerJobseekerPage.firstName}</label>
                    </div>        

                    <div className="job__right__input-group">
                        <input className="job__right__input-group__input" value={surname} onChange={(e) => setSurname(e.target.value)} type="text" id='surname' placeholder='' required/>
                        <label className="job__right__input-group__label" htmlFor="surname">{languageInfo.text.registerJobseekerPage.lastName}</label>
                    </div>        

                    <div className="job__right__input-group">
                        <input className="job__right__input-group__input" value={email} onChange={(e) => {setEmail(e.target.value);emailHandler(e)}} onBlur={(e) => blurHandler(e)} name="email" type="email" id='email' placeholder='' required/>
                        <label className="job__right__input-group__label" htmlFor="email">{languageInfo.text.registerJobseekerPage.email}</label>
                    </div>        
                    {(emailDirty && emailError) && <div className="job__right__error"style={{color:"#FA4251"}}>{emailError}</div>}
                    <div className="job__right__input-group">
                        <input className="job__right__input-group__input" onChange={e => passwordHandler(e)} onBlur={(e) => blurHandler(e)} value={password} name="password" type={isRevealPwd ? "text" : "password"} id='password' placeholder='' autoComplete="off" required />
                        <label className="job__right__input-group__label" htmlFor="password">{languageInfo.text.registerJobseekerPage.password}</label>
                        <img title={isRevealPwd ? "Slēpt paroli" : "Parādīt paroli"} alt="eye" className="company__right__input-group__eye" src={isRevealPwd ? hidePwdImg : showPwdImg} onClick={() => setIsRevealPwd(prevState => !prevState)}></img>
                    </div>   
                    {(passwordDirty && passwordError) && <div className="job__right__error"style={{color:"#FA4251"}}>{passwordError}</div>}
                    <div className="job__right__checkbox">
                        <input type="checkbox" id="checkbox" name="" value="" required/>
                        <label htmlFor="checkbox">{languageInfo.text.registerJobseekerPage.privacyPolicy1} <u>{languageInfo.text.registerJobseekerPage.privacyPolicy2}</u></label>
                    </div>
                    <button type='submit' className='job__right__submit'>{languageInfo.text.registerJobseekerPage.button}</button>
                    {innerWidth < 1024 &&
                        <div className="login">
                        <p>{languageInfo.text.registerJobseekerPage.alreadyRegistered}</p> <Link to="/login">{languageInfo.text.registerJobseekerPage.login}</Link>
                    </div>
                    }
                    <div className="job__right__divider">
                        <span className="job__right__divider__line"></span>
                    </div>
                    <div className="auth__form-wrapper__socials">
                        <div className="auth__form-wrapper__socials__social">
                            <img src={facebook} href="https://www.facebook.com" alt="facebook" ></img>
                        </div>

                        <div className="auth__form-wrapper__socials__social">
                            <img src={google} href="https://www.google.com" alt="google" ></img>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default JobTaker;
import React, { useEffect, useState } from 'react';
import './JobGiver.scss'
import jobGiver from '../../../../assets/svg/jobGiver/jobGiver.svg';
import showPwdImg from '../../../../assets/svg/eye.svg';
import hidePwdImg from '../../../../assets/svg/eye_hide.svg';
import facebook from '../../../../assets/svg/socials/facebook.svg';
import google from '../../../../assets/svg/socials/google.svg';
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userData } from '../../../../slices/user/userSlice';
import { Link } from 'react-router-dom';
import { registerCompany } from '../../../../logic/company/auth/auth';

function JobGiver(){
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [name, setName] = useState("");
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

    useEffect(() => {
        window.addEventListener('resize', function(e){
            setInnerWidth(e.target.innerWidth)
        })
    }, [])

    useEffect(() => {
        if(userInfo.loggedIn){
            history.push("/");
        }
    }, [history, userInfo.loggedIn]);

    const emailHandler = (e) =>{
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Nav pareizs E-pasts!')
        }
        else{
            setEmailError('')
        }
        
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value)
        
        if(e.target.value.length < 5 ) {
            setPasswordError('Parolei ir jābūt ne mazāk nekā 5 simboli!')
            if(!e.target.value){
                setPasswordError('Parole nevar būt tukša!')
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
        if (name !== "" && email !== "" && password !== "") {
            registerCompany(
                email,
                password,
                name,
                dispatch
            );
        }
    }

    return (
        <div id='jobGiver' className='main'>
            <div className='company'>
                <div className='company__left'> 
                        <h1 className="company__left__title">
                            Uzņēmuma Reģistrācija
                        </h1>
                        <p className="company__left__desc">Tas neaizņems daudz laika</p>
                        <img src={jobGiver} alt="jobGiver_image"/>
                        <div className="company__left__login">
                            <p>Jau esiet reģistrēts?</p> <Link to="/login">Ieiet</Link>
                        </div>
                </div>
                
                <form onSubmit={(e) => checkRegisterInfo(e)} className="company__right">
                    <div className="company__right__input-group">
                        <input className="company__right__input-group__input"value={name} onChange={(e) => setName(e.target.value)} type="text" id='name' placeholder='' required/>
                        <label className="company__right__input-group__label" htmlFor="name">Uzņēmuma nosaukums:</label>
                    </div>           
                    <div className="company__right__input-group">
                        <input className="company__right__input-group__input" value={email} onChange={(e) => {setEmail(e.target.value);emailHandler(e)}} onBlur={(e) => blurHandler(e)} name="email" type="email" id='email' placeholder='' required/>
                        <label className="company__right__input-group__label" htmlFor="email">Uzņēmuma e-pasts:</label>
                    </div>        
                    {(emailDirty && emailError) && <div className="company__right__error"style={{color:"#FA4251"}}>{emailError}</div>}
                    <div className="company__right__input-group">
                        <input className="company__right__input-group__input" onChange= {e => passwordHandler(e)} onBlur={(e) => blurHandler(e)}value={password} name="password" type={isRevealPwd ? "text" : "password"}  id='password' placeholder='' autoComplete="off" required/>
                        <label className="company__right__input-group__label" htmlFor="password">Parole:</label>
                        <img title={isRevealPwd ? "Slēpt paroli" : "Parādīt paroli"} alt="eye" className="company__right__input-group__eye" src={isRevealPwd ? hidePwdImg : showPwdImg} onClick={() => setIsRevealPwd(prevState => !prevState)} />
                    </div>   
                    {(passwordDirty && passwordError) && <div className="company__right__error"style={{color:"#FA4251"}}>{passwordError}</div>}
                    <div className="company__right__checkbox">
                        <input type="checkbox" id="checkbox" name="" value=""/>
                        <label htmlFor="checkbox">Es piekrītu mūsu <u>Privātuma Politikai</u></label>
                    </div>
                    <button type='submit' className='company__right__submit'>Reģistrēties</button>
                    {innerWidth < 1024 &&
                        <div className="login">
                        <p>Jau esiet reģistrēts?</p> <Link to="/login">Ieiet</Link>
                    </div>
                    }
                    <div className="company__right__divider">
                    <span className="company__right__divider__line"></span>
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
export default JobGiver;
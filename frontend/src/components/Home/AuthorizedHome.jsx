import React, { useEffect, useState } from 'react';
import './AuthorizedHome.scss';

import CrownIcon from '../../assets/svg/crown.svg';
import Avatar from '../../assets/svg/avatar.svg';
import Bookmark2 from '../../assets/svg/bookmark2.svg';
import CloseBlack from '../../assets/svg/close-black.svg';
import NoUsers from '../../assets/svg/home/no-users.svg';

import { useSelector } from 'react-redux';
import { userData } from '../../slices/user/userSlice';
import { useHistory } from 'react-router-dom';
import { getUserJobNoSearch } from '../../logic/user/proffessions/proffessions';
import { useDispatch } from 'react-redux';
import { proffessionData } from '../../slices/proffessions/proffessionSlice';
import { languageData } from '../../slices/languages/languageSlice';

import LoadingPopup from '../popups/loading/LoadingPopup';
import ScrollJobs from './JobsPanel/ScrollJobs';
import SwipeJobs from './JobsPanel/SwipeJobs';
import { infoData, setFilterTags } from '../../slices/info/infoSlice';
import { chatData } from '../../slices/chat/chatSlice';
import Contact from './chats/Contact';
import SwipedUser from './swipedUser/SwipedUser';

function AuthorizedHome() {
    const pageInfo = useSelector(infoData);
    const userInfo = useSelector(userData);
    const languageInfo = useSelector(languageData);

    const [scrollJobs, setScrollJobs] = useState([]);
    const [swipeJobs, setSwipeJobs] = useState([]);
    const [woluntaryJobs, setWoluntaryJobs] = useState([]);
    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        if(pageInfo.jobOffers && userInfo.swipedPossitions){
            if(scrollJobs.length > 0 || swipeJobs.length > 0 || woluntaryJobs.length > 0){
                setScrollJobs([]);
                setSwipeJobs([]);
                setWoluntaryJobs([]);
            }
            pageInfo.jobOffers.forEach((job) => {
                let contractType = job.contract_type;
                let occupation = job.position_occupation;
                let jobID = job.id;

                if(!userInfo.swipedPossitions.some(sp => sp.position === jobID)){
                    if(pageInfo.filterTags){
                        if(filterJobs.length > 0){
                            setFilterJobs([]);
                        }
    
                        pageInfo.filterTags.forEach((tag) => {
                            const category = tag.type;
                            
                            if(category === "category"){
                                const tagOccupations = tag.occupations;
                    
                                if(tagOccupations.some(o => o.id === occupation)){
    
                                    if(filterJobs && scrollJobs && swipeJobs && woluntaryJobs && !scrollJobs.includes(job) && !swipeJobs.includes(job) && !woluntaryJobs.includes(job)){
                                        if(contractType === "long term"){
                                            scrollJobs.push(job);
                                        }else if(contractType === "short term"){
                                            swipeJobs.push(job);
                                        }else if(contractType === "woluntary job"){
                                            woluntaryJobs.push(job);
                                        }
                                    }
                                }
                            }
                        });
                    }else{
                        if(contractType === "long term"){
                            scrollJobs.push(job);
                        }else if(contractType === "short term"){
                            swipeJobs.push(job);
                        }else if(contractType === "woluntary job"){
                            woluntaryJobs.push(job);
                        }
                    }
                }
            });
        }
    }, [pageInfo.jobOffers, scrollJobs, swipeJobs, woluntaryJobs, pageInfo.filterTags, filterJobs, userInfo.swipedPossitions]);

    const removeTag = (tag) => {
        if(pageInfo.filterTags.length > 1){
            dispatch(setFilterTags(pageInfo.filterTags.filter(t => t !== tag)));
        }else{
            dispatch(setFilterTags(null));
        }
    };

    const [activeJobPanel, setActiveJobPanel] = useState(null);
    const [activeJobOption, setActiveJobOption] = useState('long term');

    useEffect(() => {
        if(!activeJobPanel && scrollJobs){
            setActiveJobPanel(<ScrollJobs jobs={scrollJobs} />)
        }
    }, [activeJobPanel, scrollJobs]);

    useEffect(() => {
        if(activeJobOption === "long term"){
            setActiveJobPanel(<ScrollJobs jobs={scrollJobs} />)
        }else if(activeJobOption === "short term"){
            setActiveJobPanel(<SwipeJobs jobs={swipeJobs} />)
        }else if(activeJobOption === "woluntary job"){
            setActiveJobPanel(<ScrollJobs jobs={woluntaryJobs} />)
        }
    }, [activeJobOption, scrollJobs, swipeJobs, woluntaryJobs]);

    const chatInfo = useSelector(chatData);
    const proffessionInfo = useSelector(proffessionData);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo.loggedIn) {
            history.push("/");
        }
    }, [history, userInfo.loggedIn]);

    useEffect(() => {
        if (userInfo.info && !userInfo.info.is_employer && !userInfo.info.profile.user_proffession && !userInfo.info.profile.user_proffession_category) {
            getUserJobNoSearch(userInfo.info.profile.profession_aka_activity, dispatch, proffessionInfo.proffessions);
        }
    }, [userInfo.info, dispatch, proffessionInfo.proffessions]);

    if (userInfo.info) {
        return (
            <div className="auth-home">
                {!userInfo.info.is_employer && (
                    <div className={`auth-home__invisible ${pageInfo.filterTags && 'extra-height'}`}></div>
                )}
                <div className="auth-home__left">
                    <div className="panel">
                        <div className="auth-home__left__user">
                            <img src={userInfo.info.profile.photo ? userInfo.info.profile.photo : Avatar} alt="avatar" />
                            <div className="username-wrapper">
                                <h2>
                                    {userInfo.info.is_employer ?
                                        userInfo.info.profile.company_name :
                                        <>{userInfo.info.first_name} {userInfo.info.last_name} {userInfo.info.profile.is_active_jobseeker && <span>{languageInfo.text.authorizedHomePage.adm}</span>}</>
                                    }
                                </h2>
                                {userInfo.info.profile.user_proffession_category && userInfo.info.profile.user_proffession ? (
                                    <small>{`${userInfo.info.profile.user_proffession_category} | ${userInfo.info.profile.user_proffession}`}</small>
                                ) : userInfo.info.profile.user_proffession && (
                                    <small>{userInfo.info.profile.user_proffession}</small>
                                )}
                            </div>
                        </div>
                        {userInfo.info.has_premium && (
                            <div className="auth-home__left__premium">
                                <p><img src={CrownIcon} alt="crown"></img>{languageInfo.text.authorizedHomePage.leftPanel.premium}</p>
                            </div>
                        )}
                        <div className="auth-home__left__contacts">
                            <h3>{languageInfo.text.authorizedHomePage.leftPanel.contacts}</h3>
                            <p>{languageInfo.text.authorizedHomePage.leftPanel.findContacts}</p>
                        </div>
                        {!userInfo.info.is_employer &&
                            <div className="auth-home__left__saved">
                                <p onClick={() => history.push('/saved')}><img src={Bookmark2} alt="bookmark" /> {languageInfo.text.authorizedHomePage.leftPanel.saved}</p>
                            </div>
                        }
                    </div>
                </div>
                
                <div className="auth-home__middle">
                    {userInfo.info.is_employer ?
                        <>
                            {userInfo.swipedPossitions && userInfo.swipedPossitions.length > 0 ? (
                                <>
                                    <h2>{languageInfo.text.authorizedHomePage.users}</h2>
                                    <div className="auth-home__middle__users panel">
                                        {userInfo.swipedPossitions.map((possition, i) => {
                                            return(
                                                <SwipedUser 
                                                    key={i}
                                                    info={possition}
                                                />
                                            )
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div className="auth-home__middle__no-users">
                                    <h3>Neviens lietotājs nav akceptējis Jūsu darba pidāvājumu</h3>
                                    <img src={NoUsers} alt="users" />
                                </div>
                            )}
                            
                        </> :
                        <>
                            <div className="auth-home__middle__fixed">
                                <div className="auth-home__middle__job-options panel">
                                    <div onClick={() => {
                                        setActiveJobOption('long term');
                                    }} className={`auth-home__middle__job-options__job-option ${activeJobOption === 'long term' ? 'active' : ''}`}>
                                        <h3>{languageInfo.text.authorizedHomePage.longtermJobs} <span>{languageInfo.text.authorizedHomePage.job}</span></h3>
                                        <div className="active-line"></div>
                                    </div>
                                    <div onClick={() => {
                                        setActiveJobOption('short term');
                                    }} className={`auth-home__middle__job-options__job-option ${activeJobOption === 'short term' ? 'active' : ''}`}>
                                        <h3>{languageInfo.text.authorizedHomePage.shorttermJobs} <span>{languageInfo.text.authorizedHomePage.job}</span></h3>
                                        <div className="active-line"></div>
                                    </div>
                                    <div onClick={() => {
                                        setActiveJobOption('woluntary job');
                                    }} className={`auth-home__middle__job-options__job-option ${activeJobOption === 'woluntary job' ? 'active' : ''}`}>
                                        <h3>{languageInfo.text.authorizedHomePage.voluntaryJobs} <span>{languageInfo.text.authorizedHomePage.job}</span></h3>
                                        <div className="active-line"></div>
                                    </div>
                                </div>
                                {pageInfo.filterTags && (
                                    <div className="auth-home__middle__tags panel">
                                        {pageInfo.filterTags.map((tag, i) =>
                                            <div key={i} className="auth-home__middle__tags__tag">
                                                <img src={CloseBlack} alt="close" onClick={() => removeTag(tag)} />
                                                <span>{tag.title}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {
                                (scrollJobs && swipeJobs && woluntaryJobs) && (
                                    <div className={`auth-home__middle__jobs ${pageInfo.filterTags && 'extra-top-margin'}`}>
                                        {activeJobPanel}
                                    </div>
                                )
                            }
                        </>
                    }
                </div>
                
                <div className="auth-home__right">
                    {chatInfo.chats && chatInfo.chats.length > 0 && (
                        <>
                            <h2>{languageInfo.text.authorizedHomePage.Right.chat}</h2>
                            <div className="auth-home__right__chat panel">
                                {chatInfo.chats.map((contact, i) =>
                                    <Contact 
                                        contact={contact}
                                        key={i}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    } else {
        return <LoadingPopup />;
    }
}

export default AuthorizedHome;

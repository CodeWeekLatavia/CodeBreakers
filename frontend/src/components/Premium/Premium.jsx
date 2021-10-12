import React, { useEffect, useState } from 'react'
import "./Premium.scss";
import CrownIcon from "../../assets/svg/crown.svg";
import PremiumSuccessIcon from "../../assets/svg/premium/premium.svg";

import Notifications from "../../assets/svg/premium/notifications.svg";
import Statistics from "../../assets/svg/premium/statistics.svg";
import Search from "../../assets/svg/premium/filter.svg";
import Salary from "../../assets/svg/premium/salary.svg";
import Video from "../../assets/svg/premium/video.svg";
import CV from "../../assets/svg/premium/CV.svg";
import Offers from "../../assets/svg/premium/offers.svg";
import Online from "../../assets/svg/premium/online.svg";
import Offers1 from "../../assets/svg/premium/darba_dev.svg"
import { useSelector } from 'react-redux';
import { userData } from '../../slices/user/userSlice';
import { languageData } from '../../slices/languages/languageSlice';

function Premium() {
    const [premiumShocase, setPremiumShocase] = useState("jobGiver");

    const languageInfo = useSelector(languageData);
    const userInfo = useSelector(userData);

    useEffect(() => {
        if(userInfo.info){
            if(userInfo.info.is_employer){
                setPremiumShocase("jobGiver")
            }else{
                setPremiumShocase("jobSeeker")
            }
        }
    }, [userInfo.info]);

    return (
        <div className="premium">
            <header className="premium__header">
                <div 
                    className={premiumShocase === "jobGiver" ? "premium__header__optionActive" : "premium__header__option"}
                    onClick={() => setPremiumShocase("jobGiver")}
                >
                    <img src={CrownIcon} alt="crown" />
                    <h3>{languageInfo.text.premiumPage.premiumHeader.jobGiver}</h3>
                </div>
                <div 
                    className={premiumShocase === "jobSeeker" ? "premium__header__optionActive" : "premium__header__option"}
                    onClick={() => setPremiumShocase("jobSeeker")}    
                >
                    <img src={CrownIcon} alt="crown" />
                    <h3>{languageInfo.text.premiumPage.premiumHeader.jobSeeker}</h3>
                </div>
            </header>
            <div className="premium__body">
                <div className="premium__body__top">
                    <p>{languageInfo.text.premiumPage.premiumText1}</p>
                    <p>{languageInfo.text.premiumPage.premiumTex2}</p>
                </div>
                <div className="premium__body__bottom">
                    {premiumShocase === "jobGiver" ? (
                        <ul className="premium__body__bottom__reasons">
                            <li>
                                <img src={Statistics} alt="secure" />
                                <h4>{languageInfo.text.premiumPage.premiumOptions.jobGiver.option1}</h4>
                            </li>
                            <li>
                                <img src={Search} alt="secure" />
                                <h4>{languageInfo.text.premiumPage.premiumOptions.jobGiver.option2}</h4>
                            </li>
                            <li>
                                <img src={Online} alt="secure" />
                                <h4>{languageInfo.text.premiumPage.premiumOptions.jobGiver.option3}</h4>
                            </li>
                            <li>
                                <img src={Offers} alt="secure" />
                                <h4>{languageInfo.text.premiumPage.premiumOptions.jobGiver.option4}</h4>
                            </li>
                            <button>19.99{languageInfo.text.premiumPage.premiumOptions.buttons.text}</button>
                        </ul>
                    ) : (
                        <ul className="premium__body__bottom__reasons">
                            <li>
                                <img src={Notifications} alt="secure" />
                                <h4>{languageInfo.text.premiumPage.premiumOptions.jobSeeker.option1}</h4>
                            </li>
                            <li>
                                <img src={Salary} alt="secure" />
                                <h4>{languageInfo.text.premiumPage.premiumOptions.jobSeeker.option2}</h4>
                            </li>
                            <li>
                                <img src={Video} alt="secure" />
                                <h4>{languageInfo.text.premiumPage.premiumOptions.jobSeeker.option3}</h4>
                            </li>
                            <li>
                                <img src={CV} alt="secure" />
                                <h4>{languageInfo.text.premiumPage.premiumOptions.jobSeeker.option4}</h4>
                            </li>
                            <li>
                                <img src={Offers1} alt="secure" />
                                <h4>{languageInfo.text.premiumPage.premiumOptions.jobSeeker.option5}</h4>
                            </li>
                            {userInfo.info && !userInfo.info.has_premium ? (
                                <button>3.99{languageInfo.text.premiumPage.premiumOptions.buttons.text}</button>
                            ) : !userInfo.info && (
                                <button>3.99{languageInfo.text.premiumPage.premiumOptions.buttons.text}</button>
                            )}
                        </ul>
                    )}
                    
                    <div className="premium__body__bottom__imageContainer">
                        <img src={PremiumSuccessIcon} alt="premium" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Premium
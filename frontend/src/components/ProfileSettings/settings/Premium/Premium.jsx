import React, { useState } from 'react';

import crown from '../../../../assets/svg/crown.svg';
import dropdown from '../../../../assets/svg/dropdown.svg';

import '../Settings.scss';
import './Premium.scss';
import '../Inputs.scss';
import { useSelector } from 'react-redux';
import { userData } from '../../../../slices/user/userSlice';
import { Link } from 'react-router-dom';
import { languageData } from '../../../../slices/languages/languageSlice';

function Premium(){
    const languageInfo = useSelector(languageData);
    const userInfo = useSelector(userData);
    const [premiumCancelReason, setPremiumCancelReason] = useState(languageInfo.text.settings.premium.chooseReason);

    const [showPremiumCancelReason, setShowPremiumCancelReason] = useState(false);

    return (
        <div className='settings-wrapper'>
            <div className="settings">
                <div className="settings__premium__header">
                    <h2 className="settings__title"><img src={crown} alt="crown" />{languageInfo.text.settings.premium.heading}</h2>
                    <span>
                        <Link to="/premium">{languageInfo.text.settings.premium.link}</Link>
                    </span>
                </div>

                <div className="settings__premium__status">
                    <h4>{languageInfo.text.settings.premium.status}</h4>
                    <div className="settings__premium__status__wrapper">
                        {userInfo.info.has_premium ? (
                            <>
                                <img src={crown} alt="crown" />
                                <p>{languageInfo.text.settings.premium.active}</p>
                            </>
                        ) : (
                            <p>{languageInfo.text.settings.premium.notActive}</p>
                        )}
                        
                    </div>
                </div>
            </div>
            {userInfo.info.has_premium && (
                <div className="settings">
                    <h2 className="settings__title red">{languageInfo.text.settings.premium.deactivate.heading}</h2>

                    <section className="settings__section">
                        <h3 className="settings__section__title">{languageInfo.text.settings.premium.deactivate.question}</h3>
                        <p className="settings__section__desc">{languageInfo.text.settings.premium.deactivate.answer1}</p>
                        <p className="settings__section__desc">{languageInfo.text.settings.premium.deactivate.answer2}</p>
                        <p className="settings__section__desc">{languageInfo.text.settings.premium.deactivate.answer3}</p>
                    </section>

                    <section className="settings__section">
                        <div className="settings__section__grayed">
                            <div className="inputs__dropdown-input">
                                <label className="inputs__dropdown-input__name">{languageInfo.text.settings.premium.deactivate.reason}</label>
                                <div className="inputs__dropdown-input__input-group" onClick={() => setShowPremiumCancelReason(!showPremiumCancelReason)}>
                                    <p>{premiumCancelReason}</p>
                                    <img src={dropdown} alt="dropdown" />
                                    <div className={`inputs__dropdown-input__input-group__dropdown ${showPremiumCancelReason ? 'active' : ''}`}>
                                        <p onClick={() => {setPremiumCancelReason('a');setShowPremiumCancelReason(false)}}>a</p>
                                        <p onClick={() => {setPremiumCancelReason('b');setShowPremiumCancelReason(false)}}>b</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="align-right">
                            <button className="button-red">{languageInfo.text.settings.premium.deactivate.buton}</button>
                        </div>
                    </section>
                </div>
            )}
        </div>
    )
}

export default Premium;
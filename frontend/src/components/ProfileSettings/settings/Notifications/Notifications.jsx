import React from 'react';

import Speaker from '../../../../assets/svg/speaker.svg';

import '../Settings.scss';
import '../Inputs.scss';

import { useSelector } from 'react-redux';
import { languageData } from '../../../../slices/languages/languageSlice';

function Notifications() {
    const languageInfo = useSelector(languageData);

    return (
        <div className="settings">
            <h2 className="settings__title">{languageInfo.text.settings.notifications.heading}</h2>

            <section className="settings__section">
                <h3 className="settings__section__title">{languageInfo.text.settings.notifications.subHeading1}</h3>
                <div className="settings__section__grayed">
                    <div className="inputs__checkbox-input">
                        <label htmlFor="email_notifications" className="inputs__checkbox-input__name">{languageInfo.text.settings.notifications.option1}</label>
                        <input type="checkbox" name="email_notifications" id="email_notifications" />
                    </div>
                    <div className="inputs__checkbox-input">
                        <label htmlFor="web_notifications" className="inputs__checkbox-input__name">{languageInfo.text.settings.notifications.option2}</label>
                        <input type="checkbox" name="web_notifications" id="web_notifications" />
                    </div>
                    <div className="inputs__checkbox-input">
                        <label htmlFor="real_time_notifications" className="inputs__checkbox-input__name">{languageInfo.text.settings.notifications.option3}</label>
                        <input type="checkbox" name="real_time_notifications" id="real_time_notifications" />
                    </div>
                </div>
            </section>

            <section className="settings__section">
                <h3 className="settings__section__title">{languageInfo.text.settings.notifications.heading2}</h3>
                <div className="settings__section__grayed">
                    <div className="inputs__checkbox-input">
                        <label htmlFor="notification_noise" className="inputs__checkbox-input__name">{languageInfo.text.settings.notifications.option4}</label>
                        <input type="checkbox" name="notification_noise" id="notification_noise" />
                    </div>
                    <div className="settings__section__test-sound">
                        <span>{languageInfo.text.settings.notifications.testSound}</span>
                        <div>
                            <img src={Speaker} alt="speaker" />
                            <span>{languageInfo.text.settings.notifications.testSoundButton}</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Notifications;
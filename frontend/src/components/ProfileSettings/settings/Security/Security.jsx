import React from 'react';
import '../Settings.scss';
import '../Inputs.scss';
import { useSelector } from 'react-redux';
import { languageData } from '../../../../slices/languages/languageSlice';

function Security(){
    const languageInfo = useSelector(languageData);

    return (
        <div className='settings'>
            <h2 className="settings__title">{languageInfo.text.settings.security.heading}</h2>

            <section className="settings__section">
                <h3 className="settings__section__title">{languageInfo.text.settings.security.subHeading1}</h3>
                <div className="inputs__text-input">
                    <label htmlFor="new_password" className="inputs__text-input__name">{languageInfo.text.settings.security.password1}</label>
                    <div className="inputs__text-input__input-group">
                        <input type="password" id="new_password" name="new_password" placeholder={languageInfo.text.settings.security.passwordPlaceholder1} />
                    </div>
                </div>
                <div className="inputs__text-input">
                    <label htmlFor="repeat_password" className="inputs__text-input__name">{languageInfo.text.settings.security.password2}</label>
                    <div className="inputs__text-input__input-group">
                        <input type="password" id="repeat_password" name="repeat_password" placeholder={languageInfo.text.settings.security.passwordPlaceholder2} />
                    </div>
                </div>
                <p className="settings__section__desc align-left">
                    {languageInfo.text.settings.security.passwordGuide}
                </p>
                <div className="align-right">
                    <button className='button-blue'>{languageInfo.text.settings.save}</button>
                </div>
            </section>

            <section className="settings__section">
                <h3 className="settings__section__title column">
                    {languageInfo.text.settings.security.subHeading2}
                    <span className="important">{languageInfo.text.settings.security.recomended}</span>
                </h3>
                <p className="settings__section__desc">
                    {languageInfo.text.settings.security.phoneInfo}
                </p>
                <div className="align-right">
                    <button className='button-blue'>{languageInfo.text.settings.security.button}</button>
                </div>
            </section>
        </div>
    )
}

export default Security;
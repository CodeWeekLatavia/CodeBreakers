import React from 'react';

import Speaker from '../../../../assets/svg/speaker.svg';

import '../Settings.scss';
import '../Inputs.scss';

function Notifications() {
    return (
        <div className="settings">
            <h2 className="settings__title">Paziņojumi</h2>

            <section className="settings__section">
                <h3 className="settings__section__title">Rādīt paziņojumus par:</h3>
                <div className="settings__section__grayed">
                    <div className="inputs__checkbox-input">
                        <label htmlFor="email_notifications" className="inputs__checkbox-input__name">E-pasta paziņojumi</label>
                        <input type="checkbox" name="email_notifications" id="email_notifications" />
                    </div>
                    <div className="inputs__checkbox-input">
                        <label htmlFor="web_notifications" className="inputs__checkbox-input__name">Web paziņojumi</label>
                        <input type="checkbox" name="web_notifications" id="web_notifications" />
                    </div>
                    <div className="inputs__checkbox-input">
                        <label htmlFor="real_time_notifications" className="inputs__checkbox-input__name">Paziņojumi reālajā laikā</label>
                        <input type="checkbox" name="real_time_notifications" id="real_time_notifications" />
                    </div>
                </div>
            </section>

            <section className="settings__section">
                <h3 className="settings__section__title">Paziņojumi reālajā laikā skaņa</h3>
                <div className="settings__section__grayed">
                    <div className="inputs__checkbox-input">
                        <label htmlFor="notification_noise" className="inputs__checkbox-input__name">Ar skaņu</label>
                        <input type="checkbox" name="notification_noise" id="notification_noise" />
                    </div>
                    <div className="settings__section__test-sound">
                        <span>Notestēt skaņu</span>
                        <div>
                            <img src={Speaker} alt="speaker" />
                            <span>Atskaņot</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Notifications;
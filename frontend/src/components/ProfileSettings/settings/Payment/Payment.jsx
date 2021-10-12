import React, { useState } from 'react';
import assign from '../../../../assets/svg/assign.svg';
import '../Settings.scss';
import './Payment.scss';
import '../Inputs.scss';
import { useSelector } from 'react-redux';
import { languageData } from '../../../../slices/languages/languageSlice';

function Payment(){
    const languageInfo = useSelector(languageData);

    const [balance] = useState('10,000.00')

    return (
        <div className='settings'>
            <h2 className="settings__title">{languageInfo.text.settings.payments.heading1}</h2>

            <section className="settings__section">
                <p className="settings__section__grayed">{languageInfo.text.settings.payments.remaining} €{balance}</p>

                <div className="align-right">
                    <button className="button-blue">{languageInfo.text.settings.payments.button1}</button>
                </div>
            </section>

            <section className="settings__section">
                <div className="payment__methods__row1">
                    <h3 className="settings__section__title">{languageInfo.text.settings.payments.heading2}</h3>
                    <div className="add-payment-method">
                        <img src={assign} alt="assign" />
                        <p>{languageInfo.text.settings.payments.button2}</p>
                    </div>
                </div>
                <p className="settings__section__desc">{languageInfo.text.settings.payments.info1}</p>
                <p className="settings__section__desc">{languageInfo.text.settings.payments.info2}</p>
            </section>


        </div>
    )
}

export default Payment;
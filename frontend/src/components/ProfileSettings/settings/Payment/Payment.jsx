import React, { useState } from 'react';
import assign from '../../../../assets/svg/assign.svg';
import '../Settings.scss';
import './Payment.scss';
import '../Inputs.scss';

function Payment(){

    const [balance] = useState('10,000.00')

    return (
        <div className='settings'>
            <h2 className="settings__title">Atlikums</h2>

            <section className="settings__section">
                <p className="settings__section__grayed">Jūsu atlikums ir €{balance}</p>

                <div className="align-right">
                    <button className="button-blue">Papildināt</button>
                </div>
            </section>

            <section className="settings__section">
                <div className="payment__methods__row1">
                    <h3 className="settings__section__title">Norēķinu metodes</h3>
                    <div className="add-payment-method">
                        <img src={assign} alt="assign" />
                        <p>Pievienot metodi</p>
                    </div>
                </div>
                <p className="settings__section__desc">Jūs vēl neesat iestatījis nevienu norēķinu metodi.</p>
                <p className="settings__section__desc">Iestatiet norēķinu metodes, lai jūs uzreiz varētu pieņemt darbā, kad būsiet gatavs.</p>
            </section>


        </div>
    )
}

export default Payment;
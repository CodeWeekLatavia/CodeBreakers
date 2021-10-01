import React from 'react';
import '../Settings.scss';
import '../Inputs.scss';

function Security(){
    return (
        <div className='settings'>
            <h2 className="settings__title">Drošība</h2>

            <section className="settings__section">
                <h3 className="settings__section__title">Parole</h3>
                <div className="inputs__text-input">
                    <label htmlFor="new_password" className="inputs__text-input__name">Jauna Parole</label>
                    <div className="inputs__text-input__input-group">
                        <input type="password" id="new_password" name="new_password" placeholder="Ievadi jauno paroli" />
                    </div>
                </div>
                <div className="inputs__text-input">
                    <label htmlFor="repeat_password" className="inputs__text-input__name">Apstiprināt jauno paroli</label>
                    <div className="inputs__text-input__input-group">
                        <input type="password" id="repeat_password" name="repeat_password" placeholder="Ievadi paroli atkārtoti" />
                    </div>
                </div>
                <p className="settings__section__desc align-left">
                    8 vai vairāk simbolus. Apvienojiet lielos un mazos burtus un ciparus.
                </p>
                <div className="align-right">
                    <button className='button-blue'>Saglabāt</button>
                </div>
            </section>

            <section className="settings__section">
                <h3 className="settings__section__title column">
                    Tālruņa Verifikācija
                    <span className="important">Ieteicams</span>
                </h3>
                <p className="settings__section__desc">
                    Jūsu tālrunis nav verificēts Youth Deal. Noklikšķiniet uz "Verificēt tagad",
                    lai pabeigtu tālruņa verifikāciju
                </p>
                <div className="align-right">
                    <button className='button-blue'>Verificēt tagad</button>
                </div>
            </section>
        </div>
    )
}

export default Security;
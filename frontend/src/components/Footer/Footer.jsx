import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Footer.scss'

function Footer(){
    const [year] = useState(new Date().getFullYear())
    const history = useHistory();

    return (
        <div className='footer'>
            <div id="footer__row-first">
                <div className="footer__links">
                    <div className="footer__links__block">
                        <p className={'footer__links__block__title'}>YOUTH DEAL</p>
                        <a href="#Contacts" className="footer__links__block__link">Kontakti</a>
                        <a href="#parmums" className="footer__links__block__link">Par Mums</a>
                        <a href="#start" className="footer__links__block__link" onClick={() => history.push("/register")}>Sākt</a>
                    </div>
                    <div className="footer__links__block">
                        <p className={'footer__links__block__title'}>ATBALSTS</p>
                        <a href="#conf" className="footer__links__block__link">Privātuma politika</a>
                        <a href="#help" className="footer__links__block__link">Vajag palīdzību?</a>
                        <a href="#userules" className="footer__links__block__link">Lietošanas noteikumi</a>
                    </div>
                    <div className="footer__links__block">
                        <p className={'footer__links__block__title'}>SOCIĀLIE TĪKLI</p>
                        <a href="#facebook" className="footer__links__block__link">Facebook</a>
                        <a href="#instagram" className="footer__links__block__link">Instagram</a>
                        <a href="#youtube" className="footer__links__block__link">YouTube</a>
                    </div>
                </div>
                <div className="footer__info">
                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="282.734" height="121.223" viewBox="0 0 282.734 121.223">
                            <g id="Logo" transform="translate(4.725 3.5)">
                                <g id="Group_2" data-name="Group 2" transform="translate(0 13.723)">
                                <text id="Youth_Deal" data-name="Youth Deal" transform="translate(0 67)" fill="#7D7D7D" fontSize="41" fontFamily="Bungee-Regular, Bungee"><tspan x="0" y="0" fill="#7D7D7D">Youth </tspan><tspan y="0" fill="#7D7D7D">Deal</tspan></text>
                                </g>
                                <path id="Path_4" data-name="Path 4" d="M0,4.593S52.391-22.854,120.791-22.854,273.6,4.593,273.6,4.593" transform="translate(0 22.854)" fill="none" stroke="#7D7D7D" strokeLinecap="round" strokeWidth="7" strokeDasharray="25"/>
                            </g>
                        </svg>

                    <div className="footer__info__texts">
                        <p id="first">Youth Deal ir kaut kas jauns dara meklēšanas tirgū. Mēs dodam iespēju visiem jauniešiem atrast sev darbu, un izveidot veiksmīgu karjeru ar mūsu atbalstu.</p>
                        <p>Meklē darbu, meklē darba ņēmējus. Šeit būs ērti kā darba ņēmējiem, kā arī darba devējiem. Daudzfunkcionalitāte , aktīvs, sapņu darbs. Visu šo Tu varēsi atrasts mūsu vietnē -Youth Deal.</p>
                    </div>
                </div>
            </div>
            <div id="footer__row-second">
                <div className="footer__copyright">
                    <small>Made in Latvia by Codebreakers</small>
                    <small>Copyright © {year} Youth Deal</small>
                </div>
            </div>
        </div>
    )
}
export default Footer;
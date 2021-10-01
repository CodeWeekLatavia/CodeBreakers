import React, {useState} from 'react';
import adm from '../../assets/svg/home/adm.svg';
import contacts from '../../assets/svg/home/contacts.svg';
import welcome from '../../assets/svg/home/welcome.svg';
import team from '../../assets/svg/home/team.svg';
import rightArrow from '../../assets/svg/home/rightArrow.svg';
import Whitearrow from '../../assets/svg/home/next.svg';
import './Home.scss';
import { useHistory } from 'react-router-dom';

const popularFinds = ['Inženierzinātnes', 'Māksla un kultūra', 'Vadība un administrācija', 'Ekonomika', 'IT sfēra', 'Marketings,reklāma un PR', 'Valodniecība', 'Pakalpojumi un tūrisms', 'Skaistums un mode', 'Sports']

function Home({categoryRef, admRef, homeTop}){
    const [year] = useState(new Date().getFullYear())
    const [showAllFinds, setShowAllFinds] = useState(false);

    const history = useHistory();

    function handleFindsCount(){
        if (showAllFinds) {
            return popularFinds.length
        } else {
            return popularFinds.length - 4;
        }
    }

    return (
        <div className='home'>
            <div id="homeRef" ref={homeTop} />
            <section className="home__introduction" id="top">

                <div data-aos="fade-right" className="home__introduction__left">
                    <p className="home__introduction__left__title">Sveicināts Youth <span>Deal</span> !</p>
                    <p className="home__introduction__left__under-title" id="title">Katram darbiniekam vispiemērotākais amats</p>
                    <p className="home__introduction__left__under-title"> Katram darba devējam vispiemērotākais darbinieks</p>
                    
                    <div className="home__introduction__left__paths">

                        <button className="home__introduction__left__paths__job-giver" onClick={() => history.push("/register/jobGiver")}>
                            Es esmu darba devējs <img src={rightArrow} alt="job giver" />
                        </button>

                        <button className="home__introduction__left__paths__job-taker" onClick={() => history.push("/register/jobTaker")}>
                            Es esmu darba ņēmējs <img src={Whitearrow} alt="job taker"/>
                        </button>

                    </div>
                    
                </div>

                <div data-aos="fade-left" className="home__introduction__right">
                    <img src={welcome} alt="Introduction" />
                </div>


            </section>


            <section className="home__find-options" id="categories" ref={categoryRef}>
             
                <div className="home__find-options__left">
                    <h3>Atrodi darbu vai darbinieku ikvienā jomā:</h3>
                </div>
                
                <div data-aos="fade-up" className="home__find-options__right">
                    <p className="home__find-options__right__title">Populārākie Meklējumi</p>
                    <div className="home__find-options__right__finds">
                        {popularFinds.slice(0, handleFindsCount()).map((find,index) => (
                            <div key={index} className="home__find-options__right__finds__find">
                                <input type="text" placeholder={find} disabled={true} />
                            </div>
                        ))}
                        <div onClick={() => {setShowAllFinds(!showAllFinds)}} className="home__find-options__right__finds__show-more">
                            Parādīt vēl <img src={rightArrow} alt="arrow-down" className={showAllFinds ? 'active' : ''} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="home__find-talents" id="find">

                <p className="home__find-talents__title">
                    Atrodi labākos komandas biedrus savam projektam
                </p>
                
                <p className="home__find-talents__desc">
                    Vai vēlies atrast komandas biedrus savam projektam? 
                </p>
                <p className="home__find-talents__desc" id="second">
                    Pievieno piedāvājumu, saņem pieteikumus un atlasi labākos!  
                </p>

                <button className='home__find-talents__find-together' onClick={() => history.push("/register")}>Atrast kopā ar Youth Deal</button>

                <img data-aos="fade-left"  src={team} alt="find talents" />
            </section>

            <section className="home__info" id="ADM" ref={admRef}>

                <div className="home__info__contacts">
                    <p className="home__info__contacts__title">Kontakti</p>
                    <p className="home__info__adm__desc">Sazinies ar potenciālo daba devēju, ņēmēju vai arī komandas biedru</p>
                    <img src={contacts} alt="contact" id="contact_image" data-aos="zoom-in" data-aos-easing="ease-out-cubic" />
                    <button onClick={() => history.push("/register")}>Atrast Kontaktus</button>
                </div>

                <div className="home__info__adm">
                    <p className="home__info__adm__title">#ADM</p>
                    <p className="home__info__adm__desc">
                        Ja Tu pašlaik esi aktīvā darba meklēšanā (#ADM), tad šī loma ir piemērota tieši Tev! Atzīmē to reģistrācijas laikā vai arī jebkurā brīdī profila iestatījumos
                    </p>
                    <img src={adm} alt="ADM" data-aos="zoom-out" data-aos-easing="ease-out-cubic"/>
                    <button onClick={() => history.push("/register")} id="start">Sākt</button>
                </div>
            </section>
            <div className='home__footer'>
                <div id="footer__row-first">
                    <div className="footer__links">
                        <div className="footer__links__block">
                            <p className={'footer__links__block__title'}>YOUTH DEAL</p>
                            <a href="#start" className="footer__links__block__link" onClick={() => history.push("/register")}>Sākt</a>
                            <a href="#parmums" className="footer__links__block__link">Par Mums</a>
                            <a href="#Contacts" className="footer__links__block__link">Kontakti</a>
                        </div>
                        <div className="footer__links__block">
                            <p className={'footer__links__block__title'}>ATBALSTS</p>
                            <a href="#conf" className="footer__links__block__link">Nepieciešama palīdzība?</a>
                            <a href="#userules" className="footer__links__block__link">Lietošanas noteikumi</a>
                            <a href="#help" className="footer__links__block__link">Privātuma politika</a>
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
                            <p id="first">Youth Deal ir ērtāka un inovatīvāka vide darba tirgum. Mēs sniedzam iespēju ikvienam jaunietim atrast sev piemērotu darbu un sākt veidot savu karjeru. Kā arī palīdzam ikvienam darba devējam atrast vispiemērotāko darbinieku.
                            -Atrodi vispiemērotāko kopā ar Youth Deal.</p>
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
        </div>   
    )
}

export default Home;
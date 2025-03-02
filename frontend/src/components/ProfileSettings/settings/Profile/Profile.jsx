import React, { useState } from 'react';
import '../Settings.scss'
import '../Inputs.scss';

import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../../../slices/user/userSlice';
import { locationData } from '../../../../slices/locations/locationSlice';
import { getCountryCities } from '../../../../logic/locations/getLoactionData';

import dropdown from '../../../../assets/svg/dropdown.svg';
import { updateSettingsInfo } from '../../../../logic/user/info/updateProfileInfo';
import { deleteUser } from '../../../../logic/user/profile';
import { languageData } from '../../../../slices/languages/languageSlice';

function Profile() {
    const userInfo = useSelector(userData);
    const dispatch = useDispatch();
    const locationInfo = useSelector(locationData);
    const languageInfo = useSelector(languageData);

    const [name, setName] = useState(userInfo.info.first_name);
    const [surname, setSurName] = useState(userInfo.info.last_name);
    const [email, setEmail] = useState(userInfo.info.email);
    const [country, setCountry] = useState(userInfo.info.profile.country);
    const [city, setCity] = useState(userInfo.info.profile.city);
    const [isActiveJobSeeker, setIsActiveJobSeeker] = useState(userInfo.info.profile.is_active_jobseeker);
    const [companyName, setCompanyName] = useState(userInfo.info.profile.company_name)
    const [lastSearchCountry, setLastSearchCountry] = useState(null);
    const [accountCloseReason, setAccountCloseReason] = useState(languageInfo.text.settings.profile.closeProfile.chooseReason);

    const [showCountries, setShowCountries] = useState(false);
    const [showCities, setShowCities] = useState(false);
    const [showASJ, setShowAJS] = useState(false)
    const [showAccountCloseReason, setShowAccountCloseReason] = useState(false);

    const getCitys = () => {
        if(country && country !== lastSearchCountry && locationInfo.countries.some(c => c.country_name === country)){
            getCountryCities(country, dispatch, locationInfo.token);
            setLastSearchCountry(country);
            setShowCities(true);
        }
        setShowCountries(false);
    }

    const saveProfileData = () => {
        if(!userInfo.info.is_employer){
            if(
                name !== userInfo.info.first_name ||
                surname !== userInfo.info.last_name || 
                email !== userInfo.info.email ||
                city !== userInfo.info.profile.city ||
                isActiveJobSeeker !== userInfo.info.profile.is_active_jobseeker
            ){
                updateSettingsInfo(
                    name,
                    surname,
                    email,
                    "Latvia",
                    city,
                    isActiveJobSeeker,
                    dispatch,
                    userInfo.accessToken,
                    userInfo.info.id,
                );
            }
        }
    }

    return (
        <div className='settings-wrapper'>
            <div className='settings'>
                <h2 className="settings__title">{languageInfo.text.settings.profile.heading}</h2>

                <section className="settings__section">
                    {userInfo.info.is_employer ?
                        <div className="inputs__text-input">
                            <label htmlFor="company_name" className="inputs__text-input__name">{languageInfo.text.settings.profile.companyName}</label>
                            <div className="inputs__text-input__input-group">
                                <input type="text" id="company_name" name="company_name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                            </div>
                        </div> :
                        <>
                            <div className="inputs__text-input">
                                <label htmlFor="first_name" className="inputs__text-input__name">{languageInfo.text.settings.profile.name}</label>
                                <div className="inputs__text-input__input-group">
                                    <input type="text" id="first_name" name="first_name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="inputs__text-input">
                                <label htmlFor="last_name" className="inputs__text-input__name">{languageInfo.text.settings.profile.surname}</label>
                                <div className="inputs__text-input__input-group">
                                    <input type="text" id="last_name" name="last_name" value={surname} onChange={(e) => setSurName(e.target.value)} />
                                </div>
                            </div>
                        </>
                    }
                    <div className="inputs__text-input">
                        <label htmlFor="email" className="inputs__text-input__name">{languageInfo.text.settings.profile.email}</label>
                        <div className="inputs__text-input__input-group">
                            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    {!userInfo.info.is_employer &&
                        <div className="inputs__dropdown-input">
                            <label className="inputs__dropdown-input__name">{languageInfo.text.settings.profile.jobStatus}</label>
                            <div className="inputs__dropdown-input__input-group" onClick={() => setShowAJS(!showASJ)}>
                                <p>{isActiveJobSeeker ? languageInfo.text.settings.profile.adm : languageInfo.text.settings.profile.employed}</p>
                                <img src={dropdown} alt="dropdown" />
                                <div className={`inputs__dropdown-input__input-group__dropdown ${showASJ ? 'active' : ''}`}>
                                    <p onClick={() => {setIsActiveJobSeeker(true);setShowAJS(false);}}>{languageInfo.text.settings.profile.adm}</p>
                                    <p onClick={() => {setIsActiveJobSeeker(false);setShowAJS(false);}}>{languageInfo.text.settings.profile.employed}</p>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="settings__section__locations">
                        <div className="settings__section__locations__container">
                            <label htmlFor="country">{languageInfo.text.settings.profile.country}</label>
                            <input 
                                type="text" 
                                name="country"
                                id="country"
                                autoComplete="off"
                                placeholder={languageInfo.text.settings.profile.country}
                                onChange={(e) => setCountry(e.target.value)}
                                value={country ? country : ""}
                                onClick={() => setShowCountries(true)}
                            />
                            {showCountries && country && (
                                <ul>
                                    {
                                        locationInfo.countries.map((mappedCountry, i) => {
                                            if(mappedCountry.country_name.substr(0, country.length).toLowerCase() === country.toLowerCase()){
                                                return <li key={i} onClick={() => {setCountry(mappedCountry.country_name);setShowCountries(false)}}>{mappedCountry.country_name}</li>
                                            };
                                            return null;
                                        })
                                    }
                                </ul>
                            )}
                        </div>
                        <div className="settings__section__locations__container">
                            <label htmlFor="city">{languageInfo.text.settings.profile.city}</label>
                            <input 
                                type="text" 
                                name="city"
                                id="city"
                                autoComplete="off"
                                placeholder={languageInfo.text.settings.profile.city}
                                onChange={(e) => setCity(e.target.value)}
                                onClick={getCitys}
                                value={city ? city : ""}
                            />
                            {showCities && city && locationInfo.countryCitys && (
                                <ul>
                                    {locationInfo.countryCitys && locationInfo.countryCitys.map((mappedCity, i) => {
                                        if(mappedCity.state_name.substr(0, city.length).toLowerCase() === city.toLowerCase()){
                                            return <li key={i} onClick={() => {setCity(mappedCity.state_name);setShowCities(false)}}>{mappedCity.state_name}</li>
                                        }
                                        return null;
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                    {/* <DropdownInput
                        title="Online Statuss"
                        inputStyle={userInfo.loggedIn ? { color: '#1DBF73' } : { color: 'rgb(216, 57, 17)' }}
                        currentOption={userInfo.loggedIn ? 'online' : 'offline'}
                        options={['online', 'offline', 'do not bother', 'invisible']} 
                    /> */}
                    {/* <DropdownInput
                        title="Premium Statuss"
                        inputStyle={userInfo.info.has_premium ? { color: '#FFD700' } : { color: 'gray' }}
                        currentOption={userInfo.has_premium ? <><img src={crown} alt='crown' /> Zelta Plāns</> : 'Standarta Plāns'}
                        options={[<><img src={crown} alt='crown' /> Zelta Plāns</>, 'Standarta Plāns']} 
                    /> */}
                </section>

                {/* <section className="settings__section">
                    <h3 className="settings__section__title">Ko Tu gribi, lai citi lietotāji redzētu tavā profilā?</h3>
                    <div className="settings__section__grayed">
                        <CheckboxInput title="E-pasts" inputName="isEmailVisible" value={true} />
                        {!userInfo.info.is_employer && <>
                            <CheckboxInput title="Dzimšanas datums" inputName="isBirthDateVisible" value={true} />
                            <CheckboxInput title="Izglītība" inputName="isKnowlageVisible" value={true} />
                        </>}
                    </div>
                </section> */}

                <div className="align-right">
                    <button className="button-blue" onClick={() => saveProfileData()}>{languageInfo.text.settings.save}</button>
                </div>
            </div>

            <div className="settings">
                <h2 className="settings__title red">{languageInfo.text.settings.profile.closeProfile.heading}</h2>

                <section className="settings__section">
                    <h3 className="settings__section__title">{languageInfo.text.settings.profile.closeProfile.question}</h3>
                    <p className="settings__section__desc">{languageInfo.text.settings.profile.closeProfile.answer1}</p>
                    <p className="settings__section__desc">{languageInfo.text.settings.profile.closeProfile.answer2}</p>
                    <p className="settings__section__desc">{languageInfo.text.settings.profile.closeProfile.answer3}</p>
                </section>

                <section className="settings__section">
                    <div className="settings__section__grayed">
                        <div className="inputs__dropdown-input">
                            <label className="inputs__dropdown-input__name">{languageInfo.text.settings.profile.closeProfile.chooseReason}</label>
                            <div className="inputs__dropdown-input__input-group" onClick={() => setShowAccountCloseReason(!showAccountCloseReason)}>
                                <p>{accountCloseReason}</p>
                                <img src={dropdown} alt="dropdown" />
                                <div className={`inputs__dropdown-input__input-group__dropdown ${showAccountCloseReason ? 'active' : ''}`}>
                                    <p onClick={() => {setAccountCloseReason('a');setShowAccountCloseReason(false)}}>a</p>
                                    <p onClick={() => {setAccountCloseReason('b');setShowAccountCloseReason(false)}}>b</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="align-right">
                        <button className="button-red" onClick={() => deleteUser(userInfo.info.id, userInfo.accessToken, dispatch, userInfo.info.id)}>{languageInfo.text.settings.profile.closeProfile.button}</button>
                    </div>
                </section>
            </div>

        </div>
    )
}
export default Profile
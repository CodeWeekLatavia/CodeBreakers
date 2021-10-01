import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { proffessionData } from '../../../slices/proffessions/proffessionSlice';
import "./NewJobOffer.scss";
import CloseIcon from "../../../assets/svg/close.svg"
import { locationData, resetCountryCities } from '../../../slices/locations/locationSlice';
import { userData } from '../../../slices/user/userSlice';
import { getCountryCities } from '../../../logic/locations/getLoactionData';
import { newPossition } from '../../../logic/company/positions/positions';
import { useHistory } from 'react-router-dom';

function NewJobOffer() {
    const proffessionInfo = useSelector(proffessionData);
    const locationInfo = useSelector(locationData);
    const userInfo = useSelector(userData);

    const [categoryPopupOpen, setCategoryPopupOpen] = useState(false);
    const [proffessionPopupOpen, setProffessionPopupOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [proffession, setProffession] = useState(null);
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [requirements, setRequirements] = useState("");
    const [contractType, setContractType] = useState("short term");
    const [price, setPrice] = useState(null);
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState(null);
    const [showCities, setShowCities] = useState(false);
    const [showCountries, setShowCountries] = useState(false);
    const [lastSearchCountry, setLastSearchCountry] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);
    const [photo, setPhoto] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(userInfo.info && !userInfo.info.is_employer){
            history.push("/");
        }
    }, [history, userInfo.info]);

    useEffect(() => {
        if(firstLoad){
            dispatch(resetCountryCities());
            setFirstLoad(false);
        }
    }, [dispatch, firstLoad]);

    const getCitys = () => {
        if(country && country !== lastSearchCountry && locationInfo.countries.some(c => c.country_name === country)){
            getCountryCities(country, dispatch, locationInfo.token);
            setLastSearchCountry(country);
            setShowCities(true);
        }
        setShowCountries(false);
    }

    const uploadPhoto = (e) => {
        setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
        setPhoto(e.target.files[0]);
        console.log(URL.createObjectURL(e.target.files[0]))
    }

    const submitData = (e) => {
        e.preventDefault();
        if(contractType === "woluntary job"){
            setPrice("00.00");
        }
        if(locationInfo && locationInfo.countries && locationInfo.countryCitys){
            if(country && city && locationInfo.countries.some(c => c.country_name === country) && locationInfo.countryCitys.some(c => c.state_name === city)){
                if(proffession && name && about && requirements && price){
                    newPossition(
                        proffession.id,
                        about,
                        city,
                        country,
                        requirements,
                        price,
                        contractType,
                        photo,
                        userInfo.accessToken,
                        dispatch,
                        history
                    );
                }
            }
        }
    }

    return (
        <div className="newJobOffer">
            <div className="newJobOffer__inner">
                <h2>Izveido jaunu darba piedāvājumu</h2>
                <form className="newJobOffer__inner__form" autoComplete="off">
                    <div className="newJobOffer__inner__form__labelInpContainer">
                        <label htmlFor="name">Darba nosaukums</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Nosaukums"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="newJobOffer__inner__form__labelInpContainer">
                        <label htmlFor="about">Darbinieku prasmes un pienākumi</label>
                        <textarea 
                            type="text" 
                            name="about" 
                            id="about" 
                            placeholder="Pienākumu apraksts"
                            autoComplete="off"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="newJobOffer__inner__form__labelInpContainer">
                        <label htmlFor="offers">Uzņēmums darbiniekiem piedāvā:</label>
                        <textarea 
                            type="text" 
                            name="offers" 
                            id="offers" 
                            placeholder="Uzņēmums piedāvā"
                            autoComplete="off"
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="newJobOffer__inner__form__categoryContainer">
                        <p>{category ? `Mainīt darba kategoriju (pašlaik: ${category.title})` : "Izvēlies darba kategoriju"}</p>
                        <div className="newJobOffer__inner__form__categoryContainer__button" onClick={() => {setCategoryPopupOpen(true);setProffessionPopupOpen(false)}}>
                            <p>{category ? "Mainīt" : "Izvēlēties"}</p>
                        </div>
                        {categoryPopupOpen && (
                            <div className="newJobOffer__inner__form__categoryContainer__button__list">
                                <div className="newJobOffer__inner__form__categoryContainer__button__list__header">
                                    <img src={CloseIcon} alt="close" onClick={() => setCategoryPopupOpen(false)} />
                                </div>
                                <ul>
                                    {proffessionInfo.proffessions && proffessionInfo.proffessions.map((mappedCategory, i) => (
                                        <li key={i}><p onClick={() => {setCategory(mappedCategory);setCategoryPopupOpen(false)}}>{mappedCategory.title}</p></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {category && (
                        <div className="newJobOffer__inner__form__categoryContainer">
                            <p>{proffession ? `Mainīt profesiju (pašlaik: ${proffession.title})` : "Izvēlies profesiju"}</p>
                            <div className="newJobOffer__inner__form__categoryContainer__button" onClick={() => {setProffessionPopupOpen(true);setCategoryPopupOpen(false)}}>
                                <p>{proffession ? "Mainīt" : "Izvēlēties"}</p>
                            </div>
                            {proffessionPopupOpen && (
                                <div className="newJobOffer__inner__form__categoryContainer__button__list">
                                    <div className="newJobOffer__inner__form__categoryContainer__button__list__header">
                                        <img src={CloseIcon} alt="close" onClick={() => setProffessionPopupOpen(false)} />
                                    </div>
                                    <ul>
                                        {category && category.occupations && category.occupations.map((occuppation, i) => (
                                            <li key={i}><p onClick={() => {setProffession(occuppation);setProffessionPopupOpen(false)}}>{occuppation.title}</p></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="newJobOffer__inner__form__locations">
                        <div className="newJobOffer__inner__form__locations__container">
                            <label htmlFor="country">Kādā valstī ir aktuāla šī profesija?</label>
                            <input 
                                type="text" 
                                name="country"
                                id="country"
                                autoComplete="off"
                                placeholder="Valsts"
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
                        <div className="newJobOffer__inner__form__locations__container">
                            <label htmlFor="city">Kādā pilsētā ir aktuāla šī profesija?</label>
                            <input 
                                type="text" 
                                name="city"
                                id="city"
                                autoComplete="off"
                                placeholder="Pilsēta"
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
                    <div className="newJobOffer__inner__form__container">
                        <p>Izvēlieties darba termiņu</p>
                        <div className="newJobOffer__inner__form__container__buttons">
                            <button 
                                className={contractType === "long term" ? "newJobOffer__inner__form__container__buttons__active" : "newJobOffer__inner__form__container__buttons__inactive"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setContractType("long term")
                                }}
                            >Ilgtermiņa</button>
                            <button 
                                className={contractType === "short term" ? "newJobOffer__inner__form__container__buttons__active" : "newJobOffer__inner__form__container__buttons__inactive"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setContractType("short term")
                                }}
                            >Īstermiņa</button>
                            <button 
                                className={contractType === "woluntary job" ? "newJobOffer__inner__form__container__buttons__active" : "newJobOffer__inner__form__container__buttons__inactive"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setContractType("woluntary job")
                                }}
                            >Brīvprātigs</button>
                        </div>
                    </div>
                    {contractType !== "woluntary job" && (
                        <div className="newJobOffer__inner__form__labelInpContainer">
                            <label htmlFor="pay">Kāda būs mēneša alga?</label>
                            <input 
                                type="number" 
                                name="pay" 
                                id="pay" 
                                placeholder="000.00€"
                                autoComplete="off"
                                value={price ? price : ""}
                                onChange={(e) => setPrice(parseInt(e.target.value))}
                            />
                        </div>
                    )}
                    <div className="newJobOffer__inner__form__labelInpContainer">
                        {previewPhoto && (
                            <img src={previewPhoto} alt="preview" />
                        )}
                        <label htmlFor="photo">{previewPhoto ? "Mainīt" : "Pievienot"} foto</label>
                        <input 
                            type="file" 
                            name="photo" 
                            id="photo" 
                            accept="image/*"
                            onChange={(e) => uploadPhoto(e)}
                        />
                    </div>
                    <button className="newJobOffer__inner__form__button" onClick={(e) => submitData(e)}>Iesniegt</button>
                </form>
            </div>
        </div>
    )
}

export default NewJobOffer

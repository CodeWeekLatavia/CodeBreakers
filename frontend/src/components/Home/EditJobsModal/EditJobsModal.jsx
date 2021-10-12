import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './EditJobsModal.scss';

import { useSelector } from "react-redux";
import { proffessionData } from '../../../slices/proffessions/proffessionSlice';
import { locationData } from "../../../slices/locations/locationSlice";
import { getCountryCities } from '../../../logic/locations/getLoactionData';

import CloseIcon from "../../../assets/svg/close.svg"
import { languageData } from "../../../slices/languages/languageSlice";

const EditJobsModal = ({ job, setEditing }) => {
    const proffessionInfo = useSelector(proffessionData);
    const locationInfo = useSelector(locationData);
    const languageInfo = useSelector(languageData);

    const dispatch = useDispatch();

    const [category, setCategory] = useState(null);
    const [proffession, setProffession] = useState(null);
    const [about, setAbout] = useState(job.position_info);
    const [requirements, setRequirements] = useState(job.position_requirements);
    const [contractType, setContractType] = useState(job.contract_type);
    const [price, setPrice] = useState(job.price_range);
    const [country, setCountry] = useState(job.position_country);
    const [city, setCity] = useState(job.position_city);

    const [showCities, setShowCities] = useState(false);
    const [showCountries, setShowCountries] = useState(false);
    const [lastSearchCountry, setLastSearchCountry] = useState(null);
    const [categoryPopupOpen, setCategoryPopupOpen] = useState(false);
    const [proffessionPopupOpen, setProffessionPopupOpen] = useState(false);

    const getCitys = () => {
        if(country && country !== lastSearchCountry && locationInfo.countries.some(c => c.country_name === country)){
            getCountryCities(country, dispatch, locationInfo.token);
            setLastSearchCountry(country);
            setShowCities(true);
        }
        setShowCountries(false);
    }

    return <div className="edit-jobs-modal">
        <form className="edit-jobs-modal__edit panel">
            <h3 className="edit-jobs-modal__title">{languageInfo.text.jobOffer.editModal.heading}</h3>
            <div className="edit-jobs-modal__edit__input-group">
                <label htmlFor="about">{languageInfo.text.jobOffer.editModal.responsibilities}</label>
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
            <div className="edit-jobs-modal__edit__input-group">
                <label htmlFor="offers">{languageInfo.text.jobOffer.editModal.jobDescription}</label>
                <textarea 
                    type="text" 
                    name="offers" 
                    id="offers" 
                    placeholder="Darbinieka prasmes"
                    autoComplete="off"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                ></textarea>
            </div>
            <div className="edit-jobs-modal__edit__categoryContainer">
                <p>{category ? `${languageInfo.text.jobOffer.editModal.changeCategory} (${languageInfo.text.jobOffer.editModal.currently}: ${category.title})` : languageInfo.text.jobOffer.editModal.chooseCategory}</p>
                <div className="edit-jobs-modal__edit__categoryContainer__button" onClick={() => {setCategoryPopupOpen(true);setProffessionPopupOpen(false)}}>
                    <p>{category ? languageInfo.text.jobOffer.editModal.change : languageInfo.text.jobOffer.editModal.choose}</p>
                </div>
                {categoryPopupOpen && (
                    <div className="edit-jobs-modal__edit__categoryContainer__button__list">
                        <div className="edit-jobs-modal__edit__categoryContainer__button__list__header">
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
                <div className="edit-jobs-modal__edit__categoryContainer">
                    <p>{proffession ? `${languageInfo.text.jobOffer.editModal.changeProffession} (${languageInfo.text.jobOffer.editModal.currently}: ${proffession.title})` : languageInfo.text.jobOffer.editModal.chooseProffession}</p>
                    <div className="edit-jobs-modal__edit__categoryContainer__button" onClick={() => {setProffessionPopupOpen(true);setCategoryPopupOpen(false)}}>
                        <p>{proffession ? languageInfo.text.jobOffer.editModal.change : languageInfo.text.jobOffer.editModal.choose}</p>
                    </div>
                    {proffessionPopupOpen && (
                        <div className="edit-jobs-modal__edit__categoryContainer__button__list">
                            <div className="edit-jobs-modal__edit__categoryContainer__button__list__header">
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
            <div className="edit-jobs-modal__edit__locations">
                <div className="edit-jobs-modal__edit__locations__container">
                    <label htmlFor="country">{languageInfo.text.jobOffer.editModal.country1}</label>
                    <input 
                        type="text" 
                        name="country"
                        id="country"
                        autoComplete="off"
                        placeholder={languageInfo.text.jobOffer.editModal.country2}
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
                <div className="edit-jobs-modal__edit__locations__container">
                    <label htmlFor="city">{languageInfo.text.jobOffer.editModal.city1}</label>
                    <input 
                        type="text" 
                        name="city"
                        id="city"
                        autoComplete="off"
                        placeholder={languageInfo.text.jobOffer.editModal.city2}
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
            <div className="edit-jobs-modal__edit__container">
                <p>{languageInfo.text.jobOffer.editModal.chooseJobType}</p>
                <div className="edit-jobs-modal__edit__container__buttons">
                    <button 
                        className={contractType === "long term" ? "edit-jobs-modal__edit__container__buttons__active" : "edit-jobs-modal__edit__container__buttons__inactive"}
                        onClick={(e) => {
                            e.preventDefault();
                            setContractType("long term")
                        }}
                    >{languageInfo.text.jobOffer.editModal.jobType1}</button>
                    <button 
                        className={contractType === "short term" ? "edit-jobs-modal__edit__container__buttons__active" : "edit-jobs-modal__edit__container__buttons__inactive"}
                        onClick={(e) => {
                            e.preventDefault();
                            setContractType("short term")
                        }}
                    >{languageInfo.text.jobOffer.editModal.jobType2}</button>
                    <button 
                        className={contractType === "woluntary job" ? "edit-jobs-modal__edit__container__buttons__active" : "edit-jobs-modal__edit__container__buttons__inactive"}
                        onClick={(e) => {
                            e.preventDefault();
                            setContractType("woluntary job")
                        }}
                    >{languageInfo.text.jobOffer.editModal.jobType3}</button>
                </div>
            </div>
            {contractType !== "woluntary job" && (
                <div className="edit-jobs-modal__edit__input-group">
                    <label htmlFor="pay">{languageInfo.text.jobOffer.editModal.salary}</label>
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
            <div className="edit-jobs-modal__edit__bottom">
                <button onClick={() => setEditing(false)} className="edit-jobs-modal__edit__bottom__button">{languageInfo.text.jobOffer.editModal.cancel}</button>
                <button type="submit" className="edit-jobs-modal__edit__bottom__button">{languageInfo.text.jobOffer.editModal.submit}</button>
            </div>
        </form>
        <form className="edit-jobs-modal__delete panel">
            <h3 className="edit-jobs-modal__title">{languageInfo.text.jobOffer.editModal.delete.heading}</h3>
            <h4>{languageInfo.text.jobOffer.editModal.delete.question}</h4>
            <div className="edit-jobs-modal__delete__desc">
                <p>{languageInfo.text.jobOffer.editModal.delete.answer1}</p>
                <p>{languageInfo.text.jobOffer.editModal.delete.answer2}</p>
            </div>
            <div className="edit-jobs-modal__delete__bottom">
                <button type="submit" className="edit-jobs-modal__delete__bottom__button">{languageInfo.text.jobOffer.editModal.delete.button}</button>
            </div>
        </form>
    </div>
}

export default EditJobsModal;

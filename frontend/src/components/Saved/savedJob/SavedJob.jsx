import React, { useEffect, useState } from 'react'
import './SavedJob.scss';

import { useHistory } from 'react-router-dom';
import { getCompanyInfoById } from '../../../logic/company/info/companyInfo';
import { getPossitionByID } from '../../../logic/company/positions/positions';

import Marker from '../../../assets/svg/marker.svg';
import Suitcase from '../../../assets/svg/suitcase.svg';
import { useSelector } from 'react-redux';
import { userData } from '../../../slices/user/userSlice';
import { removeFromSaved } from '../../../logic/jobOffers/swipe';
import {getPossitionProffession} from '../../../logic/user/proffessions/proffessions';
import { useDispatch } from 'react-redux';
import { languageData } from '../../../slices/languages/languageSlice';
import relativeTime from '../../RelativeTime/RelativeRime';

function SavedJob({info, filter}) {
    const userInfo = useSelector(userData);
    const languageInfo = useSelector(languageData);

    const [companyInfo, setCompanyInfo] = useState(null);
    const [jobOfferInfo, setJobOfferInfo] = useState(null);
    const [possitionProffession, setPossitionProffession] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!possitionProffession && jobOfferInfo && jobOfferInfo.position_occupation){
            getPossitionProffession(jobOfferInfo.position_occupation, setPossitionProffession)
        }
    }, [jobOfferInfo, possitionProffession]);

    useEffect(() => {
        if(!companyInfo){
            getCompanyInfoById(info.company, setCompanyInfo)
        }
    }, [companyInfo, info]);

    useEffect(() => {
        if(!jobOfferInfo && info){
            getPossitionByID(info.position, setJobOfferInfo);
        }
    }, [jobOfferInfo, info]);

    const Location = ({ icon, iconAlt, title, value }) => {
        return (
            <div className="saved-job__location">
                <div>
                    <img src={icon} alt={iconAlt} />
                    <p>{title}</p>
                </div>
                <p>{value}</p>
            </div>
        );
    }

    if (userInfo.info && companyInfo && jobOfferInfo && jobOfferInfo.contract_type === filter && info.jobseeker_accepted && possitionProffession) {
        return (<div className="saved-job panel">
                <div className="saved-job__top">
                    <img src={companyInfo.logo} alt="logo" className="logo" onClick={() => history.push(`/profile/${companyInfo.user}`)} />
                    <div className="info">
                        <h4 onClick={() => history.push(`/profile/${companyInfo.user}`)} >{companyInfo.company_name}</h4>
                        <small>{relativeTime(jobOfferInfo.post_time, languageInfo.langShort)}</small>
                    </div>
                </div>
                <Location icon={Marker} iconAlt="marker" title={languageInfo.text.jobOffer.location}
                    value={(!jobOfferInfo.position_city && !jobOfferInfo.position_country) ? languageInfo.text.jobOffer.locationUnknown : 
                    <>
                        {(jobOfferInfo.position_country && jobOfferInfo.position_city) ? `${jobOfferInfo.position_country}, ${jobOfferInfo.position_city}` :
                        <>
                            {jobOfferInfo.position_country ? jobOfferInfo.position_country : ''}
                            {jobOfferInfo.position_city ? jobOfferInfo.position_city : ''}
                        </>}
                    </>}
                />
                <Location icon={Suitcase} iconAlt="suitcase" title={languageInfo.text.jobOffer.proffession} value={possitionProffession}/>
                {jobOfferInfo.photo && (
                    <div>
                        <img src={jobOfferInfo.photo} alt="jobOffer" className="job-panel__photo" />
                    </div>
                )}
                <div className="saved-job__info">
                    <p className="saved-job__info__title">{languageInfo.text.jobOffer.responsabilities}</p>
                    <p>{jobOfferInfo.position_info}</p>
                </div>
                <div className="saved-job__requirements">
                    <p className="saved-job__requirements__title">{languageInfo.text.jobOffer.companyOffers}</p>
                    <p>{jobOfferInfo.position_requirements}</p>
                </div>
                <div className="saved-job__bottom">
                <button className="saved-job__bottom__retract-submission" onClick={() => removeFromSaved(info, userInfo.accessToken, dispatch, userInfo.swipedPossitions)}>{languageInfo.text.jobOffer.signOff}</button>
                    <div className="saved-job__bottom__price-wrapper">
                        <small>{languageInfo.text.jobOffer.salaryBeginningFrom}</small>
                        <h2>€ {jobOfferInfo.price_range}/{languageInfo.text.jobOffer.salaryPerMonth}</h2>
                    </div>
                </div>
        </div>)
    } else return null;
}

export default SavedJob

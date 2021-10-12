import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Marker from '../../../../assets/svg/marker.svg';
import Pen from '../../../../assets/svg/pen.svg';
import Suitcase from '../../../../assets/svg/suitcase.svg';
import { getCompanyInfoById } from '../../../../logic/company/info/companyInfo';
import { userData } from '../../../../slices/user/userSlice';
import { useHistory } from 'react-router-dom';
import EditJobsModal from '../../EditJobsModal/EditJobsModal';
import { jobSeekerAcceptJobOffer } from '../../../../logic/jobOffers/swipe';
import { useDispatch } from 'react-redux';
import {getPossitionProffession} from "../../../../logic/user/proffessions/proffessions"
import { languageData } from '../../../../slices/languages/languageSlice';
import relativeTime from '../../../RelativeTime/RelativeRime';

function ScrollJob({ jobOffer }) {
    const [companyInfo, setCompanyInfo] = useState(null);
    const [editing, setEditing] = useState(false);
    const [possitionProffession, setPossitionProffession] = useState(null);

    const userInfo = useSelector(userData);
    const languageInfo = useSelector(languageData);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!possitionProffession){
            getPossitionProffession(jobOffer.position_occupation, setPossitionProffession)
        }
    }, [jobOffer.position_occupation, possitionProffession]);

    useEffect(() => {
        if(!companyInfo){
            getCompanyInfoById(jobOffer.company, setCompanyInfo)
        }
    }, [companyInfo, jobOffer.company]);

    useEffect(() => {

    }, [jobOffer.post_time])

    const Location = ({ icon, iconAlt, title, value }) => {
        return (
            <div className="job-panel__location">
                <div>
                    <img src={icon} alt={iconAlt} />
                    <p>{title}</p>
                </div>
                <p>{value}</p>
            </div>
        );
    }

    if(companyInfo && userInfo.accessToken !== "" && possitionProffession){
        return (
            <div className="job-panel panel">

                {userInfo.info.id === companyInfo.user && editing && <EditJobsModal job={jobOffer} setEditing={setEditing} />}

                <div className="job-panel__top">
                    <img src={companyInfo.logo} alt="logo" className="logo" onClick={() => history.push(`/profile/${companyInfo.user}`)} />
                    <div className="info">
                        <h4 onClick={() => history.push(`/profile/${companyInfo.user}`)} >{companyInfo.company_name}</h4>
                        <small>{relativeTime(jobOffer.post_time, languageInfo.langShort)}</small>
                    </div>
                    {userInfo.info.id === companyInfo.user && (
                        <img src={Pen} alt="options" className="options" onClick={() => setEditing(!editing)} />
                    )}
                </div>
                <Location icon={Marker} iconAlt="marker" title={languageInfo.text.jobOffer.location}
                    value={(!jobOffer.position_city && !jobOffer.position_country) ? languageInfo.text.jobOffer.locationUnknown : 
                    <>
                        {(jobOffer.position_country && jobOffer.position_city) ? `${jobOffer.position_country}, ${jobOffer.position_city}` :
                        <>
                            {jobOffer.position_country ? jobOffer.position_country : ''}
                            {jobOffer.position_city ? jobOffer.position_city : ''}
                        </>}
                    </>}
                />
                <Location icon={Suitcase} iconAlt="suitcase" title={languageInfo.text.jobOffer.proffession} value={possitionProffession}/>
                {jobOffer.photo && (
                    <div>
                        <img src={jobOffer.photo} alt="jobOffer" className="job-panel__photo" />
                    </div>
                )}
                <div className="job-panel__requirements">
                    <p className="job-panel__requirements__title">{languageInfo.text.jobOffer.responsabilities}</p>
                    <p>{jobOffer.position_info}</p>
                </div>
                <div className="job-panel__info">
                    <p className="job-panel__info__title">{languageInfo.text.jobOffer.companyOffers}</p>
                    <p>{jobOffer.position_requirements}</p>
                </div>
                <div className="job-panel__bottom">
                    {!userInfo.info.is_employer &&
                        <button className="job-panel__bottom__sign-up" onClick={() => jobSeekerAcceptJobOffer(1, jobOffer.id, userInfo.accessToken, dispatch)}>{languageInfo.text.jobOffer.signUp}</button>
                    }
                    {jobOffer.price_range !== "00.00" && (
                        <div className="job-panel__bottom__price-wrapper">
                            <small>{languageInfo.text.jobOffer.salaryBeginningFrom}</small>
                            <h2>€ {jobOffer.price_range}/{languageInfo.text.jobOffer.salaryPerMonth}</h2>
                        </div>
                    )}
                </div>
            </div>
        )
    }
    return null;
}

export default ScrollJob

import React, { useEffect, useState } from 'react'
import '../../Home/JobsPanel/ScrollJobs.scss';
import EditJobsModal from '../../Home/EditJobsModal/EditJobsModal';
import Pen from '../../../assets/svg/pen.svg';
import Marker from '../../../assets/svg/marker.svg';
import Suitcase from '../../../assets/svg/suitcase.svg';
import { useSelector } from 'react-redux'
import { userData } from '../../../slices/user/userSlice'
import { getCompanyInfoById } from '../../../logic/company/info/companyInfo';
import {getPossitionProffession} from "../../../logic/user/proffessions/proffessions"
import { languageData } from '../../../slices/languages/languageSlice';
import relativeTime from '../../RelativeTime/RelativeRime';

function CompanyJob({info}) {
    const userInfo = useSelector(userData);
    const languageInfo = useSelector(languageData);
    const [userSwiped, setUserSwiped] = useState(null);

    const [companyInfo, setCompanyInfo] = useState(null);
    const [editing, setEditing] = useState(false);
    const [possitionProffession, setPossitionProffession] = useState(null);

    useEffect(() => {
        if(!possitionProffession){
            getPossitionProffession(info.position_occupation, setPossitionProffession)
        }
    }, [info.position_occupation, possitionProffession]);

    useEffect(() => {
        if (!companyInfo) {
            getCompanyInfoById(info.company, setCompanyInfo);
        }
    }, [companyInfo, info.company]);

    useEffect(() => {
        if(userSwiped === null && userInfo.swipedPossitions && userInfo.swipedPossitions.some(p => p.position !== info.id)){
            setUserSwiped(true);
        }
    }, [userInfo.swipedPossitions, info, userSwiped]);

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
    };

    if(companyInfo && possitionProffession) {
        return (
            <div className="job-panel panel">

                {userInfo.info.id === companyInfo.user && editing && <EditJobsModal job={info} setEditing={setEditing} />}

                <div className="job-panel__top">
                    <img src={companyInfo.logo} alt="logo" className="logo" />
                    <div className="info">
                        <h4>{companyInfo.company_name}</h4>
                        <small>{relativeTime(info.post_time, languageInfo.langShort)}</small>
                    </div>
                    {userInfo.info.id === companyInfo.user && (
                        <img src={Pen} alt="options" className="options" onClick={() => setEditing(!editing)} />
                    )}
                </div>
                <Location icon={Marker} iconAlt="marker" title={languageInfo.text.jobOffer.location}
                    value={(!info.position_city && !info.position_country) ? languageInfo.text.jobOffer.locationUnknown :
                        <>
                            {(info.position_country && info.position_city) ? `${info.position_country}, ${info.position_city}` :
                                <>
                                    {info.position_country ? info.position_country : ''}
                                    {info.position_city ? info.position_city : ''}
                                </>}
                        </>}
                />
                <Location icon={Suitcase} iconAlt="suitcase" title={languageInfo.text.jobOffer.proffession} value={possitionProffession}/>
                {info.photo && (
                    <div>
                        <img src={info.photo} alt="info" className="job-panel__photo" />
                    </div>
                )}
                <div className="job-panel__requirements">
                    <p className="job-panel__requirements__title">{languageInfo.text.jobOffer.responsabilities}</p>
                    <p>{info.position_info}</p>
                </div>
                <div className="job-panel__info">
                    <p className="job-panel__info__title">{languageInfo.text.jobOffer.companyOffers}</p>
                    <p>{info.position_requirements}</p>
                </div>
                <div className="job-panel__bottom">
                    <div className="job-panel__bottom__price-wrapper">
                        <small>{languageInfo.text.jobOffer.salaryBeginningFrom}</small>
                        <h2>€ {info.price_range}/{languageInfo.text.jobOffer.salaryPerMonth}</h2>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

export default CompanyJob

import React, { useEffect, useState } from 'react'
import Inactive from '../../../../assets/svg/plans/inactive.svg';
import Active from '../../../../assets/svg/plans/active.svg';
import { getCompanyInfoById } from '../../../../logic/company/info/companyInfo';
import { jobSeekerAcceptJobOffer } from '../../../../logic/jobOffers/swipe';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userData } from '../../../../slices/user/userSlice';

function SvipeJob({job}) {
    const [swiped, setSwiped] = useState("");
    const [companyInfo, setCompanyInfo] = useState(null);
    const [shown, setShown] = useState(true);

    const dispatch = useDispatch();
    const userInfo = useSelector(userData);

    useEffect(() => {
        if(swiped !== ""){
            setTimeout(() => {
                setShown(false);
            }, 700);
        }
    }, [swiped]);

    useEffect(() => {
        if(!companyInfo){
            getCompanyInfoById(job.company, setCompanyInfo)
        }
    }, [companyInfo, job.company]);

    if(companyInfo && shown){
        return (
            <div className={`swipe-card panel swipedCard${swiped !== "" && `__${swiped}`}`}>
                <div className="swipe-card__header">
                    <img src={companyInfo.logo} alt="job" />
                    <h3>{companyInfo.company_name && companyInfo.company_name}</h3>
                </div>
                <div className="swipe-card__body">
                    <h3>Darba apraksts:</h3>
                    <p>{job.position_info}</p>
                    <h3>Uzņēmums piedāvā</h3>
                    <p>{job.position_requirements}</p>
                </div>
                <div className="swipe-card__bottom">
                    <button id="reject">
                        <img src={Inactive} alt="reject" onClick={() => {jobSeekerAcceptJobOffer(0, job.id, userInfo.accessToken, dispatch);setSwiped("left")}} />
                    </button>
                    <button id="accept">
                        <img src={Active} alt="accept" onClick={() => {jobSeekerAcceptJobOffer(1, job.id, userInfo.accessToken, dispatch);setSwiped("right")}} />
                    </button>
                </div>
            </div>
        )
    }
    return null;
}

export default SvipeJob

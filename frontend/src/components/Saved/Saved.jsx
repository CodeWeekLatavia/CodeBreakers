import React, { useState } from "react";
import './Saved.scss'

import { useSelector } from "react-redux";

import { userData } from "../../slices/user/userSlice";
import SavedJob from "./savedJob/SavedJob";
import { languageData } from "../../slices/languages/languageSlice";

const Saved = () => {
    const userInfo = useSelector(userData);
    const [activeJobOption, setActiveJobOption] = useState('long term');
    const languageInfo = useSelector(languageData);

    return (
        <div className="saved">
            <div className="saved__left">
                <ul className="saved__left__options">
                    <li className={`saved__left__options__option ${activeJobOption === 'long term' ? 'active' : ''}`} onClick={() => {
                        setActiveJobOption('long term');
                    }}>{languageInfo.text.saved.jobType1}</li>
                    <li className={`saved__left__options__option ${activeJobOption === 'short term' ? 'active' : ''}`} onClick={() => {
                        setActiveJobOption('short term');
                    }}>{languageInfo.text.saved.jobType2}</li>
                    <li className={`saved__left__options__option ${activeJobOption === 'voluntary' ? 'active' : ''}`} onClick={() => {
                        setActiveJobOption('voluntary');
                    }}>{languageInfo.text.saved.jobType3}</li>
                </ul>
            </div>
            <div className="saved__right">
                <div className="saved__right__scroll">
                    {
                        userInfo.swipedPossitions.map((possition, i) => {
                            if(possition.jobseeker_accepted){
                                return (
                                    <SavedJob 
                                        key={i}
                                        info={possition}
                                        filter={activeJobOption}
                                    />
                                )
                            }
                            return null;
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Saved;

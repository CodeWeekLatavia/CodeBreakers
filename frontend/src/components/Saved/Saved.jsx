import React, { useState } from "react";
import './Saved.scss'

import { useSelector } from "react-redux";

import { userData } from "../../slices/user/userSlice";
import SavedJob from "./savedJob/SavedJob";

const Saved = () => {
    const userInfo = useSelector(userData);
    const [activeJobOption, setActiveJobOption] = useState('long term');

    return (
        <div className="saved">
            <div className="saved__left">
                <ul className="saved__left__options">
                    <li className={`saved__left__options__option ${activeJobOption === 'long term' ? 'active' : ''}`} onClick={() => {
                        setActiveJobOption('long term');
                    }}>Ilgtermiņa darbi</li>
                    <li className={`saved__left__options__option ${activeJobOption === 'short term' ? 'active' : ''}`} onClick={() => {
                        setActiveJobOption('short term');
                    }}>Īstermiņa darbi</li>
                    <li className={`saved__left__options__option ${activeJobOption === 'voluntary' ? 'active' : ''}`} onClick={() => {
                        setActiveJobOption('voluntary');
                    }}>Brīvprātīgie darbi</li>
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

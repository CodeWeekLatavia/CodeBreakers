import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { proffessionData } from '../../../slices/proffessions/proffessionSlice'
import CloseIcon from "../../../assets/svg/close.svg"
import "./ProffessionPopup.scss"

function ProffessionPopup({proffessionID, setProffessionID, setProffessionListOpen}) {
    const proffessionInfo = useSelector(proffessionData);

    const [category, setCategory] = useState(null);
    const [userProffession, setUserProffession] = useState(proffessionID);


    return (
        <div className="proffessionPopup">
            <header className="proffessionPopup__header">
                <h3>Profesiju izvēle</h3>
                <img src={CloseIcon} alt="close" onClick={() => {setUserProffession(proffessionID);setProffessionListOpen(false)}} />
            </header>
            <div className="proffessionPopup__listHeader">
                <p>Profesiju kategorijas:</p>
            </div>
            <ul className="proffessionPopup__categoryList">
                {proffessionInfo.proffessions && proffessionInfo.proffessions.map((mappedCategory, i) => (
                    <li key={i} onClick={() => setCategory(mappedCategory)}>{mappedCategory.title}</li>
                ))}
            </ul>
            {category && (
                <>
                    <div className="proffessionPopup__listHeader">
                        <p>Profesijas kategorijai ({category.title})</p>
                    </div>
                    <ul className="proffessionPopup__categoryList">
                        {category.occupations && category.occupations.map((occupation, i) => (
                            <li key={i} onClick={() => setUserProffession(occupation.id)}>{occupation.title}</li>
                        ))}
                    </ul>
                </>
            )}
            {category && userProffession !== proffessionID && (
                <button 
                    className="proffessionPopup__submitButton"
                    onClick={(e) => {e.preventDefault();setProffessionID(userProffession);setProffessionListOpen(false)}}
                >Izvēlēties</button>
            )}
        </div>
    )
}

export default ProffessionPopup

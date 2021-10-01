import React from 'react';
import dropdown from '../../../../assets/svg/dropdown.svg'
import close from '../../../../assets/svg/close.svg'
// import marker from '../../../../assets/svg/marker.svg'

import './EducationModal.scss';

function EducationModal({updateProfileInfo,handleEducationModal}){

    return (
        <div className="educationModal">
            <div className="educationModal__inner">

                <div className="educationModal__inner__close">
                    <img onClick={handleEducationModal} src={close} alt="close" />
                </div>

                <header className="educationModal__inner__header">
                    <p>Izglītība</p>
                </header>

                <div className="educationModal__inner__education-info">

                    <div className="educationModal__inner__education-info__input-group">
                        <label htmlFor="education-institution">Izglītības iestāde</label>
                        <input type="text" name='education-institution' value={'user.educationInstitution'}/>
                    </div>

                    <div className="educationModal__inner__education-info__input-group">
                        <label htmlFor="direction">Virziens</label>
                        <input type="text" name='direction' value={'user.education.direction'}/>
                    </div>

                    <div className="educationModal__inner__education-info__input-groups">

                        <div className="educationModal__inner__education-info__input-groups__input-group">
                            <label htmlFor="startingYear">Sākuma gads</label>
                            <div className="educationModal__inner__education-info__input-groups__input-group__custom-input">
                                <input type="text" name='startingYear' value={'user.startingYear'}/>
                                <img src={dropdown} alt="dropdown" />
                            </div>
                        </div>

                        <div className="educationModal__inner__education-info__input-groups__input-group">
                            <label htmlFor="seniorYear">Paredzamais izlaiduma gads</label>
                            <div className="educationModal__inner__education-info__input-groups__input-group__custom-input">
                                <input type="text" name='seniorYear' value={'user.seniorYear'}/>
                                <img src={dropdown} alt="dropdown" />
                            </div>
                        </div>
                        
                    
                    </div>

                    <div className="educationModal__inner__education-info__input-group">
                        <label htmlFor="education-institution">Vidējā atzīme</label>
                        <div className="educationModal__inner__education-info__input-group__custom-input">
                            <input type="text" name='education-institution' value={'user.educationInstitution'}/>
                            <img src={dropdown} alt="dropdown" />
                        </div>
                    </div>

                    <div className="educationModal__inner__education-info__multiple">
                        <div className="educationModal__inner__education-info__multiple__input-group">
                            <label htmlFor="description">Apraksts:</label>
                            <textarea name="description" id="description" cols="40" rows="10">{'user.education.desc'}</textarea>
                        </div>

                        <div className="educationModal__inner__education-info__multiple__photo">
                            <p>Fotogrāfija:</p>
                            <div>
                                <img src="https://www.rtu.lv/images/admin/default_og_image.jpg" alt="education institution" />
                                <p>Izmainīt</p>
                            </div>
                        </div>
                    </div>

                    <div className="educationModal__inner__education-info__institution-link">
                        <div className="educationModal__inner__education-info__input-group">
                            <label htmlFor="institutionLink">Pievienot hipersaiti</label>
                            <input type="text" name='institutionLink' id='institutionLink' value={'user.education.link'} />
                        </div>
                    </div>

                </div>

                <div className="educationModal__inner__edit-options">
                    <button onClick={handleEducationModal}>Atpakaļ</button>
                    <button onClick={updateProfileInfo}>Saglabāt</button>
                </div>

            </div>
        </div>
    )
}

export default EducationModal;
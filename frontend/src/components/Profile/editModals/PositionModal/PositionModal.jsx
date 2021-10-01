import React from 'react';
// import dropdown from '../../../../assets/svg/dropdown.svg'
import close from '../../../../assets/svg/close.svg'

import './PositionModal.scss';

function PositionModal({handlePositionModal, updateProfileInfo}){
    return (
        <div className="positionModal">
            <div className="positionModal__inner">

                <div className="positionModal__inner__close">
                    <img onClick={handlePositionModal} src={close} alt="close" />
                </div>

                <header className="positionModal__inner__header">
                    <p>Amats</p>
                </header>

                <div className="positionModal__inner__education-info">

                    <div className="positionModal__inner__education-info__input-group">
                        <label htmlFor="company-name">Kompānijas nosaukums</label>
                        <input type="text" name='company-name' value={'user.company'}/>
                    </div>

                    <div className="positionModal__inner__education-info__input-group">
                        <label htmlFor="position">Amats</label>
                        <input type="text" name='position' value={'user.position'}/>
                    </div>

                    <div className="positionModal__inner__education-info__input-group">
                        <label htmlFor="startingYear">Sākuma gads</label>
                        <input type="text" name='startingYear' value={'user.startingYear'}/>
                    </div>

                    <div className="positionModal__inner__education-info__multiple">
                        <div className="positionModal__inner__education-info__multiple__input-group">
                            <label htmlFor="description">Apraksts:</label>
                            <textarea name="description" id="description" cols="40" rows="10">{'user.desc'}</textarea>
                        </div>

                        <div className="positionModal__inner__education-info__multiple__photo">
                            <p>Fotogrāfija:</p>
                            <div>
                            <img src='https://www.hebergementwebs.com/image/1b/1b8ca7b92caec0907e76c50dc4148db6.jpg/the-secret-history-of-the-google-logo-21.jpg' alt="education school" />
                                <p>Izmainīt</p>
                            </div>
                        </div>
                    </div>

                    <div className="positionModal__inner__education-info__institution-link">
                        <div className="positionModal__inner__education-info__input-group">
                            <label htmlFor="institutionLink">Pievienot hipersaiti</label>
                            <input type="text" name='institutionLink' id='institutionLink' value={'user.education.link'} />
                        </div>
                    </div>

                </div>

                <div className="positionModal__inner__edit-options">
                <button onClick={handlePositionModal}>Atpakaļ</button>
                <button onClick={updateProfileInfo}>Saglabāt</button>
            </div>
            
            </div>
        </div>
    )
}

export default PositionModal;
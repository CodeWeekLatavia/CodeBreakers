import React from 'react';

import close from '../../../../assets/svg/close.svg'

import './KnowledgeModal.scss';

function KnowledgeModal({handleKnowledgeModal, updateProfileInfo}) {
    return (
        <div className="knowledgeModal">
            <div className="knowledgeModal__inner">

                <div className="knowledgeModal__inner__close">
                    <img onClick={handleKnowledgeModal} src={close} alt="close" />
                </div>

                <header className="knowledgeModal__inner__header">
                    <p>Papildu zināšanas</p>
                </header>

                <div className="knowledgeModal__inner__desc">
                    <label htmlFor="additional-knowledge">Papildu zināšanas apraksts::</label>
                    <textarea name="additional-knowledge" id="additional-knowledge" cols="40" rows="10">{'user.desc'}</textarea>
                </div>

                <div className="positionModal__inner__edit-options">
                    <button onClick={handleKnowledgeModal}>Atpakaļ</button>
                    <button onClick={updateProfileInfo}>Saglabāt</button>
                </div>

            </div>
        </div>
    )
}

export default KnowledgeModal;
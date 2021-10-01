import React from 'react'
import "./LoadingPopup.scss"

function LoadingPopup() {
    return (
        <div className="loading__popup">
            <div className="loading__popup__loader">
                <div className="loading__popup__loader__first" id="dash"></div>
                <div className="loading__popup__loader__second" id="dash"></div>
                <div className="loading__popup__loader__third" id="dash"></div>
                <div className="loading__popup__loader__fourth" id="dash"></div>
            </div>
            <h1>
                <span>Y</span>
                <span>O</span>
                <span>U</span>
                <span>T</span>
                <span>H</span> 

                <span id="blue" className="first"> D</span>
                <span id="blue">E</span>
                <span id="blue"></span>
                <span id="blue">A</span>
                <span id="blue">L</span>
            </h1>
        </div>
    )
}

export default LoadingPopup
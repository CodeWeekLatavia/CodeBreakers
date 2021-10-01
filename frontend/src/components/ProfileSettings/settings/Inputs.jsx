import './Inputs.scss'
import { useState } from 'react';
import dropdown from '../../../assets/svg/dropdown.svg'

const TextInput = ({ title, inputName, value="", placeholder="", onChange, inputType="text" }) => {
    return <div className="inputs__text-input">
        <label htmlFor={inputName} className="inputs__text-input__name">{title}</label>
        <div className="inputs__text-input__input-group">
            <input type={inputType} id={inputName} name={inputName} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    </div>;
}

const DropdownInput = ({ title, inputStyle={}, currentOption, options, setIsActiveJobSeeker }) => {
    const [selected, setSelected] = useState(currentOption);
    const [dropdownActive, setDropdownActive] = useState(false)

    return <div className="inputs__dropdown-input">
        <label htmlFor='onlineStatus' className="inputs__dropdown-input__name">{title}</label>
        <div className="inputs__dropdown-input__input-group" onClick={() => setDropdownActive(!dropdownActive)}>
            <p style={inputStyle}>{selected}</p>
            <img src={dropdown} alt="dropdown" />
            <div className={`inputs__dropdown-input__input-group__dropdown ${dropdownActive ? 'active' : ''}`}>
                {options.map((option, i) =>
                <p key={i} onClick={() => {
                    setSelected(option);
                    setIsActiveJobSeeker(currentOption === "#ADM" ? true : false);
                    setDropdownActive(false);
                }}>{option}</p>)}
            </div>
        </div>
    </div>;
}

const CheckboxInput = ({ title, inputName, value }) => {
    return <div className="inputs__checkbox-input">
        <label htmlFor={inputName} className="inputs__checkbox-input__name">{title}</label>
        <input type="checkbox" name={inputName} id={inputName} />
    </div>;
}

export {
    TextInput,
    DropdownInput,
    CheckboxInput
}

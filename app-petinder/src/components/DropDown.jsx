import React from "react";
import "./components.css";

function DropDown({ id, name, label, options, value, onChange }) {
    return (
        <div className="input-container" style={{ position: "relative" }}>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="dropdown-select"
            >
                <option value="" disabled>
                    {label}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <label htmlFor={name}>{label}</label>
            <div className="dropdown-arrow"></div>
        </div>
    );
}

export default DropDown;
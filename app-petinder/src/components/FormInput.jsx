import React, { useState, useEffect } from "react";
import "./components.css";

function FormInput(props) {
    return (
        <div className="input-container">
            <input
                type={props.type}
                id={props.id}
                name={props.name}
                placeholder=" "
                required={props.required}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            <label htmlFor={props.name}>{props.label}</label>
            {props.error && <span className="error-message">{props.error}</span>}
        </div>
    );
}

export default FormInput;
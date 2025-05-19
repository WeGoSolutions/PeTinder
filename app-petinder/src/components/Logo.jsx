import React from 'react';
import "./components.css";

export default function Logo(props) {

    const { color } = props;
    const logoStyle = {
        color: color || 'black',
    };

    const { scale } = props;
    const logoScale = {
        transform: `scale(${scale})` || '1',
    };

    const { paddingBottom } = props;
    const logoPaddingBottom = {
        paddingBottom: paddingBottom || '12px',
    };

    const imageSource = props.imgSrc || "/Logo.svg";

    return (
        <div style={{ ...logoScale, ...logoPaddingBottom }} className="containerLogo">
            <img src={imageSource} alt="Logo" />
            <h1 style={logoStyle} className="titleLogo">PeTinder</h1>
        </div>
    );
}

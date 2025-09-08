import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";


function ChatHeader(props) {
    const titleTooltip = `${props.petName} • ${props.ongName}`

    return (
        <div className="chatHeader" title={titleTooltip}>
            {props.urlImage ? (
                <div className="ongLogo">
                    <img src={props.urlImage} alt="" />
                </div>
            ):(
                <div className="ongLogo">
                    <CgProfile size={50}/>
                </div>
            )}
            <div className="chatTitle">
                <div className="petName" onClick={() => props.onPendingPetClick && props.onPendingPetClick(props.petId)}>
                    <h2>{props.petName}</h2>
                </div>
                {props.petName && props.ongName && (
                    <img src="../../bolinha.svg" alt="" />
                )}
                <div className="ongName">
                    <h2>{props.ongName}</h2>
                </div>
            </div>
        </div>
    )
}
export default ChatHeader;
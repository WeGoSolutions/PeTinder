import { useEffect, useState } from "react";
import "./components.css";
import Tag from "./Tag";
import axios from "axios";

function PetInfo(props) {
    const [likes, setLikes] = useState(props.likes);
    const [isLiked, setIsLiked] = useState(props.isLiked);

    useEffect(() => {
        setLikes(props.likes);
        setIsLiked(props.isLiked);
    }, [props.likes, props.isLiked]);

    const formatPetAge = (age) => {
        if (age < 1) {
            return `${Math.round(age * 100)} Meses`;
        } else if (age >= 1 && age < 2) {
            return "1 Ano";
        } else if (age >= 2) {
            return `${Math.floor(age)} Anos`;
        }
    };

    return (
        <div className="petInfoContainer">
            <div className="petInfo">
                <div className="petTitle">
                    <div className="leftSection">
                        <h1>{props.petName}</h1>
                        <div className="likes" onClick={props.onLike}>
                            <img
                                className="like"
                                alt="like icon"
                                src={isLiked ? "../../liked.png" : "../../like.svg"}
                            />
                            <p>{likes}</p>
                        </div>
                    </div>
                    <div className="middleSection">
                        {props.isCastrado && (
                            <img src="./isCastrado.svg" alt="Castrado" title="Castrado" />
                        )}
                        {props.isVermifugo && (
                            <img src="./isVermifugo.svg" alt="Vermifugado" title="Vermifugado" />
                        )}
                        {props.isVacinado && (
                            <img src="./isVacinado.svg" alt="Vacinado" title="Vacinado" />
                        )}
                    </div>
                    <div className="rightSection">
                        <h1>{formatPetAge(props.petAge)}</h1>
                    </div>
                </div>
                <div className="petTags">
                    {props.qntdTags > 0 && props.tags.map((tag, index) => (
                        <Tag key={index} tagName={tag} color="red" />
                    ))}
                </div>
                <div className="petDesc">
                    <p>{props.petDesc}</p>
                </div>
            </div>
            <div className="ong">
                <p>ONG:</p>
                <a href={props.ongLink} target="_blank" rel="noopener noreferrer">{props.ongName}</a>
            </div>
        </div>
    );
}

export default PetInfo;
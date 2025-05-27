import React, { useEffect, useState } from "react";
import LikedCard from "./LikedCard";

function LikedArea(props) {
    const [likedPets, setLikedPets] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;
        fetch(`http://localhost:8080/status/${userId}/LIKED`)
            .then(res => res.json())
            .then(data => setLikedPets(data))
            .catch(err => console.error("Erro ao buscar pets curtidos:", err));
    }, [props.refreshKey]);

    return (
        <div className="likedArea">
            {likedPets.map((pet) => (
                <LikedCard
                    key={pet.petId}
                    id={pet.petId}
                    nomePet={pet.petNome}
                    imageSrc={pet.imageUrl}
                    imageAlt={pet.petNome}
                    onClick={props.onLikedPetClick}
                />
            ))}
        </div>
    );
}

export default LikedArea;
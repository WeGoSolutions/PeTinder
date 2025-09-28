import React, { useEffect, useState } from "react";
import LikedCard from "./LikedCard";
import reqs from "../reqs";

function LikedArea(props) {
    const [likedPets, setLikedPets] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;
        
        const fetchLikedPets = async () => {
            const result = await reqs.likedArea(userId);
            if (result.success) {
                setLikedPets(result.data);
            }
        };
        
        fetchLikedPets();
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
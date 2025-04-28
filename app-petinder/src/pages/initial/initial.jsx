import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import PetActions from "../../components/PetActions";
import PetInfo from "../../components/PetInfo";
import SideMenu from "../../components/SideMenu";
import styles from './initial.module.css';

function Initial() {

    const Navigate = useNavigate();

    const [petIndex, setPetIndex] = useState(0);
    const [pet, setPet] = useState({
        tags: [],
        images: [],
    });

    const [pets, setPets] = useState([]);

    const aumentarIndex = () => {
        setPetIndex((prevIndex) => (prevIndex + 1) % pets.length);
    };

    useEffect(() => {
        fetch("http://localhost:8080/pets")
            .then(response => response.json())
            .then(json => setPets(json))
            .catch(error => console.error("Error fetching pets:", error));
    }, []);

    useEffect(() => {
        if (pets.length > 0 && petIndex < pets.length) {
            const currentPet = pets[petIndex];
            const quantTags = currentPet.tags.length;
            setPet({
                id: currentPet.id,
                nome: currentPet.nome,
                idade: currentPet.idade,
                curtidas: currentPet.curtidas,
                isLiked: currentPet.isLiked,
                descricao: currentPet.descricao,
                tags: currentPet.tags,
                qntdTags: quantTags,
            });
        }
    }, [pets, petIndex]);

    useEffect(() => {
        if (pet.id) {
            fetch(`http://localhost:8080/pets/${pet.id}/imagens`)
                .then(response => response.json())
                .then(json => setPet(prevPet => ({
                    ...prevPet, // Mantém as propriedades existentes do estado `pet`
                    images: json // Atualiza apenas a propriedade `images`
                    
                })))
                .catch(error => console.error("Error fetching pet images:", error));
        }
    }, [pet.id]);

    return (
        <div className={styles.container}>
            <SideMenu />
            <NavBar />
            <div className="appArea">
                <PetActions
                    images={pet.images}
                    adotar={aumentarIndex}
                    passar={aumentarIndex} />
                <PetInfo
                    petId={pet.id}
                    petName={pet.nome}
                    likes={pet.curtidas}
                    petAge={pet.idade}
                    petDesc={pet.descricao}
                    ongLink="https://www.instagram.com/projetoaumigosdobem/"
                    ongName="AUmigos Do Bem"
                    qntdTags={pet.qntdTags}
                    tags={pet.tags}
                    isLiked={pet.isLiked} />
            </div>
        </div>
    )
}

export default Initial;
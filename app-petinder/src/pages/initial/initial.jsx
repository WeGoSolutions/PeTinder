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
                especie: currentPet.especie,
                idade: currentPet.idade,
                peso: currentPet.peso,
                altura: currentPet.altura,
                curtidas: currentPet.curtidas,
                isLiked: currentPet.isLiked,
                descricao: currentPet.descricao,
                tags: currentPet.tags,
                qntdTags: quantTags,
                images: currentPet.images,
            });
        }
    }, [pets, petIndex]);

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
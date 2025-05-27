import { useState } from "react";
import FirstPetEdit from "../../../components/ong/FirstPetModal";
import SecondPetEdit from "../../../components/ong/SecondPetModal";
import PetCard from "../../../components/ong/PetCard";
import { IoSearch } from "react-icons/io5";


export default function PetsContent() {
    const [isEditing, setIsEditing] = useState(false);

    const openEditModal = () => {
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setIsEditing(false);
    };

    const deletePet = (idToDelete) => {
        setPets((prevPets) => prevPets.filter((pet) => pet.id !== idToDelete));
    };

    const [pets, setPets] = useState([
        {
            id: 1,
            nome: "Francisco",
            src: "https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2025/05/16144407/cachorro-com-protetor-para-patas.jpg"
        },
        {
            id: 2,
            nome: "Robson",
            src: "https://adimax.com.br/wp-content/uploads/2022/05/cuidados-filhote-de-cachorro.jpg"
        },
        {
            id: 3,
            nome: "Albert",
            src: "https://super.abril.com.br/wp-content/uploads/2019/04/si_cachorroinstagram_home.png?crop=1&resize=1212,909",
        },
        {
            id: 4,
            nome: "Eduardo",
            src: "https://blog-static.petlove.com.br/wp-content/uploads/2020/10/Gato-ansiedade-Petlove.jpg"
        }
    ]);

    return (
        <div className="petContainer">
            <div className="petHeader">
                <IoSearch className="searchIcon" />
                <input type="text" className="searchBar" />
                <button className="addPet">Adicionar +</button>
            </div>
            {/* Se o modal estiver ativo, renderiza o fundo escuro + modal - NAO TA FUNCIONANDO DIREITO*/}
            {isEditing && (
                <>
                    <div className="modal-overlay" onClick={closeEditModal}></div>
                    <FirstPetEdit onClose={closeEditModal} />
                </>
            )}

            <SecondPetEdit/>

            <div className="pets">
                {pets.map((pet) => (
                    <PetCard
                        key={pet.id}
                        id={pet.id}
                        nome={pet.nome}
                        src={pet.src}
                        onEdit={openEditModal}
                        onDelete={() => deletePet(pet.id)}
                    />
                ))}
            </div>
        </div>
    );
}
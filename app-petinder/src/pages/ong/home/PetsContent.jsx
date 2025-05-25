import PetCard from "../../../components/ong/PetCard";

export default function PetsContent() {
    return (
        <div className="petContainer">
            <div className="petHeader">
                <input type="text" className="searchBar"/>
                <button className="addPet">Adicionar +</button>
            </div>
            <div className="pets">
                <PetCard size={180} nomePet="Francisco"/>
            </div>
        </div>
    );
}
import "./components.css";
import CarrouselPetImages from "./CarrouselPetImages";

function PetActions(props) {
    const showAdotar = props.showAdotar ?? true;

    return (
        <div className="petActionsContainer">
            <div className="actionsContainer">
                {showAdotar && (
                    <button className="left" onClick={props.adotar}>
                        <img src="../../adotar.svg" alt="" />
                        <span>Adotar</span>
                    </button>
                )}
                <button className="right" onClick={props.passar}>
                    <img src="../../proximo.svg" alt="" />
                    <span>Passar</span>
                </button>
            </div>
            <CarrouselPetImages pet={props.pet} images={props.images} />
        </div>
    );
}

export default PetActions;
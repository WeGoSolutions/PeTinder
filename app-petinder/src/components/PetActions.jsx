import "./components.css";
import CarrouselPetImages from "./CarrouselPetImages";

function PetActions(props) {
    
    return (
        <div className="petActionsContainer">
            <div className="actionsContainer">
                <button className="left" onClick={props.adotar}></button>
                <button className="right"onClick={props.passar}></button>
            </div>
            <CarrouselPetImages images={props.images}/>
        </div>
    )
}

export default PetActions;
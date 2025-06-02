import "./exceptions.css";

function NotFoundPets() {

    return (
        <div className="not-found-pets">
            <div className="notFoundImage">
                <img src="./NotFoundImage.svg" alt="" />
            </div>
            <div className="notFoundText">
                <h1>Oops!</h1>
                <p>No momento, não há pets disponíveis para adoção. Fique de olho! Nossos colaboradores estão trabalhando para adicionar novos companheiros peludos em breve.</p>
            </div>
        </div>
    )
}

export default NotFoundPets;
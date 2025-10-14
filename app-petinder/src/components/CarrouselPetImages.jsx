import React, { useState } from "react";

function CarrouselPetImages({ pet, images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const getClassName = (index) => {
        if (index === currentIndex) return "current";
        if (index === (currentIndex + 1) % images.length) return "next";
        return "hidden";
    };

    return (
        <div className="carrouselPetImages">
            <div className="imageWrapper">
                {images?.length > 0 ? (
                    images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Pet ${index}`}
                            className={`carouselImage ${getClassName(index)}`}
                        />
                    ))
                ) : (
                    <p>Carregando imagens...</p>
                )}
                {Array.isArray(images) && images.length > 1 && (
                    <>
                        <button className="navButton left" onClick={goToPrevious}></button>
                        <button className="navButton right" onClick={goToNext}></button>
                    </>
                )}
            </div>
        </div>
    );
}

export default CarrouselPetImages;
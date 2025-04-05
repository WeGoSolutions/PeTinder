import { useState } from "react";
import "./components.css";

function CarrouselPetImages({ images }) {
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

    return (
        <div className="carrouselPetImages">
            <div className="imageWrapper">
                {images.map((image, index) => {
                    const isCurrent = index === currentIndex;
                    const isNext = index === (currentIndex + 1) % images.length;

                    return (
                        <img
                            key={index}
                            src={image}
                            alt={`Pet ${index}`}
                            className={`carouselImage ${isCurrent ? "current" : ""} ${isNext ? "behind" : ""}`}
                            style={{
                                opacity: isCurrent || isNext ? 1 : 0,
                                pointerEvents: isCurrent ? "auto" : "none",
                            }}
                        />
                    );
                })}

                <button className="navButton left" onClick={goToPrevious}></button>
                <button className="navButton right" onClick={goToNext}></button>
            </div>
        </div>
    );
}

export default CarrouselPetImages;

import { useEffect, useState } from "react";
import "./components.css";
import Tag from "./Tag";
import { MdOutlineLocationOn } from "react-icons/md";



function PetInfo(props) {
    const [likes, setLikes] = useState(props.likes);
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const [distance, setDistance] = useState(null);

    async function getLatLngFromAddress(address) {
        const query = encodeURIComponent(address);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };
        }
        return null;
    }

    function haversineDistance(lat1, lon1, lat2, lon2) {
        function toRad(x) { return x * Math.PI / 180; }
        const R = 6371; // km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

   useEffect(() => {
        async function fetchDistance() {
            if (!props.endereco || !props.userEndereco) return;

            const { rua, numero, cidade, uf } = props.userEndereco || {};
            // Aborta se qualquer campo do endereço do usuário for null/undefined/vazio
            if ([rua, numero, cidade, uf].some(v => v === null || v === undefined || v === "")) {
                setDistance(null);
                return;
            }

            // Endereço da ONG
            const ongAddress = `${props.endereco.rua}, ${props.endereco.numero}, ${props.endereco.cidade}, ${props.endereco.uf}`;
            // Endereço do usuário
            const userAddress = `${rua}, ${numero}, ${cidade}, ${uf}`;

            const ongCoords = await getLatLngFromAddress(ongAddress);
            const userCoords = await getLatLngFromAddress(userAddress);

            if (ongCoords && userCoords) {
                const dist = haversineDistance(
                    userCoords.lat, userCoords.lon,
                    ongCoords.lat, ongCoords.lon
                );
                setDistance(dist.toFixed(2));
            }
        }
        fetchDistance();
    }, [props.endereco, props.userEndereco]);

    useEffect(() => {
        setLikes(props.likes);
        setIsLiked(props.isLiked);
    }, [props.likes, props.isLiked]);

    const formatPetAge = (age) => {
        if (age < 1) {
            return `${Math.round(age * 100)} Meses`;
        } else if (age >= 1 && age < 2) {
            return "1 Ano";
        } else if (age >= 2) {
            return `${Math.floor(age)} Anos`;
        }
    };

    function formatDistance(distance) {
        if (!distance) return "";
        const distNum = Number(distance);
        if (distNum < 1) {
            // Menos de 1km, mostra em metros
            return `A ${(distNum * 1000).toFixed(0)} metros de distância`;
        }
        return `A ${distNum.toFixed(2)} km de distância`;
    }

    return (
        <div className="petInfoContainer">
            <div className="petInfo">
                <div className="petTitle">
                    <div className="leftSection">
                        <h1 title={props.petName}>{props.petName}</h1>
                        <div className="likes" onClick={props.onLike}>
                            <img
                                className="like"
                                alt="like icon"
                                src={isLiked ? "../../liked.png" : "../../like.svg"}
                            />
                            <p>{likes}</p>
                        </div>
                    </div>
                    <div className="middleSection">
                        {props.isCastrado && (
                            <img src="./isCastrado.svg" alt="Castrado" title="Castrado" />
                        )}
                        {props.isVermifugo && (
                            <img src="./isVermifugo.svg" alt="Vermifugado" title="Vermifugado" />
                        )}
                        {props.isVacinado && (
                            <img src="./isVacinado.svg" alt="Vacinado" title="Vacinado" />
                        )}
                    </div>
                    <div className="rightSection">
                        <h1>{formatPetAge(props.petAge)}</h1>
                    </div>
                </div>
                <div className="petTags">
                    {props.qntdTags > 0 && props.tags.map((tag, index) => (
                        <Tag key={index} tagName={tag} color="red" />
                    ))}
                </div>
                <div className="petDesc">
                    <p>{props.petDesc}</p>
                </div>
            </div>
            <div className="footerPetInfo">
                {props.userEndereco && (
                    <div className="locali">
                        <MdOutlineLocationOn size={20} />
                        <p>{formatDistance(distance)}</p>
                    </div>
                )}
                <div className="ong">
                    <p>ONG:</p>
                    <a href={props.ongLink} target="_blank" rel="noopener noreferrer">{props.ongName}</a>
                </div>
            </div>
        </div>
    );
}

export default PetInfo;
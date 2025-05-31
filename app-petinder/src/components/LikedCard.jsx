function LikedCard(props) {
    return (
        <div className="likedContainer" onClick={() => props.onClick && props.onClick(props.id)}>
            <div className="likedCard">
                <img src={props.imageSrc} alt={props.imageAlt} />
            </div>
            <div className="likedName">
                <h3 title={props.nomePet}>{props.nomePet}</h3>
            </div>
        </div>
    )
}
export default LikedCard;
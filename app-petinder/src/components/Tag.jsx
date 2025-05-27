import "./components.css";

function Tag(props) {
    const colorClass = `tag-${props.color}`; // Define a classe com base na cor passada como prop

    return (
        <div className={`containerTag ${colorClass}`} >
            <p>{props.tagName}</p>
        </div>
    );
}

export default Tag;
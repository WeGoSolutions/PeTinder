import "./components.css";

export default function GenericModal(props) {
    if (!props.isOpen) return null;

    const modalStyle = {
        width: props.width || "647px",
        height: props.height || "550px" 
    };

    return (
        <div className="defaultModal">
            <div style={modalStyle} className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="closeButtonModal" onClick={props.onClose}>
                    <img src="/left.png" />
                    <span>Voltar</span>
                </div>

                <div className="modalContent">
                    <div className="titleModal">{props.title}</div>
                    <div className="text" dangerouslySetInnerHTML={{ __html: props.text }}/>
                    <div>{props.children && (
                        <div className="extraContent">{props.children}</div>
                    )}</div>
                </div>
            </div>
        </div>
    );
}
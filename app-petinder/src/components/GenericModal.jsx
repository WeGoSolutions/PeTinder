import "./components.css";

export default function GenericModal(props) {
    if (!props.isOpen) return null;

    const modalStyle = {
        width: props.width || "647px",
        height: props.height || "550px"
    };

    let steps = null;
    if (props.hasSteps) {
        steps = [];
        for (let i = 1; i <= (props.totalSteps || 1); i++) {
            steps.push(
                <div
                    key={i}
                    className={`step${props.step === i ? " on" : ""}`}
                ></div>
            );
        }
    }

    return (
        <div className="defaultModal">
            <div style={modalStyle} className="modal" onClick={(e) => e.stopPropagation()}>
                {!props.hideCloseButton && (
                    <div className="closeButtonModal" onClick={props.onClick ? props.onClick : props.onClose}>
                        <img src="/left.png" />
                        <span>Voltar</span>
                    </div>
                )}

                <div className="modalContent">
                    {props.hasSteps && (
                        <div className="modalSteps">
                            {steps}
                        </div>
                    )}
                    <div className="titleModal">{props.title}</div>
                    <div className="text" dangerouslySetInnerHTML={{ __html: props.text }} />
                    {props.children}
                </div>
            </div>
        </div>
    );
}
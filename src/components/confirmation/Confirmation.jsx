import "./Confirmation.css";

function Confirmation({isOpen, title, message, onConfirm, onClose}) {
    if (!isOpen) return null;

    return (
        <div className="confirmation">
            <div className="confirmation-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="extra-check">
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default Confirmation;
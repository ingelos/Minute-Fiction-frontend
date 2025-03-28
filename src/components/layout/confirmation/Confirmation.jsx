import "./Confirmation.css";
import Button from "../../common/button/Button.jsx";

function Confirmation({isOpen, title, message, onConfirm, onClose}) {
    if (!isOpen) return null;

    return (
        <div className="confirmation-container">
                    <h3>{title}</h3>
                    <p>{message}</p>
                <div className="extra-check-buttons">
                    <Button buttonText="Confirm"
                            buttonType="button"
                            onClick={onConfirm}
                            className="check-button"
                    />
                    <Button buttonText="Cancel"
                            buttonType="button"
                            onClick={onClose}
                            className="check-button"
                    />
                </div>
        </div>
    )
}

export default Confirmation;
function DeletionConfirmation({isOpen, title, message, onConfirm, onClose}) {
    if (!isOpen) return null;

    return (
        <div className="confirmation">
            <div className="confirmation-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}

export default DeletionConfirmation;
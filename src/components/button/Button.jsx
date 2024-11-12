import "./Button.css";

function Button({ buttonType, onClick, className, buttonText, disabled= false }) {
    return (
        <button
            type={buttonType}
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            <h3>{buttonText}</h3>
        </button>
    )
}

export default Button;
import "./Button.css";

function Button({ buttonType, onClick, className, buttonText }) {
    return (
        <button
            type={buttonType}
            className={className}
            onClick={onClick}
        >
            <h3>{buttonText}</h3>
        </button>
    )
}

export default Button;
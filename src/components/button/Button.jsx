
function Button({ buttonType, className, buttonText }) {
    return (
        <button
            type={buttonType}
            className={className}
        >
            <h3>{buttonText}</h3>
        </button>
    )
}

export default Button;
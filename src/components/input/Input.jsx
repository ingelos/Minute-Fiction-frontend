import './Input.css';

function Input({labelInput, labelText, type, inputName, validationRules, register, errors}) {
    return (
        <>
            <label htmlFor={labelInput}>{labelText}
                <input
                    type={type}
                    id={labelInput}
                    {...register(inputName, validationRules)}
                />
            </label>
            {errors[inputName] && <p id="input-error-message">{errors[inputName].message}</p>}
        </>
    )
}

export default Input;
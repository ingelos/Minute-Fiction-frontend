import './Input.css';

function Input({inputId, inputLabel, inputType, inputName, validationRules, rows, min, max, register, errors}) {
    return (
        <>
            <label htmlFor={inputId}>{inputLabel}
                {inputType === 'textarea' ? (
                    <textarea
                        id={inputId}
                        name={inputName}
                        {...register(inputName, validationRules)}
                        rows={rows}
                        />
                ) : (
                    <input
                        id={inputId}
                        type={inputType}
                        {...register(inputName, validationRules)}
                        min={min}
                        max={max}
                    />
                )}

            </label>
            {errors[inputName] && <p id="input-error-message">{errors[inputName].message}</p>}
        </>
    )
}

export default Input;
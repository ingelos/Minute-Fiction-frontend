import Input from "../input/Input.jsx";
import {useForm} from "react-hook-form";
import Button from "../button/Button.jsx";

function RegisterForm({onSubmit, error}) {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            subscribedToMailing: false,
        }
    });

    async function handleRegistration(data) {
        onSubmit(data);
    }

    return (
        <form className='register-form' onSubmit={handleSubmit(handleRegistration)}>
            {error && <p>{error.message}</p>}
            <h4>Username is unchangeable after creating. Choose with care.</h4>
            <Input
                inputType='text'
                inputName='username'
                labelInput='register-username-field'
                inputLabel='Username: *'
                validationRules={{
                    required: 'Username is required',
                    minLength: {
                        value: 5,
                        message: 'Please enter a username that is at least 5 characters long'
                    },
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='password'
                inputName='password'
                inputId='register-password-field'
                inputLabel='Password: *'
                validationRules={{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'A password requires a minimum of 8 characters'
                    }
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='email'
                inputName='email'
                inputId='register-email-field'
                inputLabel='Email: *'
                validationRules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                    }
                }}
                register={register}
                errors={errors}
            />
            <p>* required</p>
            <div className='checkbox-container'>
                <Input
                    inputType="checkbox"
                    inputName="subscribedToMailing"
                    inputId="mailing-subscription-field"
                    validationRules={{
                        required: false,
                    }}
                    register={register}
                    errors={errors}
                />
                <label htmlFor="mailing-subscription-field">I want to receive the mailing</label>
            </div>
            <Button
                buttonType='submit'
                className='register-button'
                buttonText='Create Account'
               />
            {error && <p className="error-message">Something went wrong. Please try again.</p>}
        </form>
    )
}

export default RegisterForm;
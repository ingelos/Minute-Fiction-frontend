import Input from "../../common/input/Input.jsx";
import Button from "../../common/button/Button.jsx";
import {useForm} from "react-hook-form";

function LoginForm({ onSubmit }) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleLogin(data) {
        onSubmit(data);
    }

    return (
        <form className='login-form' onSubmit={handleSubmit(handleLogin)}>
            <Input
                inputType='text'
                inputName='username'
                inputId='username-field'
                inputLabel='Username:'
                validationRules={{
                    required: 'Username is required'
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='password'
                inputName='password'
                inputId='password-field'
                inputLabel='Password:'
                validationRules={{
                    required: 'Password is required',
                }
                }
                register={register}
                errors={errors}
            />
            <Button
                buttonType='submit'
                className='login-button'
                buttonText='Login'
            />
        </form>
    )
}

export default LoginForm;
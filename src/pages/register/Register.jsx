import "./Register.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input.jsx";
import {useState} from "react";
import axios from "axios";

function Register() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState(false);

    async function handleFormSubmit(data) {
        setError(false);

        try {
            const response = await axios.post('http://localhost:8080/register', {
                username: data.username,
                password: data.password,
            });
            console.log(response);
        } catch (error) {
            console.error(error.message);
            setError(true);
        }
    }

    return (
        <section className='register-section outer-content-container'>
            <div className='register-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className='register-title'>Create account</h2>
                        <form className='register-form' onSubmit={handleSubmit(handleFormSubmit)}>
                            {error &&
                                <p className='error-message-register'>Authentication failed: This username is
                                    already in use</p>}
                            <Input
                                type='text'
                                inputName='username'
                                labelInput='username-field'
                                labelText='Username: *'
                                validationRules={{
                                    required: 'Username is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Please enter a username that is at least 3 characters long'
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />
                            <Input
                                type='password'
                                inputName='password'
                                labelInput='password-field'
                                labelText='Password: *'
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
                            <p>* required</p>
                            <button
                                type='submit'
                                className='register-button'
                            >
                                Create account
                            </button>
                        </form>

                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default Register;
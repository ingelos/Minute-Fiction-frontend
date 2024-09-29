import "./Register.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const controller = new AbortController();


    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    })

    async function handleFormSubmit(formData) {
        setError(false);

        try {
            const {data} = await axios.post('http://localhost:8080/register', {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                subscription: formData.subscription,
                signal: controller.signal,
            });
            console.log(data);
            navigate("/authenticate");
        } catch (error) {
            if(error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message || 'Username already in use';
                console.error('Authentication failed:', errorMessage);
                setError(true);
            } else {
                console.error('Error: ', error.message);
                setError(true);
            }
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
                                labelInput='register-username-field'
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
                                labelInput='register-password-field'
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
                            <Input
                                type='email'
                                inputName='email'
                                labelInput='register-email-field'
                                labelText='Email: *'
                                validationRules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Please enter a valid email address',
                                    }
                                }}
                                register={register}
                                errors={errors}
                            />
                            <p>* required</p>
                            <div className='checkbox-container'>
                                <input type="checkbox" id="subscription" name="mailing"/>
                            <label htmlFor="mailing">I want to receive the mailing</label>
                            </div>
                            <button
                                type='submit'
                                className='register-button'
                            >
                                Create account
                            </button>
                            {error && <p className="error-message">Something went wrong. Please try again.</p>}
                        </form>

                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default Register;
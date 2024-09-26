import './AsideMenu.css'
import {Link, useNavigate} from "react-router-dom";
import ThemesMenu from "../themesMenu/ThemesMenu.jsx";
import Input from "../input/Input.jsx";
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import axios from "axios";



function AsideMenu() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState(false);
    // const { login } = useContext(AuthContext);
    const controller = new AbortController();


    // useEffect(() => {
    //     return function cleanup() {
    //         controller.abort();
    //     }
    // })

    async function handleFormSubmit(data) {
        setError(false);

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: data.username,
                password: data.password,
                // signal: controller.signal,
            });
            console.log(response.data);
            // login(response.data.accessToken);

        } catch (error) {
            console.error(error.message);
            setError(true);
        }
    }


    return (
        <aside className="aside-menu">
            <div className="login aside-card">
                <h3 className="aside-title">Login</h3>
                <form className="login-form" onSubmit={handleSubmit(handleFormSubmit)}>
                    <Input
                        type='text'
                        inputName='username'
                        labelInput='username-field'
                        labelText='Username:'
                        validationRules={{
                            required: 'Username is required'
                        }}
                        register={register}
                        errors={errors}
                    />
                    <Input
                        type='password'
                        inputName='password'
                        labelInput='password-field'
                        labelText='Password:'
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
                    <button
                        type='submit'
                        className='login-button'
                    >
                        Login
                    </button>
                    {error && <p className="error-message">Something went wrong while trying to log in. Please try again.</p>}
                </form>
            </div>
            <div className="register aside-card">
                <h3 className="aside-title">Register</h3>
                <div className="register-menu">
                    <h4>New here?</h4>
                    <p>Want to submit your own stories and/or comment on others stories?</p>
                    <p className='link-to-register'><Link to='/register'>Create account</Link></p>
                </div>
            </div>
            <div className="aside-nav aside-card">
                <h3 className="aside-title">Themes</h3>
                <ThemesMenu
                    themeNavId="theme-aside-nav"
                />
            </div>
        </aside>
    )
}

export default AsideMenu;
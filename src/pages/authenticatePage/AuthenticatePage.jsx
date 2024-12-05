import "./AuthenticatePage.css";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import Input from "../../components/input/Input.jsx";
import Button from "../../components/button/Button.jsx";
import AuthContext from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";

function AuthenticatePage() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login, user} = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(null);


    async function handleLogin(formData) {
        setError(false);

        try {
            const response = await axios.post(`http://localhost:8080/authenticate`, {
                username: formData.username,
                password: formData.password,
            });
            console.log(response.data);
            const {jwt} = response.data;
            console.log("received token:", jwt);
            await login(jwt);
            setLoginSuccess(true);
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response) {
                if (error.response.status === 401) {
                    console.error('Authentication failed: Invalid username or password', error);
                    setErrorMessage('Authentication failed: Invalid username or password');
                } else {
                    console.error('Error:', error.response.data.message);
                }
            } else if (error.request) {
                console.error('Network error or server is down', error.message);
            } else {
                console.error('Error:', error.message);
            }
        }
    }


    return (
        <section className='authenticate-section outer-content-container'>
            <div className='authenticate-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        {!loginSuccess ? (
                            <>
                                {error && <p>{error}</p>}
                                <h2 className='login-title titles'>Login</h2>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                                    {error && <p>{error.message}</p>}
                                    <Button
                                        buttonType='submit'
                                        className='login-button'
                                        buttonText='Login'
                                    />
                                </form>
                            </>
                        ) : (
                            <div>
                                <h3 className='login-title titles'>Successfully logged in!</h3>
                                <Link to={`/user/${user.username}`} className='link-button-style'>My account</Link>
                                <EditorCheck editorOnly={true}>
                                    <Link to={"/editor/dashboard"} className="link-button-style dashboard-link">Editor Dashboard</Link>
                                </EditorCheck>
                            </div>
                        )}

                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default AuthenticatePage;
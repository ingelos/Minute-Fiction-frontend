import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import Input from "../../components/input/Input.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function AuthenticatePage() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [loginSucces, setLoginSucces] = useState(null);
    // const controller = new AbortController();

    // useEffect(() => {
    //     return function cleanup() {
    //         controller.abort();
    //     }
    // });

    async function handleLogin(formData) {
        setError(false);

        try {
            const response = await axios.post(`http://localhost:8080/authenticate`, {
                username: formData.username,
                password: formData.password,
            });
            console.log(response.data.accessToken);
            login(response.data.accessToken);
            setLoginSucces(true);

        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Authentication failed: Invalid username or password');
                setError(true);
            } else {
                console.error('Error:', error.response || error.message || error);
                setError(true);
            }
        }
    }


    return (
        <section className='authenticate-section outer-content-container'>
            <div className='authenticate-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className='login-title titles'>Login</h2>
                        {error && <p>{error.message}</p>}
                        {!loginSucces ? (
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
                            ) : (
                                <div className='succes-container'>
                                    <h2>Welcome back!</h2>
                                    <p><Link to={`/authorprofiles/:authorId`}><strong>My Author profile</strong></Link></p>
                                </div>
                          )}
                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default AuthenticatePage;
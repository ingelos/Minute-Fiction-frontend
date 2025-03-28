import "./Authenticate.css";
import AsideMenu from "../../components/layout/asideMenu/AsideMenu.jsx";
import axios from "axios";
import {useContext, useState} from "react";
import AuthContext from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";
import LoginForm from "../../components/forms/loginForm/LoginForm.jsx";

function Authenticate() {

    const {login, user} = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(null);

    async function handleLogin(formData) {
        setError(null);

        try {
            const response = await axios.post(`http://localhost:8080/authenticate`, {
                username: formData.username,
                password: formData.password,
            });
            const {jwt} = response.data;
            await login(jwt);
            setLoginSuccess(true);

        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response) {
                const {status, data} = error.response;
                switch (status) {
                    case 401:
                        console.error('Authentication failed: Invalid username or password');
                        setErrorMessage('Authentication failed: Invalid username or password');
                        break;
                    case 404:
                        console.error('No user found with this username');
                        setErrorMessage(data || 'No user found');
                        break;
                    default:
                        console.error('Unexpected error:', data?.message || 'An unknown error occurred.');
                        setErrorMessage('An error occurred. Please try again.')
                }
            } else {
                console.error('Unknown error:', error.message);
                setErrorMessage('An unknown error occurred. Please try again');
            }
        }
    }


    return (
        <section className='authenticate-section outer-content-container'>
            <div className='authenticate-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        {!loginSuccess ? (
                            <div>
                                <h2 className='login-title titles'>Login</h2>
                                {error && <p>{error}</p>}
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <LoginForm onSubmit={handleLogin}/>
                            </div>
                        ) : (
                            <div className='login-success'>
                                <p className='success-message'>Successfully logged in!</p>
                                <Link to={`/users/${user.username}`} className='link-button-style'>My account</Link>
                                <EditorCheck editorOnly={true}>
                                    <Link to={"/editor/dashboard"} className="link-button-style dashboard-link">Editor
                                        Dashboard</Link>
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

export default Authenticate;
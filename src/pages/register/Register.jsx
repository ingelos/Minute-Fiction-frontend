import "./Register.css"
import AsideMenu from "../../components/layout/asideMenu/AsideMenu.jsx";
import axios from "axios";
import RegisterForm from "../../components/forms/registerForm/RegisterForm.jsx";
import {Link} from "react-router-dom";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";
import {useState} from "react";
import {FaLongArrowAltRight} from "react-icons/fa";

function Register() {
    const [registerSuccess, setRegisterSuccess] = useState(null);
    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);

    async function handleRegistration(formData) {
        setError(null);

        try {
            const {data} = await axios.post('http://localhost:8080/users', {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                subscribedToMailing: formData.subscribedToMailing,
            });
            setUsername(data.username);
            setRegisterSuccess(true);

        } catch (error) {
            if (error.response && (error.response.status === 400 || error.response.status === 409)) {
                const errorMessage = error.response.data.message || 'Username already in use! Choose a different one.';
                setError(errorMessage);
                console.error('Registration failed:', errorMessage);
            } else {
                setError('An unexpected error occurred. Please try again.: ');
            }
        }
    }


    return (
        <section className='register-section outer-content-container'>
            <div className='register-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        {!registerSuccess ? (
                            <div>
                                <h2 className='register-title titles'>Create account</h2>
                                <ul>Create an account on Minute Fiction to:
                                    <li id="account-list">receive the monthly mailing</li>
                                    <li id="account-list">leave comments on stories</li>
                                    <li id="account-list">create an author profile and submit your own stories</li>
                                </ul>
                                <RegisterForm onSubmit={handleRegistration}/>
                                {error && <p className="error-message">{error}</p>}
                            </div>
                        ) : (
                            <div>
                                <h3 className='register-title titles'>Successfully registered!</h3>
                                <h3 className='link-button-style'><Link to={"/authenticate"}>Log in</Link></h3>
                                <EditorCheck editorOnly={true}>
                                    <div className="back-link">
                                        <FaLongArrowAltRight className="arrow-icon"/>
                                        <h3 className="authorities-link"><Link
                                            to={`/editor/users/${username}/authorities`}>Manage Authorities</Link></h3>
                                    </div>
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

export default Register;
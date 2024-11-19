import "./RegisterPage.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import axios from "axios";
import RegisterForm from "../../components/registerForm/RegisterForm.jsx";
import {Link} from "react-router-dom";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import {useState} from "react";
import {FaLongArrowAltRight} from "react-icons/fa";

function RegisterPage() {
    const [registerSuccess, setRegisterSuccess] = useState(null);
    const [username, setUsername] = useState(null);

    async function handleRegistration(formData) {
        try {
            const {data} = await axios.post('http://localhost:8080/users', {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                subscribedToMailing: formData.subscribedToMailing,
            });
            console.log("Registration data:", data);
            setUsername(data.username);
            setRegisterSuccess(true);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message || 'Username already in use';
                console.error('Registration failed:', errorMessage);
            } else {
                console.error('Error: ', error.message);
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
                                <p>Subscribe to the Minute Fiction newsletter by creating an account.</p>
                                <p>With an account you can leave comments and submit your own stories by creating an
                                    author profile!</p>
                                <RegisterForm onSubmit={handleRegistration}/>
                            </div>
                        ) : (
                            <div>
                                <h3 className='register-title titles'>Successfully registered!</h3>
                                <h3 className='link-button-style'><Link to={"/authenticate"}>Log in</Link></h3>
                                <EditorCheck register={true}>
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

export default RegisterPage;
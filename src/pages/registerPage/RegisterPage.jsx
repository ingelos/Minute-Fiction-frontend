import "./RegisterPage.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import axios from "axios";
import RegisterForm from "../../components/registerForm/RegisterForm.jsx";
import {Link} from "react-router-dom";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import {useState} from "react";

function RegisterPage() {
    const [registerSuccess, setRegisterSuccess] = useState(null);
    const [username, setUsername] = useState(null);

    async function handleRegistration(formData) {
        try {
            const {data} = await axios.post('http://localhost:8080/users', {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                subscription: formData.subscription,
            });
            console.log(data);
            setUsername(data.username);
            setRegisterSuccess(true);
        } catch (error) {
            if(error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message || 'Username already in use';
                console.error('Authentication failed:', errorMessage);
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
                        <h2 className='register-title titles'>Create account</h2>
                        <p>Subscribe to the Minute Fiction newsletter by creating an account.</p>
                        <p>With an account you can leave comments and submit your own stories by creating an author profile!</p>
                        {!registerSuccess ? (
                            <RegisterForm onSubmit={handleRegistration}/>
                        ) : (
                            <div>
                                <p>Successfully registered!</p>
                                <h3><Link to={"/authenticatePage"}>Log in</Link></h3>
                                <EditorCheck>
                                    <Link to={`/editor/users/${username}/authorities`}>Manage Authorities</Link>
                                </EditorCheck>
                            </div>
                        )}
                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default RegisterPage;
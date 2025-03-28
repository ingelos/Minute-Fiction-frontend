import "./AccountSettings.css";
import {useContext, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {FaLongArrowAltLeft, FaLongArrowAltRight} from "react-icons/fa";
import AuthContext from "../../context/AuthContext.jsx";
import OwnerCheck from "../../helpers/userChecks/OwnerCheck.jsx";
import PasswordForm from "../../components/forms/passwordForm/PasswordForm.jsx";
import EmailForm from "../../components/forms/emailForm/EmailForm.jsx";


function AccountSettings() {

    const {user} = useContext(AuthContext);
    const {username} = useParams();
    const [error, setError] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const token = localStorage.getItem('token');

    async function editEmail(formData) {
        setError(false);
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.patch(`http://localhost:8080/users/${user.username}/email`, {
                email: formData.email,
                currentPassword: formData.currentPassword,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setSubmitSuccess(true);
            console.log(`Account details successfully updated`, data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("Invalid password");
            }
            console.error(error);
            setError(true);
        }
    }

    async function editPassword(formData) {
        try {
            const {data} = await axios.patch(`http://localhost:8080/users/${user.username}/password`, {
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Password successfully updated', data);
            setUpdateSuccess(true);
        } catch (error) {
            console.error('Error updating password', error);
            setError(true);
        }
    }


    return (
        <section className='account-settings-page outer-content-container'>
            <div className='account-settings-page inner-content-container'>
                <div className='main-container'>
                    <div className='featured-section'>
                        <OwnerCheck username={username}>
                            <h2 className='account-settings-page-title titles'>Account Settings</h2>
                            <div className="back-link">
                                <FaLongArrowAltLeft className="arrow-icon"/>
                                <Link to={`/users/${username}`}>Back to account</Link>
                            </div>
                            <div className="edit-containers">
                                <div className="edit-email-container">
                                    {!submitSuccess ?
                                        <div>
                                            <h3>Edit Email</h3>
                                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                                            <EmailForm onSubmit={editEmail}/>
                                        </div>
                                        :
                                        <p className='success-message'>You have successfully updated your email!</p>
                                    }
                                </div>
                                <div className="edit-email-container">
                                    {!updateSuccess ?
                                        <div>
                                            <h3>Edit Password</h3>
                                            {error && <p className="error-message">{error.message}</p>}
                                            <PasswordForm onSubmit={editPassword}/>
                                        </div>
                                        :
                                        <p className="success-message">You have successfully updated your password!</p>
                                    }
                                </div>
                            </div>
                            <div className="edit-links">
                                <Link to={`/users/${username}/delete`}>
                                    Delete Your Account <FaLongArrowAltRight className="arrow-icon"/>
                                </Link>
                            </div>
                        </OwnerCheck>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccountSettings;
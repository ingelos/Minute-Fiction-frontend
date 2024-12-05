import "./DeleteAccountPage.css";
import axios from "axios";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import OwnerCheck from "../../helpers/ownerCheck/OwnerCheck.jsx";
import {FaLongArrowAltLeft} from "react-icons/fa";
import Button from "../../components/button/Button.jsx";


function DeleteAccountPage() {
    const [error, setError] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const {user, logout} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    async function handleDeleteAccount() {
        try {
            await axios.delete(`http://localhost:8080/users/${user.username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Account deleted.');
            setDeleteSuccess(true);
            logout();
        } catch (error) {
            console.error('Error deleting this account', error);
            setError(true);
        }
    }

    return (
        <section className='edit-password-page outer-content-container'>
            <div className='edit-password-page inner-content-container'>
                <div className='main-container'>
                    <div className='featured-section'>
                        <OwnerCheck username={user.username}>
                            {error && <p>{error.message}</p>}
                            <h2 className='delete-title titles'>Delete account</h2>
                            {!deleteSuccess ? (
                                <>
                                    <div className='back-link'>
                                        <FaLongArrowAltLeft className="arrow-icon"/>
                                        <Link to={`/user/${user.username}`}>Back to Account</Link>
                                    </div>
                                    <p>Keep in mind, deleting your account is permanent and cannot be reversed.</p>
                                    <p>If you have an author profile you need to delete this first.</p>
                                    <p>If you have submitted/published stories you need to delete these before deleting your author profile.</p>
                                    <div className="delete-section">
                                        <Button onClick={() => setModalOpen(true)}
                                                className="delete-account-button"
                                                buttonText="Delete My Account"
                                                buttonType="button"
                                        />
                                        <Confirmation
                                            isOpen={isModalOpen}
                                            onClose={() => setModalOpen(false)}
                                            onConfirm={handleDeleteAccount}
                                            title="Confirm Deletion"
                                            message="Are you sure you want to delete your account? Deletion cannot be undone."
                                        />
                                    </div>
                                </>
                            ) : (
                                <h4 className="success-message">Successfully Deleted Account!</h4>
                            )}
                        </OwnerCheck>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DeleteAccountPage;
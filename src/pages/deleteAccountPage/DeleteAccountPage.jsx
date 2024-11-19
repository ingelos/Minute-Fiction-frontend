import axios from "axios";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import {useContext, useState} from "react";
import {AuthContextProvider} from "../../context/AuthContextProvider.jsx";
import {Link} from "react-router-dom";


function DeleteAccountPage() {
    const [error, setError] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const {user} = useContext(AuthContextProvider);

    async function handleDeleteAccount() {
        try {
            await axios.delete(`http://localhost:8080/users/${user.username}`);
            console.log('Account deleted.');
            setDeleteSuccess(true);
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
                    {error && <p>{error.message}</p>}
                    <h2 className='delete-title titles'>Delete account</h2>
                        <h4>Keep in mind, deleting your account is permanent and cannot be reversed. </h4>
                        <h5>If you have an author profile and published/submitted stories delete these first.</h5>
                        <h4 className='back-link'><Link to={`/user/${user.username}`}>Go back to Account</Link></h4>
                    {!deleteSuccess ? (
                        <div>
                            <button onClick={() => setModalOpen(true)} className="delete-account-button">
                                Delete My Account
                            </button>
                            <Confirmation
                                isOpen={isModalOpen}
                                onClose={() => setModalOpen(false)}
                                onConfirm={handleDeleteAccount}
                                title="Confirm Account Deletion"
                                message="Are you sure you want to delete your account? Deletion cannot be undone."
                            />
                        </div>
                    ) : (
                    <p>Successfully Deleted Account!</p>
                    )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DeleteAccountPage;
import axios from "axios";
import DeletionConfirmation from "../../components/deletionConfirmation/DeletionConfirmation.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";


function DeleteAccount() {
    const [error, setError] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const {user} = useContext(AuthContext);

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
        <section className='edit-password-page outer-container'>
            <div className='edit-password-page inner-container'>
                <div className='account-settings-inner-content-container'>
                    {error && <p>Something went wrong... try to reload the page.</p>}
                    <h2>Delete account</h2>
                    {!deleteSuccess ? (
                        <div>
                            <button onClick={() => setModalOpen(true)} className="delete-account-button">
                                Delete Your Account
                            </button>
                            <DeletionConfirmation
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
        </section>
    )
}

export default DeleteAccount;
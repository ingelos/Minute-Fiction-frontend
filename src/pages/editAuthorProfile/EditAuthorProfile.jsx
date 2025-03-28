import "./EditAuthorProfile.css";
import {useContext, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import AuthorProfileForm from "../../components/forms/authorProfileForm/AuthorProfileForm.jsx";
import AsideMenu from "../../components/layout/asideMenu/AsideMenu.jsx";
import useAuthorProfile from "../../hooks/useAuthorProfile/UseAuthorProfile.jsx";
import OwnerCheck from "../../helpers/userChecks/OwnerCheck.jsx";
import {FaLongArrowAltLeft} from "react-icons/fa";
import AuthContext from "../../context/AuthContext.jsx";
import Button from "../../components/common/button/Button.jsx";
import Confirmation from "../../components/layout/confirmation/Confirmation.jsx";


function EditAuthorProfile() {
    const {user} = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const {username} = useParams();
    const {authorProfile, loading} = useAuthorProfile(username);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token');


    async function handleUpdatingProfile(updatedData) {
        setError(false);

        try {
            const {data} = await axios.put(`http://localhost:8080/authorprofiles/${user.username}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log('Form data:', data);
            setUpdateSuccess(true);
        } catch (error) {
            console.error('Error updating author profile:', error);
        }
    }


    async function handleDeleteAuthorProfile() {
        try {
            await axios.delete(`http://localhost:8080/authorprofiles/${user.username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Author profile deleted.');
            setDeleteSuccess(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data);
                console.log(error.response.data);
            } else {
                console.error('Error deleting this account', error);
                setError(true);
            }

        }
    }

    return (
        <section className='author-profile-section outer-content-container'>
            <div className='author-profile-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <OwnerCheck username={username}>
                            <div className='authorprofile-container'>
                                <h2 className="mailings-title titles">Edit Author Profile</h2>


                                {!updateSuccess && !deleteSuccess ? (
                                    <div>
                                        <div className="back-link">
                                            <FaLongArrowAltLeft className="arrow-icon"/>
                                            <Link to={`/authors/${username}`}>Back to Author Profile</Link>
                                        </div>
                                        {loading && <p>Loading profile...</p>}
                                        {authorProfile && (
                                            <AuthorProfileForm onSubmit={handleUpdatingProfile}
                                                               initialData={authorProfile}
                                                               isEditing={true}/>
                                        )}
                                        {error && <p className="error-message">{error.message}</p>}
                                    </div>
                                ) : !deleteSuccess && (
                                    <div>
                                        <div className="back-link">
                                            <FaLongArrowAltLeft className="arrow-icon"/>
                                            <Link to={`/authors/${username}`}>Back to Author Profile</Link>
                                        </div>
                                        <p>Successfully Updated Profile!</p>
                                    </div>
                                        )}
                                    </div>

                                {!deleteSuccess ? (
                                    <div className='delete-section-profile'>
                                    <p>Keep in mind, deleting your profile is permanent and cannot be reversed.</p>
                                    <p>If you have submitted/published stories you need to delete these before deleting
                                        your author profile.</p>
                                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                                    <div className="delete-section">
                                        <Button onClick={() => setModalOpen(true)}
                                                className="delete-account-button"
                                                buttonText="Delete My Author profile"
                                                buttonType="button"
                                        />
                                        <Confirmation
                                            isOpen={isModalOpen}
                                            onClose={() => setModalOpen(false)}
                                            onConfirm={handleDeleteAuthorProfile}
                                            title="Confirm Deletion"
                                            message="Are you sure you want to delete your author profile? Deletion cannot be undone."
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="back-link">
                                        <FaLongArrowAltLeft className="arrow-icon"/>
                                        <Link to={`/users/${username}`}>Back to Account</Link>
                                    </div>
                                    <p className="success-message">Successfully Deleted Author Profile!</p>
                                </div>
                            )}
                        </OwnerCheck>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditAuthorProfile;
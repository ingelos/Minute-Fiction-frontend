import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import AuthorProfileForm from "../../components/authorProfileForm/AuthorProfileForm.jsx";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import useAuthorProfile from "../../components/useAuthorProfile/UseAuthorProfile.jsx";
import OwnerCheck from "../../components/ownerCheck/OwnerCheck.jsx";
import {FaLongArrowAltRight} from "react-icons/fa";


function EditAuthorProfilePage() {
    const [error, setError] = useState(null);
    const {username} = useParams();
    const {authorProfile, loading} = useAuthorProfile(username);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    async function handleUpdatingProfile(updatedData) {
        const token = localStorage.getItem('token');
        setError(false);

        try {
            const {data} = await axios.put(`http://localhost:8080/authorprofiles/${username}`, updatedData, {
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

    return (
        <section className='author-profile-section outer-content-container'>
            <div className='author-profile-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className='authorprofile-contianer'>
                            <h2 className="mailings-title titles">Edit Author Profile</h2>
                            <div className="back-link">
                                <FaLongArrowAltRight className="arrow-icon"/>
                                <Link to={`/authors/${username}`}>Back to Author Profile</Link>
                            </div>
                            <OwnerCheck username={username}>
                                {!updateSuccess ? (
                                    <div>
                                        {error && <p>{error.message}</p>}
                                        {loading && <p>Loading mailing...</p>}
                                        {authorProfile && (
                                            <AuthorProfileForm onSubmit={handleUpdatingProfile}
                                                               initialData={authorProfile}
                                                               isEditing={true}/>
                                        )}
                                    </div>
                                ) : (
                                    <p>Successfully Updated Profile!</p>
                                )}

                            </OwnerCheck>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditAuthorProfilePage;
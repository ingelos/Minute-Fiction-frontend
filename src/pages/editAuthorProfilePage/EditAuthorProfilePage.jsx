import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import AuthorProfileForm from "../../components/authorProfileForm/AuthorProfileForm.jsx";
import AuthorCheck from "../../components/authorCheck/AuthorCheck.jsx";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import useAuthorProfile from "../../components/useAuthorProfile/UseAuthorProfile.jsx";


function EditAuthorProfilePage() {
    const [error, setError] = useState(null);
    const {username} = useParams();
    const {authorProfile, loading} = useAuthorProfile(username);


    async function handleUpdatingProfile(username, updatedData) {
        setError(false);

        try {
            const {data} = await axios.put(`http://localhost:8080/authorprofiles/${username}`, updatedData);
            console.log('Form data:', data);
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
                            <p>Go <Link to={`/authorprofiles/${username}`}><strong>back</strong></Link> to Author Profile</p>
                            <AuthorCheck>
                                <div>
                                    {error && <p>{error.message}</p>}
                                    {loading && <p>Loading mailing...</p>}
                                    {authorProfile && (
                                        <AuthorProfileForm onSubmit={handleUpdatingProfile} initialData={authorProfile}
                                                           isEditing={true}/>
                                    )}
                                </div>
                                {authorProfile?.profilePhoto?.photoUrl ? (
                                        <div>
                                            <img src={authorProfile.profilePhoto?.photoUrl} alt="profile-photo"/>
                                            <p><Link to={`/authorprofiles/${username}/photo`}>Edit Profile Photo</Link></p>
                                        </div>
                                    ) : (
                                    <p><Link to={`/authorprofiles/${username}/photo`}>Add Profile Photo</Link></p>
                                    )
                                }
                            </AuthorCheck>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditAuthorProfilePage;
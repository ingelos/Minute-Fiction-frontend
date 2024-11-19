import "./AuthorProfilePage.css";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import useAuthorProfile from "../../components/useAuthorProfile/UseAuthorProfile.jsx";
import AuthorProfileCard from "../../components/authorProfileCard/AuthorProfileCard.jsx";
import {Link, useParams} from "react-router-dom";
import UserIcon from "../../assets/icons/user-circle.svg";
import StoryDetailsCard from "../../components/storyDetailsCard/StoryDetailsCard.jsx";
import useAuthorPublishedStories from "../../components/useAuthorPublishedStories/UseAuthorPublishedStories.jsx";
import {useState} from "react";
import axios from "axios";
import OwnerCheck from "../../components/ownerCheck/OwnerCheck.jsx";

function AuthorProfilePage() {
    const {username} = useParams();
    // const {user} = useContext(AuthContext);
    const {authorProfile, profilePhoto, loading: profileLoading, error: profileError} = useAuthorProfile(username);
    const {stories, loading: storiesLoading, error: storiesError} = useAuthorPublishedStories(username);
    const [error, setError] = useState(null);
    const [unpublishedStories, setUnpublishedStories] = useState([]);
    const [showUnpublishedStories, setShowUnpublishedStories] = useState(false);


    async function getUnpublishedStories() {
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.get(`http://localhost:8080/authorprofiles/${username}/unpublished`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setUnpublishedStories(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching unpublished stories:', error);
            setError(true);
        }
    }

    async function handleShowUnpublishedStories() {
        if (!showUnpublishedStories) {
            getUnpublishedStories();
        }
        setShowUnpublishedStories(!showUnpublishedStories);
    }


    return (
        <section className='profile-section outer-content-container'>
            <div className='profile-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className="profile-container">
                            <div className="author-info-container">
                                {profileLoading && <p>Loading...</p>}
                                {profileError && <p>{profileError.message}</p>}
                                {authorProfile &&
                                    <>
                                        <AuthorProfileCard
                                            username={authorProfile.username}
                                            firstname={authorProfile.firstname}
                                            lastname={authorProfile.lastname}
                                            bio={authorProfile.bio}
                                            dob={authorProfile.dob}
                                        />
                                        <div className="edit-link">
                                        <OwnerCheck username={username}>
                                            <Link to={`/authors/${username}/edit`}>
                                                Edit Profile
                                            </Link>
                                        </OwnerCheck>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="profile-photo-container">
                                {profilePhoto ? (
                                    <div className="photo-container">
                                        <img src={profilePhoto}
                                             alt='Profile Photo'
                                             className='profile-photo'/>
                                        <OwnerCheck username={username}>
                                            <Link to={`/authors/${username}/photo`} className="edit-link">
                                                Edit Photo
                                            </Link>
                                        </OwnerCheck>
                                    </div>
                                ) : (
                                    <div className="photo-container">
                                        <img src={UserIcon}
                                             alt='no profile photo'
                                             className='profile-picture-empty'/>
                                        <OwnerCheck username={username}>
                                            <Link to={`/authors/${username}/photo`}>Add Photo</Link>
                                            <Link to={`/authors/${username}/edit`}>Edit Profile</Link>
                                        </OwnerCheck>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="stories-section">
                            {storiesLoading && <p>Loading stories...</p>}
                            {storiesError && <p>{storiesError.message}</p>}
                            {stories.length > 0 && (
                                stories.map((story) => (
                                    <div className="story-container" key={story.id}>
                                        <StoryDetailsCard
                                            title={story.title}
                                            storyContent={story.content}
                                            authorFirstname={story.authorFirstname}
                                            authorLastname={story.authorLastname}
                                            themeName={story.themeName}
                                            publishDate={story.publishDate}
                                            storyId={story.id}
                                            preview={true}
                                        />
                                    </div>
                                )))}
                        </div>

                        <OwnerCheck username={username}>
                            <div>
                                <button onClick={handleShowUnpublishedStories}>
                                    {showUnpublishedStories ? 'Hide Unpublished Stories' : 'Show Unpublished Stories'}
                                </button>
                                <div>
                                    {error && <p>{error.message}</p>}
                                    {showUnpublishedStories && (
                                        unpublishedStories.length > 0 && (
                                            unpublishedStories.map((story) => (
                                                <div className="stories-container-author" key={story.id}>
                                                    <div className="author-story-container">
                                                        <p>Title: {story.title}</p>
                                                        <p>Content: {story.content}</p>
                                                        <p>Theme: {story.themeName}</p>
                                                        <p>Status: {story.status}</p>
                                                    </div>
                                                </div>
                                            ))))}
                                </div>
                            </div>
                        </OwnerCheck>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default AuthorProfilePage;
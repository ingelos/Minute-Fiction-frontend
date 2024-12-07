import "./AuthorProfilePage.css";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import useAuthorProfile from "../../hooks/useAuthorProfile/UseAuthorProfile.jsx";
import AuthorProfileCard from "../../components/authorProfileCard/AuthorProfileCard.jsx";
import {Link, useParams} from "react-router-dom";
import StoryDetailsCard from "../../components/storyDetailsCard/StoryDetailsCard.jsx";
import useAuthorPublishedStories from "../../hooks/useAuthorPublishedStories/UseAuthorPublishedStories.jsx";
import {useState} from "react";
import axios from "axios";
import OwnerCheck from "../../helpers/ownerCheck/OwnerCheck.jsx";
import Button from "../../components/button/Button.jsx";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import useDeleteStory from "../../hooks/useDeleteStory/UseDeleteStory.jsx";


function AuthorProfilePage() {
    const {username} = useParams();
    const {authorProfile, profilePhoto, loading: profileLoading, error: profileError} = useAuthorProfile(username);
    const {stories, loading: storiesLoading, error: storiesError} = useAuthorPublishedStories(username);
    const [error, setError] = useState(null);
    const [unpublishedStories, setUnpublishedStories] = useState([]);
    const [showUnpublishedStories, setShowUnpublishedStories] = useState(false);
    const {
        error: deleteError,
        loading,
        modalOpen,
        setModalOpen,
        storyToDelete,
        openModal,
        handleDeleteStory
    } = useDeleteStory(refreshUnpublishedStories);

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
            if (error.response && error.response.status === 404) {
                console.log("Author has no unpublished stories");
            } else {
                console.error('Error fetching unpublished stories:', error);
                setError(true);
            }
        }
    }

    async function refreshUnpublishedStories(deletedStoryId) {
        setUnpublishedStories((prevStories) =>
            prevStories.filter((story) => story.id !== deletedStoryId));
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
                                    <div className="author-profile-container">
                                        <AuthorProfileCard
                                            username={authorProfile.username}
                                            firstname={authorProfile.firstname}
                                            lastname={authorProfile.lastname}
                                            bio={authorProfile.bio}
                                            dob={authorProfile.dob}
                                        />
                                        <div className="edit-link">
                                            <OwnerCheck username={username}>
                                                <Link to={`/authors/${username}/edit`} className="edit-link">
                                                    Edit Profile
                                                </Link>
                                            </OwnerCheck>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="profile-photo-container">
                                <div className="photo-container">
                                    {profilePhoto && (
                                        <img src={profilePhoto}
                                             alt='Profile Photo'
                                             className='profile-photo'/>
                                    )}
                                    <OwnerCheck username={username}>
                                        <Link to={`/authors/${username}/photo`} className="edit-link">
                                            {profilePhoto ? 'Edit Photo' : 'Add Photo'}
                                        </Link>
                                    </OwnerCheck>
                                </div>

                            </div>
                        </div>
                        <div className="stories-section">
                            {storiesLoading && <p>Loading stories...</p>}
                            {storiesError && <p>{storiesError.message}</p>}
                            {stories.length > 0 && (
                                stories.map((story) => (
                                    <div className="story-container" key={story.id}>
                                        <StoryDetailsCard
                                            storyTitle={story.title}
                                            storyContent={story.content}
                                            authorFirstname={story.authorFirstname}
                                            authorLastname={story.authorLastname}
                                            username={story.username}
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
                                <Button
                                    onClick={handleShowUnpublishedStories}
                                    buttonText={showUnpublishedStories ? 'Hide Unpublished Stories' : 'Show Unpublished Stories'}
                                    buttonType="button"
                                    className="show-button"
                                />
                                <div>
                                    {error && <p>{error.message}</p>}
                                    {showUnpublishedStories && (
                                        unpublishedStories.length > 0 && (
                                            unpublishedStories.map((story) => (
                                                <div className="stories-container-author" key={story.id}>
                                                    <div className="author-story-container">
                                                        <p><strong>Current status:</strong> {story.status}</p>
                                                        <p><strong>Theme:</strong> {story.themeName}</p>
                                                        <p><strong>Title:</strong> {story.title}</p>
                                                        <p><strong>Content:</strong> {story.content}</p>
                                                    </div>
                                                    <div className="delete-section">
                                                        <Button onClick={() => openModal(story.id)}
                                                                className="delete-button"
                                                                buttonText="Delete"
                                                                buttonType="button"
                                                        />
                                                        {!loading && deleteError && <p>{error}</p>}
                                                    </div>
                                                </div>
                                            ))))}
                                </div>
                                {modalOpen && (
                                    <Confirmation
                                        isOpen={modalOpen}
                                        onClose={() => setModalOpen(false)}
                                        onConfirm={() => handleDeleteStory(storyToDelete)}
                                        title="Confirm Deletion"
                                        message="Are you sure you want to delete this story?"
                                    />
                                )}
                            </div>
                            <Link to={`/authors/${username}/download`} className="link-button-style downloads">
                                Download Stories
                            </Link>
                        </OwnerCheck>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default AuthorProfilePage;
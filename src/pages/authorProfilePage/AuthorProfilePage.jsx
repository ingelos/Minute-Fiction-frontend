import "./AuthorProfilePage.css";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import useAuthorProfile from "../../components/useAuthorProfile/UseAuthorProfile.jsx";
import AuthorProfileCard from "../../components/authorProfileCard/AuthorProfileCard.jsx";
import {useParams} from "react-router-dom";
import UserIcon from "../../assets/icons/user-circle.svg";
// import StoryDetailsCard from "../../components/storyDetailsCard/StoryDetailsCard.jsx";
import useAuthorStories from "../../components/useAuthorStories/UseAuthorStories.jsx";
import StoryDetailsCard from "../../components/storyDetailsCard/StoryDetailsCard.jsx";
// import AuthorCheck from "../../components/authorCheck/AuthorCheck.jsx";

function AuthorProfilePage() {
    const { username } = useParams();
    const { authorProfile, loading: profileLoading, error: profileError} = useAuthorProfile(username);
    const { stories, loading: storiesLoading, error: storiesError} = useAuthorStories(username);

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
                                <AuthorProfileCard
                                    username={authorProfile.username}
                                    firstname={authorProfile.firstname}
                                    lastname={authorProfile.lastname}
                                    bio={authorProfile.bio}
                                    dob={authorProfile.dob}
                                />
                            }
                            </div>
                            <div className="profile-photo-container">
                                {/*<article>*/}
                                    {authorProfile?.profilePhoto?.photoUrl ? (
                                        <img src={authorProfile.profilePhoto.photoUrl}
                                             alt='Profile Photo'
                                             className='profile-photo'/>
                                    ) : (
                                        <img src={UserIcon}
                                             alt='no profile photo'
                                             className='profile-picture-empty'/>
                                    )}
                                {/*</article>*/}
                            </div>
                        </div>

                        {/*<div>*/}
                        {/*<AuthorCheck>*/}
                        {/*    <Link to={`/authorprofiles/${username}/edit`}>Edit Profile</Link>*/}
                        {/*</AuthorCheck>*/}
                        {/*</div>*/}
                        {/*<article className="author-stories">*/}

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
                        {/*    <h2 className="published-title">Published Stories</h2>*/}
                        {/*{stories.length > 0 && (*/}
                        {/*    stories.map((story) => (*/}
                        {/*        <div className="story-container" key={story.id}>*/}
                        {/*            <StoryDetailsCard*/}
                        {/*                title={story.title}*/}
                        {/*                storyContent={story.content}*/}
                        {/*                authorFirstname={story.authorFirstname}*/}
                        {/*                authorLastname={story.authorLastname}*/}
                        {/*                themeName={story.themeName}*/}
                        {/*                publishDate={story.publishDate}*/}
                        {/*                storyId={story.id}*/}
                        {/*                preview={true}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    )))}*/}
                        {/*</article>*/}
                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default AuthorProfilePage;
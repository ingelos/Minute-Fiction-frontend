import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {Link, useParams} from "react-router-dom";
import useAuthorProfile from "../../components/useAuthorProfile/UseAuthorProfile.jsx";
import AuthorProfileCard from "../../components/authorProfileCard/AuthorProfileCard.jsx";
import UserIcon from "../../assets/icons/user-circle.svg";
import AuthorCheck from "../../components/authorCheck/AuthorCheck.jsx";

function AuthorProfilePage() {
    const { username } = useParams();
    const { authorProfile, loading, error} = useAuthorProfile(username);

    return (
        <section className='profile-section outer-content-container'>
            <div className='profile-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <article className="profile-article">
                            {loading && <p>Loading...</p>}
                            {error && <p>{error.message}</p>}
                            {Object.keys(authorProfile).length > 0 &&
                                <AuthorProfileCard
                                    firstname={authorProfile.firstname}
                                    lastname={authorProfile.lastname}
                                    bio={authorProfile.bio}
                                    dob={authorProfile.dob}
                                />
                            }
                        </article>
                        <article className="profile-photo">
                            {authorProfile?.profilePhoto?.photoUrl ? (
                                <img src={authorProfile.profilePhoto.photoUrl}
                                     alt='Profile Photo'
                                     className='profile-photo'/>
                            ) : (
                                <img src={UserIcon}
                                     alt='no profile photo'
                                     className='profile-picture-empty'/>
                            )}
                        </article>
                        <AuthorCheck>
                            <Link to={`/authorprofiles/${username}/edit`}>Edit Profile</Link>
                        </AuthorCheck>
                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default AuthorProfilePage;
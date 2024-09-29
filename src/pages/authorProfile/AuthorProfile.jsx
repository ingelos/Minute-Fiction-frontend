import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useParams} from "react-router-dom";
import useAuthorProfile from "../../components/useAuthorProfile/UseAuthorProfile.jsx";
import AuthorProfileCard from "../../components/authorProfileCard/AuthorProfileCard.jsx";


function AuthorProfile() {
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



                        </article>
                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default AuthorProfile;
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useContext} from "react";

function Profile() {

    const { user } = useContext(AuthContext);


    return (
        <section className='profile-section outer-content-container'>
            <div className='profile-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2>Profile</h2>
                        <article className="profile-article">
                            <p><strong>Username: </strong>{user.username}</p>
                            <p><strong>Name: </strong>`${user.firstname} ${user.lastname}`</p>
                            <p><strong>Email: </strong>{user.email}</p>
                            <p><strong>Birthdate: </strong>{user.dob}</p>
                            <p><strong>Bio:</strong>{user.bio}</p>
                        </article>

                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default Profile;
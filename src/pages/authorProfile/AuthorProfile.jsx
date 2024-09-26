import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";


function AuthorProfile() {

    // const { user } = useContext(AuthContext);


    return (
        <section className='profile-section outer-content-container'>
            <div className='profile-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <article className="profile-article">
                            {/*<p>`${user.firstname} ${user.lastname}`</p>*/}
                            {/*<p><strong>Birthdate: </strong>{user.dob}</p>*/}
                            {/*<p><strong>Bio:</strong>{user.bio}</p>*/}
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
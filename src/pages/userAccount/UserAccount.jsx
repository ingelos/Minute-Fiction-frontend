import {Link,} from "react-router-dom";


function UserAccount({user}) {

    return (
        <section className='user-account outer-content-container'>
            <div className='user-account inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="section-title titles">Your Account</h2>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        {user.hasAuthorProfile ? (
                            <Link to={`/authorprofiles/${user.username}`}>Your Author Profile</Link>
                        ) : (
                            <Link to={`/authorprofiles/${user.username}/create`}>Create Author Profile</Link>
                        )}

                        <Link to={`/users/account/edit/${user.username}`}>Edit Account Details</Link>
                        <Link to={`/users/account/change-password/${user.username}`}>Change Password</Link>
                        <Link to={`/users/account/delete/${user.username}`}>Delete Your Account</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserAccount;
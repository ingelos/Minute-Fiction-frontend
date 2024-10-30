import "./UserDetailsPage.css";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import axios from "axios";
import useUser from "../../components/useUser/UseUser.jsx";
import Button from "../../components/button/Button.jsx";


function UserDetailsPage() {
    const {isAuth, user, updateUser} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const { userData } = useUser();

    async function handleSubscriptionChange() {
        try {
            const {data} = await axios.patch(`http://localhost:8080/users/${user.username}/subscription`,
                {subscribedToMailing: !user.subscribedToMailing},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

            updateUser({ ...user, subscribedToMailing: !user.subscribedToMailing});
            console.log("Subscription updated", data);
        } catch (error) {
            console.error("Error updating subscription:", error);
        }
    }

    return (
        <section className='user-account outer-content-container'>
            <div className='user-account inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        {isAuth ? (
                            <div>
                                <h2 className="section-title titles">Welcome back {user.username}!</h2>
                                {user && (
                                    <div>
                                        <div className="account-container">
                                            <p>Username: {userData.username}</p>
                                            <p>Email: {userData.email}</p>
                                        </div>

                                        <div className="subscription-container">
                                            <p className="subscription-status">Subscribed: {userData.subscribedToMailing ? "Yes" : "No"}</p>
                                            <Button
                                                onClick={handleSubscriptionChange}
                                                buttonType="submit"
                                                classname="submit-button"
                                                buttonText={userData.subscribedToMailing ? "Unsubscribe" : "Subscribe"}
                                                />
                                        </div>
                                        <div className="profile-link">
                                            {userData.hasAuthorProfile ? (
                                                <Link to={`/authors/${user.username}`}><h3>My Author Profile</h3></Link>
                                            ) : (
                                                <Link to={`/user/${user.username}/create-profile`}>Create Author
                                                    Profile</Link>
                                            )}
                                        </div>
                                        <div className="edit-links">
                                            <Link to={`/user/account/${user.username}/edit`}>Edit Account Details</Link>
                                            <Link to={`/user/account/${user.username}/change-password`}>Change
                                                Password</Link>
                                            <Link to={`/user/account/${user.username}/delete`}>Delete Your
                                                Account</Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <h3 className='log-in-again-title titles'>You are logged out. Please log in again to access your account.</h3>
                        )}

                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default UserDetailsPage;
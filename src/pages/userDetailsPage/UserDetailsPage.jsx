import "./UserDetailsPage.css";
import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import OwnerCheck from "../../components/ownerCheck/OwnerCheck.jsx";
import AuthContext from "../../context/AuthContext.jsx";


function UserDetailsPage() {
    const { user, isAuth, updateUser } = useContext(AuthContext);
    const { username} = useParams();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUserData() {
            try {
                const {data} = await axios.get(`http://localhost:8080/users/${username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                setUserData(data);
            } catch (error) {
                console.error("error fetching user data", error);
            } finally {
                setLoading(false);
            }
        }

        if (username) {
            fetchUserData();
        }

        return function cleanup() {
            controller.abort();
        }

    }, [username, token]);


    async function handleSubscriptionChange() {
        try {
            await axios.patch(`http://localhost:8080/users/${username}/subscription`,
                {subscribedToMailing: !user.subscribedToMailing},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

            updateUser({ ...user, subscribedToMailing: !user.subscribedToMailing })
            console.log("Subscription updated successfully");
        } catch (error) {
            console.error("Error updating subscription:", error);
        }
    }

    return (
        <section className='user-account outer-content-container'>
            <div className='user-account inner-content-container'>
                <div className='main-container'>
                    <OwnerCheck username={username}>
                    <div className="featured-section">
                        {isAuth ? (
                            <div>
                                {loading && <p>Loading...</p>}
                                <h2 className="section-title titles">Welcome back {user.username}!</h2>
                                {/*{userData && (*/}
                                    <div>
                                        <div className="account-container">
                                            <p>Username: {userData.username}</p>
                                            <p>Email: {userData.email}</p>
                                        </div>
                                        <div className="subscription-container">
                                            <p className="subscription-status">
                                                Subscribed: {user.subscribedToMailing ? "Yes" : "No"}</p>
                                            <Button
                                                onClick={handleSubscriptionChange}
                                                buttonType="submit"
                                                classname="submit-button"
                                                buttonText={user.subscribedToMailing ? "Unsubscribe" : "Subscribe"}
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
                                            <Link to={`/user/account/${user.username}/edit-email`}>Edit email</Link>
                                            <Link to={`/user/account/${user.username}/edit-password`}>Edit
                                                Password</Link>
                                            <Link to={`/user/account/${user.username}/delete`}>Delete Your
                                                Account</Link>
                                        </div>
                                    </div>
                            </div>
                        ) : (
                            <h3 className='log-in-again-title titles'>You are logged out. Please log in again to access your account.</h3>
                        )}
                    </div>
                    <AsideMenu/>
                    </OwnerCheck>
                </div>
            </div>
        </section>
    )
}

export default UserDetailsPage;
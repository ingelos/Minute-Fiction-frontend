import "./UserDetails.css";
import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AsideMenu from "../../components/layout/asideMenu/AsideMenu.jsx";
import axios from "axios";
import Button from "../../components/common/button/Button.jsx";
import OwnerCheck from "../../helpers/userChecks/OwnerCheck.jsx";
import AuthContext from "../../context/AuthContext.jsx";


function UserDetails() {
    const {user, updateUser} = useContext(AuthContext);
    const {username} = useParams();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUserData() {
            try {
                const {data} = await axios.get(`http://localhost:8080/users/${user.username}`, {
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
            const newSubscriptionStatus = !userData.subscribedToMailing;

            await axios.patch(`http://localhost:8080/users/${user.username}/subscription`,
                {subscribedToMailing: newSubscriptionStatus},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

            setUserData((prevData) => ({
                ...prevData,
                subscribedToMailing: newSubscriptionStatus,
            }));

            updateUser({...user, subscribedToMailing: newSubscriptionStatus});
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
                            <div>
                                {loading && <p>Loading...</p>}
                                <h2 className="section-title titles">Welcome back {user.username}!</h2>
                                <div>
                                    <div className="account-container">
                                        <p>Username: {userData.username}</p>
                                        <p>Email: {userData.email}</p>
                                    </div>
                                    <div className="subscription-container">
                                        <p className="subscription-status">
                                            Subscribed to Mailing: {userData.subscribedToMailing ? "Yes" : "No"}</p>
                                        <Button
                                            onClick={handleSubscriptionChange}
                                            buttonType="submit"
                                            classname="submit-button"
                                            buttonText={userData.subscribedToMailing ? "Unsubscribe" : "Subscribe"}
                                        />
                                    </div>
                                    <div className="profile-link">
                                        {userData.hasAuthorProfile ? (
                                            <Link to={`/authors/${username}`}><h3>My Author Profile</h3></Link>
                                        ) : (
                                            <Link to={`/users/${username}/create-profile`}>Create Author
                                                Profile</Link>
                                        )}
                                    </div>
                                    <div className="edit-links">
                                        <Link to={`/users/${username}/account-settings`}>Account
                                            Settings</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AsideMenu/>
                    </OwnerCheck>
                </div>
            </div>
        </section>
    )
}

export default UserDetails;
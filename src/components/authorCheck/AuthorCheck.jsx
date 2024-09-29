import {useEffect, useState} from "react";
import authContext from "../../context/AuthContext.jsx";
import axios from "axios";

function AuthorCheck({children}) {
    const [hasAuthorProfile, setHasAuthorProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const token = localStorage.getItem('token');
    const {username} = authContext;

    useEffect(() => {
        async function checkAuthority() {
            try {
                const {data} = await axios.get(`http://localhost:8080/users/${username}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                if(data.hasAuthorProfile) {
                    setHasAuthorProfile(true);
                } else {
                    setError(true);
                    setHasAuthorProfile(false);
                }
            } catch (error) {
                console.error('Error fetching author profile', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        if (token) {
            checkAuthority();
        } else {
            setLoading(false);
        }

    }, [token, username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error checking authority.</p>;

    return hasAuthorProfile ? children : <p>You are not authorized to access this resource. Please create an author profile first.</p>
}

export default AuthorCheck;
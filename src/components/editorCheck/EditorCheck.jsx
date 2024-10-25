import {useEffect, useState} from "react";
import authContext from "../../context/AuthContext.jsx";
import axios from "axios";

function EditorCheck({children}) {
    const [isEditor, setIsEditor] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const token = localStorage.getItem('token');
    const {username} = authContext;

    useEffect(() => {
        async function checkAuthority() {
            try {
                const {data} = await axios.get(`http://localhost:8080/users/${username}/authorities`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setIsEditor(data.authorities === 'EDITOR');
            } catch (error) {
                console.error('Error fetching user authority', error);
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

    return isEditor ? children : <h3 className="authority-check">This area is accessible only to editors of Minute Fiction.</h3>
}

export default EditorCheck;
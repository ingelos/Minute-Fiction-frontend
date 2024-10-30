import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";


function UseUser() {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUser() {
            const token = localStorage.getItem('token');
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/users/${user.username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                console.log("User Data:", data);
                setUserData(data);

            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Request is cancelled');
                } else {
                    console.error(error);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUser();

        return function cleanup() {
            controller.abort();
        }

    }, [user.username]);

    return {userData, loading, error};
}

export default UseUser;
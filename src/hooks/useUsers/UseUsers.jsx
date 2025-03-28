import {useEffect, useState} from "react";
import axios from "axios";

function UseUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAllUsers() {
            const token = localStorage.getItem('token');
            setLoading(true);
            setError(null);

            try {
                const {data} = await axios.get(`http://localhost:8080/users`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                    signal: controller.signal,
                });
                setUsers(data);

            } catch (error) {
                console.error(error);
                setError('Error fetching users');
            }
        }

        fetchAllUsers();

        return function cleanup() {
            controller.abort();
        }

    }, []);

    return {users, loading, error, setUsers};

}

export default UseUsers;
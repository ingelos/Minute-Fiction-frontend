import {useEffect, useState} from "react";
import axios from "axios";

function UseUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchAllUsers() {
            const token = localStorage.getItem('token');
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/users`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,

                },
                    signal: signal,
                });
                console.log(data);
                setUsers(data);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        }

        fetchAllUsers();

        return function cleanup() {
            controller.abort();
        }

    }, []);

    return {users, loading, error};

}

export default UseUsers;
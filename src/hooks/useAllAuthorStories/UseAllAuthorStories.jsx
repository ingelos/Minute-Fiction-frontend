import {useEffect, useState} from "react";
import axios from "axios";


function UseAllAuthorStories(username) {
    const [authorStories, setAuthorStories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAuthorProfile() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/authorprofiles/${username}/overview`, {
                    signal: controller.signal,
                });
                console.log(data);
                setAuthorStories(data);

            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Request is cancelled');
                } else if (error.response) {
                    if (error.response.status === 404) {
                        console.error('No stories exist for this author');
                        setError(true);
                    } else {
                        console.error('Error:', error)
                        setError(true);
                    }
                }
            } finally {
                setLoading(false);
            }
        }

        fetchAuthorProfile();

        return function cleanup() {
            controller.abort();
        }

    }, [username]);

    return {authorStories, loading, error};
}

export default UseAllAuthorStories;
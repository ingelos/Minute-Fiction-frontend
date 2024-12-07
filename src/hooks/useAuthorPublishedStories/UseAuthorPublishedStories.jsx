import {useEffect, useState} from "react";
import axios from "axios";


function UseAuthorPublishedStories(username) {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAuthorProfile() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/authorprofiles/${username}/published`, {
                    signal: controller.signal,
                });
                console.log(data);
                setStories(data);

            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Request is cancelled');
                } else if (error.response) {
                    if (error.response && error.response.status === 404) {
                        console.error('Author has no published stories');
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

    return {stories, loading, error};
}

export default UseAuthorPublishedStories;
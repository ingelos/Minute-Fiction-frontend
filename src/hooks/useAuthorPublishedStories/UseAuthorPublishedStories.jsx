import {useEffect, useState} from "react";
import axios from "axios";


function UseAuthorPublishedStories(username) {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAuthorProfile() {
            setError(null);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/authorprofiles/${username}/published`, {
                    signal: controller.signal,
                });
                setStories(data);

            } catch (error) {
                if (axios.isCancel(error)) return;
                    if (error.response && error.response.status === 404) {
                        console.error('Author has no published stories');
                    } else {
                        console.error('Error:', error)
                        setError('Error');
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
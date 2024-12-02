import {useEffect, useState} from "react";
import axios from "axios";

export function UseRecentStories({ limit, offset = 0}) {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRecentStories() {
            setLoading(true);
            setError(false);

            try {
                const {data} = await axios.get(`http://localhost:8080/stories/published`, {
                    params: { limit, offset },
                    signal: controller.signal,
                });
                setStories(data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Request is cancelled', error);
                } else {
                    console.error(error);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchRecentStories();

        return function cleanup() {
            controller.abort();
        }
    }, [limit, offset]);

    return { stories, loading, error };

}

export default UseRecentStories;
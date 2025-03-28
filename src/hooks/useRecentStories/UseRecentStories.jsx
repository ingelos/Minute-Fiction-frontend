import {useEffect, useState} from "react";
import axios from "axios";

export function UseRecentStories({ limit, offset = 0}) {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRecentStories() {
            setLoading(true);
            setError(null);

            try {
                const {data} = await axios.get(`http://localhost:8080/stories/published`, {
                    params: { limit, offset },
                    signal: controller.signal,
                });
                setStories(data);

            } catch (error) {
                if (axios.isCancel(error)) return;
                    console.error(error);
                    setError('Error fetching published stories');
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
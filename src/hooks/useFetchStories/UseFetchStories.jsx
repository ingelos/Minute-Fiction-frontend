import {useState} from "react";
import axios from "axios";

function UseFetchStories({status, themeId}) {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const controller = new AbortController();
    const token = localStorage.getItem('token');

    async function fetchStories() {
        setError(null);
        setLoading(true);
        setStories([]);

        try {
            const {data} = await axios.get(`http://localhost:8080/stories/editor/overview`, {
                params: {
                    status,
                    themeId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                signal: controller.signal,
            });
            setStories(data);

        } catch (error) {
            if (axios.isCancel(error)) return;
            console.error(error);
            setError('Error fetching submitted stories');
        } finally {
            setLoading(false);
        }

        return () => controller.abort();
    }

    return {stories, loading, error, setStories, fetchStories}

}

export default UseFetchStories;
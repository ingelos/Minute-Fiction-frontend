import {useState} from "react";
import axios from "axios";

function UseFetchStories({ status, themeId}) {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchStories() {
        const controller = new AbortController();
        const {signal} = controller;
        const token = localStorage.getItem('token');
        setLoading(true);
        setStories([]);

        try {
            const {data} = await axios.get(`http://localhost:8080/stories/editor/overview`, {
                params: {
                    status,
                    themeId,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                signal
            });
            setStories(data);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request cancelled');
            } else {
                console.error('Error fetching submitted stories:', error);
                setError(true);
            }
        } finally {
            setLoading(false);
        }
        return () => controller.abort();
}

return { stories, loading, error, setStories, fetchStories}

}

export default UseFetchStories;
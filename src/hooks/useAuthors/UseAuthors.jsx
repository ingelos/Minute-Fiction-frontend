import {useEffect, useState} from "react";
import axios from "axios";


function UseAuthors() {

    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAuthors() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/authorprofiles`, {
                    signal: controller.signal,
                });
                setAuthors(data);

            } catch (error) {
                if (axios.isCancel(error)) return;
                    console.error(error);
                    setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchAuthors();

        return function cleanup() {
            controller.abort();
        }

    }, []);

    return {authors, loading, error, setAuthors};
}

export default UseAuthors;
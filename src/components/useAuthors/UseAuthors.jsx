import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


function UseAuthors() {

    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {username} = useParams();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchAuthors() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/authorprofiles/authors`, {
                    signal: signal,
                });
                console.log(data);
                setAuthors(data);

            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Request is cancelled');
                } else {
                    console.error(error);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchAuthors();

        return function cleanup() {
            controller.abort();
        }

    }, [username]);

    return {authors, loading, error};
}

export default UseAuthors;
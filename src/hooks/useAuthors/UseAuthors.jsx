import {useEffect, useState} from "react";
import axios from "axios";


function UseAuthors() {

    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchAuthors() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/authorprofiles`, {
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

    }, []);

    return {authors, loading, error};
}

export default UseAuthors;
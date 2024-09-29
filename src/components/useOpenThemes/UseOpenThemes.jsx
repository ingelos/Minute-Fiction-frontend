import axios from "axios";
import {useEffect, useState} from "react";


function UseOpenThemes() {
    const [themes, setThemes] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchOpenThemes() {
            setError(false);

            try {
                setLoading(true);
               const {data} = await axios.get(`http://localhost:8080/themes/open`, {
                        signal: signal,
                    });

                setThemes(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchOpenThemes();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    return { themes, loading, error};
}

export default UseOpenThemes;
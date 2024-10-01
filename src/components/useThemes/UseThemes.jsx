import {useEffect, useState} from "react";

import axios from "axios";

function UseThemes() {
    const [themes, setThemes] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchThemes() {
            setError(false);

            try {
                setLoading(true);
               const {data}  = await axios.get(`http://localhost:8080/themes`, {
                        signal: signal,
                    });
                setThemes(data);
            } catch (error) {
                console.error("No themes available at this moment", error)
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchThemes();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    return { themes, loading, error};
}

export default UseThemes;
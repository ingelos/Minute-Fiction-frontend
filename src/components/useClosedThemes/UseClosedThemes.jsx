import axios from "axios";
import {useEffect, useState} from "react";


function UseClosedThemes() {
    const [closedThemes, setClosedThemes] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchClosedThemes() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/themes/closed`, {
                    signal: signal,
                });
                console.log(data);
                setClosedThemes(data);
            } catch (error) {
                console.log('Error fetching open themes', error)
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchClosedThemes();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    return { closedThemes, loading, error};
}

export default UseClosedThemes;
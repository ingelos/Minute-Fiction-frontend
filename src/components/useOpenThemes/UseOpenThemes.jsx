import axios from "axios";
import {useEffect, useState} from "react";


function UseOpenThemes() {
    const [openThemes, setOpenThemes] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchOpenThemes() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/themes/open`, {
                        signal: signal,
                    });
                console.log(data);
                setOpenThemes(data);
            } catch (error) {
                console.log('Error fetching open themes', error)
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchOpenThemes();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    return { openThemes, loading, error};
}

export default UseOpenThemes;
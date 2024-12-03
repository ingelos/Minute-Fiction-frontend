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
            setLoading(true);

            try {
               const {data}  = await axios.get(`http://localhost:8080/themes`, {
                        signal: signal,
                    });
               console.log(data);
               setThemes(data);
            } catch (error) {
                console.error("Error fetching themes", error)
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchThemes();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    return { themes, loading, error, setThemes };
}

export default UseThemes;
import {useEffect, useState} from "react";
import axios from "axios";


function UseThemes(url) {
    const [themes, setThemes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();

        async function fetchThemes() {
            setError(null);
            setLoading(true);

            try {
                const {data} = await axios.get((url), {
                    signal: controller.signal,
                });
                setThemes(data);

            } catch (error) {
                if (axios.isCancel(error)) return;
                setError("Error fetching themes");
            } finally {
                setLoading(false);
            }
        }

        fetchThemes();

        return function cleanup() {
            controller.abort();
        }
    }, [url]);

    return {themes, loading, error, setThemes};
}

export default UseThemes;
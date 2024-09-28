import {useEffect, useState} from "react";
import {fetchThemes} from "../../helpers/ThemesHelper.jsx";
import {fetchOpenThemes} from "../../helpers/OpenThemesHelper.jsx";

function UseThemes({isOpen = false}) {
    const [themes, setThemes] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function getThemes() {
            setError(false);

            try {
                setLoading(true);
                let response;
                if (isOpen) {
                    response = await fetchOpenThemes(signal);
                } else {
                    response = await fetchThemes(signal);
                }
                setThemes(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getThemes();

        return function cleanup() {
            controller.abort();
        }
    }, [isOpen]);

    return { themes, loading, error};
}

export default UseThemes;
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


function UseAuthorProfile() {

    const [authorProfile, setAuthorProfile] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {username} = useParams();

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAuthorProfile() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/authorprofiles/${username}`, {
                    signal: controller.signal,
                });
                console.log(data);
                setAuthorProfile(data);

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

        fetchAuthorProfile();

        return function cleanup() {
            controller.abort();
        }

    }, [username]);

    return {authorProfile, loading, error};
}

export default UseAuthorProfile;
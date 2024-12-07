import {useEffect, useState} from "react";
import axios from "axios";


function UseAuthorProfile(username) {
    const [authorProfile, setAuthorProfile] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAuthorProfileAndPhoto() {
            setError(false);
            setLoading(true);

            try {
                const profileResponse = await axios.get(`http://localhost:8080/authorprofiles/${username}`, {
                    signal: controller.signal,
                });
                console.log(profileResponse);
                setAuthorProfile(profileResponse.data);

                try {
                    const photoResponse = await axios.get(`http://localhost:8080/authorprofiles/${username}/photo`,
                        {responseType: 'blob', signal: controller.signal}
                    );
                    const photoUrl = URL.createObjectURL(photoResponse.data);
                    setProfilePhoto(photoUrl);

                } catch (photoError) {
                    if (photoError.response && photoError.response.status === 404) {
                        console.log("No profile photo found");
                    } else {
                        console.log("Error fetching photo")
                    }
                }

            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Request is cancelled');
                } else {
                    console.error("Error fetching author profile or photo:", error);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchAuthorProfileAndPhoto();

        return function cleanup() {
            controller.abort();
        }

    }, [username]);

    return {authorProfile, profilePhoto, loading, error};
}

export default UseAuthorProfile;
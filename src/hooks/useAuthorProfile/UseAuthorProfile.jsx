import {useEffect, useState} from "react";
import axios from "axios";


function UseAuthorProfile(username) {
    const [authorProfile, setAuthorProfile] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAuthorProfileAndPhoto() {
            setError(null);
            setLoading(true);

            try {
                const profileResponse = await axios.get(`http://localhost:8080/authorprofiles/${username}`, {
                    signal: controller.signal,
                });
                setAuthorProfile(profileResponse.data);

                try {
                    const photoResponse = await axios.get(`http://localhost:8080/authorprofiles/${username}/photo`,
                        {responseType: 'blob', signal: controller.signal}
                    );
                    const photoUrl = URL.createObjectURL(photoResponse.data);
                    setProfilePhoto(photoUrl);

                } catch (photoError) {
                    if (photoError.response && photoError.response.status === 404) {
                        console.error("No profile photo found");
                    } else {
                        console.error("Error fetching photo:", photoError);
                        setError("Error fetching photo");
                    }
                }
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error("Error fetching author profile or photo:", error);
                setError("An error occurred. Please try again later");
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
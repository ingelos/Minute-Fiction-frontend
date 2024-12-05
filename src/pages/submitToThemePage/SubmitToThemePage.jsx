import {Link, useParams} from "react-router-dom";
import StoryForm from "../../components/storyForm/StoryForm.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthorCheck from "../../helpers/authorCheck/AuthorCheck.jsx";
import AuthContext from "../../context/AuthContext.jsx";
import {FaLongArrowAltLeft} from "react-icons/fa";


function SubmitToThemePage() {
    const {themeId} = useParams();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [success, setSuccess] = useState(false);
    const [themeName, setThemeName] = useState(null);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        async function getThemeName() {
            try {
                const {data} = await axios.get(`http://localhost:8080/themes/${themeId}`);
                setThemeName(data.name);
            } catch (error) {
                console.error('Error fetching themeName: ', error);
            }
        }

        getThemeName();
    }, [themeId]);


    async function handleSubmitStory(storyData) {
        setError(false);
        const token = localStorage.getItem('token');
        if (!themeId) {
            return;
        }

        try {
            const {data} = await axios.post(`http://localhost:8080/stories/submit/${themeId}`,
                storyData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            setSuccess(true);
            console.log('Story submitted:', data);
            setError(false);
            setErrorMessage(false);
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                setErrorMessage(errorMessage);
                console.log("error", error);
                console.log("error.response.data", error.response.data);
            } else {
                console.error('Error submitting story:', error);
                setError(true);
            }
        }
    }

    return (
        <section className='submit-section outer-content-container'>
            <div className='submit-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="submit-title titles">Submit Your Story</h2>
                        <div className="back-link">
                            <FaLongArrowAltLeft className="arrow-icon"/>
                            <Link to={`/submit`}>Back to Open Themes</Link>
                        </div>
                        <h3>Theme: {themeName}</h3>

                        <div className="open-themes-submit">
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <AuthorCheck username={user.username}>
                                {!success ? (
                                    <StoryForm themeId={themeId} onSubmit={handleSubmitStory} isEditing={false}/>
                                ) : (
                                    <h5 className="success-message">You have successfully submitted your story!</h5>
                                )}
                                {error && <p className="error-message">Error submitting form. Please try again.</p>}
                            </AuthorCheck>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubmitToThemePage;
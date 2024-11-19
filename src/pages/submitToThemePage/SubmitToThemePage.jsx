import {Link, useParams} from "react-router-dom";
import StoryForm from "../../components/storyForm/StoryForm.jsx";
import {useContext, useState} from "react";
import axios from "axios";
import AuthorCheck from "../../components/authorCheck/AuthorCheck.jsx";
import AuthContext from "../../context/AuthContext.jsx";
import {FaLongArrowAltRight} from "react-icons/fa";


function SubmitToThemePage() {
    const {themeId} = useParams();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const {user} = useContext(AuthContext);

    async function handleSubmitStory(storyData) {
        const token = localStorage.getItem('token');
        console.log(storyData);
        console.log(user.username);

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
        } catch (error) {
            console.error('Error submitting story:', error.message || error);
            setSuccess(false);
            setError(true);
        }
    }

    return (
        <section className='submit-section outer-content-container'>
            <div className='submit-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="submit-title titles">Submit Your Story</h2>
                        <div className="open-themes-submit">
                            <AuthorCheck username={user.username}>
                                {error && <p>{error.response.message}</p>}
                                {!success ? (
                                    <StoryForm themeId={themeId} onSubmit={handleSubmitStory} isEditing={false}/>
                                ) : (
                                    <div>
                                        <p>You have successfully submitted your story!</p>
                                        <div className="back-link">
                                            <FaLongArrowAltRight className="arrow-icon"/>
                                            <Link to={`/submit`}>Back to Submit</Link>
                                        </div>
                                    </div>
                                )}
                            </AuthorCheck>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubmitToThemePage;
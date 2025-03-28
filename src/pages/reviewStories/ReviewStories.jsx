import "./ReviewStories.css";
import {useState} from "react";
import axios from "axios";
import AsideEditorMenu from "../../components/layout/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";
import useThemes from "../../hooks/useThemes/UseThemes.jsx";
import useFetchStories from "../../hooks/useFetchStories/UseFetchStories.jsx";
import Button from "../../components/common/button/Button.jsx";
import {FaLongArrowAltLeft} from "react-icons/fa";
import {Link} from "react-router-dom";


function ReviewStories() {
    const [selectedTheme, setSelectedTheme] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [acceptSuccess, setAcceptSuccess] = useState(false);
    const [declinedSuccess, setDeclinedSuccess] = useState(false);
    const { themes} = useThemes(`http://localhost:8080/themes`);
    const { stories, loading, error, setStories, fetchStories} = useFetchStories({
        status: 'SUBMITTED',
        themeId: selectedTheme,
    })
    const token = localStorage.getItem('token');


    async function handleThemeChange(event) {
        const themeId = Number(event.target.value)
        setSelectedTheme(themeId);
    }

    async function handleSearch() {
        setSearchClicked(true);
        fetchStories();
        setAcceptSuccess(false);
    }


    async function handleAcceptStory(storyId) {
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editor/${storyId}/accept`,
                {},
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Accepted story:', data);
            setAcceptSuccess(true);
            setStories((prevStories) => prevStories.filter(story => story.id !== storyId));

        } catch (error) {
            console.error("Error accepting story:", error);
        }
    }

    async function handleDeclineStory(storyId) {
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editor/${storyId}/decline`,
                {},
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Declined story:', data);
            setDeclinedSuccess(true);
            setStories((prevStories) => prevStories.filter(story => story.id !== storyId));

        } catch (error) {
            console.error("Error declining story:", error);
        }
    }


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="stories-title titles">Review Submitted Stories</h2>
                            <div className="back-links">
                                <div className="back-link">
                                    <FaLongArrowAltLeft className='arrow-icon'/>
                                    <Link to="/editor/stories">Manage Stories</Link>
                                </div>
                            </div>
                            <div className='review-container'>
                                <div className="theme-selection">
                                    <label htmlFor="select-theme">Select a Theme to Review:</label>
                                    <select id="themeSelect" onChange={handleThemeChange}>
                                        <option value="">Select theme</option>
                                        {themes.map((theme) => (
                                            <option key={theme.id} value={theme.id}>
                                                {theme.name} ({theme.id})
                                            </option>
                                        ))}
                                    </select>
                                    <Button
                                        buttonType="button"
                                        onClick={handleSearch}
                                        className="search-button"
                                        buttonText="Search">
                                    </Button>
                                </div>
                                <br></br>
                                {loading && <p>Loading stories...</p>}
                                {error && <p>{error.message}</p>}

                                <div className="story-list">
                                    {!loading && searchClicked && selectedTheme && (
                                        stories.length > 0 ? (
                                            stories.map((story) => (
                                                <div key={story.id} className="action-container">
                                                    <div className="story-container">
                                                        <p><strong>Id:</strong> {story.id}</p>
                                                        <p><strong>Status:</strong> {story.status}</p>
                                                        <p><strong>Title:</strong> {story.title}</p>
                                                        <p><strong>Username:</strong> {story.username}</p>
                                                        <p><strong>Content:</strong> {story.content}</p>
                                                    </div>
                                                    <div className="button-actions">
                                                        <button onClick={() => handleAcceptStory(story.id)}>Accept
                                                        </button>
                                                        <button onClick={() => handleDeclineStory(story.id)}>Decline
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No stories with status SUBMITTED available for this theme</p>
                                        ))}
                                </div>
                                {acceptSuccess && <h5 className="success-message">Story successfully accepted!</h5>}
                                {declinedSuccess && <h5 className="success-message">Story successfully declined!</h5>}
                            </div>
                        </div>
                        <AsideEditorMenu/>
                    </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default ReviewStories;
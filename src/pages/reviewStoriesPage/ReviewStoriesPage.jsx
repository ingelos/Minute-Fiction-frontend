import "./ReviewStoriesPage.css";
import {useState} from "react";
import axios from "axios";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";
import useThemes from "../../hooks/useThemes/UseThemes.jsx";
import useFetchStories from "../../hooks/useFetchStories/UseFetchStories.jsx";
import Button from "../../components/button/Button.jsx";


function ReviewStoriesPage() {
    const [selectedTheme, setSelectedTheme] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const { themes} = useThemes();
    const { stories, loading, error, setStories, fetchStories} = useFetchStories({
        status: 'SUBMITTED',
        themeId: selectedTheme,
    })


    async function handleThemeChange(event) {
        const themeId = Number(event.target.value)
        setSelectedTheme(themeId);
    }

    async function handleSearch() {
        setSearchClicked(true);
        fetchStories();
    }


    async function handleAcceptStory(storyId) {
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editor/${storyId}/accept`,
                {},
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
            setStories((prevStories) => prevStories.filter(story => story.id !== storyId));
        } catch (error) {
            console.error("Error accepting story:", error);
        }
    }

    async function handleDeclineStory(storyId) {
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editor/${storyId}/decline`,
                {},
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
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
                                    {searchClicked && selectedTheme && (
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
                                                        <button onClick={() => handleAcceptStory(story.id)}>Accept</button>
                                                        <button onClick={() => handleDeclineStory(story.id)}>Decline</button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No stories with status SUBMITTED</p>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <AsideEditorMenu/>
                    </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default ReviewStoriesPage;
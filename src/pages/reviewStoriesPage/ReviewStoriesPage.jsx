import {useEffect, useState} from "react";
import axios from "axios";
// import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import StoryList from "../../components/storyList/StoryList.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";


function ReviewStoriesPage() {
    const [themes, setThemes] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState('');
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchThemes() {
            try {
                const {data} = await axios.get(`http://localhost:8080/themes`, {signal});
                setThemes(data);
            } catch (error) {
                console.error('Error fetching themesPage:', error);
                setError(true);
            }
        }

        fetchThemes();

        return function cleanup() {
            controller.abort();
        }

    }, []);

    useEffect(() => {
        if (!selectedTheme) return;

        const controller = new AbortController();
        const {signal} = controller;

        async function fetchStoriesByTheme(themeId) {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/stories/themes/${themeId}`, {signal});
                setStories(data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Fetch stories request cancelled');
                } else {
                    console.error('Error fetching submitted stories:', error);
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchStoriesByTheme(selectedTheme);

        return function cleanup() {
            controller.abort();
        };
    }, [selectedTheme]);


    async function handleThemeChange(themeId) {
        setSelectedTheme(themeId);
    }


    async function handleAcceptStory(storyId) {
        try {
            await axios.patch(`http://localhost:8080/stories/accept/${storyId}`)
            const {data} = await axios.get(`http://localhost:8080/stories/themes/${selectedTheme}`);
            setStories(data);
        } catch (error) {
            console.error("Error accepting story:", error);
        }
    }

    async function handleDeclineStory(storyId) {
        try {
            await axios.patch(`http://localhost:8080/stories/decline/${storyId}`)
            const {data} = await axios.get(`http://localhost:8080/stories/themes/${selectedTheme}`);
            setStories(data);
        } catch (error) {
            console.error("Error declining story:", error);
        }
    }


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="stories-title titles">Review Submitted Stories</h2>
                        <div className='stories-container'>
                            {/*<EditorCheck>*/}
                            <div className="theme-selection">
                                <label htmlFor="select-theme">Select a theme:</label>
                                <select id="themeSelect" onChange={handleThemeChange}>
                                    <option value="">Select theme</option>
                                    {themes.map((theme) => (
                                        <option key={theme.id} value={theme.id}>
                                            {theme.themeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br></br>
                            {loading && <p>Loading stories...</p>}
                            {error && <p>Error loading stories... {error.message}</p>}

                            <div className="story-list">
                                {selectedTheme && stories.length > 0 ? (
                                    <StoryList stories={stories}>
                                        {stories.map((story) => (
                                            <div key={story.id} className="story-actions">
                                                <button onClick={() => handleAcceptStory(story.id)}>Accept Story
                                                </button>
                                                <button onClick={() => handleDeclineStory(story.id)}>Decline Story
                                                </button>
                                            </div>
                                        ))}
                                    </StoryList>
                                ) : (
                                    selectedTheme && <p>No stories available for the selected theme.</p>
                                )}
                            </div>
                            {/*</EditorCheck>*/}
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default ReviewStoriesPage;
import {useEffect, useState} from "react";
import axios from "axios";
// import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import StoryList from "../../components/storyList/StoryList.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";

function PublishStoriesPage() {
    const [acceptedStories, setAcceptedStories] = useState([]);
    const [themes, setThemes] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState('')
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchThemes() {
            try {
                const {data} = await axios.get(`http://localhost:8080/themes`);
                setThemes(data);
            } catch (error) {
                console.error('Error fetching themesPage:', error);
                setError(true);
            }
        }

        fetchThemes();

    }, []);

    useEffect(() => {
        if (!selectedTheme) return;

        async function fetchAcceptedStories() {
            try {
                setLoading(true);
                const {data} = await axios.get(`http://localhost:8080/stories/accepted/themes/${selectedTheme}`)
                console.log(data);
                setAcceptedStories(data);
            } catch (error) {
                console.error('Error fetching accepted stories', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchAcceptedStories();
    }, [selectedTheme]);


    async function handleBulkPublishByTheme(themeId) {
        if (!selectedTheme) return;

        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/themes/${themeId}/publish`)
            console.log('Bulk publish result: ', data);
        } catch (error) {
            console.error('Error publishing stories for this themePage', error);
        }
    }

    async function handlePublishByStory(storyId) {
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/${storyId}/publish`)
            console.log('Story published: ', data);
        } catch (error) {
            console.error('Error publishing story', error);
        }
    }


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="publish-title titles">Publish Accepted Stories</h2>
                        <div className='stories-container'>
                            {/*<EditorCheck>*/}
                            <div className="theme-selection">
                                <label htmlFor="themeSelect">Select a Theme:</label>
                                <select id="themeSelect" onChange={(e) => setSelectedTheme(e.target.value)}>
                                    <option value="">Select theme</option>
                                    {themes.map((theme) => (
                                        <option key={theme.id} value={theme.id}>
                                            {theme.themeName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {error && <p>{error.message}</p>}
                            {loading && <p>Loading stories...</p>}
                            {acceptedStories.length > 0 ? (
                                <StoryList stories={acceptedStories}>
                                    {acceptedStories.map((story) => (
                                        <div key={story.id} className="story-actions">
                                            <button onClick={() => handlePublishByStory(story.id)}>
                                                Publish Story
                                            </button>
                                        </div>
                                    ))}
                                </StoryList>
                            ) : (
                                <div>
                                    <br></br>
                                    <p>No Accepted stories available for this theme. Please review stories first.</p>
                                </div>
                            )}
                            <br></br>
                            <h4>Bulk Publish Stories for Selected Theme:</h4>
                            <button onClick={handleBulkPublishByTheme} disabled={!selectedTheme}>
                                Bulk Publish
                            </button>
                            {/*</EditorCheck>*/}
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default PublishStoriesPage;
import "./PublishStoriesPage.css";
import {useState} from "react";
import axios from "axios";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";
import useThemes from "../../hooks/useThemes/UseThemes.jsx";
import useFetchStories from "../../hooks/useFetchStories/UseFetchStories.jsx";
import Button from "../../components/button/Button.jsx";


function PublishStoriesPage() {
    const [selectedTheme, setSelectedTheme] = useState('')
    const [searchClicked, setSearchClicked] = useState(false);
    const {themes} = useThemes();
    const {stories, loading, error, setStories, fetchStories} = useFetchStories({
        status: 'ACCEPTED',
        themeId: selectedTheme
    })
    const token = localStorage.getItem('token');


    async function handleThemeChange(event) {
        const themeId = Number(event.target.value)
        setSelectedTheme(themeId);
    }

    async function handleSearch() {
        setSearchClicked(true);
        fetchStories();
    }

    async function handlePublishByStory(storyId) {
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editor/${storyId}/publish`, {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
            console.log('Story published', data);
            setStories((prevStories) => prevStories.filter(story => story.id !== storyId));

        } catch (error) {
            console.error('Error publishing story', error);
        }
    }

    async function handleBulkPublishByTheme(themeId, themeName) {
        if (!themeId || !themeName) return;
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editor/themes/${themeId}/publish`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log('Bulk publishing successful', data);
            setStories((prevStories) => prevStories.filter(story => story.themeName !== themeName));

        } catch (error) {
            console.error('Error publishing stories for this theme', error);
        }
    }

    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <EditorCheck>
                            <h2 className="publish-title titles">Publish Accepted Stories</h2>
                            <div className='accepted-stories-container'>
                                <div className="theme-selection">
                                    <label htmlFor="themeSelect">Select a Theme:</label>
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

                                {error && <p>{error.message}</p>}
                                {loading && <p>Loading stories...</p>}
                                {searchClicked && (
                                    stories.length > 0 ? (
                                        stories.map((story) => (
                                            <div key={story.id} className="story-actions">
                                                <div className="story-container">
                                                    <p>Id: {story.id}</p>
                                                    <p>Status: {story.status}</p>
                                                    <p>Title: {story.title}</p>
                                                    <p>By: {story.username}</p>
                                                    <p>Content: {story.content}</p>
                                                </div>
                                                <button
                                                    onClick={() => handlePublishByStory(story.id)}>
                                                    Publish
                                                </button>
                                            </div>
                                        ))) : (
                                        <p className="no-stories-container">No stories with status ACCEPTED for this
                                            theme</p>
                                    ))}
                                <div className="bulk-publish-container">
                                    <h4>Bulk Publish Stories for Selected Theme:</h4>
                                    <button
                                        onClick={() => handleBulkPublishByTheme(selectedTheme)}
                                        disabled={!selectedTheme}>
                                        Bulk Publish
                                    </button>
                                </div>

                            </div>
                        </EditorCheck>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default PublishStoriesPage;
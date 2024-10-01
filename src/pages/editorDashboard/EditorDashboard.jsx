import {useEffect, useState} from "react";
import axios from "axios";
import EditorNavigation from "../../components/editorNavigation/EditorNavigation.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";


function EditorDashboard() {
    const [themes, setThemes] = useState([]);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('');


    useEffect(() => {
        async function fetchThemes() {
            try {
                const {data} = await axios.get(`http://localhost:8080/themes`);
                setThemes(data);
            } catch (error) {
                console.error('Error fetching themes:', error);
                setError(true);
            }
        }

        fetchThemes();
    }, []);

    useEffect(() => {
        if (selectedTheme) {
            fetchStoriesByTheme(selectedTheme);
        }
    }, [selectedTheme]);

    async function fetchStoriesByTheme(themeId) {
        setLoading(true);
        setError(false);

        try {
            const {data} = await axios.get(`http://localhost:8080/stories/themes/${themeId}`);
            setStories(data);
        } catch (error) {
            console.error('Error fetching stories', error)
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleThemeChange(themeId) {
        setSelectedTheme(themeId);
    }

    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <EditorCheck>
                            <h2>Editor Dashboard</h2>
                            <EditorNavigation/>
                            <div>
                                <select id="themeSelect" onChange={handleThemeChange}>
                                    <option value="">Select a Theme</option>
                                    {themes.map((theme) => (
                                        <option key={theme.id} value={theme.id}>
                                            {theme.themeName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {loading && <p>Loading stories...</p>}
                            {error && <p>There was an error loading the stories</p>}
                            {selectedTheme && stories.length > 0 && (
                                <div>
                                    {stories.map((story) => (
                                        <li key={story.id} className="story-item">
                                            <h3>{story.title}</h3>
                                            <p>{story.status}</p>
                                        </li>
                                    ))}
                                </div>
                            )}

                        </EditorCheck>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditorDashboard;
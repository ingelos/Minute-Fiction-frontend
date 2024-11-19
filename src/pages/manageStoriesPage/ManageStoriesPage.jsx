import "./ManageStoriesPage.css";
import {useEffect, useState} from "react";
import axios from "axios";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {Link} from "react-router-dom";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import Button from "../../components/button/Button.jsx";


function ManageStoriesPage() {
    const [stories, setStories] = useState([]);
    const [themes, setThemes] = useState([]);
    const [filter, setFilter] = useState({status: '', theme: ''});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchThemes() {
            setLoading(true);
            try {
                const {data} = await axios.get(`http://localhost:8080/themes`, {signal});
                setThemes(data);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching themes:', error);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchThemes();

        return () => controller.abort();
    }, []);


    async function handleFilterChange(field, value) {
        setFilter((prev) => ({...prev, [field]: value}));
    }


    async function fetchFilteredStories() {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.get(`http://localhost:8080/stories/editor/overview`, {
                params: {
                    status: filter.status || undefined,
                    themeId: filter.themeId || undefined,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setStories(data);
        } catch (error) {
            console.error(`Error fetching stories:`, error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="stories-title titles">Manage Stories</h2>
                            {error && <p>{error}</p>}
                            <div className='stories-container'>
                                <div className="filter-panel">
                                    <div>
                                        <label>Status:</label>
                                        <select onChange={(e) => handleFilterChange('status', e.target.value)}
                                                value={filter.status}>
                                            <option value="">All</option>
                                            <option value="SUBMITTED">Submitted</option>
                                            <option value="ACCEPTED">Accepted</option>
                                            <option value="PUBLISHED">Published</option>
                                            <option value="DECLINED">Declined</option>
                                        </select>
                                        <label>Theme:</label>
                                        <select onChange={(e) => handleFilterChange('themeId', e.target.value)}
                                                value={filter.themeId}>
                                            <option value="">All</option>
                                            {themes.map((theme) => (
                                                <option key={theme.id} value={theme.id}>
                                                    {theme.name} ({theme.id})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <Button
                                        buttonType="button"
                                        onClick={fetchFilteredStories}
                                        className="button"
                                        buttonText="Search">
                                    </Button>

                                </div>

                            </div>
                            <div className="relevant-stories-container">
                                <div className="relevant-stories-list">
                                    {stories.length > 0 && (
                                        <>
                                            {loading && <p>Loading...</p>}
                                            <h3>Relevant Stories:</h3>
                                            {stories.map((story) => (
                                                <div key={story.id}>
                                                    <div className="stories-info">
                                                        <div>
                                                            <p>Title: {story.title}</p>
                                                            <p>By: {story.username}</p>
                                                            <p>Theme: {story.themeName}</p>
                                                            <p>Status: {story.status}</p>
                                                        </div>
                                                        <div>
                                                            <Link to={`/editor/stories/${story.id}/edit`} className="button">View/ Edit</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
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

export default ManageStoriesPage;
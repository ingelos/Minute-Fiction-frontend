import "./ManageStoriesPage.css";
import {useEffect, useState} from "react";
import axios from "axios";
import StoryList from "../../components/storyList/StoryList.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {useNavigate} from "react-router-dom";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import Button from "../../components/button/Button.jsx";
import useAllAuthorStories from "../../components/useAllAuthorStories/UseAllAuthorStories.jsx";


function ManageStoriesPage() {
    const [stories, setStories] = useState([]);
    const [themes, setThemes] = useState([]);
    const [filter, setFilter] = useState({status: '', theme: ''});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [query, setQuery] = useState('');
    const [authorStories, setAuthorStories] = useState([]);
    const navigate = useNavigate();
    // const {authorStories} = useAllAuthorStories();

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


    async function searchAuthorStories(username) {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.get(`http://localhost:8080/authorprofiles/${username}/overview`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAuthorStories(data || []);
        } catch (error) {
            console.error("Error fetching author stories", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleEditStory(storyId) {
        navigate(`/editor/stories/${storyId}/edit`);
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
                                    {/*<label>Author:</label>*/}
                                    {/*<input*/}
                                    {/*    type="text"*/}
                                    {/*    placeholder="Search by author"*/}
                                    {/*    onChange={(e) => onFilterChange('author', e.target.value)}*/}
                                    {/*    value={filter.author}*/}
                                    {/*/>*/}
                                </div>
                                <div>
                                    <div>
                                        <label>Search Author:</label>
                                        <input
                                            type="text"
                                            placeholder="Search by author"
                                            onChange={(e) => setQuery(e.target.value)}
                                            value={query}
                                        />
                                    </div>
                                    <Button
                                        buttonType="button"
                                        onClick={() => searchAuthorStories(query)}
                                        className="button"
                                        buttonText="Search"
                                    />
                                </div>

                                {/*<br></br>*/}
                                {/*    {error && <p>Error fetching stories...</p>}*/}
                                {/*    {loading && <p>Loading...</p>}*/}
                                {/*        <StoryList stories={stories}*/}
                                {/*                   onEdit={handleEditStory}*/}
                                {/*        />*/}
                            </div>
                            <div className="relevant-stories-container">
                                <h3>Relevant Stories:</h3>
                                <div className="relevant-stories-list">
                                    {stories.length > 0 && (
                                        stories.map((story) => (
                                            <div key={story.id}>
                                                <div className="stories-info">
                                                    <div>
                                                        <p>Title: {story.title}</p>
                                                        <p>By: {story.username}</p>
                                                        <p>Theme: {story.themeName}</p>
                                                        <p>Status: {story.status}</p>
                                                    </div>
                                                    <div>
                                                    <Button onClick={() => handleEditStory(story.id)}
                                                            buttonText="View/ Edit"
                                                            className="view-button"
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}

                                </div>
                                <div className="author-stories">
                                    {authorStories.map((story) => (
                                        <div key={story.id}>
                                            <div className="author-info">
                                                <p>Title: <strong>{story.title}</strong></p>
                                                <p>By: <strong>{story.username}</strong></p>
                                                <p>Theme: <strong>{story.themeName}</strong></p>
                                                <p>Status: <strong>{story.status}</strong></p>
                                            </div>
                                            <p>Content: {story.content}</p>
                                            <Button onClick={() => handleEditStory(story.id)}
                                                    buttonText="Edit Story"
                                            />
                                        </div>
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

export default ManageStoriesPage;
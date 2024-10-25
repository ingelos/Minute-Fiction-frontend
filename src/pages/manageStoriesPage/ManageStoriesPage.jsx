import {useEffect, useState} from "react";
import axios from "axios";
import StoryList from "../../components/storyList/StoryList.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {useNavigate} from "react-router-dom";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import {TailSpin} from "react-loader-spinner";
import Button from "../../components/button/Button.jsx";


function ManageStoriesPage() {
    const [stories, setStories] = useState([]);
    const [themes, setThemes] = useState([]);
    const [filter, setFilter] = useState({status: '', theme: ''});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [authorStories, setAuthorStories] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchThemes() {
            setError(false);
            setLoading(true);
            try {
                const {data} = await axios.get(`http://localhost:8080/themes`, {signal});
                setThemes(data);
            } catch (error) {
                console.error('Error fetching themes:', error);
                setError(error);
            }
        }
        fetchThemes();

        return function cleanup() {
            controller.abort();
        };
    }, []);



    async function fetchFilteredStories() {
        setLoading(true);
        setError(false);
        const controller = new AbortController();
        const {signal} = controller;

        try {
            const {data} = await axios.get(`http://localhost:8080/editor/stories`, {
                params: {
                    status: filter.status || undefined,
                    theme: filter.theme || undefined,
                }, signal: signal,
            });
            setStories(data);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request cancelled', error.message);
            } else {
                console.error(`Error fetching stories:`, error);
                setError(true);
            }
        } finally {
            setLoading(false);
        }

        return () => controller.abort();
    }

    async function handleFilterChange(field, value) {
        setFilter((prev) => ({...prev, [field]: value}));
    }

    async function searchAuthorStories(username) {
        setLoading(true);
        setError(false);

        try {
            const {data} = await axios.get(`http://localhost:8080/authorprofiles/${username}/overview`);
            setAuthorStories(data.stories || []);
        } catch (error) {
            console.error("Error fetching author stories", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleEditStory(storyId) {
            navigate(`/editor/stories/edit/${storyId}`);
    }


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                    <div className="featured-section">
                        <h2 className="stories-title titles">Manage Stories</h2>
                        <div className='stories-container'>

                            {/*    <FilterPanel themes={themes} filter={filter} onFilterChange={handleFilterChange}/>*/}
                            <br></br>
                            <div className="filter-panel">
                                <label>Status:</label>
                                <select onChange={(e) => handleFilterChange('status', e.target.value)} value={filter.status}>
                                    <option value="">All</option>
                                    <option value="submitted">Submitted</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="published">Published</option>
                                    <option value="declined">Declined</option>
                                </select>

                                <label>Theme:</label>
                                <select onChange={(e) => handleFilterChange('theme', e.target.value)} value={filter.theme}>
                                    <option value="">All</option>
                                    {themes.map((theme) => (
                                        <option key={theme.id} value={theme.name}>
                                            {theme.name}
                                        </option>
                                    ))}
                                </select>
                                <Button onClick={fetchFilteredStories}>Search</Button>
                                {/*<label>Author:</label>*/}
                                {/*<input*/}
                                {/*    type="text"*/}
                                {/*    placeholder="Search by author"*/}
                                {/*    onChange={(e) => onFilterChange('author', e.target.value)}*/}
                                {/*    value={filter.author}*/}
                                {/*/>*/}
                            </div>

                            <label>Search Author:</label>
                            <input
                                type="text"
                                placeholder="Search by author"
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                            />
                            <button onClick={() => searchAuthorStories(query)}>Search</button>
                            {loading && <TailSpin height={50} width={50}/>}
                            {error && <p>Error fetching stories.</p>}
                            <h3>Relevant Stories:</h3>
                            <ul>
                                {authorStories.map((story, index) => (
                                <li key={index}>
                                    <StoryList stories={stories} onEdit={handleEditStory}/>
                                </li>
                            ))}
                            </ul>

                            {/*<br></br>*/}
                            {/*    {error && <p>Error fetching stories...</p>}*/}
                            {/*    {loading && <p>Loading...</p>}*/}
                            {/*        <StoryList stories={stories}*/}
                            {/*                   onEdit={handleEditStory}*/}
                            {/*        />*/}
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
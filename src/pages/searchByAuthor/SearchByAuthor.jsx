import "./SearchByAuthor.css";
import {useState} from "react";
import Button from "../../components/common/button/Button.jsx";
import {Link} from "react-router-dom";
import AsideEditorMenu from "../../components/layout/asideEditorMenu/AsideEditorMenu.jsx";
import axios from "axios";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";

function SearchByAuthor() {

    const [query, setQuery] = useState('');
    const [authorStories, setAuthorStories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const token = localStorage.getItem('token');

    async function searchAuthorStories(username) {
        setLoading(true);
        setError(null);
        setAuthorStories([]);
        setHasSearched(true);

        try {
            const {data} = await axios.get(`http://localhost:8080/authorprofiles/${username}/overview`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAuthorStories(data);
        } catch (error) {
            console.error(error);
            setError('Error fetching author stories');
        } finally {
            setLoading(false);
        }
    }

    return (

        <section className='editor-author-section outer-content-container'>
            <div className='editor-author-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="author-title titles">Search By Author</h2>
                            <p className="link-button-style">
                                <Link to={'/editor/authors'}>
                                    Manage Authors
                                </Link>
                            </p>
                            <div>
                                <div className='search-container'>
                                    <label>Search Stories by Author Username:</label>
                                    <input
                                        type="text"
                                        placeholder="Search by Author..."
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

                            <div className="author-stories">
                                {loading && <p>Loading stories...</p>}
                                {error && <p>{error.message}</p>}
                                {hasSearched && !loading && authorStories.length === 0 && (
                                    <p>No stories found for &quot;{query}&quot;. Please check the username and try
                                        again</p>
                                )}
                                {authorStories.length > 0 && (
                                    <div>
                                        {authorStories.map((story) => (
                                            <div key={story.id} className="stories-container-author">
                                                <div className="author-story-container">
                                                    <p><strong>Status:</strong> {story.status}</p>
                                                    <p><strong>Username:</strong> {story.username}</p>
                                                    <p><strong>Title:</strong> {story.title}</p>
                                                    <p><strong>Theme:</strong> {story.themeName}</p>
                                                    <p><strong>Content:</strong> {story.content}</p>
                                                </div>
                                                <Link to={`/editor/stories/${story.id}/edit`} className="edit-link edit-editor">
                                                    Edit</Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <AsideEditorMenu/>
                    </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default SearchByAuthor;
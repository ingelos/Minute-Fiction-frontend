import "./ManageAuthorsPage.css";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import {Link} from "react-router-dom";
import useAuthors from "../../components/useAuthors/UseAuthors.jsx";


function ManageAuthorsPage() {
    // const [query, setQuery] = useState('');
    // const [authorStories, setAuthorStories] = useState([]);
    const {authors} = useAuthors();
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(null);
    // const [hasSearched, setHasSearched] = useState(false);

    // async function searchAuthorStories(username) {
    //     setLoading(true);
    //     setError(false);
    //     setAuthorStories([]);
    //     setHasSearched(true);
    //     const token = localStorage.getItem('token');
    //
    //     try {
    //         const {data} = await axios.get(`http://localhost:8080/authorprofiles/${username}/overview`, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //             setAuthorStories(data);
    //     } catch (error) {
    //         console.error("Error fetching author stories", error);
    //         setError(true);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (

        <section className='editor-author-section outer-content-container'>
            <div className='editor-author-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="author-title titles">Manage Authors</h2>
                            <p className="link-button-style">
                                <Link to={'/editor/authors/search'}>Search For Author</Link>
                            </p>
                            {/*<div>*/}
                            {/*    <div>*/}
                            {/*        <label>Search Author:</label>*/}
                            {/*        <input*/}
                            {/*            type="text"*/}
                            {/*            placeholder="Search by author"*/}
                            {/*            onChange={(e) => setQuery(e.target.value)}*/}
                            {/*            value={query}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <Button*/}
                            {/*        buttonType="button"*/}
                            {/*        onClick={() => searchAuthorStories(query)}*/}
                            {/*        className="button"*/}
                            {/*        buttonText="Search"*/}
                            {/*    />*/}
                            {/*</div>*/}

                            {/*<div className="author-stories">*/}
                            {/*    {loading && <p>Loading stories...</p>}*/}
                            {/*    {error && <p>{error.message}</p>}*/}
                            {/*    {hasSearched && !loading && authorStories.length === 0 && (*/}
                            {/*        <p>No stories found for &quot;{query}&quot;. Please check the username and try again</p>*/}
                            {/*    )}*/}
                            {/*    {authorStories.length > 0 && (*/}
                            {/*        <div>*/}
                            {/*            {authorStories.map((story) => (*/}
                            {/*                <div key={story.id} className="stories-container-author">*/}
                            {/*                    <div className="author-story-container">*/}
                            {/*                        <p>Status: <strong>{story.status}</strong></p>*/}
                            {/*                        <p>Username: <strong>{story.username}</strong></p>*/}
                            {/*                        <p>Title: <strong>{story.title}</strong></p>*/}
                            {/*                        <p>Theme: <strong>{story.themeName}</strong></p>*/}
                            {/*                        <p>Content: {story.content}</p>*/}
                            {/*                    </div>*/}
                            {/*                    <Link to={`/editor/stories/${story.id}/edit`} className="button">View/*/}
                            {/*                        Edit</Link>*/}
                            {/*                </div>*/}
                            {/*            ))}*/}
                            {/*        </div>*/}
                            {/*    )}*/}
                            {/*</div>*/}
                            <h3 className="sub-titles">All Authors</h3>
                            <ul className="author-container">
                                <li>
                                    <div className="author-list">
                                        <table className="author-table">
                                            <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>First name</th>
                                                <th>Last name</th>
                                                <th>Bio</th>
                                                <th>Profile Photo</th>
                                                <th>See Profile</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {authors.length > 0 && (
                                                authors.map((author) => (
                                                    <tr key={author.username}>
                                                        <td>{author.username}</td>
                                                        <td>{author.firstname}</td>
                                                        <td>{author.lastname}</td>
                                                        <td>{author.bio}</td>
                                                        <td>{author.profilePhoto}</td>
                                                        <td>
                                                            <Link to={`/authors/${author.username}`}
                                                                  className="link-button-style">
                                                                profile
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )))}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <AsideEditorMenu/>
                    </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default ManageAuthorsPage;
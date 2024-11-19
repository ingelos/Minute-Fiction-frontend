import "./ManageAuthorsPage.css";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import {Link} from "react-router-dom";
import useAuthors from "../../components/useAuthors/UseAuthors.jsx";


function ManageAuthorsPage() {

    const {authors} = useAuthors();

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
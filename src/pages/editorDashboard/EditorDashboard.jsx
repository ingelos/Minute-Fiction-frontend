import AsideEditorMenu from "../../components/layout/asideEditorMenu/AsideEditorMenu.jsx";
import {Link} from "react-router-dom";
import "./EditorDashboard.css";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";


function EditorDashboard() {

    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                    <div className="featured-section">
                        <h2 className="section-title titles">Editor Dashboard</h2>
                        <div className="section-container">
                            <div className="stories-section dashboard-section">
                                <h2 className="dashboard-title">Manage Stories</h2>
                                <p>View, edit, review (accept/ decline) and publish stories</p>
                                <div className="dashboard-nav-links">
                                    <Link to={'/editor/stories'}>Manage Stories</Link>
                                    <Link to={'/editor/stories/review'}>Review Stories</Link>
                                    <Link to={'/editor/stories/publish'}>Publish Stories</Link>
                                </div>
                            </div>
                            <div className="themes-section dashboard-section">
                                <h2 className="dashboard-title">Manage Themes</h2>
                                <p>Create and edit themes to categorize stories</p>
                                <div className="dashboard-nav-links">
                                    <Link to={'/editor/themes'}>Manage Themes</Link>
                                    <Link to={'/editor/themes/new'}>Create Themes</Link>
                                </div>
                            </div>
                            <div className="mailings-section dashboard-section">
                                <h2 className="dashboard-title">Manage Mailings</h2>
                                <p>Create, edit and send mailings to subscribed readers</p>
                                <div className="dashboard-nav-links">
                                    <Link to={'/editor/mailings'}>Manage Mailings</Link>
                                    <Link to={'/editor/mailings/new'}>Create Mailings</Link>
                                </div>
                            </div>
                            <div className="authors-section dashboard-section">
                                <h2 className="dashboard-title">Manage Authors</h2>
                                <p>View authors and author profiles or search stories by author</p>
                                <div className="dashboard-nav-links">
                                    <Link to={'/editor/authors'}>Manage Authors</Link>
                                    <Link to={'/editor/authors/search'}>Search By Author</Link>
                                </div>
                            </div>
                            <div className="user-section dashboard-section">
                                <h2 className="dashboard-title">Manage Users</h2>
                                <p>View and create (or delete) users and manage user authorities</p>
                                <div className="dashboard-nav-links">
                                    <Link to={'/editor/users'}>Manage Users</Link>
                                    <Link to={'/register'}>Create New User</Link>
                                </div>
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

export default EditorDashboard;
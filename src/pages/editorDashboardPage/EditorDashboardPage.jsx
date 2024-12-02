import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {Link} from "react-router-dom";
import "./EditorDashboardPage.css";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";

function EditorDashboardPage() {


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                    <div className="featured-section">
                        <h2 className="section-title titles">Editor Dashboard</h2>
                        <h3>Welcome! Manage stories, themes and mailings here.</h3>
                        <div className="section-container">
                            <div className="section-overview">
                                <div className="stories-section dashboard-section">
                                    <h2>Manage Stories</h2>
                                    <p>Review stories by theme, accept/decline and publish accepted stories</p>
                                    <div className="dashboard-nav-links">
                                        <Link to={'/editor/stories'}><h4>Manage stories</h4></Link>
                                        <Link to={'/editor/stories/review'}><h4>Review Stories</h4></Link>
                                        <Link to={'/editor/stories/publish'}><h4>Publish Stories</h4></Link>
                                    </div>
                                </div>
                                <div className="authors-section dashboard-section">
                                    <h2>Manage Authors</h2>
                                    <p>View all authors or view all stories by author</p>
                                    <div className="dashboard-nav-links">
                                        <Link to={'/editor/authors'}><h4>Manage authors</h4></Link>
                                        <Link to={'/editor/authors/search'}><h4>Search Author</h4></Link>
                                    </div>
                                </div>
                                <div className="themes-section dashboard-section">
                                    <h2>Manage Themes</h2>
                                    <p>Create and edit themes for categorizing stories</p>
                                    <div className="dashboard-nav-links">
                                        <Link to={'/editor/themes'}><h4>Manage Themes</h4></Link>
                                        <Link to={'/editor/themes/new'}><h4>Create Themes</h4></Link>
                                    </div>
                                </div>
                                <div className="mailings-section dashboard-section">
                                    <h2>Manage Mailings</h2>
                                    <p>Create, edit and send mailings to subscribed readers</p>
                                    <div className="dashboard-nav-links">
                                        <Link to={'/editor/mailings'}><h4>Manage Mailings</h4></Link>
                                        <Link to={'/editor/mailings/new'}><h4>Create Mailings</h4></Link>
                                    </div>
                                </div>
                                <div className="user-section dashboard-section">
                                    <h2>Manage Users</h2>
                                    <p>Create users and manage their authorities</p>
                                    <div className="dashboard-nav-links">
                                        <Link to={'/editor/users'}><h4>Manage Users</h4></Link>
                                        <Link to={'/register'}><h4>Create New User</h4></Link>
                                        <Link to={'/editor/users/authorities'}><h4>Manage authorities</h4></Link>
                                    </div>
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

export default EditorDashboardPage;
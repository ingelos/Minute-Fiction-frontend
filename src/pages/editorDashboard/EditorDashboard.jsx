import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {Link} from "react-router-dom";
import "./EditorDashboard.css";

function EditorDashboard() {


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="section-title titles">Editor Dashboard</h2>
                        <p>Welcome! Manage stories, themes and mailings here.</p>
                        {/*<EditorCheck>*/}
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
                            <div className="themes-section dashboard-section">
                                <h2>Manage Themes</h2>
                                <p>Create and edit themes for categorizing stories.</p>
                                <div className="dashboard-nav-links">
                                    <Link to={'/editor/themes'}><h4>Manage Themes</h4></Link>
                                    <Link to={'/editor/themes/new'}><h4>Create Themes</h4></Link>
                                    <Link to={'/editor/themes/:themeId/edit'}><h4>Edit Themes</h4></Link>
                                </div>
                            </div>
                            <div className="mailings-section dashboard-section">
                                <h2>Manage Mailings</h2>
                                <p>Create, edit and send mailings to subscribed readers.</p>
                                <div className="dashboard-nav-links"></div>
                                <Link to={'/editor/mailings/send'}><h4>Manage Mailings</h4></Link>
                                <Link to={'/editor/mailings/new'}><h4>Create Mailings</h4></Link>
                                {/*<Link to={'/editor/mailings/edit/:mailingId'}><h4>Edit Mailings</h4></Link>*/}
                            </div>
                        </div>

                    {/*</EditorCheck>*/}
                    </div>
                </div>
                {/*<AsideMenu/>*/}
                <AsideEditorMenu/>
            </div>
        </div>
</section>
)
}

export default EditorDashboard;
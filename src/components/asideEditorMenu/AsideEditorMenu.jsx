import {Link, NavLink} from "react-router-dom";
import "./AsideEditorMenu.css";

function AsideEditorMenu() {

    return (
        <aside className="aside-menu">
            <div className="manage-stories editor-card">
                <h2 className="aside-title dashboard">
                    <NavLink to={'/editor/dashboard'}>Editor Dashboard</NavLink>
                </h2>
            </div>
            <div className="manage-stories editor-card">
                <h3 className="aside-title">Stories</h3>
                <div className="sub-links">
                    <NavLink to={'/editor/stories'}><p>Manage Stories</p></NavLink>
                    <NavLink to={'/editor/stories/review'}><p>Review Stories</p></NavLink>
                    <NavLink to={'/editor/stories/publish'}><p>Publish Stories</p></NavLink>
                </div>
            </div>
            <div className="manage-themes editor-card">
                <h3 className="aside-title">Themes</h3>
                <div className="sub-links">
                    <NavLink to={'/editor/themes'}><p>Manage Themes</p></NavLink>
                    <NavLink to={'/editor/themes/new'}><p>Create Theme</p></NavLink>
                </div>
            </div>
            <div className="manage-mailings editor-card">
                <h3 className="aside-title">Mailings</h3>
                <div className="sub-links">
                    <Link to={'/editor/mailings'}><p>Manage Mailings</p></Link>
                    <Link to={'/editor/mailings/new'}><p>Create Mailing</p></Link>

                </div>
            </div>
            <div className="manage-authors editor-card">
                <h3 className="aside-title">Authors</h3>
                <div className="sub-links">
                    <NavLink to={'/editor/authors'}><p>Manage Authors</p></NavLink>
                    <NavLink to={'/editor/authors/search'}><p>Search Author</p></NavLink>
                </div>
            </div>
            <div className="manage-users editor-card">
                <h3 className="aside-title">Users</h3>
                <div className="sub-links">
                    <Link to={'/editor/users'}><p>Manage Users</p></Link>
                    <Link to={'/register'}><p>Create New User</p></Link>
                </div>
            </div>
        </aside>
    )
}

export default AsideEditorMenu;
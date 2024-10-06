import {Link, NavLink} from "react-router-dom";
import "./AsideEditorMenu.css";

function AsideEditorMenu() {

    return (
        <aside className="aside-menu">
            <div className="manage-stories editor-card">
                <h3 className="aside-title dashboard">
                    <NavLink to={'/editor/dashboard'}>Editor Dashboard</NavLink>
                </h3>
                <div className="sub-links">

                </div>
            </div>
            <div className="manage-stories editor-card">
                <h3 className="aside-title">Stories</h3>
                    <div className="sub-links">
                        <NavLink to={'/editor/stories'}><p>Manage Stories</p></NavLink>
                        <NavLink to={'/editor/submitted'}><p>Review</p></NavLink>
                        <NavLink to={'/editor/publish'}><p>Publish</p></NavLink>
                    </div>

            </div>
            <div className="manage-themes editor-card">
                <h3 className="aside-title">Themes</h3>
                    <div className="sub-links">
                        <NavLink to={'/editor/themes'}><p>Manage Themes</p></NavLink>
                        <NavLink to={'/editor/themes/new'}><p>Create</p></NavLink>
                        {/*<NavLink to={'/editor/themes/edit/:themeId'}><p>Edit</p></NavLink>*/}
                    </div>
            </div>
            <div className="manage-mailings editor-card">
                <h3 className="aside-title">Mailings</h3>
                    <div className="sub-links">
                        <Link to={'/editor/mailings'}><p>Manage Mailings</p></Link>
                        <Link to={'/editor/mailings/new'}><p>Create</p></Link>
                        {/*<Link to={'/editor/mailings/edit/:mailingId'}><p>Edit</p></Link>*/}
                        {/*<Link to={'/editor/mailings/send'}><p>Send</p></Link>*/}
                    </div>
            </div>
        </aside>
    )
}

export default AsideEditorMenu;
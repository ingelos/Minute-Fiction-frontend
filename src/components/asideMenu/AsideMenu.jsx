import './AsideMenu.css'
import {Link} from "react-router-dom";
import ThemesOverview from "../themesOverview/ThemesOverview.jsx";
import OpenThemes from "../openThemes/OpenThemes.jsx";
import useRecentStories from "../../hooks/useRecentStories/UseRecentStories.jsx";


function AsideMenu() {
    const { stories } = useRecentStories({ limit: 4});

    return (
        <aside className="aside-menu">
            <div className="recent-stories aside-card">
                <h3 className="aside-title">Latest publications</h3>
                <div className="list-recent-stories">
                {stories.map((story) => (
                    <p key={story.id}>
                        <Link to={`/stories/${story.id}`}><strong>{story.title}</strong></Link>
                    </p>
                ))}
                </div>
            </div>
            <div className="open-themes aside-card">
                <h3 className="aside-title">Open themes</h3>
                <OpenThemes showSubmitButton={false}
                            overview={false}
                            variant="aside"
                />
            </div>
            <div className="aside-themes-nav aside-card">
                <h3 className="aside-title">Themes</h3>
                <div className="theme-menu-aside">
                    <ThemesOverview/>
                </div>
            </div>
            <div className="register-nav aside-card">
                <h3 className="aside-title">Register</h3>
                <div className="register-menu">
                    <h4>New here?</h4>
                    <p>Want to submit your own stories and/or comment on stories?</p>
                    <p className="link-button-style">
                        <Link to='/register'>Create account</Link>
                    </p>
                </div>
            </div>
        </aside>
    )
}

export default AsideMenu;
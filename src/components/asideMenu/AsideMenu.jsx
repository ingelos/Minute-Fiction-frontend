import './AsideMenu.css'
import {Link} from "react-router-dom";
import ThemesOverview from "../themesOverview/ThemesOverview.jsx";
// import OpenThemes from "../openThemes/OpenThemes.jsx";
import OpenThemes from "../openThemes/OpenThemes.jsx";


function AsideMenu() {
    // const {openThemes} = useOpenThemes();

    return (
        <aside className="aside-menu">
            <div className="open-themes aside-card">
                <h3 className="aside-title">Open themes</h3>
                <OpenThemes showSubmitButton={false}
                            overview={false}
                            variant="aside"
                    />
                {/*{openThemes.length > 0 ? (*/}
                {/*    openThemes.map((theme) => (*/}
                {/*        <li className="open-themes-container" key={theme.id}>*/}
                {/*            <h4><Link to={`/submit/${theme.name}`}>{theme.name}</Link></h4>*/}
                {/*            <p>Submit before:</p>*/}
                {/*            <p>{theme.closingDate}</p>*/}
                {/*        </li>*/}
                {/*    ))) : (*/}
                {/*        <p className="no-open-themes">None</p>*/}
                {/*)}*/}
                {/*<Link to={`/submit`}>*/}
                {/*    <h4 className="submit-story-link">Submit</h4>*/}
                {/*</Link>*/}
            </div>
            <div className="register aside-card">
                <h3 className="aside-title">Register</h3>
                <div className="register-menu">
                    <h4>New here?</h4>
                    <p>Want to submit your own stories and/or comment on stories?</p>
                    <p className="link-button-style">
                        <Link to='/register'>Create account</Link>
                    </p>
                </div>
            </div>
            <div className="aside-themes-nav aside-card">
                <h3 className="aside-title">Themes</h3>
                <div className="theme-menu-aside">
                    <ThemesOverview/>
                </div>
            </div>
        </aside>
    )
}

export default AsideMenu;
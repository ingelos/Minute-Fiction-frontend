import './AsideMenu.css'
import {Link} from "react-router-dom";
import NavigationLink from "../navigationLink/NavigationLink.jsx";
import ThemesMenu from "../themesMenu/ThemesMenu.jsx";


function AsideMenu() {
    return (
        <aside className="aside-menu">
            <div className="login aside-card">
                <h3 className="aside-title">Login</h3>
                <form className="login-form">
                </form>
            </div>
            <div className="register aside-card">
                <h3 className="aside-title">Register</h3>
                <div className="register-menu">
                    <h4>New here?</h4>
                    <p>Want to submit your own stories and/or comment on others stories?</p>
                    <p className='link-to-register'><Link to='/register' >Create account</Link></p>
                </div>
            </div>
            <div className="aside-nav aside-card">
                <h3 className="aside-title">Themes</h3>
                <ThemesMenu
                    themeNavId="theme-aside-nav"
                />
            </div>
        </aside>
    )
}

export default AsideMenu;
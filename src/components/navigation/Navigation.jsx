import "./Navigation.css"
import NavigationLink from "../navigationLink/NavigationLink.jsx";

function Navigation() {
    return (
        <nav className="main-navigation outer-content-container">
            <div className="main-navigation inner-content-container">
                <ul className="main-navigation-links">
                    <NavigationLink
                        navId="main-nav-link"
                        direct="Home"
                        navDirect={'/'}
                    />
                    <NavigationLink
                        navId="main-nav-link"
                        direct="Themes"
                        navDirect={'/themes'}
                    />
                    <NavigationLink
                        navId="main-nav-link"
                        direct="Submit"
                        navDirect={'/submit'}
                    />
                    <NavigationLink
                        navId="main-nav-link"
                        direct="Subscribe"
                        navDirect={'/subscribe'}
                    />
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;
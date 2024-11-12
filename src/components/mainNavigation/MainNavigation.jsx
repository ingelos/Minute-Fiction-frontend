import "./MainNavigation.css"
import NavigationLink from "../navigationLink/NavigationLink.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../button/Button.jsx";


function MainNavigation() {
    const {user, isAuth, logout} = useContext(AuthContext);

    return (
        <nav className="main-navigation outer-content-container">
            <div className="navigation inner-content-container">
                <div className="navigation-container">
                    <ul className="main-navigation-ul">
                        <div className="main-navigation-links left-div">
                            <NavigationLink
                                direct="Home"
                                navDirect={'/'}
                            />
                            <NavigationLink
                                direct="Themes"
                                navDirect={'/themes'}
                            />
                            <NavigationLink
                                direct="Authors"
                                navDirect={'/authors'}
                            />
                            <NavigationLink
                                direct="Submit"
                                navDirect={'/submit'}
                            />
                            <NavigationLink
                                direct="Subscribe"
                                navDirect={'/register'}
                            />
                        </div>
                        <div className="main-navigation-links right-div">
                            <NavigationLink
                                direct="Editor"
                                navDirect={'/editor/dashboard'}
                            />

                            {isAuth ? (
                                <>
                                    <NavigationLink
                                        direct="Account"
                                        navDirect={`/user/${user.username}`}
                                    />
                                    <div className="main-nav-button">
                                    <Button
                                        buttonType='button'
                                        className='logout-button'
                                        buttonText='Logout'
                                        onClick={logout}
                                    />
                                        </div>
                                </>
                            ) : (
                                <NavigationLink
                                    direct="Login"
                                    navDirect={'/authenticate'}
                                />
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MainNavigation;
import "./MainNavigation.css"
import NavigationLink from "../navigationLink/NavigationLink.jsx";



function MainNavigation() {

    // const {isAuth, logout} = useContext(AuthContext);

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
                            <NavigationLink
                                direct="Login"
                                navDirect={'/authenticate'}
                            />
                        </div>
                    </ul>

                    {/*{isAuth ?*/}
                    {/*  <ul className="main-mainNavigation-links">*/}
                    {/*      <NavigationLink*/}
                    {/*          direct="Profile"*/}
                    {/*          navDirect={'/authorProfilePage'}*/}
                    {/*          />*/}
                    {/*      <div>*/}
                    {/*          <button*/}
                    {/*              type="button"*/}
                    {/*              onClick={logout}*/}
                    {/*          >*/}
                    {/*              Logout*/}
                    {/*          </button>*/}
                    {/*      </div>*/}
                    {/*  </ul>*/}
                    {/*    : <p></p> }*/}
                </div>
            </div>
        </nav>
    )
}

export default MainNavigation;
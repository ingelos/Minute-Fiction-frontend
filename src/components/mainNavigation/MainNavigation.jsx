import "./MainNavigation.css"
import NavigationLink from "../navigationLink/NavigationLink.jsx";
import EditorCheck from "../editorCheck/EditorCheck.jsx";



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
                        </div>
                        <div className="main-navigation-links right-div">
                            <EditorCheck>
                                <NavigationLink
                                    direct="Editor Dashboard"
                                    navDirect={'/editor/dashboard'}
                                />
                            </EditorCheck>
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
                    {/*          navDirect={'/authorProfile'}*/}
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
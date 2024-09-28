import "./Navigation.css"
import NavigationLink from "../navigationLink/NavigationLink.jsx";


function Navigation() {

    // const {isAuth, logout} = useContext(AuthContext);


    return (
        <nav className="main-navigation outer-content-container">
            <div className="navigation inner-content-container">
              <div className="navigation-container">
                <ul className="main-navigation-links">
                    <NavigationLink
                        direct="HomePage"
                        navDirect={'/'}
                    />
                    <NavigationLink
                        direct="ThemesPage"
                        navDirect={'/themesPage'}
                    />
                    <NavigationLink
                        direct="SubmitPage"
                        navDirect={'/submitPage'}
                    />
                    <NavigationLink
                        direct="Subscribe"
                        navDirect={'/subscribe'}
                    />
                </ul>
                  {/*{isAuth ?*/}
                  {/*  <ul className="main-navigation-links">*/}
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

export default Navigation;
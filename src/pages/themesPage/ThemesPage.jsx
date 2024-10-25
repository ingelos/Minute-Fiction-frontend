import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
// import ThemesOverview from "../../components/themesOverview/ThemesOverview.jsx";
import {Link} from "react-router-dom";
import useThemes from "../../components/useThemes/UseThemes.jsx";


function ThemesPage() {

    const {themes, loading, error} = useThemes();
    // const {themeName} = useParams();

    return (
        <section className='themes-section outer-content-container'>
            <div className='themes-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="themes-title titles">All themes</h2>
                        <div className='themes-container container'>
                            <div className="themes-menu-component">
                                {loading && <p>Loading...</p>}
                                {error && <p>{error.message}</p>}
                                {themes.length > 0 && (
                                    themes.map((theme) => (
                                        <div className="themes-container" key={theme.id}>
                                            <Link to={`/themes/${theme.name}`}>
                                                <h3>{theme.name}</h3>
                                            </Link>
                                        </div>
                                    )))}
                            </div>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default ThemesPage;
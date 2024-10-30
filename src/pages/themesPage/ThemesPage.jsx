import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {Link} from "react-router-dom";
import useClosedThemes from "../../components/useClosedThemes/UseClosedThemes.jsx";


function ThemesPage() {
    const {closedThemes, loading, error} = useClosedThemes();


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
                                {closedThemes.length > 0 && (
                                    closedThemes.map((theme) => (
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
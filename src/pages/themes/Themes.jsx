import AsideMenu from "../../components/layout/asideMenu/AsideMenu.jsx";
import {Link} from "react-router-dom";
import UseThemes from "../../hooks/useThemes/UseThemes.jsx";


function Themes() {
    const { themes, loading, error } = UseThemes(`http://localhost:8080/themes/closed`)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <section className='themes-section outer-content-container'>
            <div className='themes-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section small-section">
                        <h2 className="themes-title titles">All themes</h2>
                        <div className='themes-container container'>
                            <div className="themes-menu-component">
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

export default Themes;
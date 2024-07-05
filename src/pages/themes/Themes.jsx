import "./Themes.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import ThemesMenu from "../../components/themesMenu/ThemesMenu.jsx";

function Themes() {
    return (
        <section className='themes-section outer-content-container'>
            <div className='themes-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="themes-titles">Stories by theme</h2>
                        <ThemesMenu
                            themeNavId="themes-nav"
                        />
                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default Themes;
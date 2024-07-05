import "./Themes.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import ThemesMenu from "../../components/themesMenu/ThemesMenu.jsx";

function Themes() {
    return (
        <section className='themes-section outer-content-container'>
            <div className='themes-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
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
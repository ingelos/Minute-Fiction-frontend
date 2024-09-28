import "./ThemesPage.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import ThemesMenu from "../../components/themesMenu/ThemesMenu.jsx";


function ThemesPage() {

    return (
        <section className='themes-section outer-content-container'>
            <div className='themes-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className='themes-container'>
                        <h2 className="themes-titles">All themes</h2>
                            <ThemesMenu />
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default ThemesPage;
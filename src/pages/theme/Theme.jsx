import "./Theme.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useParams} from "react-router-dom";

function Theme() {

    const { themeId } = useParams();

    return (
        <section className="theme-section outer-content-container">
            <div className="theme-section inner-content-container">
                <div className="main-container">
                    <article className="featured-section">
                        <h2 id="theme-title">{themeId} stories</h2>
                        <div className="stories-container">
                        </div>
                    </article>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default Theme;
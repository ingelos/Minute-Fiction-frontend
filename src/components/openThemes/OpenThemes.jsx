import "./OpenThemes.css";
import ThemeCard from "../common/themeCard/ThemeCard.jsx";
import {Link} from "react-router-dom";
import UseThemes from "../../hooks/useThemes/UseThemes.jsx";



function OpenThemes({showSubmitButton, overview, variant}) {
    const {themes, loading, error} = UseThemes(`http://localhost:8080/themes/open`);
    const containerClassName = variant === 'aside' ? 'themes-container-aside' : 'themes-container-page';

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {themes.length > 0 && (
                themes.map((theme) => (
                        <div className={`themes-container ${containerClassName}`} key={theme.id}>
                            <ThemeCard
                                themeName={theme.name}
                                description={theme.description}
                                openDate={theme.openDate}
                                closingDate={theme.closingDate}
                                themeId={theme.id}
                                overview={overview}
                            />
                            {showSubmitButton && (
                                <Link to={`/submit/${theme.id}`}>
                                    <h4 className="link-button-style">Submit</h4>
                                </Link>

                            )}
                        </div>
                    )))}
        </div>
    )
}

export default OpenThemes;
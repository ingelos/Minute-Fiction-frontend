import "./OpenThemes.css";
import ThemeCard from "../themeCard/ThemeCard.jsx";
import {Link} from "react-router-dom";
import UseOpenThemes from "../useOpenThemes/UseOpenThemes.jsx";


function OpenThemes({showSubmitButton, overview, variant}) {
    const {openThemes, loading, error} = UseOpenThemes();
    const containerClassName = variant === 'aside' ? 'themes-container-aside' : 'themes-container-page';

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {openThemes.length > 0 ? (
                openThemes.map((theme) => (
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
                    ))) : (
                        <p className="no-themes">None</p>
            )}
        </div>
    )
}

export default OpenThemes;
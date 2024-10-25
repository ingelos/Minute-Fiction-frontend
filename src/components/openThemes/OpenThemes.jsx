import "./OpenThemes.css";
import ThemeCard from "../themeCard/ThemeCard.jsx";
import {Link} from "react-router-dom";
import UseOpenThemes from "../useOpenThemes/UseOpenThemes.jsx";


function OpenThemes({showSubmitButton}) {
    const {openThemes, loading, error} = UseOpenThemes();


    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {openThemes.length > 0 && (
                openThemes.map((theme) => (
                        <div className="themes-container" key={theme.id}>
                            <ThemeCard
                                themeName={theme.name}
                                description={theme.description}
                                openDate={theme.openDate}
                                closingDate={theme.closingDate}
                            />
                            {showSubmitButton && (
                                <Link to={`/submit/${theme.name}`}>
                                    <h4 className="submit-story-link">Submit</h4>
                                </Link>
                            )}
                        </div>
                    )))}
        </div>
    )
}

export default OpenThemes;
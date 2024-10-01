
import ThemeCard from "../themeCard/ThemeCard.jsx";
import {Link} from "react-router-dom";
import UseOpenThemes from "../useOpenThemes/UseOpenThemes.jsx";


function OpenThemes({showSubmitButton}) {
    const { themes, loading, error} = UseOpenThemes();


    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p className="no-themes">No open themes available at this moment.</p>}
            {themes.length > 0 && (
                themes.map((theme) => (
                    <div className="themes-container" key={theme.id}>
                        <ThemeCard
                            themeName={theme.themeName}
                            description={showSubmitButton ? theme.description : null}
                            openDate={theme.openDate}
                            closingDate={theme.closingDate}
                        />
                        {showSubmitButton && (
                            <Link to={`/stories/submit/${theme.id}`}>
                                <h2>Submit your story here</h2>
                            </Link>
                        )}
                    </div>
                )))}
        </div>
    )

}

export default OpenThemes;
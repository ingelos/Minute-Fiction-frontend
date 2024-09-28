
import OpenThemeCard from "../openThemeCard/OpenThemeCard.jsx";
import {Link} from "react-router-dom";
import UseThemes from "../useThemes/UseThemes.jsx";


function OpenThemes({showSubmitButton}) {
    const { themes: openThemes, loading, error} = UseThemes({isOpen: true});


    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p></p>}
            {openThemes.length > 0 ? (
                openThemes.map((theme) => (
                    <div className="themes-container" key={theme.id}>
                        <OpenThemeCard
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
                ))
            ) : (
                <p className="no-themes">No open themes</p>
            )}
        </div>
    )

}

export default OpenThemes;
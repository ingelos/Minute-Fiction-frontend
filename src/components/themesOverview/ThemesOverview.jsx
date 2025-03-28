import {Link} from "react-router-dom";
import UseThemes from "../../hooks/useThemes/UseThemes.jsx";

function ThemesOverview() {
    const {themes, loading, error} = UseThemes(`http://localhost:8080/themes/closed`);


    return (
        <div className="themes-menu-component">
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {themes.length > 0 ? (
                themes.map((theme) => (
                    <div className="themes-list" key={theme.id}>
                        <Link to={`/themes/${theme.name}`}>
                            <h4>{theme.name}</h4>
                        </Link>
                    </div>
                ))) : (
                    <p className="no-themes">No themes available</p>
            )}
        </div>
    );
}

export default ThemesOverview;
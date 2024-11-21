import {Link} from "react-router-dom";
import useClosedThemes from "../useClosedThemes/UseClosedThemes.jsx";

function ThemesOverview() {
    const {closedThemes, loading, error} = useClosedThemes();


    return (
        <div className="themes-menu-component">
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {closedThemes.length > 0 ? (
                closedThemes.map((theme) => (
                    <div className="themes-list" key={theme.id}>
                        <Link to={`/themes/${theme.name}`}>
                            <h4>{theme.name}</h4>
                        </Link>
                    </div>
                ))) : (
                    <p className="no-themes"></p>
            )}
        </div>
    );
}

export default ThemesOverview;
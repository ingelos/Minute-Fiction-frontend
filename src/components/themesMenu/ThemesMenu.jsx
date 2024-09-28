import {Link} from "react-router-dom";
import useThemes from "../useThemes/UseThemes.jsx";

function ThemesMenu() {
    const {themes, loading, error} = useThemes({isOpen: false});

    return (

        <div className="themes-menu-component">
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}

            {themes.length > 0 ? (
                themes.map((theme) => (
                    <div className="themes-container" key={theme.id}>
                        <Link to={`/published/themes/${themeName}`}>
                            <h2>{theme.themeName}</h2>
                        </Link>
                    </div>
                ))
            ) :
                <p>No themes at this moment</p>
            })
        </div>
    );
}

export default ThemesMenu;
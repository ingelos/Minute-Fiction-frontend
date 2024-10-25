import {Link, useParams} from "react-router-dom";
import useThemes from "../useThemes/UseThemes.jsx";
import {TailSpin} from "react-loader-spinner";

function ThemesOverview() {
    const {themes, loading, error} = useThemes();
    const {themeName} = useParams();

    return (

        <div className="themes-menu-component">
            {loading && <TailSpin color="#000000" width={35} height={35}/>}
            {error && <p>{error.message}</p>}
            {themes.length > 0 && (
                themes.map((theme) => (
                    <div className="themes-list" key={theme.id}>
                        <Link to={`/themes/${themeName}`}>
                            <h5>{theme.name}</h5>
                        </Link>
                    </div>
                )))
            }
            {/*// ) :*/}
            {/*//     <p>No themesPage at this moment</p>*/}
            {/*// })*/}
        </div>
    );
}

export default ThemesOverview;
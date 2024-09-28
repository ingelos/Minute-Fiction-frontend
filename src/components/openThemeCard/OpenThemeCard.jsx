import "./OpenThemeCard.css"
import {Link} from "react-router-dom";

function OpenThemeCard({themeName, description, openDate, closingDate}) {

    return (
        <div className="open-theme-card">
            <Link to={`/themes/${themeName}`}>
                <h2>{themeName}</h2>
            </Link>
            <p>{description}</p>
            <p>Open Date: {openDate}</p>
            <p>Closing Date: {closingDate}</p>
        </div>
    );
}

export default OpenThemeCard;
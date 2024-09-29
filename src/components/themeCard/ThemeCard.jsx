import "./ThemeCard.css"
import {Link} from "react-router-dom";

function ThemeCard({themeName, description, openDate, closingDate}) {

    return (
        <div className="open-theme-card">
            <Link to={`/themes/${themeName}`}>
                <h2>Name: {themeName}</h2>
            </Link>
            <p>Description: {description}</p>
            <p>Open Date: {openDate}</p>
            <p>Closing Date: {closingDate}</p>
        </div>
    );
}

export default ThemeCard;
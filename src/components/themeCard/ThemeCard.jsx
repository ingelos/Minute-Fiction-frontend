import "./ThemeCard.css"
import {formatClosingDate, formatOpenDate} from "../../helpers/dateFormatter.js";
import {Link} from "react-router-dom";

function ThemeCard({themeName, description, openDate, closingDate, overview = false}) {
    const formattedDateOpens = formatOpenDate(openDate);
    const formattedDateCloses = formatClosingDate(closingDate);

    return (
        <div>
            <h3><Link to={`/submit/${themeName}`}>{themeName}</Link></h3>
            {overview &&
                <div>
                    <p>{description}</p>
                    <p>Opens: {formattedDateOpens}</p>
                </div>
            }
            {overview ? <p>Closes: {formattedDateCloses}</p>
                :
                <div>
                    <p>Submit before: </p>
                    <p>{formattedDateCloses}</p>
                </div>
            }
        </div>
    )
}
export default ThemeCard;
import "./ThemeCard.css"
import {Link} from "react-router-dom";
import {formatDate} from "../../helpers/dateFormatter.js";


function ThemeCard({themeName, description, openDate, closingDate, overview = false}) {

    const formattedDateOpens = formatDate(openDate);
    const formattedDateCloses = formatDate(closingDate);


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
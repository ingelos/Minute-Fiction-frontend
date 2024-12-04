import "./AuthorProfileCard.css";
import {formatDate} from "../../helpers/dateFormatter.js";


function AuthorProfileCard({firstname, lastname, username, bio, dob}) {
    const formattedDate = dob ? formatDate(dob) : 'Date not available';

    return (
        <div className="profile-detail-container">
            <h2 className="profile-author-name">{firstname} {lastname}</h2>
            <h3>Username: {username}</h3>
            <h3 className="author-dob">{dob ? `Born: ${formattedDate}` : ""}</h3>
            <h4 className="author-bio">{bio ? `Bio: ${bio}` : ""}</h4>
        </div>
    )
}

export default AuthorProfileCard;
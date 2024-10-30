import "./AuthorProfileCard.css";
import {formatDateDob} from "../../helpers/dateFormatter.js";


function AuthorProfileCard({firstname, lastname, username, bio, dob}) {
    const formattedDate = dob ? formatDateDob(dob) : 'Date not available';

    return (
        <div className="profile-detail-container">
            <div className="profile-author-name">
                <h2 className="profile-author-name">{firstname} {lastname}</h2>
            </div>
            <h4>Username: {username}</h4>
            <h4 className="author-dob">{dob ? `Born: ${formattedDate}` : ""}</h4>
            <p className="author-bio">{bio ? `Bio: ${bio}` : ""}</p>
        </div>
    )
}

export default AuthorProfileCard;
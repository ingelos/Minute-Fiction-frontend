import "./StoryDetailsCard.css";
import {Link} from "react-router-dom";
import {FaCircle} from "react-icons/fa";


function StoryDetailsCard({title, authorFirstname, authorLastname, storyContent, themeName, publishDate, storyId, preview = false}) {

    function truncateContent(content, wordLimit = 25) {
        const words = content.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + "..." : content;
    }

    return (
        <div className="story-detail-container">
            <div className="title-author-container">
                <h2 className="story-title">{title}</h2>
                <FaCircle className="icon" />
                {/*<img src={icon} alt="dot-icon" className="icon"/>*/}
                <h2 className="story-author-name">By {authorFirstname} {authorLastname}</h2>
            </div>
            <p className="publish-date">{publishDate} / Minute Fiction</p>
            <p className="story-content">{preview ? truncateContent(storyContent) : storyContent}</p>
            {preview && <p className="story-detail-link"><Link to={`/stories/published/${storyId}`}>Continue reading...</Link></p>}
            <div className="story-data">
                {!preview && <p>{themeName}</p>}
            </div>
        </div>
    )
}

export default StoryDetailsCard;
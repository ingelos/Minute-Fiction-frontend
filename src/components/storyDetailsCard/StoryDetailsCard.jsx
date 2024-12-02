import "./StoryDetailsCard.css";
import {Link} from "react-router-dom";
import {FaCircle, FaLongArrowAltRight} from "react-icons/fa";
import {formatDate} from "../../helpers/dateFormatter.js";


function StoryDetailsCard({
                              storyTitle,
                              authorFirstname,
                              authorLastname,
                              username,
                              storyContent,
                              themeName,
                              publishDate,
                              storyId,
                              preview = false,
                          }) {


    const formattedDate = publishDate ? formatDate(publishDate) : 'Date not available';

    function truncateContent(content, wordLimit = 25) {
        const words = content.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + "..." : content;
    }

    return (
        <div className="story-detail-container">
            <div className="title-author-container">
                <Link to={`/stories/${storyId}`}>
                    <h2 className="story-title">{storyTitle}</h2>
                </Link>
                <FaCircle className="icon"/>
                <Link to={`/authors/${username}`}>
                    <h2 className="story-author-name">By {authorFirstname} {authorLastname}</h2>
                </Link>
            </div>
            <p className="publish-date">{formattedDate} / Minute Fiction</p>
            <p className="story-content">{preview ? truncateContent(storyContent) : storyContent}</p>
            {preview &&
                <p className="story-detail-link">
                    <Link to={`/stories/${storyId}`} className="special-link">
                        Continue reading <FaLongArrowAltRight className="arrow-icon"/>
                    </Link>
                </p>
            }
            <div className="story-data">
                <p className="theme-name">Theme: {themeName}</p>
            </div>
        </div>
    )
}

export default StoryDetailsCard;
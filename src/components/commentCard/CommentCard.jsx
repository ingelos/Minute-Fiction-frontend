import "./CommentCard.css";
import {Link} from "react-router-dom";
import {formatDateTime} from "../../helpers/dateFormatter.js";

function CommentCard({commentOwner, commentCreated, content, currentUsername, storyId, commentId}) {
    const isOwner = currentUsername === commentOwner;
    const formattedDateTime = formatDateTime(commentCreated);

    return (

        <div className="comment-container">
            <div>
                <div className="content-container">
                    <p>{content}</p>
                </div>
                <div className="comment-data">
                    <h4 className="comment-owner">By {commentOwner} </h4>
                    <h4 className="comment-created">At {formattedDateTime}</h4>
                </div>
            </div>
            <div>
                {isOwner && (
                    <div className="edit-comment-links">
                        <Link to={`/stories/${storyId}/comments/${commentId}/edit`} className="edit-link">Edit</Link>
                    </div>
                )}
            </div>
        </div>

    )
}

export default CommentCard;
import "./CommentCard.css";

function CommentCard({commentOwner, commentCreated, content}) {

    return (
        <div className="comment-container">
            <div className="content-container">
                <h3>{content}</h3>
            </div>
            <div className="comment-data">
                <h4>By {commentOwner} </h4>
                <h4 className="comment-created">At {commentCreated}</h4>
            </div>
        </div>
    )
}

export default CommentCard;
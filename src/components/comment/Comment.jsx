function Comment({commentOwner, commentCreated, content}) {

    return (
        <div className="comment-container">
            <div className="content-container">
                <p>{content}</p>
            </div>
            <div className="comment-user-data">
                <h3>{commentOwner}</h3>
                <h4>{commentCreated}</h4>
            </div>

        </div>
    )
}

export default Comment;
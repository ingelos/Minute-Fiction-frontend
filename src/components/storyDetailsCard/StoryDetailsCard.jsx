function StoryDetailsCard({title, authorFirstname, authorLastname, storyContent, themeName, publishDate}) {

    return (
        <div className="story-detail-container">
            <h3 className="story-title">{title}</h3>
            <div className="story-author-name">
                <h4 className="story-author-firstname">{authorFirstname}</h4>
                <h4 className="story-author-lastname">{authorLastname}</h4>
            </div>
            <p className="story-content">{storyContent}</p>
            <div className="story-data">
                <h5>{themeName}</h5>
                <h5>{publishDate}</h5>
            </div>

        </div>
    )
}

export default StoryDetailsCard;
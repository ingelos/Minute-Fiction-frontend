
function StoryList({ stories, onAccept, onDecline, onPublish, onBulkPublish, mode}) {

    return (
        <ul>
            {stories.length === 0 && <p>No stories available</p>}
            {stories.map((story) => (
                <li className="story-container" key={story.id}>
                    <div className="story-list">
                        <h2>{story.title}</h2>
                        <p>{story.content}</p>
                        <div className="story-author-name">
                            <p>{story.authorFirstname}</p>
                            <p>{story.authorLastname}</p>
                        </div>
                    </div>

                    <div className="stories-edit-status">
                        {mode === 'review' && (
                            <>
                            <button onClick={() => onAccept(story.id)}>Accept story</button>
                            <button onClick={() => onDecline(story.id)}>Decline story</button>
                            </>
                        )}
                        {mode === 'publish' && (
                            <>
                                <button onClick={() => onPublish(story.id)}>Publish story</button>
                                <button onClick={onBulkPublish}>Decline story</button>
                            </>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default StoryList;
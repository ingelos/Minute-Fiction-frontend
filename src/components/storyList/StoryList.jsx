
function StoryList({ stories }) {

    return (
        <ul>
            {stories.length === 0 && <p>No stories available</p>}
            {stories.map((story) => (
                <li className="story-container" key={story.id}>
                    <div className="story-list">
                        <h2>Title: {story.title}</h2>
                        <p>Content: {story.content}</p>
                        <p>Theme: {story.themeName}</p>
                        <div className="story-author-name">
                            <p>Author: {story.authorFirstname} {story.authorLastname}</p>
                        </div>
                        <p>Status: {story.status}</p>
                        {story.status === 'published' && (
                            <p>Published on: {story.publishDate}</p>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default StoryList;
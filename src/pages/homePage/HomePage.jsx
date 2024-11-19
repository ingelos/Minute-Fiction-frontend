import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useState} from "react";
import StoryDetailsCard from "../../components/storyDetailsCard/StoryDetailsCard.jsx";
import useRecentStories from "../../components/useRecentStories/UseRecentStories.jsx";

function HomePage() {
    const [page, setPage] = useState(0);
    const limit = 20;
    const offset = page * limit;
    const {stories, loading, error} = useRecentStories({limit, offset});

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 0));


    return (
        <section className='home-section outer-content-container'>
            <div className='home-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="homepage-title titles">Recent Stories</h2>
                        <div className="recent-stories-container">
                            {loading && <p>Loading...</p>}
                            {error && <p>{error.message}</p>}
                            {stories.length > 0 ?
                                stories.map((story) => (
                                    <div className="story-container" key={story.id}>
                                        <StoryDetailsCard
                                            title={story.title}
                                            storyContent={story.content}
                                            authorFirstname={story.authorFirstname}
                                            authorLastname={story.authorLastname}
                                            themeName={story.themeName}
                                            publishDate={story.publishDate}
                                            storyId={story.id}
                                            preview={true}
                                        />
                                    </div>
                                )) : (
                                    <p>No recently published stories</p>
                                )}
                        </div>
                        <div className="pagination-buttons">
                            <button onClick={handlePreviousPage} disabled={page === 0}>
                                Previous
                            </button>
                            <button onClick={handleNextPage} disabled={stories.length < limit}>
                                Next
                            </button>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default HomePage;
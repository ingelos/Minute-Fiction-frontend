import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import StoryDetailsCard from "../../components/storyDetailsCard/StoryDetailsCard.jsx";

function HomePage() {

    const [stories, setStories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRecentStories() {
            setLoading(true);
            setError(false);

            try {
                const {data} = await axios.get(`http://localhost:8080/stories/published`, {
                    signal: controller.signal,
                });
                console.log(data);
                setStories(data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Request is cancelled', error);
                } else {
                    console.error(error);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchRecentStories();

        return function cleanup() {
            controller.abort();
        }
}, []);


    return (
        <section className='home-section outer-content-container'>
            <div className='home-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="homepage-title titles">Recent Stories</h2>
                        <div className="recent-stories-container">
                            {loading && <p>Loading...</p>}
                            {error && <p>{error.message}</p>}
                            <div>
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
                                            preview={true}
                                        />
                                    </div>
                                )) : (
                                    <p>No recently published stories</p>
                                    )}
                            </div>
                            <h3 className="prev-link pagination">Older Stories</h3>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default HomePage;
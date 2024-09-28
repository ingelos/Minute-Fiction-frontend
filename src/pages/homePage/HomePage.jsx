import "./HomePage.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import StoryDetailsPage from "../storyDetailsPage/StoryDetailsPage.jsx";

function HomePage() {

    const [stories, setStories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController()

        async function fetchRecentStories() {
            setError(false);
            setLoading(true);

            try {
                const{data} = await axios.get(`http://localhost:8080/stories/published`, {
                    signal: controller.signal,
                });
                console.log(data);
                setStories(data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Request is cancelled');
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
                        <div className="recent-stories-container">
                            {loading && <p>Loading...</p>}
                            {error && <p>Something went wrong... try reloading the page</p>}
                            <div>
                                {stories.map((story) => (
                                    <div className="story-container" key={story.key}>
                                        <StoryDetailsPage
                                            title={story.title}
                                            storyContent={story.content}
                                            authorFirstname={story.authorFirstname}
                                            authorLastname={story.authorLastname}
                                            themeName={story.themeName}
                                            publishDate={story.publishDate}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default HomePage;
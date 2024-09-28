import "./ThemePage.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import StoryDetailsPage from "../storyDetailsPage/StoryDetailsPage.jsx";

function ThemePage() {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { themeName } = useParams();

    useEffect(() => {
        const controller = new AbortController();

        async function fetchStoriesByTheme() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/stories/published/themes/${themeName}`, {
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

            fetchStoriesByTheme()

        return function cleanup() {
            controller.abort();
        }

    }, []);



    return (
        <section className="theme-section outer-content-container">
            <div className="theme-section inner-content-container">
                <div className="main-container">
                    <article className="featured-section">
                        <h2 id="theme-title">{themeName} stories</h2>
                        <div className="stories-container">
                            {error && <p>Error...</p>}
                            {loading ? <p>Loading...</p> : (
                            stories.length > 0 ? (
                                <>
                                    {stories?.map((story) => (
                                        <StoryDetailsPage
                                            title={story.title}
                                            storyContent={story.content}
                                            authorFirstname={story.authorFirstname}
                                            authorLastname={story.authorLastname}
                                            publishDate={story.publishDate}
                                        />
                                    ))}
                                </>
                            ) : (
                                <p>No stories for this theme yet</p>
                            ))}
                        </div>
                    </article>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default ThemePage;
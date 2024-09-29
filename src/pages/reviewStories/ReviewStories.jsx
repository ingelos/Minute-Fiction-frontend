import {useEffect, useState} from "react";
import axios from "axios";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import StoryList from "../../components/storyList/StoryList.jsx";
import EditorNavigation from "../../components/editorNavigation/EditorNavigation.jsx";

function ReviewStories() {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchStories() {
            setError(false);

            try {
                setLoading(true);
                const {data} = await axios.get(`http://localhost:8080/stories/submitted`, {
                    signal: signal,
                });
                setStories(data);
            } catch (error) {
                console.error('Error fetching submitted stories:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchStories();

        return function cleanup() {
            controller.abort();
        }
    }, []);


    async function handleAcceptStory(storyId) {
        try {
            await axios.patch(`http://localhost:8080/stories/accept/${storyId}`)
        } catch (error) {
            console.error("Error accepting story:", error);
        }
    }

    async function handleDeclineStory(storyId) {
        try {
            await axios.patch(`http://localhost:8080/stories/decline/${storyId}`)
        } catch (error) {
            console.error("Error declining story:", error);
        }
    }


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <EditorNavigation/>
                        <div className='stories-container'>
                            <h2 className="stories-title">Review Submitted Stories</h2>
                            <EditorCheck>
                                {error && <p>{error.message}</p>}
                                {loading ? <p>Loading...</p> :
                                    <StoryList
                                        stories={stories}
                                        onAccept={handleAcceptStory}
                                        onDecline={handleDeclineStory}
                                        mode="review"
                                    />
                                }
                            </EditorCheck>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default ReviewStories;
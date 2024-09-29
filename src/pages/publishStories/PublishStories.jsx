import {useEffect, useState} from "react";
import axios from "axios";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import EditorNavigation from "../../components/editorNavigation/EditorNavigation.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import StoryList from "../../components/storyList/StoryList.jsx";

function PublishStories({stories}) {
    const [acceptedStories, setAcceptedStories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function fetchAcceptedStories() {
            try {
                setLoading(true);
                const {data} = await axios.get(`http://localhost:8080/stories/accepted`)
                console.log(data);
                setAcceptedStories(data);
            } catch (error) {
                console.error('Error fetching accepted stories', error);
                setError(true);
            }
        }
        fetchAcceptedStories();
    }, []);


    async function handleBulkPublishByTheme(themeId) {
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/themes/${themeId}/publish`)
            console.log(data);
        } catch (error) {
            console.error('Error publishing stories for this theme', error);
        }
    }

    async function handlePublishByStory(storyId) {
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/${storyId}/publish`)
            console.log(data);
        } catch (error) {
            console.error('Error publishing story', error);
        }
    }


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <EditorNavigation/>
                        <div className='stories-container'>
                            <h2>Publish Accepted Stories</h2>
                            <EditorCheck>
                                {error && <p>{error.message}</p>}
                                {loading ? <p>Loading...</p> :
                                    <StoryList
                                        stories={acceptedStories}
                                        onPublish={handlePublishByStory}
                                        onBulkPublish={handleBulkPublishByTheme}
                                        mode="publish"
                                    />
                                }
                            </EditorCheck>
                        </div>
                        )
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default PublishStories;
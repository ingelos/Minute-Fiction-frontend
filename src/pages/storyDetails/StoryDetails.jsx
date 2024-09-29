import "./StoryDetails.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CommentCard from "../../components/commentCard/CommentCard.jsx";

function StoryDetails() {

    const [story, setStory] = useState({});
    const [comments, setComments] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {storyId} = useParams();

    useEffect(() => {
        const controller = new AbortController();

        async function getStoryDetails() {
            setError(false);

            try {
                setLoading(true);
                const {data} = await axios.get(`http://localhost:8080/stories/published/${storyId}.json`, {
                    signal: controller.signal,
                })
                console.log(data);
                setStory(data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error("request is cancelled");
                } else {
                    console.error(e);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        }

        async function getCommentsOnStory() {
            try {
                setLoading(true);
                const {data} = await axios.get(`http://localhost:8080/stories/${storyId}/comments.json`, {
                    signal: controller.signal,
                })
                console.log(data);
                setComments(data.comments);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error("request is cancelled");
                } else {
                    console.error(e);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        }

        getStoryDetails();
        getCommentsOnStory();

        return function cleanup() {
            controller.abort();
        }

    }, [storyId]);


    return (
        <section className='story-section outer-content-container'>
            <div className='story-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        <div className="story-card">
                            {Object.keys(story).length > 0 &&
                                <StoryDetailsCard
                                    title={story.title}
                                    storyContent={story.content}
                                    authorFirstname={story.authorFirstname}
                                    authorLastname={story.authorLastname}
                                    themeName={story.themeName}
                                    publishDate={story.publishDate}
                                />
                            }
                        </div>
                        <div className="comments-section">
                            {comments.length > 0 && (
                                comments?.map((comment) => (
                                    <div className="comment-list-container" key={comment.key}>
                                        <CommentCard
                                            content={comment.content}
                                            commentCreated={comment.created}
                                            commentOwner={comment.username}
                                        />
                                    </div>
                                ))
                            // ): (
                            //         <p></p>
                            )}
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default StoryDetails;
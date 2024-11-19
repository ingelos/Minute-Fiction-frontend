import "./StoryDetailsPage.css";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import CommentCard from "../../components/commentCard/CommentCard.jsx";
import StoryDetailsCard from "../../components/storyDetailsCard/StoryDetailsCard.jsx";
import CommentForm from "../../components/commentForm/CommentForm.jsx";
import AuthContext from "../../context/AuthContext.jsx";


function StoryDetailsPage() {
    const [story, setStory] = useState({});
    const [comments, setComments] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {user} = useContext(AuthContext);
    const currentUsername = user?.username;
    const {storyId} = useParams();


    useEffect(() => {
        const controller = new AbortController();

        async function getStoryDetails() {
            setError(false);

            try {
                setLoading(true);
                const {data} = await axios.get(`http://localhost:8080/stories/published/${storyId}`, {
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
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/stories/${storyId}/comments`, {
                    signal: controller.signal,
                })
                console.log(data);
                setComments(data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error("request is cancelled");
                } else {
                    console.error('Error', error);
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


    async function handleSubmitComment(commentData) {
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.post(`http://localhost:8080/stories/${storyId}/comments`,
                commentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            console.log('Comment created:', data);
        } catch (error) {
            if (error.response) {
                console.error('Error creating comment:', error.response.data);
                console.error('Status:', error.response.status);
            } else {
                console.error('Network error:', error.message);
            }
        }
    }




    return (
        <section className='story-section outer-content-container'>
            <div className='story-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className="story-detailpage-container">
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
                                        preview={false}
                                    />
                                }
                            </div>
                            <div className="comments-section">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div className="comment-list-container" key={comment.id}>
                                            <CommentCard
                                                content={comment.content}
                                                commentCreated={comment.created}
                                                commentOwner={comment.username}
                                                commentId={comment.id}
                                                currentUsername={currentUsername}
                                                storyId={story.id}
                                            />
                                        </div>
                                    ))) : (
                                    <h4 className="no-comments">Be the first to leave a comment!</h4>
                                )}
                            </div>
                            <CommentForm
                                onSubmit={handleSubmitComment}
                                isEditing={false}/>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default StoryDetailsPage;
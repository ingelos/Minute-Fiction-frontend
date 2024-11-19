import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import CommentForm from "../../components/commentForm/CommentForm.jsx";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";


function EditCommentPage() {
    const [error, setError] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const { commentId } = useParams();
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        async function fetchComment() {
            try {
                const {data} = await axios.get(`http://localhost:8080/comments/${commentId}`);
                setCommentContent(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching comment', error);
            }
        }

        fetchComment();
    }, [commentId]);


    async function handleUpdatingComment(commentId, updatedData) {
        console.log("Received commentId:", commentId);
        const token = localStorage.getItem('token');
        setError(false);

        try {
            const {data} = await axios.patch(`http://localhost:8080/comments/${commentId.id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            console.log('Comment form data:', data);
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    }

    async function handleDeleteComment(commentId) {
        try {
            await axios.delete(`http://localhost:8080/comments/${commentId}`);
            console.log('Comment deleted.');
        } catch (error) {
            console.error('Error deleting the comment', error);
        }
    }


    // if (editingCommentId) {
    //     await handleSubmitComment({ id: editingCommentId, ...commentData});
    //     setEditingCommentId(null);
    //     setEditingContent(null);
    // } else {
    //     await handleSubmitComment(commentData);
    // }


    //
    // async function handleEditComment(comment) {
    //     setEditingCommentId(comment.id);
    //     setEditingContent({ content: comment.content });
    // }




    return (
        <section className='comment-section outer-content-container'>
            <div className='comment-section inner-content-container'>
                <div className='main-container'>
                        <div className="featured-section">
                            <div className='themes-container'>
                                <h2 className="comment-title titles">Edit Comment</h2>
                                <h4 className="back-link"><Link to={"/stories/${storyId}/comments/${commentId}"}>Go back to Story</Link></h4>
                                <div>
                                    {commentContent ? (
                                        <CommentForm onSubmit={handleUpdatingComment} initialData={commentContent} isEditing={true}/>
                                    ) : (
                                        <p>Loading Comment...</p>
                                    )}
                                    {error && <p>{error.message}</p>}
                                </div>
                                <div className="delete-button">
                                    <button onClick={() => setModalOpen(true)} className="delete-button">
                                        Delete Comment
                                    </button>
                                    <Confirmation
                                        isOpen={isModalOpen}
                                        onClose={() => setModalOpen(false)}
                                        onConfirm={handleDeleteComment}
                                        title="Confirm Deletion"
                                        message="Are you sure you want to delete this comment?"
                                    />
                                </div>
                            </div>
                        </div>
                        <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditCommentPage;
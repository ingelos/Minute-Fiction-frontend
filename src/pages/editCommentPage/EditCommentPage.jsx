import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import CommentForm from "../../components/commentForm/CommentForm.jsx";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import Button from "../../components/button/Button.jsx";
import {FaLongArrowAltLeft, FaLongArrowAltRight} from "react-icons/fa";


function EditCommentPage() {

    const [error, setError] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const { commentId, storyId } = useParams();
    const [isModalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token');


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

        try {
            const {data} = await axios.patch(`http://localhost:8080/comments/${commentId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            setUpdateSuccess(true);
            console.log('Comment form data:', data);
        } catch (error) {
            setError(true);
            console.error('Error updating comment:', error);
        }
    }

    async function handleDeleteComment(commentId) {
        try {
            await axios.delete(`http://localhost:8080/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Comment deleted.');
            setDeleteSuccess(true);
        } catch (error) {
            setError(true);
            console.error('Error deleting the comment', error);
        }
    }


    return (
        <section className='comment-section outer-content-container'>
            <div className='comment-section inner-content-container'>
                <div className='main-container'>
                        <div className="featured-section">
                            <div className='themes-container'>
                                <h2 className="comment-title titles">Edit Comment</h2>
                                <h4 className="back-link">
                                    <FaLongArrowAltLeft className="arrow-icon"/>
                                    <Link to={`/stories/${storyId}`}>Back to Story</Link>
                                </h4>
                                {!deleteSuccess && !updateSuccess ? (
                                    <>
                                        <div>
                                            {commentContent && (
                                                <CommentForm onSubmit={(updatedData) => handleUpdatingComment(commentId, updatedData)}
                                                             initialData={commentContent}
                                                             isEditing={true}/>
                                            )}
                                            {error && <p>{error.message}</p>}
                                        </div>
                                        <div className="delete-section">
                                            <Button onClick={() => setModalOpen(true)}
                                                    className="delete-button"
                                                    buttonType="button"
                                                    buttonText="Delete Comment"
                                            />
                                            <Confirmation
                                                isOpen={isModalOpen}
                                                onClose={() => setModalOpen(false)}
                                                onConfirm={() => handleDeleteComment(commentId)}
                                                title="Confirm Deletion"
                                                message="Are you sure you want to delete this comment?"
                                            />
                                        </div>
                                    </>
                                ) : (
                                        <p>Done!</p>
                                )}
                            </div>
                        </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditCommentPage;
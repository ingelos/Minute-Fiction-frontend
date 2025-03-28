import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Confirmation from "../../components/layout/confirmation/Confirmation.jsx";
import CommentForm from "../../components/forms/commentForm/CommentForm.jsx";
import AsideMenu from "../../components/layout/asideMenu/AsideMenu.jsx";
import Button from "../../components/common/button/Button.jsx";
import {FaLongArrowAltLeft} from "react-icons/fa";
import OwnerCheck from "../../helpers/userChecks/OwnerCheck.jsx";
import AuthContext from "../../context/AuthContext.jsx";


function EditComment() {
    const {username} = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
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
            } catch (error) {
                console.error('Error fetching comment', error);
                setError(true);
            }
        }
        fetchComment();
    }, [commentId]);


    async function handleUpdatingComment(commentId, updatedData) {
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
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error('You are not authorized to edit this comment');
                setError('You are not authorized to edit this comment')
            } else {
                console.error('Error updating comment:', error);
                setError('Error updating comment');
            }
        }
    }

    async function handleDeleteComment(commentId) {
        try {
            await axios.delete(`http://localhost:8080/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDeleteSuccess(true);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error('You are not authorized to delete this comment');
                setDeleteError('You are not authorized to delete this comment')
            } else {
                console.error('Error deleting comment:', error);
                setDeleteError('Error deleting comment');
            }
        }
    }


    return (
        <section className='comment-section outer-content-container'>
            <div className='comment-section inner-content-container'>
                <div className='main-container'>
                        <div className="featured-section">
                            <OwnerCheck username={username}>
                            <div className='themes-container'>
                                <h2 className="comment-title titles">Edit Comment</h2>
                                <h4 className="back-link">
                                    <FaLongArrowAltLeft className="arrow-icon"/>
                                    <Link to={`/stories/${storyId}`}>Back to Story</Link>
                                </h4>
                                {error && <p className="error-message">{error}</p>}
                                {!deleteSuccess && !updateSuccess ? (
                                    <div className="update-comment-container">
                                        <div className="update-form">
                                            {commentContent && (
                                                <CommentForm onSubmit={(updatedData) => handleUpdatingComment(commentId, updatedData)}
                                                             initialData={commentContent}
                                                             isEditing={true}/>
                                            )}
                                        </div>
                                        {deleteError && <p className="error-message">{deleteError}</p>}
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
                                            />
                                        </div>
                                    </div>
                                ) : (
                                        <p>Done!</p>
                                )}
                            </div>
                            </OwnerCheck>
                        </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditComment;
import "./EditStoryPage.css";
import {useEffect, useState} from "react";
import axios from "axios";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {Link, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input.jsx";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";
import {FaLongArrowAltLeft} from "react-icons/fa";
import Button from "../../components/button/Button.jsx";
import useDeleteStory from "../../hooks/useDeleteStory/UseDeleteStory.jsx";

function EditStoryPage() {
    const {storyId} = useParams();
    const [story, setStory] = useState(null);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const { error: deleteError, loading: deleteLoading, deleteSuccess, modalOpen, setModalOpen, storyToDelete, openModal, handleDeleteStory} = useDeleteStory();
    const token = localStorage.getItem('token');

    useEffect(() => {

        async function fetchStory() {
            try {
                const {data} = await axios.get(`http://localhost:8080/stories/${storyId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStory(data);
                setValue('title', data.title);
                setValue('content', data.content);
                setError(false);

            } catch (error) {
                console.error('Error fetching story data:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchStory();
    }, [storyId, setValue]);


    async function handleUpdatingStory(formData) {
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editor/${storyId}/update`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setUpdateSuccess(true);
            console.log('Story updated:', data);
        } catch (error) {
            console.error('Error updating story:', error);
            setError(true);
        }
    }

    async function handleStatusChange(newStatus) {
        if (!storyId) return;
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editor/${storyId}/status`,
                {},
                {
                    params: {status: newStatus},
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log('Story updated:', data);

            setStory((prevStory) => ({
                ...prevStory,
                status: newStatus,
            }))
        } catch (error) {
            console.error('Error updating story:', error);
            setError(true);
        }
    }


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="edit-story titles">Edit Story</h2>
                            <div className="back-links">
                                <div className="back-link">
                                    <FaLongArrowAltLeft className='arrow-icon'/>
                                    <Link to="/editor/stories">Manage Stories</Link>
                                </div>
                            </div>

                            {!deleteSuccess && (
                                <div className='update-form-container'>
                                    {!updateSuccess ? (
                                        <>
                                            {story && (
                                                <div>
                                                    <h5>Username: {story.username}</h5>
                                                    <h5>Theme: {story.themeName}</h5>
                                                </div>
                                            )}

                                            <form onSubmit={handleSubmit(handleUpdatingStory)} className="text-form">
                                                <Input
                                                    inputType='text'
                                                    inputName='title'
                                                    inputId='title-field'
                                                    inputLabel='Title:'
                                                    validationRules={{
                                                        required: 'Title is required'
                                                    }}
                                                    register={register}
                                                    errors={errors}
                                                />
                                                <Input
                                                    inputType='textarea'
                                                    inputName='content'
                                                    inputId='story-content-field'
                                                    inputLabel='Content:'
                                                    validationRules={{
                                                        required: 'Content is required',
                                                        validate: (value) => {
                                                            const wordCount = value.trim().split(/\s+/).length;
                                                            return wordCount <= 100 || `Content exceeds the max word limit of a 100 words.`
                                                        },
                                                    }}
                                                    rows={15}
                                                    register={register}
                                                    errors={errors}
                                                />
                                                <Button buttonType="submit"
                                                        buttonText="Update Story"
                                                        className="submit-story-button"
                                                />
                                            </form>

                                            {loading && <p>Loading...</p>}
                                            {error && <p>{error.message}</p>}
                                            <div className="status-container">
                                                <label>Current Status: {story?.status}</label>
                                                <div className="status-content-container">
                                                    <label htmlFor="status-select">Change Status to:</label>
                                                    <select id="status-select"
                                                            value={story?.status}
                                                            onChange={(e) => handleStatusChange(e.target.value)}>
                                                        <option value="SUBMITTED">Submitted</option>
                                                        <option value="ACCEPTED">Accepted</option>
                                                        <option value="DECLINED">Declined</option>
                                                        {story?.status === "PUBLISHED" && (
                                                            <option value="SUBMITTED">Unpublish</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                        </>
                                    ) : (
                                        <div>
                                            <h5>Successfully Updated Story!</h5>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div>
                                {!deleteSuccess && !updateSuccess ? (
                                    <div className="delete-container">
                                        <Button onClick={() => openModal(story.id)}
                                                className="delete-button"
                                                buttonText="Delete Story"
                                                buttonType="button"
                                        />
                                        <Confirmation
                                            isOpen={modalOpen}
                                            onClose={() => setModalOpen(false)}
                                            onConfirm={() => handleDeleteStory(storyToDelete)}
                                            title="Confirm Deletion"
                                            message="Are you sure you want to delete this story? Please be certain."
                                        />
                                    </div>
                                ) : (!updateSuccess &&
                                        <h5>Successfully Deleted Story!</h5>
                                )}
                                {deleteError && <p>Error deleting story.</p>}
                                {deleteLoading && <p>Deleting story...</p>}
                            </div>
                        </div>
                        <AsideEditorMenu/>
                    </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default EditStoryPage;
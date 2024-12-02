import "./EditStoryPage.css";
import {useEffect, useState} from "react";
import axios from "axios";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {Link, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input.jsx";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";
import {FaLongArrowAltRight} from "react-icons/fa";

function EditStoryPage() {
    const {storyId} = useParams();
    const [story, setStory] = useState(null);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');

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
        const token = localStorage.getItem('token');
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editor/${storyId}/update`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setSuccess(true);
            console.log('Story updated:', data);
        } catch (error) {
            console.error('Error updating story:', error);
            setError(true);
        }
    }

    async function handleStatusChange(newStatus) {
        const token = localStorage.getItem('token');
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


    async function handleDeleteStory(storyId) {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/stories/${storyId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Story deleted.');
            setDeleteSuccess(true);
        } catch (error) {
            setError(true);
            console.error('Error deleting the story', error);
        }
    }

    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="edit-story titles">Edit Story</h2>
                            <div className="back-link">
                                <FaLongArrowAltRight className='arrow-icon'/>
                                <Link to="/editor/stories">Back to stories overview</Link>
                            </div>
                            <div className='update-form-container'>
                                {!success ? (
                                    <>
                                        <form onSubmit={handleSubmit(handleUpdatingStory)}>
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
                                            <button type='submit' className='submit-story-button'>
                                                Update Story
                                            </button>
                                        </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>{error.message}</p>}
                                        <div className="status-container">
                                            <label>Current Status: {story?.status}</label>
                                            <div className="status-content-container">
                                                <label htmlFor="status-select">Change Status to:</label>
                                                <select id="status-select"
                                                        value={story?.status || 'SUBMITTED'}
                                                        onChange={(e) => handleStatusChange(e.target.value)}>
                                                    <option value="SUBMITTED">Submitted</option>
                                                    <option value="ACCEPTED">Accepted</option>
                                                    <option value="DECLINED">Declined</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            {!deleteSuccess ? (
                                                <button onClick={() => setModalOpen(true)} className="delete-button">
                                                    Delete Story
                                                </button>

                                            ) : (
                                                <p>Successfully Deleted Story!</p>
                                            )}
                                            <Confirmation
                                                isOpen={isModalOpen}
                                                onClose={() => setModalOpen(false)}
                                                onConfirm={handleDeleteStory}
                                                title="Confirm Deletion"
                                                message="Are you sure you want to delete this story?"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <p>Story Updated Successfully!</p>
                                        <div className="back-link">
                                            <FaLongArrowAltRight className='arrow-icon'/>
                                            <Link to="/editor/stories">Back to stories overview</Link>
                                        </div>
                                    </div>
                                )}

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
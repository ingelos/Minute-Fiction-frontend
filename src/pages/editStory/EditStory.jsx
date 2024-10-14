import {useEffect, useState} from "react";
import axios from "axios";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import { useParams } from "react-router-dom";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input.jsx";
import DeletionConfirmation from "../../components/deletionConfirmation/DeletionConfirmation.jsx";

function EditStory() {
    const {storyId} = useParams();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [succes, setSucces] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        async function fetchStory() {
            setLoading(true);
            try {
                const {data} = await axios.get(`http://localhost:8080/stories/${storyId}`);
                setValue('title', data.title);
                setValue('content', data.content);
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
        setError(false);
        setSucces(false);
        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/${storyId}`, formData);
            setSucces(true);
            console.log('Story updated:', data);
        } catch (error) {
            console.error('Error updating story:', error);
            setError(true);
        }
    }


    async function handleDeleteStory(storyId) {
            try {
                await axios.delete(`http://localhost:8080/stories/${storyId}`);
                console.log('Story deleted.');
            } catch (error) {
                console.error('Error deleting the story', error);
            }
    }

    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="edit-story titles">Edit Story</h2>
                        <div className='update-form-container'>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error...</p>}
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
                                    inputType='text'
                                    inputName='story-content'
                                    inputId='story-content-field'
                                    inputLabel='Content:'
                                    validationRules={{
                                        required: 'Content is required',
                                        validate: (value) => {
                                            const wordCount = value.trim().split(/\s+/).length;
                                            return wordCount <= 100 || `Content exceeds the max word limit of a 100 words.`
                                        },
                                    }}
                                    register={register}
                                    errors={errors}
                                />
                                <button type='submit' className='submit-story-button'>
                                    Update Story
                                </button>
                            </form>

                            {succes && <p>Story Updated Successfully!</p>}

                            <button onClick={() => setModalOpen(true)} className="delete-button">
                                Delete Story
                            </button>
                            <DeletionConfirmation
                                isOpen={isModalOpen}
                                onClose={() => setModalOpen(false)}
                                onConfirm={handleDeleteStory}
                                title="Confirm Deletion"
                                message="Are you sure you want to delete this story?"
                            />
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>

    )


}

export default EditStory;
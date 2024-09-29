import {useForm} from "react-hook-form";
import {useState} from "react";
import Input from "../input/Input.jsx";
import axios from "axios";
import {useLocation} from "react-router-dom";

function SubmitStoryForm({themeId}) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const controller = new AbortController();
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const username = queryParams.get('username');


    async function handleUpdatingStory(formData) {
        try {
            const {data} = await axios.post(`http://localhost:8080/stories/submit/${themeId}`, {
                    title: formData.title,
                    content: formData.content,
                    username: username,
                    signal: controller.signal,
                });
            setSuccess(true);
            console.log('Form data:', data);
        } catch (error) {
            console.error(error, 'There was an error submitting your story.')
            setSuccess(false);
            setError(true);
        }
    }


    return (
        <form className='subit-form' onSubmit={handleSubmit(handleUpdatingStory)}>
            {error && <p>{error.message}</p>}
            {success && <p>Your story was successfully submitted!</p>}
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
                Submit Story
            </button>

        </form>
    )
}

export default SubmitStoryForm;
import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import Input from "../input/Input.jsx";
import axios from "axios";
import Button from "../button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import AuthenticateCheck from "../authenticateCheck/AuthenticateCheck.jsx";

function StoryForm({themeId}) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user } = useContext(AuthContext);
    
    async function handleUpdatingStory(formData) {
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.post(`http://localhost:8080/stories/submit/${themeId}?username=${user.username}`, {
                title: formData.title,
                content: formData.content,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
                });
            setSuccess(true);
            console.log('Form data:', data);
        } catch (error) {
            console.error('Error', error.message || error);
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
                inputType='textarea'
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
                rows={14}
                register={register}
                errors={errors}
            />
            <AuthenticateCheck>
                <Button
                    buttonType="submit"
                    className="submit-button"
                    buttonText="Submit Story"
                />
            </AuthenticateCheck>
        </form>
    )
}

export default StoryForm;
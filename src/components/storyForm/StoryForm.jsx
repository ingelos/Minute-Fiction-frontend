import {useForm} from "react-hook-form";
import Input from "../input/Input.jsx";
import {useEffect} from "react";


function StoryForm({onSubmit, isEditing, initialData, error}) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    useEffect(() => {
        if(isEditing && initialData) {
            reset(initialData);
        }
    }, [isEditing, initialData, reset]);

    async function handleSubmitStory(data) {
        onSubmit(data)
    }

    return (
        <div>
                <form className='subit-form' onSubmit={handleSubmit(handleSubmitStory)}>
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
                        rows={14}
                        register={register}
                        errors={errors}
                    />
                    <button type='submit' className='update-story-button'>
                        Submit Story
                    </button>
                    {/*<AuthenticateCheck>*/}
                    {/*    <Button*/}
                    {/*        buttonType="submit"*/}
                    {/*        className="submit-button"*/}
                    {/*        buttonText="Submit Story"*/}
                    {/*        onClick={handleSubmit}*/}
                    {/*    />*/}
                    {/*</AuthenticateCheck>*/}
                    {error && <p>Something went wrong submitting the form, please try again.</p>}
                </form>
        </div>

    )
}

export default StoryForm;
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";
import AuthenticateCheck from "../authenticateCheck/AuthenticateCheck.jsx";


function CommentForm({onSubmit, isEditing, initialData}) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    useEffect(() => {
        if(isEditing && initialData) {
            reset(initialData);
        }
    }, [isEditing, initialData, reset]);

    async function handleSubmitComment(commentData) {
        onSubmit(commentData);
    }


    return (
        <form className='subit-comment-form' onSubmit={handleSubmit(handleSubmitComment)}>
            <Input
                inputType='textarea'
                inputName='comment'
                inputId='comment-field'
                inputLabel='Your comment:'
                validationRules={{
                    required: 'Content is required'
                }}
                rows={2}
                register={register}
                errors={errors}
            />
            <AuthenticateCheck>
            <Button
                buttonType='submit'
                className='update-mailing-form'
                buttonText={isEditing ? 'Update Comment' : 'Submit Comment'}
            />
            </AuthenticateCheck>
        </form>
    )
}

export default CommentForm;
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Input from "../../common/input/Input.jsx";
import Button from "../../common/button/Button.jsx";
import AuthenticateCheck from "../../../helpers/userChecks/AuthenticateCheck.jsx";


function CommentForm({onSubmit, isEditing= false, initialData}) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    useEffect(() => {
        if (isEditing && initialData) {
            reset(initialData);
        }
    }, [isEditing, initialData, reset]);

    async function handleSubmitComment(commentData) {
        await onSubmit(commentData);
        reset();
    }


    return (
        <form className='subit-comment-form' onSubmit={handleSubmit(handleSubmitComment)}>
            <Input
                inputType='textarea'
                inputName='content'
                inputId='comment-field'
                inputLabel={isEditing ? 'Update comment:' : 'Add comment:'}
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
                    className='update-comment-form'
                    buttonText={isEditing ? 'Update Comment' : 'Submit Comment'}
                />
            </AuthenticateCheck>
        </form>
    )
}

export default CommentForm;
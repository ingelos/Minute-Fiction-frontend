import Input from "../input/Input.jsx";
import {useForm} from "react-hook-form";
import {useEffect} from "react";


function MailingForm({onSubmit, initialData, isEditing}) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    useEffect(() => {
        if(isEditing && initialData) {
            reset(initialData);
        }
    }, [isEditing, initialData, reset]);

    async function handleUpdatingMailing(data) {
        onSubmit(data);
    }


    return (

        <form className='subit-form' onSubmit={handleSubmit(handleUpdatingMailing)}>
            <Input
                inputType='text'
                inputName='mailing-title'
                inputId='title-field'
                inputLabel='Title:'
                validationRules={{
                    required: 'Mailing title is required'
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='textarea'
                inputName='mailing-content'
                inputId='mailing-content-field'
                inputLabel='Content:'
                validationRules={{
                    required: 'Content is required'
                }}
                register={register}
                errors={errors}
            />
            <button type='submit' className='update-mailing-button'>
                {isEditing ? 'Update Mailing' : 'Create Mailing'}
            </button>
        </form>
    )
}

export default MailingForm;
import Input from "../input/Input.jsx";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Button from "../button/Button.jsx";


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
                inputName='subject'
                inputId='subject-field'
                inputLabel='Subject:'
                validationRules={{
                    required: 'Mailing subject is required'
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='textarea'
                inputName='body'
                inputId='mailing-content-field'
                inputLabel='Body:'
                validationRules={{
                    required: 'Body is required'
                }}
                rows={20}
                register={register}
                errors={errors}
            />
            {/*<Input*/}
            {/*    inputType='date'*/}
            {/*    inputName='date'*/}
            {/*    inputId='mailing-date-field'*/}
            {/*    inputLabel='Date:'*/}
            {/*    validationRules={{*/}
            {/*        required: 'Date is required'*/}
            {/*    }}*/}
            {/*    register={register}*/}
            {/*    errors={errors}*/}
            {/*/>*/}
            <Button
                buttonType='submit'
                className='update-mailing-form'
                buttonText={isEditing ? 'Update Mailing' : 'Create Mailing'}
            />
        </form>
    )
}

export default MailingForm;
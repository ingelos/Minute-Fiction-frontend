import Input from "../input/Input.jsx";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Button from "../button/Button.jsx";


function ThemeForm({onSubmit, initialData, isEditing, error}) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    useEffect(() => {
        if(isEditing && initialData) {
            reset(initialData);
        }
    }, [isEditing, initialData, reset]);

    async function handleUpdatingTheme(data) {
        onSubmit(data);
    }


    return (
        <form className='subit-form' onSubmit={handleSubmit(handleUpdatingTheme)}>
            <Input
                inputType='text'
                inputName='themeName'
                inputId='themeName-field'
                inputLabel='Name:'
                validationRules={{
                    required: 'Theme name is required'
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='textarea'
                inputName='theme-description'
                inputId='theme-description-field'
                inputLabel='Description:'
                validationRules={{
                    required: 'Description is required'
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='date'
                inputName='theme-openDate'
                inputId='theme-openDate-field'
                inputLabel='Open Date:'
                validationRules={{
                    required: 'Open date is required'
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='date'
                inputName='theme-closingDate'
                inputId='theme-closingDate-field'
                inputLabel='Closing Date:'
                validationRules={{
                    required: 'Closing date is required'
                }}
                register={register}
                errors={errors}
            />
            <Button
                buttonType='submit'
                className='update-theme-button'
                buttonText={isEditing ? 'Update Mailing' : 'Create Mailing'}
            />

            {error && <p>Something went wrong submitting the form, please try again.</p>}
        </form>
    )
}

export default ThemeForm;
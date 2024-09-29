import Input from "../input/Input.jsx";
import {useForm} from "react-hook-form";
import {useEffect} from "react";


function ThemeForm({onSubmit, initialData, isEditing}) {
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
                inputId='themename-field'
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

            <button type='submit' className='update-theme-button'>
                {isEditing ? 'Update Theme' : 'Create Theme'}
            </button>
        </form>
    )
}

export default ThemeForm;
import Input from "../../common/input/Input.jsx";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Button from "../../common/button/Button.jsx";


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
                inputName='name'
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
                inputName='description'
                inputId='themeDescription-field'
                inputLabel='Description:'
                validationRules={{
                    required: 'Description is required'
                }}
                register={register}
                errors={errors}
                rows={4}
            />
            <Input
                inputType='date'
                inputName='openDate'
                inputId='themeOpenDate-field'
                inputLabel='Open Date:'
                validationRules={{
                    required: 'Open date is required'
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='date'
                inputName='closingDate'
                inputId='themeClosingDate-field'
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
                buttonText={isEditing ? 'Update Theme' : 'Create Theme'}
            />
        </form>
    )
}

export default ThemeForm;
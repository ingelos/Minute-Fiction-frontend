import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Input from "../input/Input.jsx";

function AuthorProfileForm({onSubmit, initialData, isEditing, error}) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    useEffect(() => {
        if(isEditing && initialData) {
            reset(initialData);
        }
    }, [isEditing, initialData, reset]);

    async function handleUpdatingAuthorProfile(data) {
        onSubmit(data);
    }

    return (

        <form className='create-profile-form' onSubmit={handleSubmit(handleUpdatingAuthorProfile)}>
            <Input
                inputType='text'
                inputName='firstname'
                inputId='firstname-field'
                inputLabel='First name: *'
                validationRules={{
                    required: 'First name is required',
                    minLength: {
                        value: 2,
                        message: 'Please enter a first name that is at least 2 characters long'
                    },
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='text'
                inputName='lastname'
                inputId='lastname-field'
                inputLabel='Last name: *'
                validationRules={{
                    required: 'Last name is required',
                    minLength: {
                        value: 3,
                        message: 'Please enter a last name that is at least 2 characters'
                    }
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='bio'
                inputName='bio'
                inputId='bio-field'
                inputLabel='Bio: *'
                validationRules={{
                    maxLength: {
                        value: 500,
                        message: 'Please do not exceed 500 characters',
                    }
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='date'
                inputName='dob'
                inputId='dob-field'
                inputLabel='Date of birth:'
                validationRules={{
                    validate: {
                        isValidDate: (value) => !isNaN(Date.parse(value)) || 'Invalid date format',
                    }
                }}
                register={register}
                errors={errors}
            />
            <p>* required</p>
            <button type='submit' className='update-profile-button'>
                {isEditing ? 'Update Author Profile' : 'Create Author Profile'}
            </button>
            {error && <p>Something went wrong submitting the form, please try again.</p>}
        </form>
    )
}

export default AuthorProfileForm;
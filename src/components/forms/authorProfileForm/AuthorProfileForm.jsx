import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Input from "../../common/input/Input.jsx";
import Button from "../../common/button/Button.jsx";

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
                inputType='textarea'
                inputName='bio'
                inputId='bio-field'
                inputLabel='Bio: *'
                validationRules={{
                    maxLength: {
                        value: 500,
                        message: 'Please do not exceed 500 characters',
                    }
                }}
                rows={5}
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
                        isPastDate: (value) =>
                            value ? new Date(value) < new Date() || 'Birth date must be in the past' : true,
                    }
                }}
                register={register}
                errors={errors}
                min="1900-01-01"
                max={new Date().toISOString().split('T')[0]}
            />
            <p>* required</p>
            <Button
                buttonType="submit"
                buttonText={isEditing ? 'Update Author Profile' : 'Create Author Profile'}
                className="update-profile-button"
            />
            {error && <p>Something went wrong submitting the form, please try again.</p>}
        </form>
    )
}

export default AuthorProfileForm;
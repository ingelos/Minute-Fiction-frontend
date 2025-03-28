import Input from "../../common/input/Input.jsx";
import Button from "../../common/button/Button.jsx";
import {useForm} from "react-hook-form";

function EmailForm({onSubmit}) {
    const {register, handleSubmit, formState: {errors}} = useForm()

    async function editEmail(data) {
        onSubmit(data);
    }

    return (
        <form className='edit-account-settings-form' onSubmit={handleSubmit(editEmail)}>
            <Input
                inputType='email'
                inputName='email'
                inputId='newEmail-field'
                inputLabel='New email: *'
                validationRules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email address',
                    }
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='password'
                inputName='currentPassword'
                inputId='currentPassword-field'
                inputLabel='Password: *'
                validationRules={{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'A password requires a minimum of 8 characters'
                    }
                }}
                register={register}
                errors={errors}
            />
            <Button
                buttonType="submit"
                buttonText="Save Email"
            />
        </form>
    )
}

export default EmailForm;
import Input from "../../common/input/Input.jsx";
import Button from "../../common/button/Button.jsx";
import {useForm} from "react-hook-form";

function PasswordForm( { onSubmit }) {
    const {register, handleSubmit, formState: {errors}, watch} = useForm()
    const newPassword = watch("newPassword");


    async function editPassword(data) {
        onSubmit(data);
    }

    return (
        <form className='edit-password-form' onSubmit={handleSubmit(editPassword)}>
            <Input
                inputType='password'
                inputName='newPassword'
                inputId='newPassword-field'
                inputLabel='New Password: *'
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
            <Input
                inputType='password'
                inputName='confirmPassword'
                inputId='confirmPassword-field'
                inputLabel='Confirm New Password: *'
                validationRules={{
                    required: 'Please confirm your password',
                    validate: (value) => value === newPassword || 'Passwords do not match'
                }}
                register={register}
                errors={errors}
            />
            <Button
                buttonType="submit"
                buttonText="Save password"
                className="button"
            />
        </form>
    )
}

export default PasswordForm;
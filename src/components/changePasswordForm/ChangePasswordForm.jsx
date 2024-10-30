// import Input from "../input/Input.jsx";
// import {useForm} from "react-hook-form";
//
// function ChangePasswordForm({onSubmit, error, newPassword}) {
//     const {register, handleSubmit, formState: {errors}} = useForm();
//
//     async function handleChangePassword(data) {
//         onSubmit(data);
//     }
//
//     return (
//
//         <form className='edit-password-form' onSubmit={handleSubmit(handleChangePassword)}>
//             {error && <p>{error.message}</p>}
//             <Input
//                 inputType='password'
//                 inputName='newPassword'
//                 inputId='new-password-field'
//                 inputLabel='New Password: *'
//                 validationRules={{
//                     required: 'Password is required',
//                     minLength: {
//                         value: 8,
//                         message: 'A password requires a minimum of 8 characters'
//                     }
//                 }}
//                 register={register}
//                 errors={errors}
//             />
//             <Input
//                 inputType='password'
//                 inputName='confirmPassword'
//                 inputId='confirm-password-field'
//                 inputLabel='Confirm New Password: *'
//                 validationRules={{
//                     required: 'Please confirm your password',
//                     validate: (value) => value === newPassword || 'Passwords do not match'
//                 }}
//                 register={register}
//                 errors={errors}
//             />
//             {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
//             <button type='submit'>Save password</button>
//         </form>
//     )
//
// }
//
// export default ChangePasswordForm;
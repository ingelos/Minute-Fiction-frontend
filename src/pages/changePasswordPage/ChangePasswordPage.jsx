import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import Input from "../../components/input/Input.jsx";
import {Link} from "react-router-dom";


function ChangePasswordPage() {

    const {register, handleSubmit, formState: {errors}, watch} = useForm()
    const {user} = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const token = localStorage.getItem('token');
    const newPassword = watch("newPassword");


    async function editPassword(formData) {
        try {
            const {data} = await axios.put(`https://localhost:8080/users/${user.username}`, {
                password: formData.newPassword,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Password successfully updated', data);
            setUpdateSuccess(true);
        } catch (error) {
            console.error('Error updating password', error);
            setError(true);
        }
    }


        return (
                <section className='edit-password-page outer-container'>
                    <div className='edit-password-page inner-container'>
                        <div className='account-settings-inner-content-container'>
                            {error && <p>Something went wrong... try to reload the page.</p>}
                            <h2>Change Password</h2>
                            {!updateSuccess ?
                                <div>
                                    <form className='edit-password-form' onSubmit={handleSubmit(editPassword)}>
                                        <Input
                                            inputType='password'
                                            inputName='newPassword'
                                            inputId='new-password-field'
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
                                            inputId='confirm-password-field'
                                            inputLabel='Confirm New Password: *'
                                            validationRules={{
                                                required: 'Please confirm your password',
                                                validate: (value) => value === newPassword || 'Passwords do not match'
                                                }}
                                            register={register}
                                            errors={errors}
                                        />
                                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

                                        <button type='submit'>Save password</button>
                                    </form>
                                    <p>Go back to Your Account<Link
                                        to={`/users/${user.username}`}><strong>here</strong></Link></p>
                                </div>
                                :
                                <div className='account-settings-succes'>
                                    <p>You have successfully updated your password!</p>
                                    <p>Go back to your account <Link
                                        to={`/users/${user.username}`}><strong>here.</strong></Link></p>
                                </div>
                            }
                        </div>
                    </div>
                </section>
        )
    }

    export default ChangePasswordPage;
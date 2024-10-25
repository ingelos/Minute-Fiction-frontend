import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import Input from "../../components/input/Input.jsx";
import {Link} from "react-router-dom";
import DeletionConfirmation from "../../components/deletionConfirmation/DeletionConfirmation.jsx";

function EditAccountDetailsPage() {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const [error, setError] = useState(false);
    const [submitSuccess, setSubmitSucces] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const {user} = useContext(AuthContext);
    const controller = new AbortController();

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    })

    async function editAccountDetails(formData) {
        setError(false);

        const token = localStorage.getItem('token');
        try {
            const {data} = await axios.put(`https://localhost:8080/users/${user.username}`, {
                email: formData.email,
                password: formData.password,
                subscription: formData.subscription,
                signal: controller.signal,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setSubmitSucces(true)
            console.log(data)
        } catch (e) {
            console.error(e);
            setError(true);
        }
        console.log(`Account details successfully updated`)
    }


    async function handleDeleteAccount(username) {
            try {
                await axios.delete(`http://localhost:8080/users/${username}`);
                console.log('Account deleted.');
            } catch (error) {
                console.error('Error deleting this account', error);
            }
    }

    return (
        <>
            <section className='edit-accountdetails-page outer-container'>
                <div className='edit-accountdetails-page inner-container'>
                    <div className='account-settings-inner-content-container'>
                        {error && <p>Something went wrong... try again.</p>}
                        <h2>Account Settings</h2>
                        {!submitSuccess ?
                            <div>
                                <div className='user-data'>
                                    <p><strong>Your personal information:</strong></p>
                                    <p>Username: {user.username}</p>
                                    <p>Email: {user.email}</p>
                                </div>
                                <form className='edit-account-settings-form' onSubmit={handleSubmit(editAccountDetails)}>
                                    <p>Enter your current or new email and password to change your account data:</p>
                                    <Input
                                        inputType='email'
                                        inputName='email'
                                        inputId='email-field'
                                        inputLabel='Email: *'
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
                                        inputName='newPassword'
                                        inputId='new-password-field'
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

                                    <div className='checkbox-container'>
                                        <input type="checkbox" id="subscription" name="mailing"/>
                                        <label htmlFor="mailing">I want to receive the mailing</label>
                                    </div>
                                    <button type='submit'>Save information</button>
                                </form>
                                <p>Go back to <Link to={`/users/:username`}><strong>Account</strong></Link></p>
                            </div>
                            :
                            <div className='account-settings-succes'>
                                <p>You have successfully updated your information!</p>
                                <p>Go back to your account <Link to={`/users/:username`}><strong>here.</strong></Link></p>
                            </div>
                        }
                        <button onClick={() => setModalOpen(true)} className="delete-account-button">
                            Delete Your Account
                        </button>
                        <DeletionConfirmation
                            isOpen={isModalOpen}
                            onClose={() => setModalOpen(false)}
                            onConfirm={handleDeleteAccount}
                            title="Confirm Account Deletion"
                            message="Are you sure you want to delete your account? Deletion cannot be undone."
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditAccountDetailsPage;
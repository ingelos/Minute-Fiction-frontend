import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import Input from "../../components/input/Input.jsx";
import {Link} from "react-router-dom";

function AccountSettingsPage() {

    const {register, handleSubmit, formState: {errors}, watch} = useForm()
    const [error, setError] = useState(false);
    const [submitSuccess, setSubmitSucces] = useState(null);
    const {user} = useContext(AuthContext);
    const controller = new AbortController();

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    })

    async function editAccountDetails(data) {
        setError(false);

        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`https://localhost:8080/users/${user}`, {
                email: data.email,
                password: data.password,
                signal: controller.signal,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setSubmitSucces(true)
            console.log(response)
        } catch (e) {
            console.error(e);
            setError(true);
        }
        console.log(`Account successfully updated`)
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
                                <p>Go back to <Link to={`/users/:userId`}><strong>Account</strong></Link></p>
                            </div>
                            :
                            <div className='account-settings-succes'>
                                <p>You've successfully updated your information!</p>
                                <p>Go back to your account <Link to={`/users/:userId`}><strong>here.</strong></Link></p>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default AccountSettingsPage;
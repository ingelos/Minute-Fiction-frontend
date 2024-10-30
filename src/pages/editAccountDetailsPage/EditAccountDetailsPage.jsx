import "./EditAccountDetailsPage.css";
import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import Input from "../../components/input/Input.jsx";
import {Link} from "react-router-dom";

function EditAccountDetailsPage() {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const [error, setError] = useState(false);
    const [submitSuccess, setSubmitSucces] = useState(null);
    const {user} = useContext(AuthContext);


    async function editAccountDetails(formData) {
        setError(false);

        const token = localStorage.getItem('token');
        try {
            const {data} = await axios.patch(`http://localhost:8080/users/${user.username}/email`, {
                email: formData.email,
                password: formData.password,
                // subscription: formData.subscription,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setSubmitSucces(true);
            console.log(`Account details successfully updated`, data);
        } catch (e) {
            console.error(e);
            setError(true);
        }

    }




    return (
        <section className='edit-accountdetails-page outer-content-container'>
            <div className='edit-accountdetails-page inner-content-container'>
                <div className='main-container'>
                    <div className='featured-section'>
                        <h2 className='edit-account-title titles'>Account Settings</h2>
                        <h3>{user.username}</h3>
                        {error && <p>{error.message}</p>}
                        {!submitSuccess ?
                            <div>
                                <div className='user-data'>
                                    <p><strong>Current email:</strong> {user.email}</p>
                                </div>
                                <form className='edit-account-settings-form'
                                      onSubmit={handleSubmit(editAccountDetails)}>
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
                                        inputLabel='Current password: *'
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
                                    <button type='submit'>Save</button>
                                </form>
                                <h4 className='back-link'><Link to={`/user/${user.username}`}>Go back to Account</Link></h4>
                            </div>
                            :
                            <div className='account-settings-succes'>
                                <p>You have successfully updated your email!</p>
                                <h4 className='back-link'><Link to={`/user/${user.username}`}>Go to account</Link></h4>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditAccountDetailsPage;
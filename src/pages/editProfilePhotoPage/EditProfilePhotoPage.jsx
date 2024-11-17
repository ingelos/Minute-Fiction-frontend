import {useContext, useState} from "react";
import {AuthContextProvider} from "../../context/AuthContextProvider.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import AuthenticateCheck from "../../components/authenticateCheck/AuthenticateCheck.jsx";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import Input from "../../components/input/Input.jsx";
import useAuthorProfile from "../../components/useAuthorProfile/UseAuthorProfile.jsx";


function EditProfilePhotoPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [uploadStatus, setUploadStatus] = useState('');

    const {username} = useContext(AuthContextProvider);
    const {authorProfile} = useAuthorProfile(username);


    async function handleUploadPhoto(data) {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append("file", data.file[0]);

        try {
            const {data} = await axios.post(`http://localhost:8080/authorprofiles/${username}/photo`,
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
            setUploadStatus(`File uploaded successfully: ${data.fileName}`)
        } catch (error) {
            setUploadStatus(`An error occurred: ${error.message}`);
        }
    }

    async function handleDeleteProfilePhoto(username) {
        try {
            await axios.delete(`http://localhost:8080/authorprofiles/${username}/photo`);
            console.log('Profile photo deleted.');
        } catch (error) {
            console.error('Error deleting profile photo', error);
        }
    }


    return (
        <section className='update-photo-section outer-content-container'>
            <div className='update-photo-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">

                        <AuthenticateCheck>
                            {!authorProfile?.profilePhoto?.photoUrl ? (
                                <div>
                                    <h2 className='add-photo titles'>Add / Edit Photo</h2>
                                    <form onSubmit={handleSubmit(handleUploadPhoto)}>
                                        <Input
                                            inputType='file'
                                            inputName='fileName'
                                            inputId='fileInput'
                                            inputLabel='Choose image:'
                                            register={register}
                                            errors={errors}
                                        />
                                        {errors.file && <p>{errors.file.message}</p>}
                                        <button type="submit">Upload Photo</button>
                                    </form>
                                    {uploadStatus && <p>{uploadStatus}</p>}
                                </div>
                            ) : (
                                <div>
                                    {authorProfile?.profilePhoto?.photoUrl && (
                                        <div>
                                            <img src={authorProfile.profilePhoto.photoUrl}
                                                 alt='Profile Photo'
                                                 className='profile-photo'/>
                                            <button onClick={handleDeleteProfilePhoto}>Delete Photo</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </AuthenticateCheck>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditProfilePhotoPage;
import "./EditProfilePhoto.css";
import {useContext, useState} from "react";
import axios from "axios";
import useAuthorProfile from "../../hooks/useAuthorProfile/UseAuthorProfile.jsx";
import AuthContext from "../../context/AuthContext.jsx";
import {FaLongArrowAltLeft} from "react-icons/fa";
import {Link, useParams} from "react-router-dom";
import OwnerCheck from "../../helpers/userChecks/OwnerCheck.jsx";


function EditProfilePhoto() {
    const {user} = useContext(AuthContext);
    const {username} = useParams();
    const {profilePhoto} = useAuthorProfile(username);
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const token = localStorage.getItem('token');


    function handleImageChange(e) {
        const file = e.target.files[0];

        console.log("UploadedFile:", file);
        setFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    async function handleUploadPhoto(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        try {
            const {data} = await axios.post(`http://localhost:8080/authorprofiles/${user.username}/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            setUploadSuccess(true);
            setPreviewUrl(null);
            console.log("Photo uploaded successfully!", data);
        } catch (error) {
            console.log("Error uploading photo", error);
        }
    }

    async function handleDeleteProfilePhoto() {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:8080/authorprofiles/${user.username}/photo`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDeleteSuccess(true);
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
                        <OwnerCheck username={username}>
                            {!profilePhoto && (
                                <div>
                                    <h2 className='add-photo titles'>Add / Edit Photo</h2>
                                    {uploadSuccess ?
                                        <div>
                                            <div className="back-link">
                                                <FaLongArrowAltLeft className="arrow-icon"/>
                                                <Link to={`/authors/${username}`}>Back to profile</Link>
                                            </div>
                                            <p>Successfully added a photo to your profile!</p>
                                        </div>
                                        :
                                        <div className="editing-photo-container">
                                            <form onSubmit={handleUploadPhoto}>
                                                <label htmlFor="author-photo">
                                                    Choose image:
                                                    <input type="file" name="file" id="author-photo"
                                                           onChange={handleImageChange}/>
                                                </label>
                                                {previewUrl &&
                                                    <div className="edit-photo-container">
                                                        <label>
                                                            Preview:
                                                            <img src={previewUrl} alt="Example of chosen image"
                                                                 className="profile-photo"/>
                                                        </label>
                                                    </div>
                                                }
                                                <button type="submit">Upload Photo</button>
                                            </form>
                                        </div>
                                    }
                                </div>
                            )}
                            <div>
                                {profilePhoto && (
                                    <div>
                                        <h2 className='add-photo titles'>Delete Photo</h2>
                                        <div className="back-link">
                                            <FaLongArrowAltLeft className="arrow-icon"/>
                                            <Link to={`/authors/${username}`}>Back to profile</Link>
                                        </div>
                                        {!deleteSuccess ?
                                            <div className="edit-photo-container">
                                                <img src={profilePhoto} alt='Profile Photo'
                                                     className='profile-photo'/>
                                                <button onClick={handleDeleteProfilePhoto}
                                                        className="delete-button">Delete
                                                    Photo
                                                </button>
                                            </div>
                                            :
                                            <p>Successfully deleted your photo!</p>}
                                    </div>
                                )}
                            </div>
                        </OwnerCheck>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditProfilePhoto;
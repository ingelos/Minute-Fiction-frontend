import "./ManageAuthorsPage.css";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";
import {Link} from "react-router-dom";
import useAuthors from "../../hooks/useAuthors/UseAuthors.jsx";
import Button from "../../components/button/Button.jsx";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import {useState} from "react";
import axios from "axios";


function ManageAuthorsPage() {
    const {authors, setAuthors} = useAuthors();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [authorToDelete, setAuthorToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const token = localStorage.getItem('token');


    async function fetchData(username, path) {
        setError(null);

        try {
            setLoading(true);
            const download = await axios.get(`http://localhost:8080/authorprofiles/${username}/${path}`, {
                responseType: 'arraybuffer'
            });

            const blob = new Blob([download.data], {type: 'image/png'});
            console.log("blob:", blob);
            const dataUrl = URL.createObjectURL(blob);
            setImageData(dataUrl);

        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteAuthorProfile(username) {
        console.log("deleting user: " + username);
        try {
            await axios.delete(`http://localhost:8080/authorprofiles/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Author profile deleted.');
            setErrorMessage(null);
            setAuthors((prevAuthors) => prevAuthors.filter(author => author.username !== username));
        } catch (error) {
            if (error.response) {
                console.error("Error deleting profile: ", error.response.data);
                setErrorMessage(error.response.data);
            } else {
                console.error('Error deleting this profile', error.message);
            }
        } finally {
            setModalOpen(false);
        }
    }

    async function openModal(author) {
        setAuthorToDelete(author);
        setModalOpen(true);
    }

    return (

        <section className='editor-author-section outer-content-container'>
            <div className='editor-author-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="author-title titles">Manage Authors</h2>
                            <p className="link-button-style">
                                <Link to={'/editor/authors/search'}>Search For Author</Link>
                            </p>
                            <h3 className="sub-titles">All Authors</h3>
                            <ul className="author-container">
                                <li>
                                    <div className="author-list">
                                        <table className="author-table">
                                            <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>First name</th>
                                                <th>Last name</th>
                                                <th>Bio</th>
                                                <th>Profile Photo</th>
                                                <th>See Profile</th>
                                                <th>Delete</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {authors.length > 0 && (
                                                authors.map((author) => (
                                                    <tr key={author.username}>
                                                        <td>{author.username}</td>
                                                        <td>{author.firstname}</td>
                                                        <td>{author.lastname}</td>
                                                        <td>{author.bio}</td>
                                                        <td>{author.profilePhoto ? (
                                                            <img
                                                                src={`http://localhost:8080/authorprofiles/${author.username}/photo`}
                                                                alt={`${author.username}'s photo`}
                                                                className="author-thumbnail"
                                                                onClick={() => fetchData(author.username, 'photo')}
                                                            />
                                                        ) : (
                                                            <span>No photo</span>
                                                        )}</td>

                                                        <td>
                                                            <Link to={`/authors/${author.username}`}
                                                                  className="link-button-style">
                                                                profile
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <div className="delete-container">
                                                                <Button onClick={() => openModal(author)}
                                                                        className="delete-button"
                                                                        buttonText="Delete"
                                                                        buttonType="submit"
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        {loading ? <p>Loading...</p> : imageData &&
                                            <div  className="image-container">
                                                <h4>Detailed author photo:</h4>
                                                <img src={imageData} alt="blob" className="image-detail"/>
                                            </div>
                                        }
                                        {error && <p>Something went wrong!</p>}
                                    </div>
                                </li>
                            </ul>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            {isModalOpen && (
                                <Confirmation
                                    isOpen={isModalOpen}
                                    onClose={() => setModalOpen(false)}
                                    onConfirm={() => handleDeleteAuthorProfile(authorToDelete.username)}
                                    title={`Confirm Delete Profile ${authorToDelete?.username || ''}`}
                                    message="Please be certain."
                                />
                            )}
                        </div>
                        <AsideEditorMenu/>
                    </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default ManageAuthorsPage;
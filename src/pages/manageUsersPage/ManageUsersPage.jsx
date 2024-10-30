import {Link} from "react-router-dom";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import axios from "axios";
import DeletionConfirmation from "../../components/deletionConfirmation/DeletionConfirmation.jsx";
import {useEffect, useState} from "react";
import useAuthors from "../../components/useAuthors/UseAuthors.jsx";
import useAuthorProfile from "../../components/useAuthorProfile/UseAuthorProfile.jsx";
import useUsers from "../../components/useUsers/UseUsers.jsx";

function ManageUsersPage() {
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const {authorProfile} = useAuthorProfile();
    const {authors} = useAuthors();
    const {users, loading, error} = useUsers();
    const [query, setQuery] = useState("");
    const [user, setUser] = useState([]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query) {
                searchUser(query);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    async function searchUser(searchTerm) {
        try {
            const {data} = await axios.get(`http://localhost:8080/users/search?query=${searchTerm}`);
            setUser(data);
        } catch (error) {
            console.error("Error searching users", error);
        }
    }

    async function handleDeleteAccount(username) {
        try {
            await axios.delete(`http://localhost:8080/users/${username}`);
            console.log('User deleted.');
            setDeleteSuccess(true);
        } catch (error) {
            console.error('Error deleting this user', error);
        }
    }

    return (
        <section className='editor-users-section outer-content-container'>
            <div className='editor-users-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="user-title titles">Manage Users</h2>
                        <div className='themes-container'>
                            <p className="link-button-style">
                                <Link to={'/register'}>Create New User</Link>
                            </p>
                            <h3 className="sub-titles">Search:</h3>
                            <input type="text"
                                   placeholder="Search for a user"
                                   value={query}
                                   onChange={(e) => setQuery(e.target.value)}
                            />
                            <ul>{user.map((user) => (
                                <li key={user.username}>{user.username}</li>
                            ))}
                            </ul>
                            <h3 className="sub-titles">All Users</h3>
                            {/*<EditorCheck>*/}
                            <ul>
                                {loading && <p>Loading...</p>}
                                {error && <p>{error.message}</p>}
                                {users.length > 0 && (
                                    users.map((user) => (
                                        <li className="user-container" key={user.username}>
                                            <div className="user-list">
                                                <h2>{user.username}</h2>
                                                <p>{user.email}</p>
                                                <p>{user.authorities}</p>
                                                <h4><Link to={`/editor/users/${user.username}/authorities`}>Edit
                                                    Authorities</Link></h4>
                                                <p>{user.hasAuthorProfile && (
                                                    <div>
                                                        <Link to={`/authorprofiles/${user.username}`}>Author</Link>
                                                        <div>
                                                            {Object.keys(authorProfile).length > 0 &&
                                                                <p>{authorProfile.firstname} {authorProfile.lastname}</p>
                                                            }
                                                            <div className='"authorprofile-photo-container'>
                                                                {authorProfile?.profilePhoto?.photoUrl &&
                                                                    <img src={authorProfile.profilePhoto.photoUrl}
                                                                         alt='Profile Photo'
                                                                         className='profile-photo'/>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                </p>
                                            </div>
                                            {!deleteSuccess ? (
                                                <div>
                                                    <button onClick={() => setModalOpen(true)}
                                                            className="delete-button">
                                                        Delete User
                                                    </button>
                                                    <DeletionConfirmation
                                                        isOpen={isModalOpen}
                                                        onClose={() => setModalOpen(false)}
                                                        onConfirm={handleDeleteAccount(user.username)}
                                                        title="Confirm User Deletion"
                                                        message="Are you sure you want to delete this User? Deletion cannot be undone."
                                                    />
                                                </div>
                                            ) : (
                                                <p>Successfully Deleted User!</p>
                                            )}
                                        </li>
                                    ))
                                )
                                }
                            </ul>
                            <h3 className="sub-titles">All Authors</h3>
                            <ul>
                                {authors.length > 0 && (
                                    authors.map((author) => (
                                        <div className="themes-container" key={author.id}>
                                            <Link to={`/authorprofiles/${author.username}`}>
                                                <h2>`{author.firstname} {author.lastname}`</h2>
                                            </Link>
                                        </div>
                                    )))}
                            </ul>
                            {/*</EditorCheck>*/}
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default ManageUsersPage;
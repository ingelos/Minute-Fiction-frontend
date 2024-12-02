import "./ManageUsersPage.css";
import {Link} from "react-router-dom";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import axios from "axios";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import {useState} from "react";
import Button from "../../components/button/Button.jsx";
import UseUsers from "../../hooks/useUsers/UseUsers.jsx";
// import useAuthors from "../../components/useAuthors/UseAuthors.jsx";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";

function ManageUsersPage() {
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    // const {authors} = useAuthors();
    const [userToDelete, setUserToDelete] = useState(null);
    const {users, error} = UseUsers();
    // const [query, setQuery] = useState("");




    async function handleDeleteAccount(username) {
        try {
            await axios.delete(`http://localhost:8080/users/${username}`);
            console.log('User deleted.');
            setDeleteSuccess(true);
        } catch (error) {
            console.error('Error deleting this user', error);
        }
    }

    async function openModal(username) {
        setUserToDelete(username);
        setModalOpen(true);
    }


    return (
        <section className='editor-users-section outer-content-container'>
            <div className='editor-users-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                    <div className="featured-section">
                        <h2 className="user-title titles">Manage Users</h2>
                        <div className='themes-container'>
                            <p className="link-button-style">
                                <Link to={'/register'}>Create New User</Link>
                            </p>
                            <div>
                                <h3 className="sub-titles">All Users</h3>
                                <ul>
                                    {/*{loading && <p>Loading...</p>}*/}
                                    {error && <p>{error.message}</p>}
                                    <li className="user-container">
                                        <div className="user-list">
                                            <table className="user-table">
                                                <thead>
                                                <tr>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Authorities</th>
                                                    <th>Author</th>
                                                    <th>Edit Authorities</th>
                                                    <th>Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {users.length > 0 && (
                                                    users.map((user) => (
                                                        <tr key={user.username}>
                                                            <td>{user.username}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.authorities.join(', ')}</td>
                                                            <td>{user.hasAuthorProfile ? "Yes" : "No"}</td>
                                                            <td>
                                                                <Link to={`/editor/users/${user.username}/authorities`}
                                                                      className="link-button-style">Edit
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                {!deleteSuccess ? (
                                                                    <>
                                                                        <Button onClick={() => openModal(user)}
                                                                                className="delete-button"
                                                                                buttonText="Delete"
                                                                                buttonType="submit"
                                                                        />
                                                                        <Confirmation
                                                                            isOpen={isModalOpen}
                                                                            onClose={() => setModalOpen(false)}
                                                                            onConfirm={() => handleDeleteAccount(userToDelete.username)}
                                                                            title="Confirm User Deletion"
                                                                            message="Are you sure you want to delete this User? Deletion cannot be undone."
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <p>Successfully Deleted User!</p>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/*<div>*/}
                            {/*    <h3 className="sub-titles">All Authors</h3>*/}
                            {/*    <ul>*/}
                            {/*        <li className="author-contaier">*/}
                            {/*            <div className="author-list">*/}
                            {/*                <table className="author-table">*/}
                            {/*                    <thead>*/}
                            {/*                    <tr>*/}
                            {/*                        <th>Username</th>*/}
                            {/*                        <th>First name</th>*/}
                            {/*                        <th>Last name</th>*/}
                            {/*                        <th>Bio</th>*/}
                            {/*                        <th>Profile Photo</th>*/}
                            {/*                        <th>See Profile</th>*/}
                            {/*                    </tr>*/}
                            {/*                    </thead>*/}
                            {/*                    <tbody>*/}
                            {/*                    {authors.length > 0 && (*/}
                            {/*                        authors.map((author) => (*/}
                            {/*                            <tr key={author.username}>*/}
                            {/*                                <td>{author.username}</td>*/}
                            {/*                                <td>{author.firstname}</td>*/}
                            {/*                                <td>{author.lastname}</td>*/}
                            {/*                                <td>{author.bio}</td>*/}
                            {/*                                <td>{author.profilePhoto}</td>*/}
                            {/*                                <td>*/}
                            {/*                                    <Link to={`/authors/${author.username}`} className="link-button-style">*/}
                            {/*                                          profile*/}
                            {/*                                    </Link>*/}
                            {/*                                </td>*/}
                            {/*                            </tr>*/}
                            {/*                        )))}*/}
                            {/*                    </tbody>*/}
                            {/*                </table>*/}
                            {/*            </div>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default ManageUsersPage;
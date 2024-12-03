import "./ManageUsersPage.css";
import {Link} from "react-router-dom";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import axios from "axios";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import {useState} from "react";
import Button from "../../components/button/Button.jsx";
import UseUsers from "../../hooks/useUsers/UseUsers.jsx";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";

function ManageUsersPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const {users, setUsers} = UseUsers();
    const token = localStorage.getItem('token');


    async function handleDeleteUser(username) {
        console.log("deleting user: " + username);
        try {
            await axios.delete(`http://localhost:8080/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('User deleted.');
            setErrorMessage(null);
            setUsers((prevUsers) => prevUsers.filter(user => user.username !== username));
        } catch (error) {
            if (error.response) {
                console.error("Error deleting user: ", error.response.data);
                setErrorMessage(error.response.data);
            } else {
                console.error('Error deleting this user', error.message);
            }
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
                                        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                                                                    <Link
                                                                        to={`/editor/users/${user.username}/authorities`}
                                                                        className="link-button-style">Edit
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <div className="delete-container">
                                                                        <Button onClick={() => openModal(user.username)}
                                                                                className="delete-button"
                                                                                buttonText="Delete"
                                                                                buttonType="submit"
                                                                        />

                                                                        {isModalOpen && userToDelete === user.username && (
                                                                            <Confirmation
                                                                                isOpen={isModalOpen}
                                                                                onClose={() => setModalOpen(false)}
                                                                                onConfirm={() => handleDeleteUser(userToDelete)}
                                                                                title="Confirm User Deletion"
                                                                                message="Are you sure you want to delete this User? Deletion cannot be undone."
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
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
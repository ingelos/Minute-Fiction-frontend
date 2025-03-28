import "./ManageUsers.css";
import {Link} from "react-router-dom";
import AsideEditorMenu from "../../components/layout/asideEditorMenu/AsideEditorMenu.jsx";
import axios from "axios";
import Confirmation from "../../components/layout/confirmation/Confirmation.jsx";
import {useState} from "react";
import Button from "../../components/common/button/Button.jsx";
import UseUsers from "../../hooks/useUsers/UseUsers.jsx";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";

function ManageUsers() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const {users, setUsers} = UseUsers();
    const token = localStorage.getItem('token');


    async function handleDeleteUser(username) {
        try {
            await axios.delete(`http://localhost:8080/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUsers((prevUsers) => prevUsers.filter(user => user.username !== username));

        } catch (error) {
            if (error.response) {
                console.error("Error deleting user: ", error.response.data);
                setErrorMessage(error.response.data);
            } else {
                console.error('Error deleting this user', error.message);
            }
        } finally {
            setModalOpen(false);
        }
    }

    async function openModal(user) {
        setUserToDelete(user);
        setModalOpen(true);
    }


    return (
        <section className='editor-users-section outer-content-container'>
            <div className='editor-users-section inner-content-container'>
                <div className='main-container user-section'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="user-title titles">Manage Users</h2>
                            <div className='themes-container'>
                                <p className="link-button-style">
                                    <Link to={'/register'}>Create New User</Link>
                                </p>
                                <div>
                                    <h3 className="sub-titles">All Users</h3>
                                    {/*<ul>*/}
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    {/*<li className="user-container">*/}
                                    <div className="user-container">
                                        <div className='user-list'>
                                            <table className="user-table">
                                                <thead>
                                                <tr>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Authorities</th>
                                                    <th>Edit Authorities</th>
                                                    <th>Author</th>
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
                                                            <td>
                                                                <Link
                                                                    to={`/editor/users/${user.username}/authorities`}
                                                                    className="link-button-style">Edit
                                                                </Link>
                                                            </td>
                                                            <td>{user.hasAuthorProfile ? <Link
                                                                to={`/authors/${user.username}`}
                                                                className="link-button-style">Profile
                                                            </Link> : "No"}</td>
                                                            <td>
                                                                <div className="delete-container">
                                                                    <Button onClick={() => openModal(user)}
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
                                    </div>
                                    {isModalOpen && (
                                        <Confirmation
                                            isOpen={isModalOpen}
                                            onClose={() => setModalOpen(false)}
                                            onConfirm={() => handleDeleteUser(userToDelete.username)}
                                            title={`Confirm Delete User: ${userToDelete?.username || ''}`}
                                            message="Are you sure you want to delete this user?"
                                        />
                                    )}
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

export default ManageUsers;
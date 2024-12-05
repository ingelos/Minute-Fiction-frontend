import "./ManageAuthoritiesPage.css";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";
import Button from "../../components/button/Button.jsx";
import {Link, useParams} from "react-router-dom";
import {FaLongArrowAltLeft} from "react-icons/fa";

const allAuthorities = ["AUTHOR", "EDITOR"];


function ManageAuthoritiesPage() {
    const {username} = useParams();
    const [userAuthorities, setUserAuthorities] = useState([]);
    const [error, setError] = useState(null);
    const controller = new AbortController();
    const signal = controller.signal;
    const token = localStorage.getItem('token');



    async function fetchUserAuthorities() {
        try {
            const {data} = await axios.get(`http://localhost:8080/users/${username}/authorities`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                signal: signal,
            });
            console.log(data);
            setUserAuthorities(data || []);
        } catch (error) {
            setError(true);
            console.log("Error fetching user authorities", error);
        }
    }


    useEffect(() => {

        fetchUserAuthorities();

    }, [username]);



    async function handleAddAuthority(authority) {
        setError(false);
        const token = localStorage.getItem('token');
        try {
            await axios.post(`http://localhost:8080/users/${username}/authorities`, {
                authority
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            fetchUserAuthorities();

            console.log(`Authority ${authority} added successfully.`);
        } catch (error) {
            setError(true);
            console.error("Error adding authority", error);
        }
    }

    async function handleDeleteAuthority(authority) {
        setError(false);
        const token = localStorage.getItem('token');
        if (authority === "reader") return;
        try {
            await axios.delete(`http://localhost:8080/users/${username}/authorities/${authority}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            fetchUserAuthorities();

            console.log(`Authority ${authority} removed successfully.`);
        } catch (error) {
            setError(true);
            console.error("Error removing authority", error);
        }

    }

    return (
        <section className='editor-users-section outer-content-container'>
            <div className='editor-users-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="user-title titles">Manage Authorities</h2>
                            <div className='back-link'>
                                <FaLongArrowAltLeft className="arrow-icon"/>
                                <Link to="/editor/users">Back to Manage Users</Link>
                            </div>
                            {error && <p className="error">Error...</p>}
                            <div className='authorities-container'>
                                <div className="current-authorities">
                                    <h5>User: {username}</h5>
                                    <h5>Current authorities:</h5>
                                    {userAuthorities.length > 0 && (
                                        <ul>
                                            {userAuthorities.map((authority) => (
                                                <li key={authority} className="authority-list">{authority}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="edit-authorities-container">
                                    <div className="add-authority authority">
                                        <h3>Add Authority</h3>
                                        <ul className="authorities-list">
                                            {allAuthorities.filter((authority) => !userAuthorities.includes(authority))
                                                .map((authority) => (
                                                    <li key={authority}>
                                                        <Button onClick={() => handleAddAuthority(authority)}
                                                                buttonText={`Add ${authority}`}
                                                                buttonType="submit"
                                                        />
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                    <div className="remove-authority authority">
                                        <h3>Delete Authority</h3>
                                        <ul className="authorities-list">
                                            {userAuthorities.filter((authority) => authority !== "READER")
                                                .map((authority) => (
                                                    <li key={authority}>
                                                        <Button onClick={() => handleDeleteAuthority(authority)}
                                                                buttonText={`Remove ${authority}`}
                                                                buttonType="submit"
                                                        />
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
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

export default ManageAuthoritiesPage;
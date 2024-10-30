import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";

const authorities = ["Reader", "Author", "Editor"];

function ManageAuthoritiesPage({username}) {
    const [userAuthorities, setUserAuthorities] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchUserAuthorities() {
            try {
                const {data} = await axios.get(`http://localhost:8080/users/${username}/authorities`, {
                    signal: signal,
                });
                console.log(data);
                setUserAuthorities(data.authorities);
            } catch (error) {
                console.log("Error fetching user authorities", error);
            }
        }

        fetchUserAuthorities();

        return function cleanup() {
            controller.abort();
        }

    }, [username]);

    async function handleAddAuthority(authority) {
        try {
            const {data} = await axios.post(`http://localhost:8080/users/${username}/authorities`, {
                authority,
            });
            setUserAuthorities(data.authorities);
            console.log(`Authority ${authority} added successfully.`);
        } catch (error) {
            console.error("Error adding authority", error);
        }
    }

    async function handleDeleteAuthority(authority) {
        if (authority === "reader") return;
        try {
            const {data} = await axios.delete(`http://localhost:8080/users/${username}/authorities/${authority}`);
            setUserAuthorities(data.authorities);
            console.log(`Autority ${authority} removed successfully.`);
        } catch (error) {
            console.error("Error removing authority", error);
        }

    }

    return (
        <section className='editor-users-section outer-content-container'>
            <div className='editor-users-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                    <div className="featured-section">
                        <h2 className="user-title titles">Manage Authorities for {username}</h2>
                        <div className='authorites-container'>
                            <ul>
                                {userAuthorities.length > 0 && (
                                    userAuthorities.map((authority) => (
                                        <li className="authorities-container" key={authority}>
                                            {authority}
                                            <button onClick={() => handleDeleteAuthority(authority)}
                                                    className="delete-button">
                                                Remove
                                            </button>
                                        </li>
                                        )))}
                            </ul>
                            <h3>Add Authority</h3>
                            {authorities.map((authority) => (
                                <button key={authority}
                                onClick={() => handleAddAuthority(authority)}
                                disabled={userAuthorities.includes(authority)}>
                                    {authority}
                                </button>
                            ))}
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
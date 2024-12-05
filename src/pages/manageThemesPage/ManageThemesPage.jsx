import "./ManageThemesPage.css"
import useThemes from "../../hooks/useThemes/UseThemes.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import {useState} from "react";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";
import Button from "../../components/button/Button.jsx";


function ManageThemesPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const {themes, loading, error, setThemes} = useThemes();
    const [themeToDelete, setThemeToDelete] = useState(null);

    async function handleDeleteTheme(themeId) {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:8080/themes/${themeId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Theme deleted');
            setThemes((prevThemes) => prevThemes.filter(theme => theme.id !== themeId));
        } catch (error) {
            console.error("Error deleting theme:", error.response || error.message);
            setErrorMessage(error.response.data);
        } finally {
            setModalOpen(false);
        }
    }

    async function openModal(themeId) {
        setThemeToDelete(themeId);
        setModalOpen(true);
    }

    if (loading) {
        return <p>Loading themes...</p>
    }
    if (error) {
        return <p>Error fetching themes. Please try again later.</p>
    }


    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="themes-title titles">Manage themes</h2>
                                <p className="link-button-style titles">
                                    <Link to="/editor/themes/new">Create New Theme</Link>
                                </p>
                                <div className="themes-container">
                                    <h3 className="all-themes overviews">All Themes:</h3>
                                    {loading && <p>Loading...</p>}
                                    <div>
                                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                                        {themes.length > 0 &&
                                            themes.map((theme) => (
                                                <div className="action-container" key={theme.id}>
                                                    <div className="editor-container">
                                                        <h3 className="theme-title">{theme.name}</h3>
                                                        <p><strong>Id:</strong> {theme.id}</p>
                                                        <p><strong>Description:</strong> {theme.description}</p>
                                                        <p><strong>Open Date:</strong> {theme.openDate}</p>
                                                        <p><strong>Closing Date:</strong> {theme.closingDate}</p>
                                                    </div>
                                                    <div className="edit-container">
                                                        <p className="link-button-style">
                                                            <Link to={`/editor/themes/${theme.id}/edit`}>Edit {theme.id}</Link>
                                                        </p>
                                                        <Button onClick={() => openModal(theme.id)}
                                                                className="delete-button"
                                                                buttonText="Delete"
                                                                buttonType="button"
                                                        />
                                                    </div>
                                                    {isModalOpen && themeToDelete === theme.id && (
                                                        <Confirmation
                                                            isOpen={isModalOpen}
                                                            onClose={() => setModalOpen(false)}
                                                            onConfirm={() => handleDeleteTheme(themeToDelete)}
                                                            title="Confirm Deletion"
                                                            message="Are you sure you want to delete this Theme?"
                                                        />
                                                    )}
                                                </div>
                                            ))}
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

export default ManageThemesPage;
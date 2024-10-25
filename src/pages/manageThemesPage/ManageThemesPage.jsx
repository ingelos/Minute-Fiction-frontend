import "./ManageThemesPage.css"
import useThemes from "../../components/useThemes/UseThemes.jsx";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import DeletionConfirmation from "../../components/deletionConfirmation/DeletionConfirmation.jsx";
import {useState} from "react";
import {TailSpin} from "react-loader-spinner";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";


function ManageThemesPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const {themes, loading, error} = useThemes();
    const [themeToDelete, setThemeToDelete] = useState(null);
    const {themeId} = useParams();

    async function handleDeleteTheme(themeId) {

        try {
            await axios.delete(`http://localhost:8080/themes/${themeId}`);
            console.log('Theme deleted');
            setDeleteSuccess(true);
        } catch (error) {
            console.error("Error deleting theme:", error);
            setDeleteSuccess(false);
        } finally {
            setModalOpen(false);
        }
    }

    async function openModal(theme) {
        setThemeToDelete(theme);
        setModalOpen(true);
    }


    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                    <div className="featured-section">
                        <h2 className="themes-title titles">Manage themes</h2>
                        <div className='themes-container'>
                            <p className="link-button-style titles"><Link to="/editor/themes/new">Create New
                                Theme</Link></p>
                            <div className="theme-container">
                                <h3 className="all-themes overviews">All Themes:</h3>
                                {loading && <TailSpin color="#000000" height={50} width={50}/>}
                                <ul>
                                    {error && <p>{error.message}</p>}
                                    {themes.length > 0 &&
                                        themes.map((theme) => (
                                            <li className="themes-list-edit" key={theme.id}>
                                                <div className="editor-themes-container">
                                                    <h3 className="theme-title">{theme.name}</h3>
                                                    <p><strong>Id:</strong> {theme.id}</p>
                                                    <p><strong>Description:</strong> {theme.description}</p>
                                                    <p><strong>Open Date:</strong> {theme.openDate}</p>
                                                    <p><strong>Closing Date:</strong> {theme.closingDate}</p>
                                                </div>
                                                <div className="themes-edit-container">
                                                    <p className="link-button-style">
                                                        <Link
                                                            to={`/editor/themes/edit/${themeId}`}>Edit {theme.id}: {theme.name}</Link>
                                                    </p>
                                                    {!deleteSuccess ? (
                                                            <button onClick={() => openModal(theme)}
                                                                    className="delete-button">
                                                                Delete
                                                            </button>
                                                    ) : (
                                                        <p>Successfully Deleted Theme!</p>
                                                    )}
                                                </div>
                                                <DeletionConfirmation
                                                    isOpen={isModalOpen}
                                                    onClose={() => setModalOpen(false)}
                                                    onConfirm={() => handleDeleteTheme(themeToDelete.id)}
                                                    title="Confirm Theme Deletion"
                                                    message="Are you sure you want to delete this Theme?"
                                                />
                                            </li>
                                        ))}
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

export default ManageThemesPage;
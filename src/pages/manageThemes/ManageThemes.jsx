import useThemes from "../../components/useThemes/UseThemes.jsx";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";


function ManageThemes() {
    const {themes, loading, error} = useThemes();
    const {themeId} = useParams();

    async function handleDeleteTheme(themeId) {
        try {
            await axios.delete(`http://localhost:8080/themes/${themeId}/delete`)
        } catch (error) {
            console.error("Error deleting theme:", error);
        }
    }


    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="themes-title titles">Manage themes</h2>
                        <div className='themes-container'>
                            <h4><Link to="/editor/themes/new">Create New Theme</Link></h4>
                            <h3>All Themes</h3>
                            <EditorCheck>
                                <ul>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>{error.message}</p>}
                                    {themes.length > 0 && (
                                        themes.map((theme) => (
                                            <li className="themes-container" key={theme.id}>
                                                <div className="themes-list">
                                                    <h2>{theme.themeName}</h2>
                                                    <p>{theme.description}</p>
                                                    <p>{theme.openDate}</p>
                                                    <p>{theme.closingDate}</p>
                                                </div>
                                                <div className="themes-edit">
                                                    <Link to={`/editor/themes/edit/${themeId}`}>Edit theme</Link>
                                                    <button onClick={() => handleDeleteTheme(theme.id)}>Delete</button>
                                                </div>
                                            </li>
                                        ))
                                    )
                                    })
                                </ul>
                            </EditorCheck>
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default ManageThemes;
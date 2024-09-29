import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import useThemes from "../../components/useThemes/UseThemes.jsx";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";


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
                        <div className='themes-container'>
                            <h2 className="themes-titles">Manage themes</h2>
                            <Link to="/editor/themes/new">Create New Theme</Link>
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
                                                <div className="themes-edit-links">
                                                    <Link to={`/editor/themes/edit/${themeId}`}>{theme.themeName}</Link>
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
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default ManageThemes;
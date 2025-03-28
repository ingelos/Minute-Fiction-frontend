import "./ManageThemes.css"
import useThemes from "../../hooks/useThemes/UseThemes.jsx";
import {Link} from "react-router-dom";
import AsideEditorMenu from "../../components/layout/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";


function ManageThemes() {
    const {themes, loading, error} = useThemes(`http://localhost:8080/themes`);

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
                                {loading && <p>Loading themes...</p>}
                                {error && <p>Error fetching themes. Please try again.</p>}
                                <div>
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
                                                </div>

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

export default ManageThemes;
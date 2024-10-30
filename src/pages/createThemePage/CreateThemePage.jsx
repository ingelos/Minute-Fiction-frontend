// import {Link} from "react-router-dom";
import axios from "axios";
import ThemeForm from "../../components/themeForm/ThemeForm.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
// import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";


function CreateThemePage() {

    async function handleCreateTheme(themeData) {
        try {
            const {data} = await axios.post(`http://localhost:8080/themes`, themeData);
            console.log('ThemePage created:', data);
        } catch (error) {
            console.error('Error creating themePage:', error);
        }
    }

    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    {/*<EditorCheck>*/}
                    <div className="featured-section">
                        <h2 className="themes-title titles">Create Theme</h2>
                        <div className='themes-container'>
                            {/*<p>Go back to <Link to="/editor/themesPage"><strong>Manage ThemesPage</strong></Link></p>*/}
                                <ThemeForm onSubmit={handleCreateTheme} isEditing={false}/>
                        </div>
                    </div>
                    <AsideEditorMenu/>
                    {/*</EditorCheck>*/}
                </div>
            </div>
        </section>
    )
}

export default CreateThemePage;
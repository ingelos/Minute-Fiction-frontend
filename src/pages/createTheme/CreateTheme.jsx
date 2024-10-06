import {Link} from "react-router-dom";
import axios from "axios";
import ThemeForm from "../../components/themeForm/ThemeForm.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";


function CreateTheme() {

    async function handleCreateTheme(themeData) {
        try {
            const {data} = await axios.post(`http://localhost:8080/themes`, themeData);
            console.log('Theme created:', data);
        } catch (error) {
            console.error('Error creating theme:', error);
        }
    }

    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className='themes-container'>
                            <h2 className="themes-title titles">Create theme</h2>
                            <p>Go <Link to="/editor/themes"><strong>back</strong></Link> to Manage Themes page</p>
                            <EditorCheck>
                                <ThemeForm onSubmit={handleCreateTheme} isEditing={false}/>
                            </EditorCheck>
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default CreateTheme;
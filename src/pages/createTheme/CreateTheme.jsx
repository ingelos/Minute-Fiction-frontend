import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import ThemeForm from "../../components/themeForm/ThemeForm.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";


function CreateTheme() {
    const {themeId} = useParams();

    async function handleCreateTheme(themeData) {
        try {
            const {data} = await axios.post(`http://localhost:8080/themes/${themeId}`, themeData);
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
                            <h2 className="themes-titles">Manage themes</h2>
                            <Link to="/editor/themes">Go back to overview page</Link>
                            <EditorCheck>
                                <ThemeForm onSubmit={handleCreateTheme} isEditing={false}/>
                            </EditorCheck>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default CreateTheme;
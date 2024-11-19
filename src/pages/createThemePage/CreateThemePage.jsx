import axios from "axios";
import ThemeForm from "../../components/themeForm/ThemeForm.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {useContext, useState} from "react";
import {AuthContextProvider} from "../../context/AuthContextProvider.jsx";
import {Link} from "react-router-dom";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";


function CreateThemePage() {
    const {user, authorities} = useContext(AuthContextProvider);
    const [createSuccess, setCreateSuccess] = useState(null);


    async function handleCreateTheme(themeData) {
        const token = localStorage.getItem('token');
        console.log(user.username);
        console.log(authorities);


        try {
            const {data} = await axios.post(`http://localhost:8080/themes`, themeData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setCreateSuccess(true);
            console.log('Theme created:', data);
        } catch (error) {
            console.error('Error creating theme:', error);
        }
    }

    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                    <div className="featured-section">
                        <h2 className="themes-title titles">Create Theme</h2>
                        <div className='themes-container'>
                            {/*<p>Go back to <Link to="/editor/themesPage"><strong>Manage ThemesPage</strong></Link></p>*/}
                            {!createSuccess ?
                                <ThemeForm onSubmit={handleCreateTheme} isEditing={false}/>
                                :
                                <div >
                                    <p>Successfully Created a New Theme!</p>
                                    <Link to={"/editor/themes"} className='back-link'>Go to Themes Overview</Link>
                                </div>
                            }

                        </div>
                    </div>
                    <AsideEditorMenu/>
                    </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default CreateThemePage;
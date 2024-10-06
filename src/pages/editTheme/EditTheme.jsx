import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import ThemeForm from "../../components/themeForm/ThemeForm.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";


function EditTheme() {
    const [error, setError] = useState(null);
    const [themeData, setThemeData] = useState(null);
    const {themeId} = useParams();

    useEffect(() => {
        async function fetchTheme() {
            try {
                const {data} = await axios.get(`http://localhost:8080/themes/${themeId}`);
                setThemeData(data);
            } catch (error) {
                console.error('Error fetching theme', error);
            }
        }

        fetchTheme();
    }, [themeId]);


    async function handleUpdatingTheme(themeId, updatedData) {
        setError(false);

        try {
            const {data} = await axios.patch(`http://localhost:8080/themes/${themeId}`, updatedData);
            console.log('Form data:', data);
        } catch (error) {
            console.error('Error updating theme:', error);
        }
    }


    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className='themes-container'>
                            <h2 className="themes-title titles">Edit Theme</h2>
                            <p className="back-link">Go <Link to="/editor/themes"><strong>back</strong></Link> to Manage Themes page</p>
                            <EditorCheck>
                                {themeData ? (
                                    <ThemeForm onSubmit={handleUpdatingTheme} initialData={themeData} isEditing={true}/>
                                ) : (
                                    <p>Loading theme...</p>
                                )}
                                {error && <p>{error.message}</p>}
                            </EditorCheck>
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditTheme;
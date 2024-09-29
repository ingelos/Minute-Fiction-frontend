import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import ThemeForm from "../../components/themeForm/ThemeForm.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";


function CreateMailing() {

    async function handleCreateMailing(mailingData) {
        try {
            const {data} = await axios.post(`http://localhost:8080/mailings`, mailingData);
            console.log('Mailing created:', data);
        } catch (error) {
            console.error('Error creating mailing:', error);
        }
    }

    return (
        <section className='editor-mailing-section outer-content-container'>
            <div className='editor-mailing-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className='mailing-container'>
                            <h2 className="mailing-titles">Manage themes</h2>
                            <Link to="/editor/mailing">Go back to overview page</Link>
                            <EditorCheck>
                                <ThemeForm onSubmit={handleCreateMailing} isEditing={false}/>
                            </EditorCheck>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default CreateMailing;
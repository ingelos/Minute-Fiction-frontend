import {Link, useParams} from "react-router-dom";
import axios from "axios";
// import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import MailingForm from "../../components/mailingForm/MailingForm.jsx";
import {useState} from "react";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";


function CreateMailingPage() {
    const [createdSuccess, setCreatedSuccess] = useState(false);
    const {mailingId} = useParams();

    async function handleCreateMailing(mailingData) {
        try {
            const {data} = await axios.post(`http://localhost:8080/mailings`, mailingData);
            console.log('Mailing created:', data);
            setCreatedSuccess(data);
        } catch (error) {
            console.error('Error creating mailing:', error);
        }
    }

    return (
        <section className='editor-mailing-section outer-content-container'>
            <div className='editor-mailing-section inner-content-container'>
                <div className='main-container'>
                    {/*<EditorCheck>*/}
                    <div className="featured-section">
                        <h2 className="mailing-title titles">Create Mailing</h2>
                        {/*<p className="back-link">Go <Link to="/editor/mailings"><strong>back</strong></Link> to overview page</p>*/}
                        <div className='mailing-container'>
                                <MailingForm onSubmit={handleCreateMailing} isEditing={false}/>
                                {createdSuccess && (
                                    <p><Link to={`/editor/mailings/view/${mailingId}`}>View</Link> created mailing and send to subscribers</p>
                                )}
                        </div>

                    </div>
                    <AsideEditorMenu/>
                        {/*</EditorCheck>*/}
                </div>
            </div>
        </section>
    )
}

export default CreateMailingPage;
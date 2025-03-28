import {Link} from "react-router-dom";
import axios from "axios";
import MailingForm from "../../components/forms/mailingForm/MailingForm.jsx";
import {useState} from "react";
import AsideEditorMenu from "../../components/layout/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";
import {FaLongArrowAltLeft} from "react-icons/fa";


function CreateMailing() {
    const [createdSuccess, setCreatedSuccess] = useState(false);

    async function handleCreateMailing(mailingData) {
        const token = localStorage.getItem('token');
        try {
            const {data} = await axios.post(`http://localhost:8080/mailings`, mailingData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
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
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="mailing-title titles">Create Mailing</h2>
                            <div className='mailing-container'>
                                <div className="back-link">
                                    <FaLongArrowAltLeft className="arrow-icon"/>
                                    <Link to={`/editor/mailings`}>Manage Mailings</Link>
                                </div>
                                {!createdSuccess ? (
                                    <MailingForm onSubmit={handleCreateMailing} isEditing={false}/>
                                ) : (
                                    <div>
                                        <p>Successfully created mailing!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <AsideEditorMenu/>
                    </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default CreateMailing;
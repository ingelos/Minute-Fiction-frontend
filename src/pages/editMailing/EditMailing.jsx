import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import MailingForm from "../../components/mailingForm/MailingForm.jsx";
import DeletionConfirmation from "../../components/deletionConfirmation/DeletionConfirmation.jsx";


function EditMailing() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mailingData, setMailingData] = useState(null);
    const {mailingId} = useParams();
    const [isModalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        setLoading(true);

        async function fetchMailing() {
            try {
                const {data} = await axios.get(`http://localhost:8080/mailings/${mailingId}`);
                setMailingData(data);
            } catch (error) {
                console.error('Error fetching theme', error);
            }
        }

        fetchMailing();
    }, [mailingId]);


    async function handleUpdatingMailing(mailingId, updatedData) {
        setError(false);

        try {
            const {data} = await axios.put(`http://localhost:8080/themes/${mailingId}`, updatedData);
            console.log('Form data:', data);
        } catch (error) {
            console.error('Error updating theme:', error);
        }
    }

    async function handleDeleteMailing(mailingId) {
        try {
            await axios.delete(`http://localhost:8080/mailings/${mailingId}`);
            console.log('Mailing deleted.');
        } catch (error) {
            console.error('Error deleting the mailing', error);
        }
    }


    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className='mailings-container'>
                            <h2 className="mailings-title titles">Edit mailing</h2>
                            <p>Go <Link to="/editor/mailings"><strong>back</strong></Link> to mailings overview page</p>
                            <EditorCheck>
                            <div>
                                {error && <p>{error.message}</p>}
                                {loading && <p>Loading mailing...</p>}
                                {mailingData && (
                                    <MailingForm onSubmit={handleUpdatingMailing} initialData={mailingData} isEditing={true}/>
                                )}
                            </div>
                                <div>
                                    <button onClick={() => setModalOpen(true)} className="delete-button">
                                        Delete Mailing
                                    </button>
                                    <DeletionConfirmation
                                        isOpen={isModalOpen}
                                        onClose={() => setModalOpen(false)}
                                        onConfirm={handleDeleteMailing}
                                        title="Confirm Deletion"
                                        message="Are you sure you want to delete this mailing?"
                                    />
                                </div>
                            </EditorCheck>
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditMailing;
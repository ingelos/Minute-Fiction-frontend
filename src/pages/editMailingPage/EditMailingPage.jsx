import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import MailingForm from "../../components/mailingForm/MailingForm.jsx";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import {FaLongArrowAltRight} from "react-icons/fa";
import Button from "../../components/button/Button.jsx";


function EditMailingPage() {
    const [error, setError] = useState(null);
    const [mailing, setMailing] = useState(null);
    const [mailingData, setMailingData] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [mailingToDelete, setMailingToDelete] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const {mailingId} = useParams();


    useEffect(() => {

        async function fetchMailing() {
            const token = localStorage.getItem('token');
            try {
                const {data} = await axios.get(`http://localhost:8080/mailings/${mailingId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setMailingData(data);
                setMailing(data);
            } catch (error) {
                setError(true);
                console.error('Error fetching mailing', error);
            }
        }

        fetchMailing();
    }, [mailingId]);


    async function handleUpdatingMailing(updatedData) {
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.put(`http://localhost:8080/mailings/${mailingId}`,
                updatedData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log('Mailing updated data:', data);
            setUpdateSuccess(true);
        } catch (error) {
            console.error('Error updating mailing:', error);
        }
    }

    async function handleDeleteMailing(mailingId) {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/mailings/${mailingId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Mailing deleted.');
            setDeleteSuccess(true);
        } catch (error) {
            console.error('Error deleting mailing', error);
        }
    }

    async function openModal(mailing) {
        setMailingToDelete(mailing);
        setModalOpen(true);
    }


    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                    <div className="featured-section">
                        <div className='mailings-container'>
                            <h2 className="mailings-title titles">Edit mailing</h2>
                            <div className="back-link">
                                <FaLongArrowAltRight className='arrow-icon'/>
                                <Link to="/editor/mailings">Back to mailings overview</Link>
                            </div>
                            <div>
                                {error && <p>{error.message}</p>}
                                {!deleteSuccess ? (
                                    <div>
                                        {!updateSuccess ? (
                                            <div>
                                                <MailingForm onSubmit={handleUpdatingMailing}
                                                             initialData={mailingData}
                                                             isEditing={true}/>

                                                <div className="deletion-container">
                                                    <Button onClick={() => openModal(mailing)}
                                                            buttonType="submit"
                                                            buttonText="Delete Mailing"
                                                            className="delete-button"
                                                    />
                                                    <Confirmation
                                                        isOpen={isModalOpen}
                                                        onClose={() => setModalOpen(false)}
                                                        onConfirm={() => handleDeleteMailing(mailingToDelete.id)}
                                                        title="Confirm Deletion"
                                                        message="Are you sure you want to delete this mailing?"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Successfully Updated Mailing!</p>
                                        )}
                                    </div>
                                ) : (
                                    <p>Successfully Deleted Mailing!</p>
                                )}
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

export default EditMailingPage;
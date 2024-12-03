import "./ManageMailingsPage.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";
import Button from "../../components/button/Button.jsx";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import {formatDate} from "../../helpers/dateFormatter.js";


function ManageThemes() {
    const [mailings, setMailings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mailingToDelete, setMailingToDelete] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    // const [deleteSuccess, setDeleteSuccess] = useState(false);

    // const {mailingId} = useParams();

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchAllMailings() {
            const token = localStorage.getItem('token');
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/mailings`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: signal,
                });
                console.log(data);
                setMailings(data);
            } catch (error) {
                console.error('Error fetching mailings', error)
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchAllMailings();

        return function cleanup() {
            controller.abort();
        }
    }, []);


    async function handleDeleteMailing(mailingId) {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:8080/mailings/${mailingId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            setMailings(mailings.filter((mailing) => mailing.id !== mailingId));
            setModalOpen(false);
        } catch (error) {
            console.error("Error deleting mailing:", error);
        } finally {
            setModalOpen(false);
        }
    }

    async function openModal(mailing) {
        setMailingToDelete(mailing);
        setModalOpen(true);
    }


    return (
        <section className='editor-mailings-section outer-content-container'>
            <div className='editor-mailings-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="mailings-title titles">Manage Mailings</h2>
                            <p className="link-button-style titles"><Link to="/editor/mailings/new">Create New
                                Mailing</Link></p>
                            <div className='mailings-container'>
                                <h3 className="mailing-overview overviews">Mailings:</h3>
                                {loading && <p>Loading...</p>}
                                <div>
                                    {error && <p>{error.message}</p>}
                                    {mailings.length > 0 &&
                                        mailings.map((mailing) => (
                                            <div key={mailing.id} className="action-container">
                                                <div className="story-container">
                                                    <p><strong>Id: </strong>{mailing.id}</p>
                                                    <p><strong>Subject: </strong>{mailing.subject}</p>
                                                    <p><strong>Body: </strong>{mailing.body}</p>
                                                    <p><strong>Send on: </strong>
                                                        {mailing.sendDate ? formatDate(mailing.sendDate) : "Not yet send"}</p>
                                                </div>
                                                <div className="edit-container">
                                                    <div className='edit-send-container'>
                                                        <p className='link-button-style'>
                                                            <Link to={`/editor/mailings/${mailing.id}/edit`}>Edit</Link>
                                                        </p>
                                                        <p className='link-button-style'>
                                                            <Link to={`/editor/mailings/${mailing.id}/send`}>Send</Link>
                                                        </p>
                                                    </div>
                                                    <Button
                                                        buttonType="submit"
                                                        buttonText="Delete"
                                                        className="delete-button"
                                                        onClick={() => openModal(mailing)}
                                                    />
                                                </div>
                                                {isModalOpen && mailingToDelete?.id === mailing.id && (
                                                    <Confirmation
                                                        isOpen={isModalOpen}
                                                        onClose={() => setModalOpen(false)}
                                                        onConfirm={() => handleDeleteMailing(mailingToDelete.id)}
                                                        title="Confirm Deletion"
                                                        message="Are you sure you want to delete this Mailing?"
                                                    />
                                                )}
                                            </div>
                                        ))}
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

export default ManageThemes;
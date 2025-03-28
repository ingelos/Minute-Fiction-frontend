import "./SendMailing.css";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AsideEditorMenu from "../../components/layout/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";
import Button from "../../components/common/button/Button.jsx";
import Confirmation from "../../components/layout/confirmation/Confirmation.jsx";
import {FaLongArrowAltLeft, FaLongArrowAltRight} from "react-icons/fa";

function SendMailing() {
    const {mailingId} = useParams();
    const [mailing, setMailing] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [mailingToSend, setMailingToSend] = useState(null);
    const [sendSuccess, setSendSuccess] = useState(false);



    useEffect(() => {
        const token = localStorage.getItem('token');
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchMailingById() {
            setError(null);

            try {
                setLoading(true);
                const {data} = await axios.get(`http://localhost:8080/mailings/${mailingId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: signal,
                });
                setMailing(data);
            } catch (error) {
                console.error(error);
                setError('Error fetching mailing');
            } finally {
                setLoading(false);
            }
        }

        fetchMailingById();

        return function cleanup() {
            controller.abort();
        }
    }, [mailingId]);


    async function handleSendMailing(mailingId) {
        const token = localStorage.getItem('token');

        try {
            await axios.post(`http://localhost:8080/mailings/${mailingId}/send`, {},
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setModalOpen(false);
            setSendSuccess(true);
        } catch (error) {
            console.error("Error sending mailing:", error);
        }
    }

    async function openModal(mailing) {
        setMailingToSend(mailing);
        setModalOpen(true);
    }


    return (
        <section className='editor-mailings-section outer-content-container'>
            <div className='editor-mailings-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="mailings-title titles">Send Mailing</h2>
                            <div className='back-link'>
                                <FaLongArrowAltLeft className="arrow-icon"/>
                                <Link to="/editor/mailings">Back to Manage Mailings</Link>
                            </div>
                            {!sendSuccess ? (
                                <div className='mailings-container'>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>{error.message}</p>}
                                    {mailing && (
                                        <div className="preview-container" key={mailing.id}>
                                            <p><strong>Subject:</strong> {mailing.subject}</p>
                                            <p><strong>Body:</strong> {mailing.body}</p>
                                        </div>
                                    )}
                                    <div className="edit-buttons">
                                        <Button
                                            onClick={() => openModal(mailing)}
                                            buttonType="submit"
                                            buttonText="Send Now"
                                        />
                                    </div>
                                    <Confirmation
                                        isOpen={isModalOpen}
                                        onClose={() => setModalOpen(false)}
                                        onConfirm={() => handleSendMailing(mailingToSend.id)}
                                        title="Confirm Sending"
                                        message="Are you sure you want to send this mailing?"
                                    />
                                </div>
                            ) : (
                                <p>Successfully Send Mailing!</p>
                            )}
                        </div>
                        <AsideEditorMenu/>
                    </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default SendMailing;
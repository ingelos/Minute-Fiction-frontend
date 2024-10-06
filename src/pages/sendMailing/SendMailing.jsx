import "./SendMailing.css";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";

function SendMailing() {
    const {mailingId} = useParams();
    const [mailing, setMailing] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchMailingById() {
            setError(false);

            try {
                setLoading(true);
                const {data} = await axios.get(`http://localhost:8080/mailings/${mailingId}`, {
                    signal: signal,
                });
                setMailing(data);
            } catch (error) {
                setError(error);
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
        try {
            await axios.post(`http://localhost:8080/mailings/${mailingId}/send`)
        } catch (error) {
            console.error("Error sending mailing:", error);
        }
    }


    return (
        <section className='editor-mailings-section outer-content-container'>
            <div className='editor-mailings-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className='mailings-container'>
                            <h2 className="mailings-title titles">Send Mailing</h2>
                            {/*<EditorCheck>*/}
                            <div>
                                {loading && <p>Loading...</p>}
                                {error && <p>{error.message}. Please try to reload the page.</p>}
                                {mailing.length > 0 && (
                                    Object.keys((mailing) => (
                                        <div className="mailing-container" key={mailing.id}>
                                            <h2>{mailing.subject}</h2>
                                            <p>{mailing.content}</p>
                                            <p>{mailing.date}</p>
                                        </div>
                                    )))}

                                <div className="mailing-edit">
                                    <Link to={`/editor/mailings/edit/${mailingId}`}>Edit this mailing</Link>
                                    <button onClick={() => handleSendMailing(mailing.id)}>
                                        Send Now
                                    </button>
                                </div>
                            </div>
                            {/*</EditorCheck>*/}
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default SendMailing;
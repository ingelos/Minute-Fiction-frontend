import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";


function ManageThemes() {
    const [mailings, setMailings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {mailingId} = useParams();

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchAllMailings() {
            setError(false);

            try {
                setLoading(true);
                const {data} = await axios.get(`http://localhost:8080/mailings`, {
                    signal: signal,
                });
                setMailings(data);
            } catch (error) {
                setError(error);
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
        try {
            await axios.delete(`http://localhost:8080/mailings/${mailingId}/delete`)
        } catch (error) {
            console.error("Error deleting mailing:", error);
        }
    }


    return (
        <section className='editor-mailings-section outer-content-container'>
            <div className='editor-mailings-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="mailings-title titles">Manage Mailings</h2>
                        <h3><Link to="/editor/mailing/new">Create New Mailing</Link></h3>
                        <div className='mailings-container'>
                            {/*<EditorCheck>*/}
                            <p>Previous mailings</p>
                            <ul>
                                {loading && <p>Loading...</p>}
                                {error && <p>{error.message}. Please try to reload the page.</p>}
                                {mailings.length > 0 && (
                                    mailings.map((mailing) => (
                                        <li className="mailings-container" key={mailing.id}>
                                            <div className="mailings-list">
                                                <span>{mailing.subject} -- {mailing.date}</span>
                                                <div className="mailing-edit">
                                                    <Link to={`/editor/mailings/edit/${mailingId}`}>Edit</Link>
                                                    <Link to={`/editor/mailings/send/${mailingId}`}>Send</Link>
                                                    <button onClick={() => handleDeleteMailing(mailingId)}>Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )
                                }
                            </ul>
                            {/*</EditorCheck>*/}
                        </div>
                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default ManageThemes;
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";


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
                console.log(data);
                setMailings(data);
            } catch (error) {
                console.error('Error fetching mailings', error)
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
                    <EditorCheck>
                    <div className="featured-section">
                        <h2 className="mailings-title titles">Manage Mailings</h2>
                        <p className="link-button-style titles"><Link to="/editor/mailings/new">Create New Mailing</Link></p>
                        <div className='mailings-container'>
                            <h3 className="mailing-overview overviews">Previous mailings:</h3>
                            <ul>
                                {loading && <p>Loading...</p>}
                                {error && <p>{error.message}</p>}
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
                                    )))}
                            </ul>
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
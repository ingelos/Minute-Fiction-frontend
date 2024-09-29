import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import {useEffect, useState} from "react";


function ManageThemes() {
    const {mailingId} = useParams();
    const [mailings, setMailings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchMailings() {
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

        fetchMailings();

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
                        <div className='mailings-container'>
                            <h2 className="mailings-title">Manage Mailings</h2>
                            <h3><Link to="/editor/mailing/new">Create New Mailing</Link></h3>
                            <EditorCheck>
                                <ul>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>{error.message}</p>}
                                    {mailings.length > 0 && (
                                        mailings.map((mailing) => (
                                            <li className="mailings-container" key={mailing.id}>
                                                <div className="mailings-list">
                                                    <h2>{mailing.title}</h2>
                                                    <p>{mailing.content}</p>
                                                </div>
                                                <div className="mailing-edit">
                                                    <Link to={`/editor/mailings/edit/${mailingId}`}>{mailing.id}</Link>
                                                    <button onClick={() => handleDeleteMailing(mailing.id)}>Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    )
                                    })
                                </ul>
                            </EditorCheck>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default ManageThemes;
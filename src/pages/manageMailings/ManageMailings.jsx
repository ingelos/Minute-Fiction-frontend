import "./ManageMailings.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import AsideEditorMenu from "../../components/layout/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";
import {formatDate} from "../../helpers/dateFormatter.js";


function ManageThemes() {
    const [mailings, setMailings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


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
                        Authorization: `Bearer ${token}`,
                    },
                    signal: signal,
                });
                setMailings(data);
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error('Error fetching mailings', error);
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



    return (
        <section className='editor-mailings-section outer-content-container'>
            <div className='editor-mailings-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="mailings-title titles">Manage Mailings</h2>
                            <p className="link-button-style titles">
                                <Link to="/editor/mailings/new">Create New Mailing</Link>
                            </p>
                            <div className='mailings-container'>
                                <h3 className="mailing-overview overviews">All Mailings:</h3>
                                {loading && <p>Loading...</p>}
                                <div>
                                    {error && <p>{error.message}</p>}
                                    {mailings.length > 0 &&
                                        mailings.map((mailing) => (
                                            <div key={mailing.id} className="action-container">
                                                <div className="mailing-container">
                                                    <p><strong>Id: </strong>{mailing.id}</p>
                                                    <p><strong>Subject: </strong>{mailing.subject}</p>
                                                    <p><strong>Body: </strong>{mailing.body}</p>
                                                    <p><strong>Send on: </strong>
                                                        {mailing.sendDate ? formatDate(mailing.sendDate) : "Not yet send"}
                                                    </p>
                                                </div>
                                                <div className='edit-send-container'>
                                                    <p><Link to={`/editor/mailings/${mailing.id}/edit`}
                                                          className="link-button-style">Edit</Link></p>
                                                    <p><Link to={`/editor/mailings/${mailing.id}/send`}
                                                          className="link-button-style">Send</Link></p>
                                                </div>
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
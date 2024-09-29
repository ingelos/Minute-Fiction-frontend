import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import ThemeForm from "../../components/themeForm/ThemeForm.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";


function EditMailing() {
    const [error, setError] = useState(null);
    const [mailingData, setMailingData] = useState(null);
    const {mailingId} = useParams();

    useEffect(() => {
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
            const {data} = await axios.patch(`http://localhost:8080/themes/${mailingId}`, updatedData);
            console.log('Form data:', data);
        } catch (error) {
            console.error('Error updating theme:', error);
        }
    }


    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className='themes-container'>
                            <h2 className="themes-titles">Manage themes</h2>
                            <Link to="/editor/themes">Go back to overview page</Link>
                            <EditorCheck>
                                {mailingData ? (
                                    <ThemeForm onSubmit={handleUpdatingMailing} initialData={mailingData} isEditing={true}/>
                                ) : (
                                    <p>Loading theme...</p>
                                )}
                                {error && <p>{error.message}</p>}
                            </EditorCheck>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default EditMailing;
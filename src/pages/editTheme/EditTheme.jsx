import "./EditTheme.css";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import ThemeForm from "../../components/forms/themeForm/ThemeForm.jsx";
import EditorCheck from "../../helpers/userChecks/EditorCheck.jsx";
import AsideEditorMenu from "../../components/layout/asideEditorMenu/AsideEditorMenu.jsx";
import Confirmation from "../../components/layout/confirmation/Confirmation.jsx";
import {FaLongArrowAltLeft} from "react-icons/fa";
import Button from "../../components/common/button/Button.jsx";


function EditTheme() {
    const [error, setError] = useState(null);
    const [themeData, setThemeData] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const {themeId} = useParams();
    const [isModalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {

        async function fetchTheme() {
            try {
                const {data} = await axios.get(`http://localhost:8080/themes/${themeId}`);
                setThemeData(data);
            } catch (error) {
                console.error('Error fetching comment', error);
            }
        }
        fetchTheme();
    }, [themeId]);


    async function handleUpdatingTheme(updatedData) {
        try {
            const {data} = await axios.put(`http://localhost:8080/themes/${themeId}`,
                updatedData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            setUpdateSuccess(true);
            console.log('Updated theme data:', data);
        } catch (error) {
            console.error(error);
            setError('Error updating theme');
        }
    }

    async function handleDeleteTheme() {
        try {
            await axios.delete(`http://localhost:8080/themes/${themeId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setDeleteSuccess(true);
        } catch (error) {
            console.error('Error deleting the theme', error);
        }
    }

    return (
        <section className='editor-themes-section outer-content-container'>
            <div className='editor-themes-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <div className='themes-container'>
                                <h2 className="themes-title titles">Edit Theme</h2>
                                <div className='back-link'>
                                    <FaLongArrowAltLeft className="arrow-icon"/>
                                    <Link to="/editor/themes">Back to Manage Themes</Link>
                                </div>
                                {error && <p>{error.message}</p>}
                                {!deleteSuccess ? (
                                    <div>
                                            {!updateSuccess ? (
                                                <div>
                                                    <ThemeForm onSubmit={handleUpdatingTheme}
                                                               initialData={themeData}
                                                               isEditing={true}/>
                                                    <div className="deletion-container">
                                                        <Button
                                                            onClick={() => setModalOpen(true)}
                                                            className="delete-button"
                                                            buttonText="Delete Theme"
                                                            buttonType="button"
                                                        />
                                                        <Confirmation
                                                            isOpen={isModalOpen}
                                                            onClose={() => setModalOpen(false)}
                                                            onConfirm={handleDeleteTheme}
                                                            title="Confirm Deletion"
                                                            message="Are you sure you want to delete this theme?"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <p>Successfully Updated Theme!</p>
                                            )}
                                    </div>
                                ) : (
                                    <p>Successfully Deleted Theme!</p>
                                )}

                            </div>
                        </div>
                        <AsideEditorMenu/>
                    </EditorCheck>
                </div>
            </div>
        </section>
    )
}

export default EditTheme;
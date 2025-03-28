import axios from "axios";
import {useState} from "react";

function UseDeleteStory(onDeleteSuccess) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [storyToDelete, setStoryToDelete] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    async function handleDeleteStory(storyId) {
        if (!storyToDelete) return;

        const token = localStorage.getItem('token');
        setLoading(true);
        setError(null);

        try {
            await axios.delete(`http://localhost:8080/stories/${storyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDeleteSuccess(true);
            if (onDeleteSuccess) {
                onDeleteSuccess(storyId);
            }
        } catch (error) {
            setError(error.response?.data || "An error occurred while deleting the story");
            console.error('Error deleting the story', error);
        } finally {
            setModalOpen(false);
            setLoading(false);
        }
    }

    async function openModal(storyId) {
        setStoryToDelete(storyId);
        setModalOpen(true);
    }

    return { error, loading, modalOpen, openModal, deleteSuccess, setModalOpen, storyToDelete, setStoryToDelete, handleDeleteStory}
}

export default UseDeleteStory;
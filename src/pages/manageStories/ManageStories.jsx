import {useEffect, useState} from "react";
import axios from "axios";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";
import StoryList from "../../components/storyList/StoryList.jsx";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import FilterPanel from "../../components/filterPanel/FilterPanel.jsx";
import {useNavigate} from "react-router-dom";


function ManageStories() {
    const [stories, setStories] = useState([]);
    const [themes, setThemes] = useState([]);
    const [filter, setFilter] = useState({status: '', theme: '', author: ''});

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        const controller = new AbortController();
        const {signal} = controller;

        async function fetchThemes() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/themes`, {signal});
                setThemes(data);
            } catch (error) {
                console.error('Error fetching submitted stories:', error);
                setError(error);
            }
        }

        fetchThemes();

        return function cleanup() {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        if (filter.status || filter.theme || filter.author) {
            fetchFilteredStories();
        }
    }, [filter]);

    async function fetchFilteredStories(filter) {
        setLoading(true);
        setError(false);

        try {
            let endpoint = `http://localhost:8080/stories?`;
            if (filter.status) {
                endpoint += `status=${filter.status}&`;
            }
            if (filter.theme) {
                endpoint += `theme=${filter.theme}&`;
            }
            if (filter.author) {
                endpoint += `author=${filter.author}&`;
            }
            const {data} = await axios.get(endpoint);
            setStories(data);
        } catch (error) {
            console.error(`Error fetching stories:`, error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleFilterChange(field, value) {
        setFilter((prev) => ({...prev, [field]: value}));
    }

    async function handleEditStory(storyId) {
            navigate(`/editor/stories/edit/${storyId}`);
    }


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="stories-title titles">Manage Stories</h2>
                        <div className='stories-container'>
                            <EditorCheck>
                                <FilterPanel themes={themes} filter={filter} onFilterChange={handleFilterChange}/>

                                {error && <p>Error...</p>}
                                {loading && <p>Loading...</p>}
                                    <StoryList stories={stories}
                                               onEdit={handleEditStory}
                                    />
                            </EditorCheck>
                        </div>

                    </div>
                    <AsideEditorMenu/>
                </div>
            </div>
        </section>
    )
}

export default ManageStories;
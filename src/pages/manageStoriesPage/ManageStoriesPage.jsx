import "./ManageStoriesPage.css";
import {useState} from "react";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import {Link} from "react-router-dom";
import EditorCheck from "../../helpers/editorCheck/EditorCheck.jsx";
import useThemes from "../../hooks/useThemes/UseThemes.jsx";
import useFetchStories from "../../hooks/useFetchStories/UseFetchStories.jsx";
import FilterPanel from "../../components/filterPanel/FilterPanel.jsx";


function ManageStoriesPage() {
    const [filter, setFilter] = useState({status: '', theme: ''});
    const [searchClicked, setSearchClicked] = useState(false);
    const {themes} = useThemes();
    const {stories, loading, error, fetchStories} = useFetchStories({
        status: filter.status,
        themeId: filter.themeId,
    })


    async function handleFilterChange(field, value) {
        setFilter((prev) => ({...prev, [field]: value}));
    }

    async function handleSearch() {
        setSearchClicked(true);
        fetchStories();
    }

    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="stories-title titles">Manage Stories</h2>
                            {error && <p>{error.message}</p>}
                            <FilterPanel
                                handleFilterChange={handleFilterChange}
                                handleSearch={handleSearch}
                                themes={themes}
                                filter={filter}
                            />
                            <div className="relevant-stories-container">
                                <div className="relevant-stories-list">
                                    {loading && <p>Loading...</p>}
                                    <h3>Relevant Stories</h3>
                                    {searchClicked && (
                                        stories.length > 0 ? (
                                            stories.map((story) => (
                                                <div key={story.id}>
                                                    <div className="stories-info">
                                                        <div>
                                                            <p>Title: {story.title}</p>
                                                            <p>By: {story.username}</p>
                                                            <p>Theme: {story.themeName}</p>
                                                            <p>Status: {story.status}</p>
                                                        </div>
                                                        <div>
                                                            <Link to={`/editor/stories/${story.id}/edit`}
                                                                  className="button">View/ Edit</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))) : (
                                            <p className="no-stories-container">No stories with the selected status</p>
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

export default ManageStoriesPage;
import {useEffect, useState} from "react";
import axios from "axios";
import ThemeFilter from "../../components/themeFilter/ThemeFilter.jsx";
import FilterThemeAndStatus from "../../components/filterThemeAndStatus/FilterThemeAndStatus.jsx";
import StoryList from "../../components/storyList/StoryList.jsx";
import NavigationLink from "../../components/navigationLink/NavigationLink.jsx";
import EditorNavigation from "../../components/editorNavigation/EditorNavigation.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";


function EditorDashboard() {
    const [stories, setStories] = useState([]);
    const [filter, setFilter] = useState('submitted');
    const [selectedTheme, setSelectedTheme] = useState(null);

    useEffect(() => {
        fetchStories(filter, selectedTheme);
    }, [filter, selectedTheme]);

    async function fetchStories(filter, themeId) {
        let url;
        switch (filter) {
            case 'submitted':
                url = themeId ? `/stories/submitted/${themeId}` : `/stories/submitted`;
                break;
            case 'all':
                url = '/stories/submitted';
                break;
            case 'accepted' :
                url = `/stories/accepted`;
                break;
            case 'declined' :
                url = `/stories/declined`;
                break;
            default:
                url = `stories/submitted`;
        }
        const {data} = await axios.get(`http://localhost:8080/${url}`);
        setStories(data);
    }

    async function handleFilterChange(newFilter) {
        setFilter(newFilter);
    }

    async function handleThemeChange(themeId) {
        setSelectedTheme(themeId);
    }

    return (
        <div>
            <EditorCheck>
                <h2>Editor Dashboard</h2>
                <EditorNavigation/>
                <FilterThemeAndStatus
                    onFilterChange={handleFilterChange}
                    onThemeChange={handleThemeChange}
                />
                <StoryList
                    stories={stories}
                />
            </EditorCheck>
        </div>
    )
}

export default EditorDashboard;
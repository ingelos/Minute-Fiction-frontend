import "./ReviewStoriesPage.css";
import {useEffect, useState} from "react";
import axios from "axios";
import AsideEditorMenu from "../../components/asideEditorMenu/AsideEditorMenu.jsx";
import EditorCheck from "../../components/editorCheck/EditorCheck.jsx";


function ReviewStoriesPage() {
    const [themes, setThemes] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState('');
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchThemes() {
            try {
                const {data} = await axios.get(`http://localhost:8080/themes`, {signal});
                setThemes(data);
            } catch (error) {
                console.error('Error fetching themesPage:', error);
                setError(true);
            }
        }

        fetchThemes();

        return function cleanup() {
            controller.abort();
        }

    }, []);


    async function handleThemeChange(event) {
        const themeId = Number(event.target.value)
        setSelectedTheme(themeId);
    }


    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        if (!selectedTheme) return;

        async function fetchSubmittedStoriesByTheme(themeId) {
            const token = localStorage.getItem('token');
            setLoading(true);
            setStories([]);

            try {
                const {data} = await axios.get(`http://localhost:8080/stories/editor/overview`, {
                    params: {
                        status: 'SUBMITTED',
                        themeId
                    },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal
                });
                setStories(data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request cancelled');
                } else {
                    console.error('Error fetching submitted stories:', error);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchSubmittedStoriesByTheme(selectedTheme);

        return function cleanup() {
            controller.abort();
        };
    }, [selectedTheme]);




    async function handleAcceptStory(storyId) {
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editor/${storyId}/accept`,
                {},
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
            setStories((prevStories) => prevStories.filter(story => story.id !== storyId));
        } catch (error) {
            console.error("Error accepting story:", error);
        }
    }

    async function handleDeclineStory(storyId) {
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.patch(`http://localhost:8080/stories/editors/${storyId}/decline`,
                {},
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
            setStories((prevStories) => prevStories.filter(story => story.id !== storyId));

        } catch (error) {
            console.error("Error declining story:", error);
        }
    }


    return (
        <section className='editor-stories-section outer-content-container'>
            <div className='editor-stories-section inner-content-container'>
                <div className='main-container'>
                    <EditorCheck>
                        <div className="featured-section">
                            <h2 className="stories-title titles">Review Submitted Stories</h2>
                            <div className='review-container'>
                                <div className="theme-selection">
                                    <label htmlFor="select-theme">Select a Theme to Review:</label>
                                    <select id="themeSelect" onChange={handleThemeChange}>
                                        <option value="">Select theme</option>
                                        {themes.map((theme) => (
                                            <option key={theme.id} value={theme.id}>
                                                {theme.name} ({theme.id})
                                            </option>
                                        ))}
                                    </select>
                                    {/*<Button onClick={fetchSubmittedStoriesByTheme}*/}
                                    {/*        buttonType="button"*/}
                                    {/*        buttonText="Show Stories"*/}
                                    {/*        className="show-button"/>*/}
                                </div>
                                <br></br>
                                {loading && <p>Loading stories...</p>}
                                {error && <p>{error.message}</p>}

                                <div className="story-list">
                                    {selectedTheme && (
                                        stories.length > 0 ? (
                                            stories.map((story) => (
                                                <div key={story.id} className="story-actions">
                                                    <div className="story-container">
                                                        <p>Id: {story.id}</p>
                                                        <p>Status: {story.status}</p>
                                                        <p>Title: {story.title}</p>
                                                        <p>By: {story.username}</p>
                                                        <p>Content: {story.content}</p>
                                                    </div>
                                                    <div className="button-actions">
                                                        <button onClick={() => handleAcceptStory(story.id)}>Accept</button>
                                                        <button onClick={() => handleDeclineStory(story.id)}>Decline</button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No Submitted stories available for the selected theme.</p>
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

export default ReviewStoriesPage;
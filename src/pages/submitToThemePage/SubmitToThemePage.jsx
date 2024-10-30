import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useParams} from "react-router-dom";
import StoryForm from "../../components/storyForm/StoryForm.jsx";


function SubmitToThemePage() {
    const {themeId} = useParams();

    return (
        <section className='submit-section outer-content-container'>
            <div className='submit-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="submit-title titles">Submit Your Story</h2>
                        <div className="open-themes-submit">
                            <StoryForm themeId={themeId}/>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default SubmitToThemePage;
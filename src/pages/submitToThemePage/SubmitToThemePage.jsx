import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useParams} from "react-router-dom";
// import AuthenticateCheck from "../../components/authenticateCheck/AuthenticateCheck.jsx";
// import AuthorCheck from "../../components/authorCheck/AuthorCheck.jsx";
import StoryForm from "../../components/storyForm/StoryForm.jsx";


function SubmitToThemePage() {
    const {themeName} = useParams();

    return (
        <section className='submit-section outer-content-container'>
            <div className='submit-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className="submit-title titles">Submit Your Story</h2>
                        {/*<AuthenticateCheck>*/}
                        <div className="open-themes-submit">
                            <h3 className="theme-name">Theme: {themeName}</h3>
                                {/*<AuthorCheck>*/}
                                   <StoryForm />
                                {/*</AuthorCheck>*/}
                        </div>
                        {/*</AuthenticateCheck>*/}
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default SubmitToThemePage;
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useParams} from "react-router-dom";
import AuthenticateCheck from "../../components/authenticateCheck/AuthenticateCheck.jsx";
import AuthorCheck from "../../components/authorCheck/AuthorCheck.jsx";
import SubmitStoryForm from "../../components/submitStoryForm/SubmitStoryForm.jsx";


function SubmitToTheme() {
    const {themeName} = useParams();

    return (
        <section className='submit-section outer-content-container'>
            <div className='submit-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className="open-themes-submit">
                            <h2>Submit Your Story</h2>
                            <h3 className="theme-name">Theme: {themeName}</h3>
                            <AuthenticateCheck>
                                <AuthorCheck>
                                   <SubmitStoryForm />
                                </AuthorCheck>
                            </AuthenticateCheck>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default SubmitToTheme;
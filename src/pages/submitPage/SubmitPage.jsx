import "./SubmitPage.css";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import OpenThemes from "../../components/openThemes/OpenThemes.jsx";


function SubmitPage() {

    return (
        <section className='submit-section outer-content-container'>
            <div className='submit-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className="submit-container container">
                            <h2 className="submit-title titles">Open themes</h2>
                            <OpenThemes showSubmitButton={true} />
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default SubmitPage;
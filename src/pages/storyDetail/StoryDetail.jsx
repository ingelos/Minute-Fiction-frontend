import "./StoryDetail.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";

function StoryDetail() {
    return (
        <section className='story-section outer-content-container'>
            <div className='story-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className="story-card">

                        </div>
                        <div className="comments-section">

                        </div>
                    </div>


                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default StoryDetail;
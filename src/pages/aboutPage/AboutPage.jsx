import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import "./AboutPage.css";

function AboutPage() {
    return (
        <section className='about-section outer-content-container'>
            <div className='about-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className="about-section-container">
                            <div>
                                <h2>Minute Fiction</h2>
                                <h3>Origin of the name:</h3>
                                <div className="about-container">
                                    <h4>Minute</h4>
                                    <p><strong>noun.</strong></p>
                                    <p>a period of time equal to sixty seconds</p>
                                    <p><strong>adjective.</strong></p>
                                    <p>extremely small</p>
                                    <p><strong>verb.</strong></p>
                                    <p>a short note, make notes of</p>
                                </div>
                                <div className="about-container">
                                    <h4>Fiction</h4>
                                    <p><strong>noun.</strong></p>
                                    <p>a literary work based on the imagination </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default AboutPage;
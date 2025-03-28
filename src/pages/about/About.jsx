import AsideMenu from "../../components/layout/asideMenu/AsideMenu.jsx";
import "./About.css";

function About() {
    return (
        <section className='about-section outer-content-container'>
            <div className='about-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className="about-section-container">
                            <div>
                                <h2 className="about-title titles">Minute Fiction</h2>
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
                                <div className="about-container">
                                    <h4>Questions?</h4>
                                    <p>Questions, remarks or want to apply as an editor of Minute Fiction?</p>
                                    <p>Contact us at <strong>editor@minutefiction.com</strong></p>
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

export default About;
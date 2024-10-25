import "./Footer.css";
import Copyright from "../../assets/icons/copyright.svg";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="footer outer-content-container">
            <div className="footer inner-content-container">
                <div className="footer-container">
                    <div className="copyright-info">
                        <img src={Copyright} id='copyright-icon' alt='copyright-icon'/>
                        <p>2024 Minute Fiction. All Rights reserved.</p>
                    </div>
                    <Link to={"/about"}><p className="about-link">About</p></Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
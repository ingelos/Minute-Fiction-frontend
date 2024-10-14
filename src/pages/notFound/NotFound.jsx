import "./NotFound.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <section className='not-found-section outer-content-container'>
            <div className='not-found-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className='not-found-title titles'>404 Not Found</h2>
                        <p>We can`t find the page you`re looking for</p>
                        <p>Take me back to <Link to={'/'}>Home</Link></p>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default NotFound;
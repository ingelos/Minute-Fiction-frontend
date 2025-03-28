import AsideMenu from "../../components/layout/asideMenu/AsideMenu.jsx";
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <section className='not-found-section outer-content-container'>
            <div className='not-found-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <h2 className='not-found-title titles'>404 Not Found</h2>
                        <p>We can&apos;t find the page you&apos;re looking for</p>
                        <p>Take me back to <Link to={'/'}><strong>Home</strong></Link></p>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default NotFound;
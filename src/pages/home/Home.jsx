import "./Home.css"
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";

function Home() {
    return (
        <section className='home-section outer-content-container'>
            <div className='home-section inner-content-container'>
                <div className='main-container'>
                <div className="featured-section"></div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default Home;
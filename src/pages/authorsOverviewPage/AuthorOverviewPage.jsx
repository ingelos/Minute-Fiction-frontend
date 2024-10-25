import {Link, useParams} from "react-router-dom";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import useAuthors from "../../components/useAuthors/UseAuthors.jsx";

function AuthorOverviewPage() {
    const { username } = useParams();
    const { authors, loading, error} = useAuthors(username);


    return (
        <section className='author-overview-section outer-content-container'>
            <div className='author-overview-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div className='author-container container'>
                            <h2 className="author-title titles">All Authors</h2>
                            <div className="author-overview">
                                {loading && <p>Loading...</p>}
                                {error && <p>No authors available at this moment</p>}
                                {authors.length > 0 && (
                                        authors.map((author) => (
                                            <div className="themes-container" key={author.id}>
                                                <Link to={`/authorprofiles/${username}`}>
                                                    <h2>`{author.firstname} {author.lastname}`</h2>
                                                </Link>
                                            </div>
                                        )))}
                            </div>
                        </div>
                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default AuthorOverviewPage;
import {Link} from "react-router-dom";
import AsideMenu from "../../components/layout/asideMenu/AsideMenu.jsx";
import UseAuthors from "../../hooks/useAuthors/UseAuthors.jsx";

function AuthorOverview() {
    const { authors, error, loading} = UseAuthors();

    return (
        <section className='author-overview-section outer-content-container'>
            <div className='author-overview-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <div>
                            <h2 className="author-title titles">All Authors</h2>
                            <div className="author-overview">
                                {loading && <p>Loading...</p>}
                                {error && <p>{error.message}</p>}
                                {authors.length > 0 && (
                                    authors.map((author) => (
                                            <div className="author-container" key={author.username}>
                                                <Link to={`/authors/${author.username}`}>
                                                    <h3>{author.firstname} {author.lastname}</h3>
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

export default AuthorOverview;
import {Link, useParams} from "react-router-dom";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import useAuthors from "../../components/useAuthors/UseAuthors.jsx";

function AuthorOverview() {
    const { username } = useParams();
    const { authors, loading, error} = useAuthors(username);


    return (
        <section className='author-overview-section outer-content-container'>
            <div className='author-overview-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        <article className="author-overview-article">
                            {loading && <p>Loading...</p>}
                            {error && <p>{error.message}</p>}

                            {authors.length > 0 ? (
                                    authors.map((author) => (
                                        <div className="themes-container" key={author.id}>
                                            <Link to={`/authorprofiles/${username}`}>
                                                <h2>`{author.firstname} {author.lastname}`</h2>
                                            </Link>
                                        </div>
                                    ))
                                ) :
                                <p>No themes at this moment</p>
                            })
                        </article>
                    </div>
                    <AsideMenu />
                </div>
            </div>
        </section>
    )
}

export default AuthorOverview;
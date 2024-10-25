import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


function AuthenticateCheck({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
            setLoading(false);
        } else {
            setIsAuthenticated(false);
            setLoading(false);
        }

    }, [token]);

    if (loading) return <p>Loading...</p>;
    if (isAuthenticated) return <>{children}</>;

    return <div>
        <p>You need to be logged in to access this resource!</p>
        <h3 className="link-button-style"><Link to={'/authenticate'}>Log in</Link></h3>
    </div>
}

export default AuthenticateCheck;
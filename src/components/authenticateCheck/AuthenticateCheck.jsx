import {useEffect, useState} from "react";


function AuthenticateCheck({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {

        if (token) {
           setIsAuthenticated(true);
        } else {
            setLoading(false);
            setError(true);
        }

    }, [token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error checking authentication.</p>;

    return isAuthenticated ? children : <p>You are not authorized to access this resource. Log in first.</p>
}

export default AuthenticateCheck;
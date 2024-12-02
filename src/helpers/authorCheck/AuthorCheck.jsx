import {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext.jsx";


function AuthorCheck({children}) {

    const {isAuth, authorities} = useContext(AuthContext);
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        setIsAuthor(isAuth && authorities.includes('AUTHOR'));
    }, [isAuth, authorities]);

    return isAuthor ? children : <h3>You need to be logged in with an active Author Profile to submit stories.</h3>
}

export default AuthorCheck;
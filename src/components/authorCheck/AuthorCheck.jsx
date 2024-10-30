import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";


function AuthorCheck({children}) {

    const {isAuth, authorities} = useContext(AuthContext);
    const isAuthor = isAuth && authorities.includes('AUTHOR');

    return isAuthor ? children : <h3>You need to create an author profile before submitting stories.</h3>
}

export default AuthorCheck;
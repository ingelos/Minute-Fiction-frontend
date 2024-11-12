import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";


function AuthorCheck({children}) {

    const {isAuth, authorities} = useContext(AuthContext);
    const [isAuthor, setIsAuthor] = useState(false);

    // if (isAuth && authorities === undefined) return <div>Loading...</div>

    useEffect(() => {
        setIsAuthor(isAuth && authorities.includes('AUTHOR'));
    }, [isAuth, authorities]);


    // const isAuthor = isAuth && authorities?.includes('AUTHOR');

    console.log('isAuth:', isAuth);
    console.log('authorities:', authorities);
    console.log('isAuthor:', isAuthor);

    return isAuthor ? children : <h3>You need to create an author profile before submitting stories.</h3>
}

export default AuthorCheck;
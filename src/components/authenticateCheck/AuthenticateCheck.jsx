import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";


function AuthenticateCheck({children}) {
    const {isAuth} = useContext(AuthContext);

    return isAuth ? children : <Link to={"/authenticate"}><h3 className="link-button-style authenticate-message">Login</h3></Link>
}

export default AuthenticateCheck;
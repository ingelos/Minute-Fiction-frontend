import {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";


export function AuthenticateCheck({children}) {
    const {isAuth} = useContext(AuthContext);

    return isAuth ? children : <h3 className="link-button-style authenticate-message"><Link to={"/authenticate"}>Login</Link></h3>
}

export default AuthenticateCheck;
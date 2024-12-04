import "./EditorCheck.css";
import {useContext} from "react";
import AuthContext from "../../context/AuthContext.jsx";

function EditorCheck({children}) {

    const {isAuth, authorities} = useContext(AuthContext);

    const isEditor = isAuth && authorities?.includes?.('EDITOR');

    return isEditor ? children :
        <div>
            <h3 className="authority-check">This area is accessible only to editors.</h3>
            <p>Want to apply as editor?</p>
            <p>Contact us at <strong>editor@minutefiction.com</strong></p>
        </div>

}

export default EditorCheck;
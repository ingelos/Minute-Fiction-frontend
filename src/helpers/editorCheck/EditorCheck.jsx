import "./EditorCheck.css";
import {useContext} from "react";
import AuthContext from "../../context/AuthContext.jsx";

function EditorCheck({children, register = false}) {

    const {isAuth, authorities} = useContext(AuthContext);

    // if (isAuth && authorities === undefined) return <div>Loading...</div>;

    const isEditor = isAuth && authorities?.includes('EDITOR');

    if (isEditor) {
        return children;
    }

    return register ? null :
        <div>
            <h3 className="authority-check">This area is accessible only to editors.</h3>
            <p>Want to apply as editor?</p>
            <p>Contact us at <strong>editor@minutefiction.com</strong></p>
        </div>

}

export default EditorCheck;
import {useContext} from "react";
import AuthContext from "../../context/AuthContext.jsx";

function EditorCheck({children, editorOnly = false}) {

    const {isAuth, authorities} = useContext(AuthContext);

    const isEditor = isAuth && authorities?.includes?.('EDITOR');

    if (isEditor) {
        return children;
    }

    return editorOnly ? null : (
        <div>
            <h3 className="authority-check">This area is accessible only to editors</h3>
            <br></br>
            <p>Want to apply as editor?</p>
            <p>Contact us at <strong>editor@minutefiction.com</strong></p>
        </div>
    )
}

export default EditorCheck;
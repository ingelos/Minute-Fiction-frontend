import {useContext} from "react";
import AuthContext from "../../context/AuthContext.jsx";

function EditorCheck({children}) {

    const {isAuth, authorities} = useContext(AuthContext);

    if (isAuth && authorities === undefined) return <div>Loading...</div>;

    const isEditor = isAuth && authorities?.includes('EDITOR');

    return isEditor ? children : <h3 className="authority-check">This area is accessible only to editors.</h3>
}

export default EditorCheck;
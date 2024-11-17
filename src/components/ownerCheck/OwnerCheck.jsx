import {useContext} from "react";
import AuthContext from "../../context/AuthContext.jsx";

function OwnerCheck({ username, children}) {
    const { user} = useContext(AuthContext);

    const isOwner = user && user.username === username;

    return isOwner ? children : null;
}

export default OwnerCheck;
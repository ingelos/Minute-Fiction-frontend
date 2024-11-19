import {useContext} from "react";
import AuthContext from "../../context/AuthContext.jsx";

function OwnerCheck({username, children}) {
    const { user} = useContext(AuthContext);

    if (!user || !user?.username) {
        return null;
    }

    const isOwner = user.username === username;

    return isOwner ? children : null;
}

export default OwnerCheck;
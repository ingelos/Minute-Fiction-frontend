import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function OwnerCheck({ username, children}) {
    const { user, authorities } = useContext(AuthContext);

    const isOwner = user && user.username === username || user && authorities?.includes('EDITOR');



    return isOwner ? children : null;
}

export default OwnerCheck;
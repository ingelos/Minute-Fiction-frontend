import {NavLink} from "react-router-dom";

function NavigationLink({ navId, navDirect, direct}) {
    return (
        <li id={navId}>
            <NavLink
                className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                to={navDirect}>{direct}
            </NavLink>
        </li>
    )
}

export default NavigationLink;
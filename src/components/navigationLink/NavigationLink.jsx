import {NavLink} from "react-router-dom";

function NavigationLink({ navDirect, direct}) {
    return (
        <li>
            <NavLink
                className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                to={navDirect}>
                {direct}
            </NavLink>
        </li>
    )
}

export default NavigationLink;
import NavigationLink from "../navigationLink/NavigationLink.jsx";

function ThemesMenu({ themeNavId }) {
    return (
        <ul className={themeNavId}>
            <NavigationLink
                direct="Fantasy"
                navDirect={'/themes/fantasy'}
            />
            <NavigationLink
                direct="Romance"
                navDirect={'/themes/romance'}
            />
            <NavigationLink
                direct="Humor"
                navDirect={'/themes/humor'}
            />
            <NavigationLink
                direct="Literary"
                navDirect={'/themes/literary'}
            />
            <NavigationLink
                direct="Mystery"
                navDirect={'/themes/mystery'}
            />
            <NavigationLink
                direct="Historical"
                navDirect={'/themes/historical'}
            />
            <NavigationLink
                direct="Poetry"
                navDirect={'/themes/poetry'}
            />
            <NavigationLink
                direct="Thriller"
                navDirect={'/themes/thriller'}
            />
            <NavigationLink
                direct="Magic"
                navDirect={'/themes/magic'}
            />
            <NavigationLink
                direct="Miscellaneous"
                navDirect={'/themes/miscellaneous'}
            />
        </ul>
    )
}

export default ThemesMenu;
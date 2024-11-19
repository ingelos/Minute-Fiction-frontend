import NavigationLink from "../navigationLink/NavigationLink.jsx";

function EditorNavigation() {
    return (
        <div className="dashboard-navigation">
            <ul className="editor-navigation">
                <NavigationLink
                    direct="Editor Dashboard"
                    navDirect={'/editor/editor-dashboard'}
                />
                <div>
                    <NavigationLink
                        direct="Review Stories"
                        navDirect={'/editor/review-stories'}
                    />
                    <NavigationLink
                        direct="Publish Stories"
                        navDirect={'/editor/publish-stories'}
                    />
                    <NavigationLink
                        direct="Manage Mailings"
                        navDirect={'/editor/mailings'}
                    />
                </div>
            </ul>
        </div>
    )
}

export default EditorNavigation;
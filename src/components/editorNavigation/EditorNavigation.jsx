import NavigationLink from "../navigationLink/NavigationLink.jsx";

function EditorNavigation() {
    return (
        <div className="dashboard-navigation">
            <ul className="editor-navigation">
                <NavigationLink
                    direct="Review Submitted Stories"
                    navDirect={'/editor/review-stories'}
                />
                <NavigationLink
                    direct="Publish Accepted Stories"
                    navDirect={'/editor/publish-stories'}
                />
                <NavigationLink
                    direct="Filter and View All Stories"
                    navDirect={'/editor/editor-dashboard'}
                />
            </ul>
        </div>
    )
}

export default EditorNavigation;
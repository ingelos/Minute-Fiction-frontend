import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Themes from "./pages/themes/Themes.jsx";
import Theme from "./pages/theme/Theme.jsx";
import Submit from "./pages/submit/Submit.jsx";
import StoryDetails from "./pages/storyDetails/StoryDetails.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Header from "./components/layout/header/Header.jsx";
import MainNavigation from "./components/layout/mainNavigation/MainNavigation.jsx";
import Footer from "./components/layout/footer/Footer.jsx";
import AuthorProfile from "./pages/authorProfile/AuthorProfile.jsx";
import Authenticate from "./pages/authenticate/Authenticate.jsx";
import SubmitToTheme from "./pages/submitToTheme/SubmitToTheme.jsx";
import AuthorOverview from "./pages/authorsOverview/AuthorOverview.jsx";
import CreateTheme from "./pages/createTheme/CreateTheme.jsx";
import ManageThemes from "./pages/manageThemes/ManageThemes.jsx";
import EditTheme from "./pages/editTheme/EditTheme.jsx";
import ManageMailings from "./pages/manageMailings/ManageMailings.jsx";
import CreateMailing from "./pages/createMailing/CreateMailing.jsx";
import EditMailing from "./pages/editMailing/EditMailing.jsx";
import ReviewStories from "./pages/reviewStories/ReviewStories.jsx";
import PublishStories from "./pages/publishStories/PublishStories.jsx";
import EditorDashboard from "./pages/editorDashboard/EditorDashboard.jsx";
import SendMailing from "./pages/sendMailing/SendMailing.jsx";
import EditStory from "./pages/editStory/EditStory.jsx";
import ManageStories from "./pages/manageStories/ManageStories.jsx";
import UserDetails from "./pages/userDetailsPage/UserDetails.jsx";
import DeleteAccount from "./pages/deleteAccount/DeleteAccount.jsx";
import EditProfilePhoto from "./pages/editProfilePhoto/EditProfilePhoto.jsx";
import ManageUsers from "./pages/manageUsers/ManageUsers.jsx";
import About from "./pages/about/About.jsx";
import ManageAuthorities from "./pages/manageAuthorities/ManageAuthorities.jsx";
import CreateAuthorProfile from "./pages/createAuthorProfile/CreateAuthorProfile.jsx";
import EditComment from "./pages/editComment/EditComment.jsx";
import EditAuthorProfile from "./pages/editAuthorProfile/EditAuthorProfile.jsx";
import ManageAuthors from "./pages/manageAuthors/ManageAuthors.jsx";
import SearchByAuthor from "./pages/searchByAuthor/SearchByAuthor.jsx";
import DownloadStories from "./pages/downloadStories/DownloadStories.jsx";
import AccountSettings from "./pages/accountSettings/AccountSettings.jsx";


function App() {


    return (
        <>
            <Header/>
            <MainNavigation/>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/authenticate" element={<Authenticate/>}/>

                    <Route path="/users/:username" element={<UserDetails/>}/>
                    <Route path="/users/:username/create-profile" element={<CreateAuthorProfile/>}/>
                    <Route path="/users/:username/account-settings" element={<AccountSettings/>}/>
                    <Route path="/users/:username/delete" element={<DeleteAccount/>}/>

                    <Route path="/authors" element={<AuthorOverview/>}/>
                    <Route path="/authors/:username" element={<AuthorProfile/>}/>
                    <Route path="/authors/:username/edit" element={<EditAuthorProfile/>}/>
                    <Route path="/authors/:username/photo" element={<EditProfilePhoto/>}/>
                    <Route path="/authors/:username/download" element={<DownloadStories/>}/>

                    <Route path="/editor/dashboard" element={<EditorDashboard/>}/>
                    <Route path="/editor/stories" element={<ManageStories/>}/>
                    <Route path="/editor/stories/:storyId/edit" element={<EditStory/>}/>
                    <Route path="/editor/stories/review" element={<ReviewStories/>}/>
                    <Route path="/editor/stories/publish" element={<PublishStories/>}/>

                    <Route path="/editor/authors" element={<ManageAuthors/>}/>
                    <Route path="/editor/authors/search" element={<SearchByAuthor/>}/>
                    <Route path="/editor/users" element={<ManageUsers/>}/>
                    <Route path="/editor/users/:username/authorities" element={<ManageAuthorities/>}/>

                    <Route path="/editor/themes" element={<ManageThemes/>}/>
                    <Route path="/editor/themes/new" element={<CreateTheme/>}/>
                    <Route path="/editor/themes/:themeId/edit" element={<EditTheme/>}/>

                    <Route path="/editor/mailings" element={<ManageMailings/>}/>
                    <Route path="/editor/mailings/new" element={<CreateMailing/>}/>
                    <Route path="/editor/mailings/:mailingId/edit" element={<EditMailing/>}/>
                    <Route path="/editor/mailings/:mailingId/send" element={<SendMailing/>}/>

                    <Route path="/themes" element={<Themes/>}/>
                    <Route path="/themes/:themeName" element={<Theme/>}/>

                    <Route path="/submit" element={<Submit/>}/>
                    <Route path="/submit/:themeId" element={<SubmitToTheme/>}/>

                    <Route path="/stories/:storyId" element={<StoryDetails/>}/>
                    <Route path="/stories/:storyId/comments/:commentId/edit" element={<EditComment/>}/>

                    <Route path="/about" element={<About/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App

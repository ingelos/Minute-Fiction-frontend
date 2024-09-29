import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Themes from "./pages/themes/Themes.jsx";
import Theme from "./pages/theme/Theme.jsx";
import Submit from "./pages/submit/Submit.jsx";
import StoryDetails from "./pages/storyDetails/StoryDetails.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Header from "./components/header/Header.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Footer from "./components/footer/Footer.jsx";
import AuthorProfile from "./pages/authorProfile/AuthorProfile.jsx";
import Authenticate from "./pages/authenticate/Authenticate.jsx";
import AccountSettings from "./pages/accountSettings/AccountSettings.jsx";
import SubmitToTheme from "./pages/submitToTheme/SubmitToTheme.jsx";
import AuthorOverview from "./pages/authorsOverview/AuthorOverview.jsx";
import CreateTheme from "./pages/createTheme/CreateTheme.jsx";
import ManageThemes from "./pages/manageThemes/ManageThemes.jsx";
import EditTheme from "./pages/editTheme/EditTheme.jsx";


function App() {


    return (
        <>
            <Header/>
            <Navigation/>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/authenticate" element={<Authenticate/>}/>
                    <Route path="/account-settings" element={<AccountSettings/>}/>

                    <Route path="/editor/themes" element={<ManageThemes/>}/>
                    <Route path="/editor/themes/new" element={<CreateTheme/>}/>
                    <Route path="/editor/themes/edit/:themeId" element={<EditTheme/>}/>

                    <Route path="/editor/submitted" element={<ManageSubmittedStories/>}/>

                    <Route path="/editor/mailings" element={<ManageMailings/>}/>
                    <Route path="/editor/mailings/new" element={<CreateMailing/>}/>
                    <Route path="/editor/mailings/edit/:mailingId" element={<EditMailing/>}/>

                    <Route path="/authors" element={<AuthorOverview/>}/>
                    <Route path="/authorprofiles/:authorId" element={<AuthorProfile/>}/>
                    <Route path="/themes" element={<Themes/>}/>
                    <Route path="/themes/:themeId" element={<Theme/>}/>
                    <Route path="/submit" element={<Submit/>}/>
                    <Route path="/stories/submit/:themeId" element={<SubmitToTheme/>}/>
                    <Route path="/:storyId" element={<StoryDetails/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App

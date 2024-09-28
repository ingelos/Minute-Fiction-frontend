import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import RegisterPage from "./pages/registerPage/RegisterPage.jsx";
import ThemesPage from "./pages/themesPage/ThemesPage.jsx";
import ThemePage from "./pages/themePage/ThemePage.jsx";
import SubmitPage from "./pages/submitPage/SubmitPage.jsx";
import StoryDetailsPage from "./pages/storyDetailsPage/StoryDetailsPage.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Header from "./components/header/Header.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Footer from "./components/footer/Footer.jsx";
import AuthorProfilePage from "./pages/authorProfilePage/AuthorProfilePage.jsx";
import AuthenticatePage from "./pages/authenticatePage/AuthenticatePage.jsx";
import AccountSettingsPage from "./pages/accountSettingsPage/AccountSettingsPage.jsx";


function App() {


    return (
        <>
            <Header/>
            <Navigation/>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/authenticate" element={<AuthenticatePage/>}/>
                    <Route path="/account-settings" element={<AccountSettingsPage/>}/>
                    <Route path="/authorprofiles/:authorId" element={<AuthorProfilePage/>}/>
                    <Route path="/themes" element={<ThemesPage/>}/>
                    <Route path="/themes/:themeId" element={<ThemePage/>}/>
                    <Route path="/submit" element={<SubmitPage/>}/>
                    <Route path="/:storyId" element={<StoryDetailsPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App

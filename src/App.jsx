import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Themes from "./pages/themes/Themes.jsx";
import Theme from "./pages/theme/Theme.jsx";
import Submit from "./pages/submit/Submit.jsx";
import Subscribe from "./pages/subscribe/Subscribe.jsx";
import StoryDetail from "./pages/storyDetail/StoryDetail.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Header from "./components/header/Header.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Footer from "./components/footer/Footer.jsx";
import AuthorProfile from "./pages/authorProfile/AuthorProfile.jsx";
import Authenticate from "./pages/authenticate/Authenticate.jsx";
import AccountSettings from "./pages/accountSettings/AccountSettings.jsx";


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
                    <Route path="/account-settings" element={isAuth ? <AccountSettings/> : <Navigate to="/"/>}/>
                    <Route path="/authorprofiles/:authorId" element={<AuthorProfile/>}/>
                    <Route path="/themes" element={<Themes/>}/>
                    <Route path="/themes/:themeId" element={<Theme/>}/>
                    <Route path="/submit" element={<Submit/>}/>
                    <Route path="/subscribe" element={<Subscribe/>}/>
                    <Route path="/:storyId" element={<StoryDetail/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App

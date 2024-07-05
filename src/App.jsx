
import './App.css'
import {Route, Routes} from "react-router-dom";
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

function App() {


  return (
    <>
      <Header />
      <Navigation />
      <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/themes" element={<Themes/>}/>
        <Route path="/themes/:themeId" element={<Theme/>}/>
        <Route path="/submit" element={<Submit/>}/>
        <Route path="/subscribe" element={<Subscribe/>}/>
        <Route path="/:storyId" element={<StoryDetail/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Test from "./pages/test";
import Album from "./pages/Album";
import Start from "./pages/Start";
import Table from "./pages/Table";
import Navbar from "./components/navbarLanding.js";
import HeroImage from "./components/HeroImage";
import AboutSection from "./components/AboutSection";
import FeaturesSection from "./components/featureSection";
import TeamSection from "./components/TeamSection.js";
import Footer from "./components/footer";
// import Landing from "./pages/Landing";

function App() {
  const { user } = useAuthContext();

  console.log("IN APP");
  console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="pages">
          <Routes>
            {/* <Route path="/" element={<Landing />} /> */}
            <Route
              path="/"
              element={
                <div>
                  <Navbar />
                  <HeroImage />
                  <AboutSection />
                  <FeaturesSection />
                  <TeamSection />
                </div>
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/album" element={<Album />} />

            <Route path="/start" element={<Start />} />
            <Route path="/table" element={<Table />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { useState, useCallback } from "react";

// Imports from utils
import { getStoredUser } from "@/utils/storage.js";

// Imports from pages
import LoginPage from "@/pages/login.jsx";
import AdminPanel from "@/pages/AdminPanel.jsx";
import PropertyDetail from "@/pages/PropertyDetail.jsx";
import ServiceDetail from "@/pages/ServiceDetail.jsx";
import MyHistory from "@/pages/MyHistory.jsx";

// Imports from components
import Header from "@/Components/Layout/Header.jsx";
import Footer from "@/Components/Layout/Footer.jsx";
import Hero from "@/Components/Hero.jsx";
import About from "@/Components/About.jsx";
import Services from "@/Components/Service.jsx";
import Contact from "@/Components/Contact.jsx";
import SlideContainer from "@/Components/SlideContainer.jsx";

// Imports from cards
import PropertiesSection from "@/Card/PropertiesSelection.jsx";

// ——— STYLES ————————————————————————————————————————————————————

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --orange: hsl(9, 100%, 62%);
    --orange-dark: hsl(9, 90%, 52%);
    --yellow-green: hsl(89, 72%, 45%);
    --raisin: hsl(227, 29%, 13%);
    --cadet: hsl(200, 15%, 43%);
    --cultured: hsl(192, 24%, 96%);
    --alice: hsl(210, 100%, 97%);
    --white: #fff;
    --shadow: 0 8px 32px hsla(219, 56%, 21%, 0.12);
    --shadow-sm: 0 4px 16px hsla(219, 56%, 21%, 0.08);
    --ff: 'Poppins', sans-serif;
    --radius: 12px;
    --transition: 0.25s ease;
  }
  html { scroll-behavior: smooth; overflow: hidden; }
  body { font-family: var(--ff); color: var(--raisin); background: var(--white); overflow: hidden; }
  img { max-width: 100%; display: block; }
  button { cursor: pointer; border: none; background: none; font-family: var(--ff); }
  a { text-decoration: none; color: inherit; }
  input, textarea, select { font-family: var(--ff); }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--cultured); }
  ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 3px; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes spin { to { transform: rotate(360deg); } }

  .fade-up { animation: fadeUp 0.6s ease forwards; }
  .fade-in { animation: fadeIn 0.4s ease forwards; }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
  .section-subtitle { color: var(--orange); font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
  .section-title { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; color: var(--raisin); margin-bottom: 16px; line-height: 1.3; }
  .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; background: var(--orange); color: var(--white); border-radius: 8px; font-weight: 600; font-size: 0.9rem; transition: var(--transition); }
  .btn-primary:hover { background: var(--orange-dark); transform: translateY(-2px); box-shadow: 0 8px 24px hsla(9,100%,62%,0.35); }
  .btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 11px 26px; border: 2px solid var(--orange); color: var(--orange); border-radius: 8px; font-weight: 600; font-size: 0.9rem; transition: var(--transition); background: transparent; }
  .btn-outline:hover { background: var(--orange); color: var(--white); transform: translateY(-2px); }
`;

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(getStoredUser);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (u) => {
    setUser(u);
    navigate(u.role === "admin" ? "/admin" : "/");
  };

  const handlePropertyClick = (p) => { 
    setSelectedProperty(p); 
    navigate("/property/" + p.id); 
  };

  const handleServiceClick = (s) => { 
    setSelectedService(s); 
    navigate("/service/" + s.id); 
  };

  const handleSlideChange = useCallback((index) => {
    setActiveSlide(index);
  }, []);

  // Navigate to a specific slide from header
  const goToSlide = useCallback((slideIndex) => {
    setSelectedProperty(null);
    setSelectedService(null);
    setActiveSlide(slideIndex);
    navigate("/");
  }, [navigate]);

  // Backward compatible setPage function for Header component
  const mockSetPage = (pageName) => {
    if (pageName === "home") navigate("/");
    else if (pageName === "admin") navigate("/admin");
    else if (pageName === "history") navigate("/history");
  };

  if (!user) return (
    <>
      <style>{globalStyles}</style>
      <Routes>
        <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>
    </>
  );

  return (
    <>
      <style>{globalStyles}</style>
      <Header
        user={user}
        setPage={mockSetPage}
        setSelectedProperty={setSelectedProperty}
        setSelectedService={setSelectedService}
        activeSlide={activeSlide}
        goToSlide={goToSlide}
      />
      
      <Routes>
        <Route path="/" element={
          <SlideContainer activeSlide={activeSlide} onSlideChange={handleSlideChange}>
            <Hero goToSlide={goToSlide} />
            <About goToSlide={goToSlide} />
            <Services onServiceClick={handleServiceClick} />
            <PropertiesSection onPropertyClick={handlePropertyClick} />
            <div>
              <Contact />
              <Footer goToSlide={goToSlide} />
            </div>
          </SlideContainer>
        } />

        <Route path="/admin" element={
          <main style={{ marginTop: "80px", height: "calc(100vh - 80px)", overflow: "auto" }}>
            {user.role === "admin" ? <AdminPanel /> : <Navigate to="/" />}
          </main>
        } />

        <Route path="/property/:id" element={
          <main style={{ marginTop: "80px", height: "calc(100vh - 80px)", overflow: "auto" }}>
            {selectedProperty ? (
              <PropertyDetail property={selectedProperty} onBack={() => { setSelectedProperty(null); navigate("/"); }} goToSlide={goToSlide} />
            ) : (
              <Navigate to="/" />
            )}
          </main>
        } />

        <Route path="/history" element={<MyHistory />} />

        <Route path="/service/:id" element={
          <main style={{ marginTop: "80px", height: "calc(100vh - 80px)", overflow: "auto" }}>
            {selectedService ? (
              <ServiceDetail service={selectedService} onBack={() => { setSelectedService(null); navigate("/"); }} goToSlide={goToSlide} />
            ) : (
              <Navigate to="/" />
            )}
          </main>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

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

  .container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
  .section-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
  
  /* Mobile Optimizations */
  @media (max-width: 768px) {
    .container { padding: 0 16px; }
    .section-title { font-size: 1.8rem; }
    .btn-primary, .btn-outline { padding: 12px 20px; width: 100%; justify-content: center; }
    .responsive-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
    .mobile-hide { display: none !important; }
    .mobile-full { width: 100% !important; }
  }

  /* Smoothness & Transitions */
  * { transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .smooth-scroll { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }

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

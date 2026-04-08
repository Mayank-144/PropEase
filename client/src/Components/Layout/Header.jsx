import { useState } from "react";

const SLIDE_MAP = {
  home: 0,
  about: 1,
  service: 2,
  property: 3,
  contact: 4,
};

function Header({ user, setPage, setSelectedProperty, setSelectedService, activeSlide, goToSlide }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Header is always visible, but style changes based on active slide
  // Dark slides: 0 (Hero), 2 (Services has cultured bg but we keep it light-on-dark for consistency)
  const isDarkSlide = activeSlide === 0;

  const logout = () => { localStorage.removeItem("hv_user"); window.location.reload(); };

  const navLinks = user?.role === "admin"
    ? [{ label: "Home", page: "home" }, { label: "Admin Panel", page: "admin" }, { label: "My History", page: "history" }]
    : [
        { label: "Home", slide: 0 },
        { label: "About", slide: 1 },
        { label: "Services", slide: 2 },
        { label: "Properties", slide: 3 },
        { label: "Contact", slide: 4 },
        { label: "My History", page: "history" }
      ];

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.page) {
      setPage(link.page);
      setSelectedProperty(null);
      setSelectedService(null);
    } else if (link.slide !== undefined && goToSlide) {
      goToSlide(link.slide);
    }
  };

  return (
    <>
      <style>{`
        .nav-link {
          padding: 6px 2px;
          font-size: 0.9rem;
          font-weight: 600;
          color: ${isDarkSlide ? "rgba(255,255,255,0.85)" : "var(--raisin)"};
          border-bottom: 2px solid transparent;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }
        .nav-link:hover, .nav-link.is-active {
          color: var(--orange);
          border-bottom-color: var(--orange);
        }
        .header-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          transition: all 0.2s;
        }
        @media(max-width:768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media(min-width:769px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
      <header style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: isDarkSlide ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        boxShadow: isDarkSlide ? "none" : "0 2px 20px rgba(0,0,0,0.06)",
        transition: "all 0.5s ease",
        borderBottom: isDarkSlide ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: "68px" }}>
          <div onClick={() => goToSlide?.(0)} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <span style={{ fontSize: "1.5rem" }}>🏠</span>
            <span style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              letterSpacing: "1.5px",
              color: isDarkSlide ? "white" : "var(--raisin)",
              transition: "color 0.4s"
            }}>PROPEASE</span>
          </div>

          <nav className="desktop-nav" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {navLinks.map(l => {
              const isActive = l.slide !== undefined && l.slide === activeSlide;
              return (
                <span
                  key={l.label}
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleNavClick(l)}
                >
                  {l.label}
                </span>
              );
            })}
          </nav>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "6px 14px",
              background: isDarkSlide ? "rgba(255,255,255,0.1)" : "var(--cultured)",
              borderRadius: "20px",
              transition: "background 0.4s"
            }}>
              <span style={{ fontSize: "0.85rem" }}>👤</span>
              <span style={{
                fontSize: "0.82rem", fontWeight: 600,
                color: isDarkSlide ? "white" : "var(--raisin)",
                transition: "color 0.4s"
              }}>{user?.name}</span>
            </div>
            <button onClick={logout} className="header-btn" style={{ background: "var(--orange)", color: "white" }}>
              <span>⎋</span> Logout
            </button>
            <button className="mobile-toggle header-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
              background: isDarkSlide ? "rgba(255,255,255,0.1)" : "var(--cultured)",
              color: isDarkSlide ? "white" : "var(--raisin)"
            }}>☰</button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: "white", borderTop: "1px solid #eee", padding: "16px 20px" }}>
            {navLinks.map(l => {
              const isActive = l.slide !== undefined && l.slide === activeSlide;
              return (
                <div key={l.label} style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #f0f0f0",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: isActive ? "var(--orange)" : "var(--raisin)"
                }}
                onClick={() => handleNavClick(l)}>
                  {l.label}
                </div>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}

export default Header;

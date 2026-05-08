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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);

  // Header is always visible, but style changes based on active slide
  // Dark slides: 0 (Hero), 2 (Services has cultured bg but we keep it light-on-dark for consistency)
  const isDarkSlide = activeSlide === 0;

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setShowGoodbye(true);
    setTimeout(() => {
      localStorage.removeItem("hv_user");
      window.location.reload();
    }, 2000);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

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
          padding: 8px 4px;
          font-size: clamp(0.8rem, 1.8vw, 0.9rem);
          font-weight: 700;
          color: ${isDarkSlide ? "rgba(255,255,255,0.85)" : "var(--raisin)"};
          border-bottom: 3px solid transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          letter-spacing: 0.3px;
        }
        .nav-link:hover {
          color: var(--orange);
          border-bottom-color: var(--orange);
          transform: translateY(-2px);
        }
        .nav-link.is-active {
          color: var(--orange);
          border-bottom-color: var(--orange);
          box-shadow: 0 4px 12px rgba(228, 113, 42, 0.15);
        }
        .header-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: clamp(8px, 1.5vw, 10px) clamp(14px, 2vw, 20px);
          border-radius: 12px;
          font-size: clamp(0.75rem, 1.5vw, 0.82rem);
          font-weight: 700;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: none;
          letter-spacing: 0.2px;
        }
        .header-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }
        @media(max-width:768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media(min-width:769px) {
          .mobile-toggle { display: none !important; }
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }
        .modal-content {
          background: white;
          border-radius: 20px;
          padding: clamp(30px, 5vw, 40px);
          max-width: 90vw;
          width: 400px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-emoji {
          font-size: clamp(3rem, 8vw, 4rem);
          margin-bottom: 16px;
          animation: bounce 0.6s ease;
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .goodbye-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3000;
          text-align: center;
          animation: fadeIn 0.4s ease;
        }
        .goodbye-emoji {
          font-size: 5rem;
          margin-bottom: 20px;
          animation: wave 1s ease infinite;
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
      `}</style>

      {/* Goodbye Animation */}
      {showGoodbye && (
        <div className="goodbye-container">
          <div className="goodbye-emoji">😢</div>
          <h2 style={{ color: "var(--raisin)", fontWeight: 800, fontSize: "clamp(1.5rem, 4vw, 2rem)", letterSpacing: "1px" }}>Goodbye!</h2>
          <p style={{ color: "var(--cadet)", fontSize: "clamp(0.9rem, 2vw, 1rem)", marginTop: "8px" }}>See you soon 👋</p>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={handleCancelLogout}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-emoji">🤔</div>
            <h3 style={{ color: "var(--raisin)", fontWeight: 800, fontSize: "clamp(1.2rem, 3vw, 1.5rem)", marginBottom: "12px", letterSpacing: "0.5px" }}>Wait a minute!</h3>
            <p style={{ color: "var(--cadet)", fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)", marginBottom: "28px", lineHeight: 1.6 }}>
              Do you really want to go? 😔
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={handleCancelLogout}
                style={{
                  padding: "11px 24px",
                  border: "2px solid var(--orange)",
                  color: "var(--orange)",
                  background: "transparent",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.target.style.background = "var(--orange)";
                  e.target.style.color = "white";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "var(--orange)";
                }}
              >
                No, Stay
              </button>
              <button
                onClick={handleConfirmLogout}
                style={{
                  padding: "11px 24px",
                  background: "var(--orange)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 15px rgba(228, 113, 42, 0.3)"
                }}
                onMouseEnter={e => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(228, 113, 42, 0.4)";
                }}
                onMouseLeave={e => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(228, 113, 42, 0.3)";
                }}
              >
                Yes, Goodbye
              </button>
            </div>
          </div>
        </div>
      )}

      <header style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: isDarkSlide ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(30px)",
        boxShadow: isDarkSlide ? "0 2px 20px rgba(0,0,0,0.1)" : "0 4px 30px rgba(0,0,0,0.08)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        borderBottom: isDarkSlide ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: "clamp(60px, 12vw, 72px)" }}>
          {/* Logo */}
          <div onClick={() => goToSlide?.(0)} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", transition: "transform 0.3s", flex: "0 0 auto" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <span style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>🏠</span>
            <span style={{
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              fontWeight: 900,
              letterSpacing: "2px",
              color: isDarkSlide ? "white" : "var(--raisin)",
              transition: "color 0.4s, text-shadow 0.4s",
              textShadow: isDarkSlide ? "0 2px 8px rgba(0,0,0,0.2)" : "none"
            }}>PROPEASE</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: "flex", gap: "clamp(16px, 3vw, 32px)", alignItems: "center", flex: 1, justifyContent: "center" }}>
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

          {/* Right Section */}
          <div style={{ display: "flex", gap: "clamp(8px, 2vw, 12px)", alignItems: "center", flex: "0 0 auto" }}>
            {/* User Info */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "clamp(6px, 1.5vw, 8px) clamp(12px, 2vw, 16px)",
              background: isDarkSlide ? "rgba(255,255,255,0.12)" : "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))",
              border: isDarkSlide ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.05)",
              borderRadius: "14px",
              transition: "all 0.3s",
              backdropFilter: "blur(10px)"
            }}>
              <span style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>👤</span>
              <span style={{
                fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)", fontWeight: 700,
                color: isDarkSlide ? "white" : "var(--raisin)",
                transition: "color 0.4s",
                letterSpacing: "0.2px"
              }}>{user?.name}</span>
            </div>

            {/* Logout Button */}
            <button onClick={handleLogoutClick} className="header-btn" style={{ background: "linear-gradient(135deg, var(--orange) 0%, hsl(9,90%,52%) 100%)", color: "white", border: "none" }}>
              <span>🚪</span> <span style={{ display: "none" }} className="logout-text">Logout</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button className="mobile-toggle header-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
              background: isDarkSlide ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))",
              color: isDarkSlide ? "white" : "var(--raisin)",
              border: isDarkSlide ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.05)"
            }}>☰</button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ background: isDarkSlide ? "rgba(0,0,0,0.4)" : "white", borderTop: isDarkSlide ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)", padding: "clamp(12px, 2vw, 20px) 20px", backdropFilter: "blur(10px)", animation: "slideUp 0.3s ease" }}>
            {navLinks.map(l => {
              const isActive = l.slide !== undefined && l.slide === activeSlide;
              return (
                <div key={l.label} style={{
                  padding: "clamp(10px, 2vw, 14px) 0",
                  borderBottom: "1px solid " + (isDarkSlide ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"),
                  fontWeight: 700,
                  cursor: "pointer",
                  color: isActive ? "var(--orange)" : isDarkSlide ? "white" : "var(--raisin)",
                  fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
                  transition: "all 0.2s",
                  letterSpacing: "0.2px"
                }}
                  onClick={() => handleNavClick(l)}>
                  {l.label}
                </div>
              );
            })}
            <div style={{
              padding: "clamp(10px, 2vw, 14px) 0",
              marginTop: "8px",
              borderTop: "1px solid " + (isDarkSlide ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)")
            }}>
              <button onClick={handleLogoutClick} style={{
                width: "100%",
                padding: "clamp(10px, 2vw, 12px) 14px",
                background: "linear-gradient(135deg, var(--orange) 0%, hsl(9,90%,52%) 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(228, 113, 42, 0.3)";
              }}
              onMouseLeave={e => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}>
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;

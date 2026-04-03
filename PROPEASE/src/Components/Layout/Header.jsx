import { useState, useEffect } from "react";

function Header({ user, setPage, setSelectedProperty, setSelectedService }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => { localStorage.removeItem("hv_user"); window.location.reload(); };

  const navLinks = user?.role === "admin"
    ? [{ label: "Home", page: "home" }, { label: "Admin Panel", page: "admin" }]
    : [{ label: "Home", page: "home" }, { label: "About", section: "about" }, { label: "Services", section: "service" }, { label: "Properties", section: "property" }, { label: "Contact", section: "contact" }];

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <style>{`
        .nav-link { padding: 6px 2px; font-size: 0.9rem; font-weight: 600; color: ${scrolled ? "var(--raisin)" : "white"}; border-bottom: 2px solid transparent; transition: all 0.2s; cursor: pointer; }
        .nav-link:hover { color: var(--orange); border-bottom-color: var(--orange); }
        .header-btn { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; transition: all 0.2s; }
        @media(max-width:768px){ .desktop-nav{display:none!important} .mobile-toggle{display:flex!important} }
        @media(min-width:769px){ .mobile-toggle{display:none!important} }
      `}</style>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(255,255,255,0.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none", transition: "all 0.3s", borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: "68px" }}>
          <div onClick={() => { setPage("home"); setSelectedProperty(null); setSelectedService(null); }} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <span style={{ fontSize: "1.5rem" }}>🏠</span>
            <span style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "1.5px", color: scrolled ? "var(--raisin)" : "white" }}>PROPEASE</span>
          </div>

          <nav className="desktop-nav" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {navLinks.map(l => (
              <span key={l.label} className="nav-link" onClick={() => { if (l.page) { setPage(l.page); setSelectedProperty(null); setSelectedService(null); } else if (l.section) { setPage("home"); setTimeout(() => scrollTo(l.section), 100); } }}>{l.label}</span>
            ))}
          </nav>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px", background: scrolled ? "var(--cultured)" : "rgba(255,255,255,0.1)", borderRadius: "20px" }}>
              <span style={{ fontSize: "0.85rem" }}>👤</span>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: scrolled ? "var(--raisin)" : "white" }}>{user?.name}</span>
            </div>
            <button onClick={logout} className="header-btn" style={{ background: "var(--orange)", color: "white" }}>
              <span>⎋</span> Logout
            </button>
            <button className="mobile-toggle header-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: scrolled ? "var(--cultured)" : "rgba(255,255,255,0.1)", color: scrolled ? "var(--raisin)" : "white" }}>☰</button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: "white", borderTop: "1px solid #eee", padding: "16px 20px" }}>
            {navLinks.map(l => (
              <div key={l.label} style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0", fontWeight: 600, cursor: "pointer", color: "var(--raisin)" }}
                onClick={() => { if (l.page) { setPage(l.page); setSelectedProperty(null); setSelectedService(null); setMenuOpen(false); } else if (l.section) { setPage("home"); setMenuOpen(false); setTimeout(() => scrollTo(l.section), 100); } }}>
                {l.label}
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

export default Header;

function Footer({ goToSlide }) {
  return (
    <footer style={{ background: "hsl(227,29%,13%)", color: "rgba(255,255,255,0.7)", padding: "clamp(30px, 5vw, 50px) 20px clamp(15px, 2vw, 20px)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 70vw, 180px), 1fr))", gap: "clamp(20px, 4vw, 35px)", marginBottom: "clamp(20px, 3vw, 35px)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", cursor: "pointer" }} onClick={() => goToSlide && goToSlide(0)}>
              <span style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}>🏠</span>
              <span style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)", fontWeight: 800, color: "white", letterSpacing: "1.5px" }}>PROPEASE</span>
            </div>
            <p style={{ lineHeight: 1.6, fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)", marginBottom: "clamp(14px, 2vw, 18px)" }}>Your integrated web-based platform catering to both landlords and tenants for a streamlined experience.</p>
            <div style={{ display: "flex", gap: "6px" }}>
              {["📘", "🐦", "📸", "▶️"].map((icon, i) => (
                <div key={i} style={{ width: "clamp(28px, 5vw, 32px)", height: "clamp(28px, 5vw, 32px)", background: "rgba(255,255,255,0.07)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s", fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--orange)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>{icon}</div>
              ))}
            </div>
          </div>
          {[
            {
              title: "Company",
              links: [
                { label: "About", action: () => goToSlide && goToSlide(1) },
                { label: "All Properties", action: () => goToSlide && goToSlide(3) },
                { label: "Services", action: () => goToSlide && goToSlide(2) },
                { label: "Contact Us", action: () => goToSlide && goToSlide(4) }
              ]
            },
            {
              title: "Services",
              links: [
                { label: "Buy a Home", action: () => goToSlide && goToSlide(2) },
                { label: "Rent a Home", action: () => goToSlide && goToSlide(2) },
                { label: "Property Mgmt", action: () => goToSlide && goToSlide(2) }
              ]
            },
            {
              title: "Reach Us",
              links: [
                { label: "Brooklyn, NYC" },
                { label: "+0123-456789" },
                { label: "contact@propease.com" }
              ]
            }
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: "white", fontWeight: 700, marginBottom: "clamp(12px, 2vw, 14px)", fontSize: "clamp(0.8rem, 1.6vw, 0.9rem)" }}>{col.title}</h4>
              <ul style={{ listStyle: "none" }}>
                {col.links.map(l => (
                  <li
                    key={l.label}
                    onClick={l.action}
                    style={{ marginBottom: "clamp(6px, 1.2vw, 8px)", fontSize: "clamp(0.7rem, 1.3vw, 0.8rem)", cursor: l.action ? "pointer" : "default", transition: "color 0.2s" }}
                    onMouseEnter={e => { if (l.action) e.currentTarget.style.color = "var(--orange)"; }}
                    onMouseLeave={e => { if (l.action) e.currentTarget.style.color = ""; }}
                  >
                    {l.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "clamp(16px, 2vw, 20px)", textAlign: "center", fontSize: "clamp(0.65rem, 1.2vw, 0.75rem)" }}>
          © 2024 PROPEASE. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

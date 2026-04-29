function Footer({ goToSlide }) {
  return (
    <footer style={{ background: "hsl(227,29%,13%)", color: "rgba(255,255,255,0.7)", padding: "60px 20px 30px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "50px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", cursor: "pointer" }} onClick={() => goToSlide && goToSlide(0)}>
              <span style={{ fontSize: "1.4rem" }}>🏠</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "white", letterSpacing: "1.5px" }}>PROPEASE</span>
            </div>
            <p style={{ lineHeight: 1.7, fontSize: "0.85rem", marginBottom: "20px" }}>Your integrated web-based platform catering to both landlords and tenants for a streamlined experience.</p>
            <div style={{ display: "flex", gap: "8px" }}>
              {["📘", "🐦", "📸", "▶️"].map((icon, i) => (
                <div key={i} style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.07)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s", fontSize: "0.9rem" }}
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
              <h4 style={{ color: "white", fontWeight: 700, marginBottom: "16px", fontSize: "0.95rem" }}>{col.title}</h4>
              <ul style={{ listStyle: "none" }}>
                {col.links.map(l => (
                  <li
                    key={l.label}
                    onClick={l.action}
                    style={{ marginBottom: "8px", fontSize: "0.85rem", cursor: l.action ? "pointer" : "default", transition: "color 0.2s" }}
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
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", textAlign: "center", fontSize: "0.82rem" }}>
          © 2024 PROPEASE. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

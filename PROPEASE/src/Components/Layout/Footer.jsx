function Footer() {
  return (
    <footer style={{ background: "hsl(227,29%,13%)", color: "rgba(255,255,255,0.7)", padding: "60px 20px 30px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "50px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span style={{ fontSize: "1.4rem" }}>🏠</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "white", letterSpacing: "1.5px" }}>PROPEASE</span>
            </div>
            <p style={{ lineHeight: 1.7, fontSize: "0.85rem", marginBottom: "20px" }}>Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div style={{ display: "flex", gap: "8px" }}>
              {["📘", "🐦", "📸", "▶️"].map((icon, i) => (
                <div key={i} style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.07)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s", fontSize: "0.9rem" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--orange)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>{icon}</div>
              ))}
            </div>
          </div>
          {[{ title: "Company", links: ["About", "All Products", "Locations", "FAQ", "Contact Us"] },
            { title: "Services", links: ["Buy a Home", "Rent a Home", "Sell a Home", "Management"] },
            { title: "Contact", links: ["Brooklyn, NYC", "+0123-456789", "contact@homeverse.com"] }].map(col => (
            <div key={col.title}>
              <h4 style={{ color: "white", fontWeight: 700, marginBottom: "16px", fontSize: "0.95rem" }}>{col.title}</h4>
              <ul style={{ listStyle: "none" }}>
                {col.links.map(l => <li key={l} style={{ marginBottom: "8px", fontSize: "0.85rem", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"} onMouseLeave={e => e.currentTarget.style.color = ""}>{l}</li>)}
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

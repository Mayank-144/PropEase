import { initialServices } from "../data/mockdata.js";

function Services({ onServiceClick }) {
  const services = initialServices;
  return (
    <section id="service" style={{ minHeight: "100vh", padding: "80px 20px", background: "var(--cultured)", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="section-subtitle">Our Services</p>
          <h2 className="section-title">Our Main Focus</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "24px" }}>
          {services.map((s, i) => (
            <div key={s.id} onClick={() => onServiceClick(s)}
              style={{ background: "white", borderRadius: "var(--radius)", padding: "36px 28px", boxShadow: "var(--shadow-sm)", transition: "all 0.3s", cursor: "pointer", animation: `fadeUp 0.6s ease ${i * 0.1}s both`, border: "1px solid transparent" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; e.currentTarget.style.borderColor = "hsla(9,100%,62%,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.borderColor = "transparent"; }}>
              <div style={{ width: "64px", height: "64px", background: "hsla(9,100%,62%,0.1)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", marginBottom: "20px" }}>{s.icon}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "12px", color: "var(--raisin)" }}>{s.title}</h3>
              <p style={{ color: "var(--cadet)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "20px" }}>{s.short}</p>
              <span style={{ color: "var(--orange)", fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>Learn More →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

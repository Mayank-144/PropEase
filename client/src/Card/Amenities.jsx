function Amenities() {
  const list = [
    { icon: "🚗", label: "Parking Space" }, { icon: "🏊", label: "Swimming Pool" },
    { icon: "🛡️", label: "Private Security" }, { icon: "🏥", label: "Medical Center" },
    { icon: "📚", label: "Library Area" }, { icon: "🛏", label: "King Size Beds" },
    { icon: "🏠", label: "Smart Homes" }, { icon: "🏈", label: "Kid's Playland" },
  ];
  return (
    <section style={{ padding: "clamp(50px, 8vw, 100px) 20px", background: "linear-gradient(135deg, hsl(200,69%,14%) 0%, hsl(227,29%,13%) 100%)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 60px)" }}>
          <p style={{ color: "hsl(9,100%,72%)", fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>Our Amenities</p>
          <h2 style={{ color: "white", fontSize: "clamp(1.4rem, 4vw, 2.2rem)", fontWeight: 700 }}>Building Amenities</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(160px, 80vw, 200px), 1fr))", gap: "clamp(12px, 2.5vw, 16px)" }}>
          {list.map((a, i) => (
            <div key={a.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "clamp(10px, 2vw, 14px)", padding: "clamp(18px, 3vw, 24px) clamp(16px, 2.5vw, 20px)", display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 14px)", transition: "all 0.3s", cursor: "pointer", animation: `fadeUp 0.5s ease ${i * 0.07}s both` }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; }}>
              <span style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", flexShrink: 0 }}>{a.icon}</span>
              <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)" }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Amenities;

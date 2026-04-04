function About() {
  const items = [
    { icon: "🏠", text: "Multiple Home Choices" }, { icon: "🌿", text: "Around Developed Area" },
    { icon: "🤝", text: "No Brokerage Guarantee" }, { icon: "🛡️", text: "Complete 24/7 Security" },
  ];
  return (
    <section id="about" style={{ padding: "100px 20px", background: "var(--white)" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "var(--shadow)" }}>
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80" alt="House interior" style={{ width: "100%", height: "460px", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", bottom: "30px", right: "-20px", background: "white", borderRadius: "14px", padding: "20px 24px", boxShadow: "var(--shadow)", minWidth: "160px" }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--orange)", textAlign: "center" }}>39K+</div>
            <div style={{ color: "var(--cadet)", fontSize: "0.82rem", textAlign: "center" }}>People Served</div>
          </div>
        </div>
        <div>
          <p className="section-subtitle">About Us</p>
          <h2 className="section-title">The Leading Property Rental Marketplace.</h2>
          <p style={{ color: "var(--cadet)", lineHeight: 1.8, marginBottom: "28px", fontSize: "0.95rem" }}>
            Over 39,000 people work with us across more than 70 countries. Our global coverage combined with specialist services makes us the most trusted name in real estate.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
            {items.map(i => (
              <div key={i.text} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "var(--cultured)", borderRadius: "10px" }}>
                <span style={{ fontSize: "1.3rem" }}>{i.icon}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--raisin)" }}>{i.text}</span>
              </div>
            ))}
          </div>
          <blockquote style={{ padding: "20px 24px", background: "var(--alice)", borderLeft: "4px solid var(--orange)", borderRadius: "0 10px 10px 0", marginBottom: "28px" }}>
            <p style={{ color: "var(--cadet)", fontStyle: "italic", lineHeight: 1.7, fontSize: "0.9rem" }}>
              "Enimad minim veniam quis nostrud exercitation llamco laboris. Lorem ipsum dolor sit amet."
            </p>
          </blockquote>
          <a href="#service" onClick={e => { e.preventDefault(); document.getElementById("service")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-primary">Our Services →</a>
        </div>
      </div>
    </section>
  );
}

export default About;

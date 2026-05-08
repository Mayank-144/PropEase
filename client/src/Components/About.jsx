function About({ goToSlide }) {
  const items = [
    { icon: "🏠", text: "Multiple Home Choices" }, { icon: "🌿", text: "Around Developed Area" },
    { icon: "🤝", text: "No Brokerage Guarantee" }, { icon: "🛡️", text: "Complete 24/7 Security" },
  ];
  return (
    <section id="about" style={{ minHeight: "100vh", padding: "clamp(50px, 8vw, 80px) 20px", background: "var(--white)", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 8vw, 70px)", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ borderRadius: "clamp(12px, 3vw, 20px)", overflow: "hidden", boxShadow: "var(--shadow)" }}>
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80" alt="House interior" style={{ width: "100%", height: "clamp(250px, 60vw, 460px)", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", bottom: "clamp(15px, 3vw, 30px)", right: "clamp(-15px, -3vw, -20px)", background: "white", borderRadius: "clamp(10px, 2vw, 14px)", padding: "clamp(14px, 2vw, 20px) clamp(18px, 3vw, 24px)", boxShadow: "var(--shadow)", minWidth: "clamp(130px, 25vw, 160px)" }}>
            <div style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 800, color: "var(--orange)", textAlign: "center" }}>39K+</div>
            <div style={{ color: "var(--cadet)", fontSize: "clamp(0.7rem, 1.8vw, 0.82rem)", textAlign: "center" }}>People Served</div>
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <p className="section-subtitle">About Us</p>
          <h2 className="section-title">The Leading Property Rental Marketplace.</h2>
          <p style={{ color: "var(--cadet)", lineHeight: 1.8, marginBottom: "clamp(20px, 4vw, 28px)", fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}>
            Over 39,000 people work with us across more than 70 countries. Our global coverage combined with specialist services makes us the most trusted name in real estate.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(8px, 2vw, 12px)", marginBottom: "clamp(24px, 4vw, 32px)" }}>
            {items.map(i => (
              <div key={i.text} style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 12px)", padding: "clamp(10px, 2vw, 12px) clamp(12px, 2vw, 16px)", background: "var(--cultured)", borderRadius: "clamp(8px, 1.5vw, 10px)" }}>
                <span style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)" }}>{i.icon}</span>
                <span style={{ fontSize: "clamp(0.75rem, 1.8vw, 0.85rem)", fontWeight: 600, color: "var(--raisin)" }}>{i.text}</span>
              </div>
            ))}
          </div>
          <blockquote style={{ padding: "clamp(16px, 3vw, 20px) clamp(18px, 3vw, 24px)", background: "var(--alice)", borderLeft: "4px solid var(--orange)", borderRadius: "0 10px 10px 0", marginBottom: "clamp(20px, 4vw, 28px)" }}>
            <p style={{ color: "var(--cadet)", fontStyle: "italic", lineHeight: 1.7, fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)" }}>
              "Enimad minim veniam quis nostrud exercitation llamco laboris. Lorem ipsum dolor sit amet."
            </p>
          </blockquote>
          <button onClick={() => goToSlide?.(2)} className="btn-primary">Our Services →</button>
        </div>
      </div>
    </section>
  );
}

export default About;

function Hero() {
  return (
    <section id="home" style={{ minHeight: "100vh", background: "linear-gradient(135deg, hsl(200,69%,14%) 0%, hsl(227,29%,13%) 60%, hsl(9,60%,18%) 100%)", display: "flex", alignItems: "center", padding: "100px 20px 60px", position: "relative", overflow: "hidden" }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ position: "absolute", borderRadius: "50%", background: `hsla(9,100%,62%,${0.03 + i * 0.015})`, width: `${200 + i * 120}px`, height: `${200 + i * 120}px`, bottom: `${-50 + i * 80}px`, right: `${-80 + i * 60}px`, filter: "blur(80px)" }} />
      ))}
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div style={{ animation: "fadeUp 0.8s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "20px", padding: "6px 16px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.15)" }}>
            <span>🏡</span>
            <span style={{ color: "hsla(0,0%,100%,0.8)", fontSize: "0.8rem", fontWeight: 600 }}>Real Estate Agency</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 800, color: "white", lineHeight: 1.15, marginBottom: "20px" }}>
            Find Your <span style={{ color: "hsl(9,100%,72%)" }}>Dream</span><br />House By Us
          </h1>
          <p style={{ color: "hsla(0,0%,100%,0.65)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "36px", maxWidth: "460px" }}>
            Discover your perfect home with our expert team. We offer the best properties across prime locations in Indore with unmatched service.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#property" onClick={e => { e.preventDefault(); document.getElementById("property")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-primary">Explore Properties →</a>
            <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>Make Enquiry</a>
          </div>
          <div style={{ display: "flex", gap: "40px", marginTop: "50px" }}>
            {[["500+", "Properties"], ["98%", "Happy Clients"], ["10+", "Years Experience"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "white" }}>{n}</div>
                <div style={{ color: "hsla(0,0%,100%,0.5)", fontSize: "0.8rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ animation: "fadeUp 1s ease", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "480px" }}>
            <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Modern house" style={{ width: "100%", height: "380px", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: "-20px", left: "-20px", background: "white", borderRadius: "14px", padding: "16px 20px", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--cadet)", marginBottom: "2px" }}>Best Deal 🔥</div>
              <div style={{ fontWeight: 700, color: "var(--raisin)" }}>₹50,000 / mo</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

export default Hero;

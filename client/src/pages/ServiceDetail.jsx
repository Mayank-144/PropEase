import Footer from "../Components/Layout/Footer.jsx";

function ServiceDetail({ service, onBack, goToSlide }) {
  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "var(--white)", animation: "fadeIn 0.4s ease" }}>
      <div className="container" style={{ padding: "40px 20px" }}>
        <button onClick={onBack} className="btn-outline" style={{ marginBottom: "32px" }}>← Back to Services</button>

        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>{service.icon}</div>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "var(--raisin)", marginBottom: "20px" }}>{service.title}</h1>
          <p style={{ color: "var(--cadet)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "700px", margin: "0 auto" }}>{service.full}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
          <div style={{ background: "var(--cultured)", borderRadius: "16px", padding: "36px" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>⭐ Key Features</h2>
            <ul style={{ listStyle: "none" }}>
              {service.features.map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.05)", color: "var(--cadet)", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--yellow-green)", fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: "var(--cultured)", borderRadius: "16px", padding: "36px" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>📋 Our Process</h2>
            <ol style={{ listStyle: "none", counterReset: "step" }}>
              {service.process.map((step, i) => (
                <li key={step} style={{ display: "flex", gap: "14px", padding: "14px 16px", marginBottom: "10px", background: "white", borderRadius: "10px" }}>
                  <span style={{ width: "28px", height: "28px", background: "var(--orange)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: "var(--cadet)", fontSize: "0.88rem", lineHeight: 1.5, paddingTop: "2px" }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg, hsl(200,69%,14%), hsl(227,29%,13%))", borderRadius: "16px", padding: "48px", textAlign: "center", color: "white" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "12px" }}>Ready to Get Started?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "28px" }}>Contact us today and we'll help you every step of the way.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            {[{ icon: "📞", val: "+91 7000705887" }, { icon: "✉️", val: "info@homeverse.com" }, { icon: "🕐", val: "Mon–Sat: 9 AM–7 PM" }].map(c => (
              <div key={c.val} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "16px 24px", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem" }}>
                <span>{c.icon}</span> <span>{c.val}</span>
              </div>
            ))}
          </div>
          <button onClick={() => alert("A team member will contact you shortly!")} className="btn-primary" style={{ marginTop: "28px" }}>Contact Us Now →</button>
        </div>
      </div>
      <Footer goToSlide={goToSlide} />
    </div>
  );
}

export default ServiceDetail;

import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingMessages = JSON.parse(localStorage.getItem("hv_messages")) || [];
    existingMessages.push({ ...form, id: Date.now(), date: new Date().toLocaleString() });
    localStorage.setItem("hv_messages", JSON.stringify(existingMessages));

    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" style={{ padding: "100px 20px", background: "var(--white)" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px", alignItems: "start" }}>
        <div>
          <p className="section-subtitle">Contact Us</p>
          <h2 className="section-title">Get In Touch With Us</h2>
          <p style={{ color: "var(--cadet)", lineHeight: 1.8, marginBottom: "36px", fontSize: "0.95rem" }}>
            Have questions about a property or our services? Our team is ready to help you find your perfect home.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[{ icon: "📍", title: "Address", val: "Acropolis Institute, Indore, MP" }, { icon: "📞", title: "Phone", val: "+91 7000705887" }, { icon: "✉️", title: "Email", val: "info@homeverse.com" }, { icon: "🕐", title: "Hours", val: "Mon–Sat: 9 AM – 7 PM" }].map(i => (
              <div key={i.title} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ width: "44px", height: "44px", background: "hsla(9,100%,62%,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{i.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--raisin)", marginBottom: "2px" }}>{i.title}</div>
                  <div style={{ color: "var(--cadet)", fontSize: "0.88rem" }}>{i.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "var(--cultured)", borderRadius: "var(--radius)", padding: "36px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeIn 0.4s ease" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
              <h3 style={{ fontWeight: 700, marginBottom: "8px" }}>Message Sent!</h3>
              <p style={{ color: "var(--cadet)", fontSize: "0.9rem" }}>We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {[{ id: "name", label: "Full Name", type: "text" }, { id: "email", label: "Email Address", type: "email" }, { id: "phone", label: "Phone Number", type: "tel" }].map(f => (
                <div key={f.id} style={{ marginBottom: "18px" }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.82rem", color: "var(--raisin)", marginBottom: "7px" }}>{f.label}</label>
                  <input type={f.type} value={form[f.id]} onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))} required
                    style={{ width: "100%", padding: "12px 14px", background: "white", border: "1.5px solid #e5e7ef", borderRadius: "8px", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "var(--orange)"}
                    onBlur={e => e.target.style.borderColor = "#e5e7ef"} />
                </div>
              ))}
              <div style={{ marginBottom: "22px" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.82rem", color: "var(--raisin)", marginBottom: "7px" }}>Message</label>
                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required rows={4}
                  style={{ width: "100%", padding: "12px 14px", background: "white", border: "1.5px solid #e5e7ef", borderRadius: "8px", fontSize: "0.9rem", resize: "vertical", outline: "none", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "var(--orange)"}
                  onBlur={e => e.target.style.borderColor = "#e5e7ef"} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Send Message →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;

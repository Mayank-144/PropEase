import { useState } from "react";
import { usersData } from "../data/mockdata.js";

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const user = usersData.find(u => u.username === form.username && u.password === form.password);
    if (user) {
      const session = { userId: user.id, username: user.username, name: user.name, email: user.email, role: user.role };
      localStorage.setItem("hv_user", JSON.stringify(session));
      onLogin(session);
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, hsl(200,69%,14%) 0%, hsl(227,29%,13%) 50%, hsl(9,60%,18%) 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", position: "relative", overflow: "hidden" }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ position: "absolute", borderRadius: "50%", background: `hsla(9,100%,62%,${0.04 + i * 0.02})`, width: `${300 + i * 150}px`, height: `${300 + i * 150}px`, top: `${-50 + i * 100}px`, right: `${-100 + i * 50}px`, filter: "blur(60px)" }} />
      ))}
      <div style={{ width: "100%", maxWidth: "420px", animation: "fadeUp 0.6s ease", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "white" }}>
            <span style={{ fontSize: "2rem" }}>🏠</span>
            <span style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "2px" }}>PROPEASE</span>
          </div>
          <p style={{ color: "hsla(0,0%,100%,0.5)", marginTop: "6px", fontSize: "0.85rem" }}>Find Your Dream Property</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "40px", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
          <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 700, marginBottom: "6px" }}>Welcome back</h2>
          <p style={{ color: "hsla(0,0%,100%,0.5)", fontSize: "0.85rem", marginBottom: "28px" }}>Sign in to access your account</p>

          <form onSubmit={handleSubmit}>
            {[{ id: "username", label: "Username", type: "text", placeholder: "Enter your username" },
              { id: "password", label: "Password", type: "password", placeholder: "Enter your password" }].map(f => (
              <div key={f.id} style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", color: "hsla(0,0%,100%,0.7)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.5px" }}>{f.label}</label>
                <input type={f.type} value={form[f.id]} placeholder={f.placeholder}
                  onChange={e => { setForm(p => ({ ...p, [f.id]: e.target.value })); setError(""); }}
                  style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "white", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "hsl(9,100%,62%)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
                />
              </div>
            ))}

            {error && <div style={{ background: "hsla(0,80%,60%,0.15)", border: "1px solid hsla(0,80%,60%,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#ff8080", fontSize: "0.82rem", marginBottom: "20px" }}>{error}</div>}

            <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: loading ? "hsla(9,100%,62%,0.5)" : "hsl(9,100%,62%)", color: "white", borderRadius: "10px", fontWeight: 700, fontSize: "0.95rem", transition: "all 0.2s", cursor: loading ? "not-allowed" : "pointer", marginTop: "4px" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={{ marginTop: "28px", padding: "16px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ color: "hsla(0,0%,100%,0.5)", fontSize: "0.75rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Demo Credentials</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[{ label: "Admin", u: "kushagra", p: "kushagra123" }, { label: "User", u: "user", p: "user123" }].map(c => (
                <button key={c.label} onClick={() => setForm({ username: c.u, password: c.p })}
                  style={{ padding: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "hsla(0,0%,100%,0.7)", fontSize: "0.78rem", textAlign: "left", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.12)"}
                  onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.06)"}>
                  <strong style={{ display: "block", color: "hsl(9,100%,72%)" }}>{c.label}</strong>
                  {c.u} / {c.p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

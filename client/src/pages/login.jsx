import { useState } from "react";
import { usersData } from "@/data/mockdata.js";

function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login"); // login, signup, forgot, change
  const [form, setForm] = useState({ 
    name: "", 
    username: "", 
    email: "", 
    password: "", 
    oldPassword: "", 
    newPassword: "" 
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setMessage("");
    setForm({ name: "", username: "", email: "", password: "", oldPassword: "", newPassword: "" });
  };

  const handleAction = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    // Mock API delay
    await new Promise(r => setTimeout(r, 600));

    try {
      if (mode === "login") {
        if (!form.username || !form.password) throw new Error("Please fill in all fields.");
        const user = usersData.find(u => u.username === form.username && u.password === form.password);
        if (user) {
          const session = { userId: user.id, username: user.username, name: user.name, email: user.email, role: user.role };
          localStorage.setItem("hv_user", JSON.stringify(session));
          onLogin(session);
        } else {
          throw new Error("Invalid username or password.");
        }
      } 
      else if (mode === "signup") {
        if (!form.name || !form.username || !form.email || !form.password) throw new Error("Please fill in all fields.");
        setMessage("Account created successfully! Please login.");
        setTimeout(() => switchMode("login"), 2000);
      }
      else if (mode === "forgot") {
        if (!form.email) throw new Error("Please enter your email.");
        setMessage("Reset link sent to your email!");
      }
      else if (mode === "change") {
        if (!form.username || !form.oldPassword || !form.newPassword) throw new Error("Please fill out all fields.");
        const user = usersData.find(u => u.username === form.username && u.password === form.oldPassword);
        if (user) {
          setMessage("Password changed successfully!");
          setTimeout(() => switchMode("login"), 2000);
        } else {
          throw new Error("Invalid username or old password.");
        }
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, hsl(200,69%,14%) 0%, hsl(227,29%,13%) 50%, hsl(9,60%,18%) 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", position: "relative", overflow: "hidden" }}>
      <style>{`
        .login-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.4);
        }
        .demo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (max-width: 480px) {
          .login-card {
            padding: 24px 20px;
            border-radius: 16px;
          }
          .demo-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

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

        <div className="login-card">
          <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 700, marginBottom: "6px" }}>
            {mode === "login" && "Welcome back"}
            {mode === "signup" && "Create an Account"}
            {mode === "forgot" && "Recover Password"}
            {mode === "change" && "Change Password"}
          </h2>
          <p style={{ color: "hsla(0,0%,100%,0.5)", fontSize: "0.85rem", marginBottom: "28px" }}>
            {mode === "login" && "Sign in to access your account"}
            {mode === "signup" && "Join PropEase today"}
            {mode === "forgot" && "Enter email to receive reset link"}
            {mode === "change" && "Update your current password"}
          </p>

          <form onSubmit={handleAction}>
            {mode === "signup" && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", color: "hsla(0,0%,100%,0.7)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.5px" }}>Full Name</label>
                <input type="text" value={form.name} placeholder="Enter your name" onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyles} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            )}
            
            {(mode === "signup" || mode === "forgot") && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", color: "hsla(0,0%,100%,0.7)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.5px" }}>Email</label>
                <input type="email" value={form.email} placeholder="Enter your email" onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inputStyles} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            )}

            {(mode === "login" || mode === "signup" || mode === "change") && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", color: "hsla(0,0%,100%,0.7)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.5px" }}>Username</label>
                <input type="text" value={form.username} placeholder="Enter your username" onChange={e => setForm(p => ({ ...p, username: e.target.value }))} style={inputStyles} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            )}

            {(mode === "login" || mode === "signup") && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", color: "hsla(0,0%,100%,0.7)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.5px" }}>Password</label>
                <input type="password" value={form.password} placeholder="Enter your password" onChange={e => setForm(p => ({ ...p, password: e.target.value }))} style={inputStyles} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            )}

            {mode === "change" && (
              <>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", color: "hsla(0,0%,100%,0.7)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.5px" }}>Current Password</label>
                  <input type="password" value={form.oldPassword} placeholder="Enter old password" onChange={e => setForm(p => ({ ...p, oldPassword: e.target.value }))} style={inputStyles} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", color: "hsla(0,0%,100%,0.7)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.5px" }}>New Password</label>
                  <input type="password" value={form.newPassword} placeholder="Enter new password" onChange={e => setForm(p => ({ ...p, newPassword: e.target.value }))} style={inputStyles} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </>
            )}

            {error && <div style={{ background: "hsla(0,80%,60%,0.15)", border: "1px solid hsla(0,80%,60%,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#ff8080", fontSize: "0.82rem", marginBottom: "20px" }}>{error}</div>}
            {message && <div style={{ background: "hsla(120,80%,60%,0.15)", border: "1px solid hsla(120,80%,60%,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#80ff80", fontSize: "0.82rem", marginBottom: "20px" }}>{message}</div>}

            <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: loading ? "hsla(9,100%,62%,0.5)" : "hsl(9,100%,62%)", color: "white", borderRadius: "10px", fontWeight: 700, fontSize: "0.95rem", transition: "all 0.2s", cursor: loading ? "not-allowed" : "pointer", marginTop: "4px" }}>
              {loading ? "Processing..." : (mode === "login" ? "Sign In" : mode === "signup" ? "Sign Up" : mode === "forgot" ? "Send Link" : "Update Password")}
            </button>
          </form>

          {/* Quick Links Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: "0.85rem", textAlign: "center" }}>
            {mode === "login" && (
              <>
                <button type="button" onClick={() => switchMode("signup")} style={{ color: "hsl(9,100%,62%)", display: "inline-block" }}>Don't have an account? Sign up</button>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                  <button type="button" onClick={() => switchMode("forgot")} style={{ color: "hsla(0,0%,100%,0.6)" }}>Forgot Password?</button>
                  <span style={{ color: "hsla(0,0%,100%,0.3)" }}>|</span>
                  <button type="button" onClick={() => switchMode("change")} style={{ color: "hsla(0,0%,100%,0.6)" }}>Change Password</button>
                </div>
              </>
            )}
            {mode !== "login" && (
              <button type="button" onClick={() => switchMode("login")} style={{ color: "hsl(9,100%,62%)" }}>Back to Login</button>
            )}
          </div>

          {mode === "login" && (
            <div style={{ marginTop: "28px", padding: "16px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ color: "hsla(0,0%,100%,0.5)", fontSize: "0.75rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Demo Credentials</p>
              <div className="demo-grid">
                {[{ label: "Admin", u: "Mayank", p: "123" }, { label: "User", u: "user", p: "user123" }].map(c => (
                  <button key={c.label} onClick={() => { setForm(p => ({ ...p, username: c.u, password: c.p })); setError(""); }}
                    style={{ padding: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "hsla(0,0%,100%,0.7)", fontSize: "0.78rem", textAlign: "left", cursor: "pointer", transition: "background 0.2s" }}
                    onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.12)"}
                    onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.06)"}>
                    <strong style={{ display: "block", color: "hsl(9,100%,72%)" }}>{c.label}</strong>
                    {c.u} / {c.p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable styles for inputs
const inputStyles = { 
  width: "100%", 
  padding: "13px 16px", 
  background: "rgba(255,255,255,0.08)", 
  border: "1px solid rgba(255,255,255,0.15)", 
  borderRadius: "10px", 
  color: "white", 
  fontSize: "0.9rem", 
  outline: "none", 
  transition: "border-color 0.2s" 
};

const handleFocus = (e) => e.target.style.borderColor = "hsl(9,100%,62%)";
const handleBlur = (e) => e.target.style.borderColor = "rgba(255,255,255,0.15)";

export default LoginPage;

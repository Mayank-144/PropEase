import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usersData } from "@/data/mockdata.js";

import { z } from "zod";

// Zod v4 schema for email validation
const emailSchema = z.string().email();

function validateEmail(email) {
  if (!email) return "Please enter your email.";
  const result = emailSchema.safeParse(email);
  if (result.success) return "";
  // Zod v4 uses .issues (not .errors)
  const issues = result.error?.issues ?? result.error?.errors ?? [];
  return issues[0]?.message ?? "Please enter a valid email address";
}


// ─── Path ↔ mode maps ────────────────────────────────────────────────────────
const pathToMode = {
  "/login": "login",
  "/signup": "signup",
  "/forgot-password": "forgot",
  "/change-password": "change",
};
const modeToPath = {
  login: "/login",
  signup: "/signup",
  forgot: "/forgot-password",
  change: "/change-password",
};

// ─── Component ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = pathToMode[location.pathname] || "login";

  const [form, setForm] = useState({
    name: "", username: "", email: "",
    password: "", oldPassword: "", newPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  // Real-time email error (only shown after user starts typing)
  const emailError = useMemo(() => {
    if (!emailTouched || form.email === "") return "";
    return validateEmail(form.email);
  }, [form.email, emailTouched]);

  const showEmailError = emailTouched && form.email !== "" && emailError !== "";
  const showEmailSuccess = emailTouched && form.email !== "" && emailError === "";

  const switchMode = (newMode) => {
    setError("");
    setMessage("");
    setEmailTouched(false);
    setForm({ name: "", username: "", email: "", password: "", oldPassword: "", newPassword: "" });
    navigate(modeToPath[newMode]);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, email: value }));
    if (!emailTouched && value.length > 0) setEmailTouched(true);
  };

  const handleAction = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Block submit if email is invalid (for modes that need email)
    if (mode === "signup" || mode === "forgot") {
      const err = validateEmail(form.email);
      if (err) { setEmailTouched(true); setError(err); return; }
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 600));

    try {
      if (mode === "login") {
        if (!form.username || !form.password) throw new Error("Please fill in all fields.");
        const user = usersData.find(u => u.username === form.username && u.password === form.password);
        if (!user) throw new Error("Invalid username or password.");
        const session = { userId: user.id, username: user.username, name: user.name, email: user.email, role: user.role };
        localStorage.setItem("hv_user", JSON.stringify(session));
        onLogin(session);
      } else if (mode === "signup") {
        if (!form.name || !form.username || !form.email || !form.password) throw new Error("Please fill in all fields.");
        setMessage("Account created successfully! Please login.");
        setTimeout(() => switchMode("login"), 2000);
      } else if (mode === "forgot") {
        if (!form.email) throw new Error("Please enter your email.");
        setMessage("Reset link sent to your email!");
      } else if (mode === "change") {
        if (!form.username || !form.oldPassword || !form.newPassword) throw new Error("Please fill out all fields.");
        const user = usersData.find(u => u.username === form.username && u.password === form.oldPassword);
        if (!user) throw new Error("Invalid username or old password.");
        setMessage("Password changed successfully!");
        setTimeout(() => switchMode("login"), 2000);
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* Background orbs */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%", pointerEvents: "none",
          background: `hsla(9,100%,62%,${0.04 + i * 0.02})`,
          width: `${300 + i * 150}px`, height: `${300 + i * 150}px`,
          top: `${-50 + i * 100}px`, right: `${-100 + i * 50}px`,
          filter: "blur(60px)",
        }} />
      ))}

      <div style={styles.wrapper}>
        {/* Logo */}
        <div style={styles.logoArea}>
          <div style={styles.logoRow}>
            <span style={{ fontSize: "2rem" }}>🏠</span>
            <span style={styles.logoText}>PROPEASE</span>
          </div>
          <p style={styles.logoSub}>Find Your Dream Property</p>
        </div>

        {/* Card */}
        <div className="login-card">
          <h2 style={styles.heading}>
            {mode === "login" && "Welcome back"}
            {mode === "signup" && "Create an Account"}
            {mode === "forgot" && "Recover Password"}
            {mode === "change" && "Change Password"}
          </h2>
          <p style={styles.subheading}>
            {mode === "login" && "Sign in to access your account"}
            {mode === "signup" && "Join PropEase today"}
            {mode === "forgot" && "Enter email to receive reset link"}
            {mode === "change" && "Update your current password"}
          </p>

          <form onSubmit={handleAction}>
            {/* Full Name (signup only) */}
            {mode === "signup" && (
              <div style={styles.field}>
                <label style={styles.label}>Full Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>
            )}

            {/* Email (signup + forgot) */}
            {(mode === "signup" || mode === "forgot") && (
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  className={`form-input ${showEmailError ? "input-error" : showEmailSuccess ? "input-success" : ""}`}
                  type="text"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleEmailChange}
                  onBlur={() => { if (form.email) setEmailTouched(true); }}
                />
                {showEmailError && (
                  <div className="email-hint error-hint">
                    <span>✕</span> {emailError}
                  </div>
                )}
                {showEmailSuccess && (
                  <div className="email-hint success-hint">
                    <span>✓</span> Valid email address
                  </div>
                )}
              </div>
            )}

            {/* Username */}
            {(mode === "login" || mode === "signup" || mode === "change") && (
              <div style={styles.field}>
                <label style={styles.label}>Username</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                />
              </div>
            )}

            {/* Password (login + signup) */}
            {(mode === "login" || mode === "signup") && (
              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                />
              </div>
            )}

            {/* Old + New password (change) */}
            {mode === "change" && (
              <>
                <div style={styles.field}>
                  <label style={styles.label}>Current Password</label>
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Enter old password"
                    value={form.oldPassword}
                    onChange={e => setForm(p => ({ ...p, oldPassword: e.target.value }))}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>New Password</label>
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Enter new password"
                    value={form.newPassword}
                    onChange={e => setForm(p => ({ ...p, newPassword: e.target.value }))}
                  />
                </div>
              </>
            )}

            {/* Alerts */}
            {error && <div style={styles.alertError}>{error}</div>}
            {message && <div style={styles.alertSuccess}>{message}</div>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.submitBtn, opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading
                ? "Processing…"
                : mode === "login" ? "Sign In"
                : mode === "signup" ? "Sign Up"
                : mode === "forgot" ? "Send Link"
                : "Update Password"}
            </button>
          </form>

          {/* Quick links */}
          <div style={styles.links}>
            {mode === "login" && (
              <>
                <button type="button" className="link-btn primary-link" onClick={() => switchMode("signup")}>
                  Don't have an account? Sign up
                </button>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                  <button type="button" className="link-btn dim-link" onClick={() => switchMode("forgot")}>Forgot Password?</button>
                  <span style={{ color: "hsla(0,0%,100%,0.3)" }}>|</span>
                  <button type="button" className="link-btn dim-link" onClick={() => switchMode("change")}>Change Password</button>
                </div>
              </>
            )}
            {mode !== "login" && (
              <button type="button" className="link-btn primary-link" onClick={() => switchMode("login")}>
                ← Back to Login
              </button>
            )}
          </div>

          {/* Demo credentials (login only) */}
          {mode === "login" && (
            <div style={styles.demoBox}>
              <p style={styles.demoTitle}>Demo Credentials</p>
              <div className="demo-grid">
                {[{ label: "Admin", u: "Mayank", p: "123" }, { label: "User", u: "user", p: "user123" }].map(c => (
                  <button
                    key={c.label}
                    className="demo-btn"
                    type="button"
                    onClick={() => { setForm(p => ({ ...p, username: c.u, password: c.p })); setError(""); }}
                  >
                    <strong style={{ display: "block", color: "hsl(9,100%,72%)", marginBottom: "2px" }}>{c.label}</strong>
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

// ─── Static styles (JS objects) ───────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, hsl(200,69%,14%) 0%, hsl(227,29%,13%) 50%, hsl(9,60%,18%) 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "20px", position: "relative", overflow: "hidden",
  },
  wrapper: {
    width: "100%", maxWidth: "420px",
    animation: "fadeUp 0.6s ease", position: "relative", zIndex: 1,
  },
  logoArea: { textAlign: "center", marginBottom: "36px" },
  logoRow: { display: "inline-flex", alignItems: "center", gap: "10px", color: "white" },
  logoText: { fontSize: "1.8rem", fontWeight: 800, letterSpacing: "2px", color: "white" },
  logoSub: { color: "hsla(0,0%,100%,0.5)", marginTop: "6px", fontSize: "0.85rem" },
  heading: { color: "white", fontSize: "1.5rem", fontWeight: 700, marginBottom: "6px" },
  subheading: { color: "hsla(0,0%,100%,0.5)", fontSize: "0.85rem", marginBottom: "28px" },
  field: { marginBottom: "20px" },
  label: { display: "block", color: "hsla(0,0%,100%,0.7)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.5px" },
  alertError: { background: "hsla(0,80%,60%,0.15)", border: "1px solid hsla(0,80%,60%,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#ff8080", fontSize: "0.82rem", marginBottom: "20px" },
  alertSuccess: { background: "hsla(120,80%,60%,0.15)", border: "1px solid hsla(120,80%,60%,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#80ff80", fontSize: "0.82rem", marginBottom: "20px" },
  submitBtn: { width: "100%", padding: "14px", background: "hsl(9,100%,62%)", color: "white", borderRadius: "10px", fontWeight: 700, fontSize: "0.95rem", transition: "all 0.2s", marginTop: "4px", border: "none" },
  links: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: "0.85rem", textAlign: "center" },
  demoBox: { marginTop: "28px", padding: "16px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)" },
  demoTitle: { color: "hsla(0,0%,100%,0.5)", fontSize: "0.75rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" },
};

// ─── CSS (all interactive states handled via pure CSS) ────────────────────────
const css = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
  @keyframes hintIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }

  .login-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.4);
  }

  .form-input {
    width: 100%;
    padding: 13px 16px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    color: white;
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .form-input::placeholder { color: hsla(0,0%,100%,0.35); }
  .form-input:focus {
    border-color: hsl(9,100%,62%);
    box-shadow: 0 0 0 3px hsla(9,100%,62%,0.15);
  }
  .form-input.input-error {
    border-color: #ff8080 !important;
    box-shadow: 0 0 0 3px hsla(0,80%,60%,0.15);
  }
  .form-input.input-success {
    border-color: #80ffaa !important;
    box-shadow: 0 0 0 3px hsla(140,80%,60%,0.15);
  }

  .email-hint {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
    font-size: 0.76rem;
    font-weight: 500;
    animation: hintIn 0.2s ease;
  }
  .error-hint  { color: #ff8080; }
  .success-hint { color: #80ffaa; }

  .link-btn { background: none; border: none; cursor: pointer; font-family: inherit; font-size: 0.85rem; transition: opacity 0.15s; }
  .link-btn:hover { opacity: 0.75; }
  .primary-link { color: hsl(9,100%,62%); }
  .dim-link { color: hsla(0,0%,100%,0.6); }

  .demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .demo-btn {
    padding: 8px 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: hsla(0,0%,100%,0.7);
    font-size: 0.78rem;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s;
  }
  .demo-btn:hover { background: rgba(255,255,255,0.12); }

  @media (max-width: 480px) {
    .login-card { padding: 24px 20px; border-radius: 16px; }
    .demo-grid { grid-template-columns: 1fr; }
  }
`;

export default LoginPage;

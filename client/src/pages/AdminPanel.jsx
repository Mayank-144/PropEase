import { useState } from "react";
import { initialServices, usersData } from "../data/mockdata.js";
import { getStoredProps, saveProps } from "../utils/storage.js";

function AdminPanel() {
  const [tab, setTab] = useState("overview");
  const [properties, setProperties] = useState(getStoredProps);
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem("hv_messages")) || []);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const tabs = [
    { id: "overview", label: "📊 Overview" },
    { id: "properties", label: "🏠 Properties" },
    { id: "sold_properties", label: "🏷️ Rented/Sold" },
    { id: "services", label: "🛠 Services" },
    { id: "users", label: "👥 Users" },
    { id: "messages", label: "📩 Feedback" }
  ];

  const saveAndUpdate = (newProps) => { setProperties(newProps); saveProps(newProps); };

  const openEdit = (p) => { setForm({ ...p }); setModal("edit"); };
  const openAdd = () => { setForm({ id: Date.now(), title: "", price: 0, location: "", bedrooms: 2, bathrooms: 1, squareFt: 1000, type: "For Rent", description: "", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600", amenities: [], available: true }); setModal("add"); };

  const handleSave = () => {
    if (modal === "add") saveAndUpdate([...properties, { ...form, price: Number(form.price) }]);
    else saveAndUpdate(properties.map(p => p.id === form.id ? { ...form, price: Number(form.price) } : p));
    setModal(null);
  };

  const handleDelete = (id) => { if (confirm("Delete this property?")) saveAndUpdate(properties.filter(p => p.id !== id)); };

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7ef", borderRadius: "8px", fontSize: "0.88rem", outline: "none" };

  const activeProps = properties.filter(p => p.available !== false).length;
  const soldProps = properties.length - activeProps;

  return (
    <div className="responsive-grid" style={{ paddingTop: "68px", minHeight: "100vh", background: "var(--cultured)", display: "flex", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside className="mobile-hide" style={{ width: "260px", background: "var(--raisin)", color: "white", padding: "30px 20px", display: "flex", flexDirection: "column", height: "calc(100vh - 68px)", position: "sticky", top: "68px" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "40px", paddingLeft: "12px", color: "white" }}>Admin Dashboard</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "0.95rem",
                textAlign: "left",
                transition: "all 0.2s",
                background: tab === t.id ? "var(--orange)" : "transparent",
                color: tab === t.id ? "white" : "rgba(255,255,255,0.6)",
                border: "none",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: "10px"
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="mobile-full" style={{ flex: 1, padding: "20px", overflowY: "auto", height: "calc(100vh - 68px)" }}>
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--raisin)", marginBottom: "4px" }}>
              {tabs.find(t => t.id === tab)?.label.replace(/[📊🏠🏷️🛠👥📩]/g, '')}
            </h1>
            <p style={{ color: "var(--cadet)", fontSize: "0.9rem" }}>Manage and monitor the PropEase platform</p>
          </div>
          {tab === "properties" && (
            <button onClick={openAdd} className="btn-primary" style={{ boxShadow: "0 8px 20px hsla(9,100%,62%,0.25)" }}>+ Add New Property</button>
          )}
        </div>

        {tab === "overview" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
              {[
                { label: "Active Listings", value: activeProps, color: "var(--yellow-green)", icon: "🏠" },
                { label: "Sold / Rented", value: soldProps, color: "#e63946", icon: "🏷️" },
                { label: "Total Users", value: usersData.length, color: "#3a86ff", icon: "👥" },
                { label: "Pending Feedback", value: messages.length, color: "var(--orange)", icon: "📩" }
              ].map(stat => (
                <div key={stat.label} style={{ background: "white", padding: "28px", borderRadius: "20px", boxShadow: "var(--shadow-sm)", display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: `${stat.color}15`, color: stat.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                    {stat.icon}
                  </div>
                  <div>
                    <h3 style={{ color: "var(--cadet)", fontSize: "0.9rem", fontWeight: 600, marginBottom: "4px" }}>{stat.label}</h3>
                    <p style={{ fontSize: "2rem", fontWeight: 800, color: "var(--raisin)" }}>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", padding: "32px", borderRadius: "24px", boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "20px" }}>Recent Platform Activity</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {properties.slice(0, 3).map((p, i) => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid var(--cultured)" }}>
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <img src={p.image} style={{ width: "60px", height: "60px", borderRadius: "12px", objectFit: "cover" }} />
                      <div>
                        <p style={{ fontWeight: 700, fontSize: "0.95rem" }}>{p.title}</p>
                        <p style={{ color: "var(--cadet)", fontSize: "0.8rem" }}>Added to listings</p>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: "var(--orange)" }}>₹{Number(p.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "properties" && (
          <div style={{ background: "white", borderRadius: "20px", padding: "32px", boxShadow: "var(--shadow-sm)", animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Properties ({properties.length})</h2>
              <button onClick={openAdd} className="btn-primary">+ Add Property</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ background: "var(--cultured)" }}>
                    {["ID", "Title", "Location", "Price", "Type", "Beds", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: "var(--raisin)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {properties.map(p => (
                    <tr key={p.id} style={{ borderBottom: "1px solid var(--cultured)" }}
                      onMouseEnter={e => e.currentTarget.style.background = "hsla(9,100%,62%,0.03)"}
                      onMouseLeave={e => e.currentTarget.style.background = ""}>
                      <td style={{ padding: "12px 14px", color: "var(--cadet)" }}>#{p.id}</td>
                      <td style={{ padding: "12px 14px", fontWeight: 600 }}>{p.title}</td>
                      <td style={{ padding: "12px 14px", color: "var(--cadet)" }}>{p.location}</td>
                      <td style={{ padding: "12px 14px", color: "var(--orange)", fontWeight: 700 }}>₹{Number(p.price).toLocaleString()}</td>
                      <td style={{ padding: "12px 14px" }}><span style={{ background: p.type === "For Rent" ? "hsla(9,100%,62%,0.1)" : "hsla(89,72%,45%,0.1)", color: p.type === "For Rent" ? "var(--orange)" : "var(--yellow-green)", padding: "3px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 700 }}>{p.type}</span></td>
                      <td style={{ padding: "12px 14px", color: "var(--cadet)" }}>{p.bedrooms}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <button onClick={() => openEdit(p)} style={{ padding: "5px 12px", background: "hsla(210,100%,60%,0.1)", color: "hsl(210,100%,50%)", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, marginRight: "6px" }}>Edit</button>
                        <button onClick={() => handleDelete(p.id)} style={{ padding: "5px 12px", background: "hsla(0,80%,60%,0.1)", color: "hsl(0,80%,55%)", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "sold_properties" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {properties.filter(p => p.available === false).length === 0 ? (
              <div style={{ background: "white", borderRadius: "20px", padding: "60px", textAlign: "center", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🏠</div>
                <h3 style={{ fontWeight: 700, marginBottom: "8px" }}>No Sold or Rented Properties Yet</h3>
                <p style={{ color: "var(--cadet)", fontSize: "0.9rem" }}>Properties will appear here once a transaction is completed.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                {properties.filter(p => p.available === false).map(p => (
                  <div key={p.id} style={{ background: "white", borderRadius: "20px", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ position: "relative", height: "160px" }}>
                      <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%)" }} />
                      <span style={{ position: "absolute", top: "12px", right: "12px", background: "#e63946", color: "white", padding: "6px 14px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 700 }}>
                        {p.type === "For Rent" ? "Rented" : "Sold"}
                      </span>
                    </div>
                    <div style={{ padding: "20px" }}>
                      <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "6px" }}>{p.title}</h3>
                      <p style={{ color: "var(--cadet)", fontSize: "0.85rem", marginBottom: "12px" }}>📍 {p.location}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--cultured)" }}>
                        <span style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--raisin)" }}>₹{Number(p.price).toLocaleString()}</span>
                        <span style={{ fontSize: "0.78rem", color: "var(--cadet)", fontWeight: 600 }}>{p.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "services" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "20px", animation: "fadeIn 0.3s ease" }}>
            {initialServices.map(s => (
              <div key={s.id} style={{ padding: "28px", background: "white", borderRadius: "20px", boxShadow: "var(--shadow-sm)", transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "hsla(9,100%,62%,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", marginBottom: "16px" }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: "8px", fontSize: "1.05rem" }}>{s.title}</h3>
                <p style={{ color: "var(--cadet)", fontSize: "0.85rem", lineHeight: 1.7 }}>{s.short}</p>
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--cultured)", fontSize: "0.8rem", color: "var(--orange)", fontWeight: 600 }}>{s.features?.length || 0} Features Available</div>
              </div>
            ))}
          </div>
        )}

        {tab === "users" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "20px", animation: "fadeIn 0.3s ease" }}>
            {usersData.map(u => (
              <div key={u.id} style={{ background: "white", borderRadius: "20px", padding: "28px", boxShadow: "var(--shadow-sm)", display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: u.role === "admin" ? "linear-gradient(135deg, var(--orange), #e63946)" : "linear-gradient(135deg, #3a86ff, #8338ec)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", color: "white", fontWeight: 800, flexShrink: 0 }}>
                  {u.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "4px" }}>{u.name}</h3>
                  <p style={{ color: "var(--cadet)", fontSize: "0.82rem", marginBottom: "8px" }}>{u.email}</p>
                  <span style={{ background: u.role === "admin" ? "hsla(9,100%,62%,0.1)" : "hsla(210,100%,60%,0.1)", color: u.role === "admin" ? "var(--orange)" : "#3a86ff", padding: "4px 14px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize" }}>{u.role}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "messages" && (
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "24px" }}>User Feedback & Contact Requests ({messages.length})</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
              {messages.length === 0 ? (
                <p style={{ color: "var(--cadet)", textAlign: "center", padding: "40px" }}>No feedback submitted yet.</p>
              ) : (
                messages.slice().reverse().map(m => (
                  <div key={m.id} style={{ background: "var(--cultured)", padding: "20px", borderRadius: "12px", borderLeft: "4px solid var(--orange)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--raisin)", marginBottom: "4px" }}>{m.name}</h3>
                        <div style={{ display: "flex", gap: "12px", fontSize: "0.85rem", color: "var(--cadet)" }}>
                          <span>✉️ {m.email}</span>
                          {m.phone && <span>📞 {m.phone}</span>}
                        </div>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--cadet)", background: "white", padding: "4px 8px", borderRadius: "6px" }}>{m.date}</span>
                    </div>
                    <div style={{ background: "white", padding: "16px", borderRadius: "8px", fontSize: "0.9rem", color: "var(--raisin)", lineHeight: 1.6 }}>
                      "{m.message}"
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "fadeIn 0.2s ease" }} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div style={{ background: "white", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "560px", maxHeight: "85vh", overflowY: "auto" }}>
            <h3 style={{ fontWeight: 700, marginBottom: "24px", fontSize: "1.2rem" }}>{modal === "add" ? "Add New Property" : "Edit Property"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {[["title", "Title", "text"], ["price", "Price (₹)", "number"], ["location", "Location", "text"], ["squareFt", "Square Ft", "number"], ["bedrooms", "Bedrooms", "number"], ["bathrooms", "Bathrooms", "number"]].map(([k, l, t]) => (
                <div key={k} style={{ gridColumn: k === "title" || k === "location" ? "span 2" : "" }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.8rem", marginBottom: "6px", color: "var(--raisin)" }}>{l}</label>
                  <input type={t} value={form[k] || ""} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7ef", borderRadius: "8px", fontSize: "0.88rem", outline: "none" }} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.8rem", marginBottom: "6px" }}>Type</label>
                <select value={form.type || "For Rent"} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7ef", borderRadius: "8px", fontSize: "0.88rem", outline: "none" }}>
                  <option>For Rent</option><option>For Sale</option>
                </select>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.8rem", marginBottom: "6px" }}>Image URL</label>
                <input type="text" value={form.image || ""} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7ef", borderRadius: "8px", fontSize: "0.88rem", outline: "none" }} placeholder="https://..." />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.8rem", marginBottom: "6px" }}>Description</label>
                <textarea rows={3} value={form.description || ""} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7ef", borderRadius: "8px", fontSize: "0.88rem", outline: "none", resize: "vertical" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button onClick={handleSave} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Property</button>
              <button onClick={() => setModal(null)} className="btn-outline" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;

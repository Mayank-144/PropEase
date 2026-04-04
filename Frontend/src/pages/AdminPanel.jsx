import { useState } from "react";
import { initialServices, usersData } from "../data/mockdata.js";
import { getStoredProps, saveProps } from "../utils/storage.js";

function AdminPanel() {
  const [tab, setTab] = useState("properties");
  const [properties, setProperties] = useState(getStoredProps);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const tabs = [{ id: "properties", label: "🏠 Properties" }, { id: "services", label: "🛠 Services" }, { id: "users", label: "👥 Users" }];

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

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "var(--cultured)" }}>
      <div className="container" style={{ padding: "40px 20px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--raisin)" }}>Admin Panel</h1>
          <p style={{ color: "var(--cadet)", fontSize: "0.9rem" }}>Manage properties, services, and users</p>
        </div>

        <div style={{ display: "flex", gap: "4px", background: "white", borderRadius: "12px", padding: "4px", marginBottom: "24px", boxShadow: "var(--shadow-sm)", width: "fit-content" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "10px 20px", borderRadius: "8px", fontWeight: 600, fontSize: "0.88rem", transition: "all 0.2s", background: tab === t.id ? "var(--orange)" : "transparent", color: tab === t.id ? "white" : "var(--cadet)" }}>{t.label}</button>
          ))}
        </div>

        {tab === "properties" && (
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
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

        {tab === "services" && (
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "24px" }}>Services ({initialServices.length})</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "16px" }}>
              {initialServices.map(s => (
                <div key={s.id} style={{ padding: "20px", background: "var(--cultured)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{s.icon}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: "6px", fontSize: "0.95rem" }}>{s.title}</h3>
                  <p style={{ color: "var(--cadet)", fontSize: "0.8rem", lineHeight: 1.6 }}>{s.short}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "users" && (
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "24px" }}>Users ({usersData.length})</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ background: "var(--cultured)" }}>
                  {["ID", "Name", "Username", "Email", "Role"].map(h => (
                    <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: "var(--raisin)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usersData.map(u => (
                  <tr key={u.id} style={{ borderBottom: "1px solid var(--cultured)" }}>
                    <td style={{ padding: "12px 14px", color: "var(--cadet)" }}>#{u.id}</td>
                    <td style={{ padding: "12px 14px", fontWeight: 600 }}>{u.name}</td>
                    <td style={{ padding: "12px 14px", color: "var(--cadet)" }}>{u.username}</td>
                    <td style={{ padding: "12px 14px", color: "var(--cadet)" }}>{u.email}</td>
                    <td style={{ padding: "12px 14px" }}><span style={{ background: u.role === "admin" ? "hsla(9,100%,62%,0.1)" : "hsla(210,100%,60%,0.1)", color: u.role === "admin" ? "var(--orange)" : "hsl(210,100%,50%)", padding: "3px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize" }}>{u.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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

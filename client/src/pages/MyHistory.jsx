import { useState, useEffect } from "react";
import Footer from "../Components/Layout/Footer.jsx";
import { getStoredUser } from "../utils/storage.js";

function MyHistory() {
  const [history, setHistory] = useState([]);
  const [leaseModal, setLeaseModal] = useState(null);
  const user = getStoredUser();

  useEffect(() => {
    const rawHistory = JSON.parse(localStorage.getItem("hv_history")) || [];
    // Only show history for the currently logged-in user
    if (user) {
      setHistory(rawHistory.filter(h => h.userId === user.id || h.userId === user._id));
    }
  }, []);

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "var(--cultured)" }}>
      <div className="container" style={{ padding: "40px 20px", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 80px)" }}>
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--raisin)", marginBottom: "8px" }}>My History</h1>
          <p style={{ color: "var(--cadet)", fontSize: "1rem" }}>View your previously rented or purchased properties.</p>
        </div>

        {history.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "white", borderRadius: "16px", padding: "60px", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📂</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px", color: "var(--raisin)" }}>No transaction history found</h2>
            <p style={{ color: "var(--cadet)" }}>You haven't rented or purchased any properties yet.</p>
            <a href="/" className="btn-primary" style={{ marginTop: "24px" }}>Browse Properties</a>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
            {history.map((item, idx) => (
              <div key={idx} style={{ display: "flex", background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-sm)", animation: `fadeUp 0.4s ease ${idx * 0.1}s both` }}>
                <img src={item.image} alt={item.title} style={{ width: "200px", height: "100%", objectFit: "cover", minHeight: "150px" }} />
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--raisin)" }}>{item.title}</h3>
                      <span style={{ background: item.type === "Rented" ? "hsla(9,100%,62%,0.1)" : "hsla(89,72%,45%,0.1)", color: item.type === "Rented" ? "var(--orange)" : "var(--yellow-green)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700 }}>{item.type}</span>
                    </div>
                    <p style={{ color: "var(--cadet)", fontSize: "0.85rem", marginBottom: "4px" }}>Transaction ID: <strong>{item.transactionId}</strong></p>
                    <p style={{ color: "var(--cadet)", fontSize: "0.85rem" }}>Date: {item.date}</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "16px" }}>
                    <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--raisin)" }}>
                      ₹{Number(item.price).toLocaleString()}
                    </div>
                    {item.type === "Rented" && (
                      <button onClick={() => setLeaseModal(item)} className="btn-outline" style={{ padding: "8px 16px", fontSize: "0.8rem" }}>📄 View Lease Agreement</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {leaseModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "fadeIn 0.2s ease" }} onClick={(e) => e.target === e.currentTarget && setLeaseModal(null)}>
          <div style={{ background: "white", borderRadius: "8px", padding: "40px", width: "100%", maxWidth: "700px", maxHeight: "90vh", overflowY: "auto", fontFamily: "serif", position: "relative" }}>
            <button onClick={() => setLeaseModal(null)} style={{ position: "absolute", top: "16px", right: "20px", fontSize: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#666" }}>&times;</button>
            <div style={{ textAlign: "center", borderBottom: "2px solid #222", paddingBottom: "20px", marginBottom: "20px" }}>
              <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>Residential Lease Agreement</h1>
              <p style={{ marginTop: "8px", fontStyle: "italic", color: "#555" }}>Formally Executed via PropEase Secure Gateway</p>
            </div>
            
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              This Residential Lease Agreement ("Agreement") is made and entered into on <strong>{leaseModal.date}</strong>, by and between the Landlord ("PropEase Verified Owner") and the Tenant, <strong>{user?.name || "Verified Tenant"}</strong>.
            </p>

            <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "24px", marginBottom: "8px" }}>1. Property</h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              The Landlord agrees to lease to the Tenant the property located at and commonly known as: <strong>{leaseModal.title}</strong> ("Premises").
            </p>

            <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "24px", marginBottom: "8px" }}>2. Term</h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              The term of this lease shall be for 11 months, strictly commencing on <strong>{leaseModal.date}</strong>. Upon expiration, this Agreement may be renewed by mutual consent.
            </p>

            <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "24px", marginBottom: "8px" }}>3. Rent & Payment Verification</h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              The Tenant agrees to pay rent in the amount of <strong>₹{Number(leaseModal.price).toLocaleString()}</strong> per month. The initial payment and security deposit have been successfully processed, verified, and secured under Transaction ID: <strong style={{color:"green"}}>{leaseModal.transactionId}</strong>.
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "60px", paddingTop: "20px", borderTop: "1px solid #ddd" }}>
              <div style={{ textAlign: "center", width: "45%" }}>
                <div style={{ borderBottom: "1px solid #333", height: "40px", marginBottom: "8px", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                   <span style={{fontFamily: "cursive", fontSize: "1.4rem", color: "#225588"}}>{user?.name}</span>
                </div>
                <p style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Tenant Signature</p>
                <p style={{ fontSize: "0.8rem", color: "#777" }}>{leaseModal.date}</p>
              </div>
              <div style={{ textAlign: "center", width: "45%" }}>
                <div style={{ borderBottom: "1px solid #333", height: "40px", marginBottom: "8px", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                   <span style={{fontFamily: "monospace", fontSize: "1.2rem", color: "#882222", fontWeight: "bold"}}>PROPEASE_E-AUTH</span>
                </div>
                <p style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Authorized Agent</p>
                <p style={{ fontSize: "0.8rem", color: "#777" }}>PropEase Platform</p>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <button className="btn-primary" onClick={() => { alert('Downloading PDF...'); setLeaseModal(null); }}>Download PDF Copy</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MyHistory;

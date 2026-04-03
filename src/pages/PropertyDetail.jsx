import { useState } from "react";
import Footer from "../Components/Layout/Footer.jsx";
import { amenityIcons } from "../data/mockdata.js";

function PropertyDetail({ property, onBack }) {
  const [contactShown, setContactShown] = useState(false);

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "var(--white)", animation: "fadeIn 0.4s ease" }}>
      <div className="container" style={{ padding: "40px 20px" }}>
        <button onClick={onBack} className="btn-outline" style={{ marginBottom: "32px" }}>← Back to Listings</button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "40px", alignItems: "start" }}>
          <div>
            <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "28px", boxShadow: "var(--shadow)" }}>
              <img src={property.image} alt={property.title} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
              <div>
                <span style={{ background: property.type === "For Rent" ? "hsla(9,100%,62%,0.1)" : "hsla(89,72%,45%,0.1)", color: property.type === "For Rent" ? "var(--orange)" : "var(--yellow-green)", padding: "4px 14px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 700, marginBottom: "10px", display: "inline-block" }}>{property.type}</span>
                <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--raisin)" }}>{property.title}</h1>
                <p style={{ color: "var(--cadet)", marginTop: "6px" }}>📍 {property.location}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--orange)" }}>₹{property.price.toLocaleString()}</div>
                <div style={{ color: "var(--cadet)", fontSize: "0.82rem" }}>{property.type === "For Rent" ? "per month" : "total price"}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "24px", padding: "20px 24px", background: "var(--cultured)", borderRadius: "12px", marginBottom: "28px" }}>
              {[["🛏", property.bedrooms + " Bedrooms"], ["🚿", property.bathrooms + " Bathrooms"], ["📐", property.squareFt + " sq ft"]].map(([ic, v]) => (
                <div key={v} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.3rem" }}>{ic}</span>
                  <span style={{ fontWeight: 600, color: "var(--raisin)", fontSize: "0.9rem" }}>{v}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "12px" }}>Description</h3>
            <p style={{ color: "var(--cadet)", lineHeight: 1.8, marginBottom: "28px" }}>{property.description}</p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Amenities</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {property.amenities.map(a => (
                <span key={a} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "var(--alice)", borderRadius: "20px", fontSize: "0.83rem", fontWeight: 600, color: "var(--raisin)" }}>
                  {amenityIcons[a] || "✓"} {a}
                </span>
              ))}
            </div>
          </div>

          <div style={{ position: "sticky", top: "90px" }}>
            <div style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "var(--shadow)" }}>
              <h3 style={{ fontWeight: 700, marginBottom: "20px", fontSize: "1rem" }}>Property Owner</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
                <div style={{ width: "54px", height: "54px", background: "linear-gradient(135deg, var(--orange), hsl(9,90%,52%))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", color: "white", fontWeight: 700 }}>
                  {property.owner.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--raisin)" }}>{property.owner.name}</div>
                  <div style={{ color: "var(--cadet)", fontSize: "0.82rem" }}>Property Owner</div>
                </div>
              </div>

              {contactShown ? (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  {[{ icon: "📞", val: property.owner.phone }, { icon: "✉️", val: property.owner.email }].map(c => (
                    <div key={c.val} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "var(--cultured)", borderRadius: "8px", marginBottom: "10px", fontSize: "0.85rem" }}>
                      <span>{c.icon}</span> <span style={{ color: "var(--raisin)", fontWeight: 500 }}>{c.val}</span>
                    </div>
                  ))}
                  <button onClick={() => setContactShown(false)} className="btn-outline" style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}>Hide Info</button>
                </div>
              ) : (
                <button onClick={() => setContactShown(true)} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>📞 Contact Owner</button>
              )}
            </div>

            <div style={{ background: "linear-gradient(135deg, hsl(200,69%,14%), hsl(227,29%,13%))", borderRadius: "16px", padding: "28px", marginTop: "20px", color: "white" }}>
              <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>Schedule a Visit</h4>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.7, marginBottom: "16px" }}>Book a free site visit with one of our expert agents.</p>
              <button onClick={() => alert("Visit scheduled! Our agent will contact you shortly.")} className="btn-primary" style={{ width: "100%", justifyContent: "center", background: "var(--orange)" }}>Book Free Visit</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PropertyDetail;

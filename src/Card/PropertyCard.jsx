function PropertyCard({ property, onClick }) {
  return (
    <div onClick={() => onClick(property)} style={{ background: "white", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow-sm)", transition: "all 0.3s", cursor: "pointer" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}>
      <div style={{ position: "relative", overflow: "hidden", height: "220px" }}>
        <img src={property.image} alt={property.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"} onMouseLeave={e => e.target.style.transform = ""} />
        <span style={{ position: "absolute", top: "14px", left: "14px", background: property.type === "For Rent" ? "var(--orange)" : "var(--yellow-green)", color: "white", fontSize: "0.72rem", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.5px" }}>{property.type}</span>
      </div>
      <div style={{ padding: "20px 22px" }}>
        <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "8px", color: "var(--raisin)" }}>{property.title}</h3>
        <p style={{ color: "var(--cadet)", fontSize: "0.82rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "4px" }}>📍 {property.location}</p>
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          {[["🛏", property.bedrooms + " Beds"], ["🚿", property.bathrooms + " Baths"], ["📐", property.squareFt + " ft²"]].map(([ic, v]) => (
            <span key={v} style={{ fontSize: "0.78rem", color: "var(--cadet)", display: "flex", alignItems: "center", gap: "4px" }}>{ic} {v}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid var(--cultured)" }}>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--orange)" }}>₹{property.price.toLocaleString()}{property.type === "For Rent" ? "/mo" : ""}</span>
          <span style={{ fontSize: "0.8rem", color: "var(--orange)", fontWeight: 600 }}>View →</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;

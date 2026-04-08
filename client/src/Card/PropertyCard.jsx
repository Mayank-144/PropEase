function PropertyCard({ property, onClick }) {
  // Determine Status and Units
  const isSoldOut = property.available === false || (property.unitsAvailable === 0);
  const unitsTotal = property.unitsTotal || 1;
  const unitsAvailable = isSoldOut ? 0 : (property.unitsAvailable !== undefined ? property.unitsAvailable : 1);
  const unitsSold = unitsTotal - unitsAvailable;
  
  const isLimited = !isSoldOut && unitsTotal > 1 && unitsAvailable <= 3;
  const isAvailable = !isSoldOut && !isLimited;

  // Visuals and Text based on Status
  let badgeColor, badgeText, descText;
  if (isSoldOut) {
    badgeColor = "#e63946"; // Red
    badgeText = "Sold Out";
    descText = "This property has been sold. Explore similar options.";
  } else if (isLimited) {
    badgeColor = "#f4a261"; // Orange/Yellow
    badgeText = `Only ${unitsAvailable} Units Left`;
    descText = "Hurry! Only a few units remaining.";
  } else {
    badgeColor = "#2a9d8f"; // Green
    badgeText = "Available – Book Now";
    descText = "This property is available. Schedule a visit today!";
  }

  const progressPercent = Math.max(0, Math.min(100, (unitsSold / unitsTotal) * 100));

  return (
    <div onClick={() => onClick(property)} style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-sm)", transition: "all 0.3s", cursor: "pointer", opacity: isSoldOut ? 0.65 : 1, filter: isSoldOut ? "grayscale(40%)" : "none", display: "flex", flexDirection: "column", height: "100%" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}>
      
      <div style={{ position: "relative", overflow: "hidden", height: "220px", flexShrink: 0 }}>
        <img src={property.image} alt={property.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"} onMouseLeave={e => e.target.style.transform = ""} />
        
        {/* Type Badge */}
        <span style={{ position: "absolute", top: "14px", left: "14px", background: "rgba(0,0,0,0.6)", color: "white", fontSize: "0.72rem", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.5px", backdropFilter: "blur(4px)" }}>
          {property.type}
        </span>

        {/* Status Badge */}
        <span style={{ position: "absolute", top: "14px", right: "14px", background: badgeColor, color: "white", fontSize: "0.75rem", fontWeight: 700, padding: "6px 14px", borderRadius: "20px", letterSpacing: "0.5px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
          {badgeText}
        </span>
      </div>

      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "6px", color: "var(--raisin)", lineHeight: 1.3 }}>{property.title}</h3>
        <p style={{ color: "var(--cadet)", fontSize: "0.85rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>📍 {property.location}</p>
        
        <p style={{ fontSize: "0.82rem", color: isSoldOut ? "#e63946" : "var(--cadet)", fontWeight: isSoldOut ? 600 : 400, fontStyle: "italic", marginBottom: "16px", lineHeight: 1.5 }}>
          {descText}
        </p>

        <div style={{ display: "flex", gap: "14px", marginBottom: "20px", flexWrap: "wrap" }}>
          {[["🛏", property.bedrooms + " Beds"], ["🚿", property.bathrooms + " Baths"], ["📐", property.squareFt + " ft²"]].map(([ic, v]) => (
            <span key={v} style={{ fontSize: "0.78rem", color: "var(--cadet)", display: "flex", alignItems: "center", gap: "4px", background: "var(--cultured)", padding: "4px 10px", borderRadius: "8px", fontWeight: 600 }}>{ic} {v}</span>
          ))}
        </div>

        {/* Progress Bar (Only show if multiple units exist) */}
        {unitsTotal > 1 && (
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 700, color: "var(--cadet)", marginBottom: "6px" }}>
              <span>Units Sold</span>
              <span>{unitsSold} / {unitsTotal}</span>
            </div>
            <div style={{ width: "100%", height: "6px", background: "var(--cultured)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: `${progressPercent}%`, height: "100%", background: badgeColor, transition: "width 0.5s ease" }} />
            </div>
          </div>
        )}

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid var(--cultured)" }}>
          <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--raisin)" }}>₹{property.price.toLocaleString()}{property.type === "For Rent" ? "/mo" : ""}</span>
          <span style={{ fontSize: "0.85rem", color: isSoldOut ? "var(--cadet)" : "var(--orange)", fontWeight: 700 }}>{isSoldOut ? "View Details" : "View →"}</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;

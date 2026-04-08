import { useState } from "react";
import PropertyCard from "./PropertyCard.jsx";
import { getStoredProps } from "../utils/storage.js";

function PropertiesSection({ onPropertyClick }) {
  const properties = getStoredProps();
  const [filter, setFilter] = useState("All");

  const filteredProps = properties.filter(p => {
    if (filter === "All") return true;
    if (filter === "Available") return p.available !== false;
    if (filter === "Sold") return p.available === false;
    return true;
  });

  return (
    <section id="property" style={{ minHeight: "100vh", padding: "80px 20px", background: "var(--white)", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p className="section-subtitle">Properties</p>
          <h2 className="section-title">Featured Listings</h2>
        </div>
        
        {/* Filter Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "40px", flexWrap: "wrap" }}>
          {["All", "Available", "Sold"].map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)} 
              style={{
                padding: "8px 24px", 
                borderRadius: "20px", 
                fontWeight: 700, 
                fontSize: "0.9rem",
                transition: "all 0.3s",
                background: filter === f ? "var(--raisin)" : "var(--cultured)",
                color: filter === f ? "white" : "var(--cadet)",
                boxShadow: filter === f ? "var(--shadow-sm)" : "none"
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "24px" }}>
          {filteredProps.map((p, i) => (
            <div key={p.id} style={{ animation: `fadeUp 0.6s ease ${i * 0.1}s both` }}>
              <PropertyCard property={p} onClick={onPropertyClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PropertiesSection;

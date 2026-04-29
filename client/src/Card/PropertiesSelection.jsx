import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard.jsx";
import { propertyService } from "../services/propertyService.js";

function PropertiesSection({ onPropertyClick }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const data = await propertyService.getAllProperties();
        // The service returns an object { properties: [], pagination: {} }
        setProperties(data.properties || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const filteredProps = (properties || []).filter(p => {
    if (filter === "All") return true;
    if (filter === "Available") return p.available !== false;
    if (filter === "Sold") return p.available === false;
    return true;
  });

  if (loading) return (
    <section style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid var(--alice)", borderTopColor: "var(--orange)", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "12px" }}></div>
        <p style={{ color: "var(--cadet)" }}>Loading Properties...</p>
      </div>
    </section>
  );

  return (
    <section id="property" style={{ minHeight: "100vh", padding: "100px 0", background: "var(--white)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="container" style={{ width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p className="section-subtitle">Properties</p>
          <h2 className="section-title">Featured Listings</h2>
        </div>

        {error ? (
          <div style={{ textAlign: "center", color: "red", padding: "20px" }}>{error}</div>
        ) : (
          <>
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
                <div key={p.id || p._id} style={{ animation: `fadeUp 0.6s ease ${i * 0.1}s both` }}>
                  <PropertyCard property={p} onClick={onPropertyClick} />
                </div>
              ))}
            </div>
            {filteredProps.length === 0 && (
              <p style={{ textAlign: "center", color: "var(--cadet)", marginTop: "40px" }}>No properties found matching your criteria.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default PropertiesSection;

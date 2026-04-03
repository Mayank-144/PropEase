import PropertyCard from "./PropertyCard.jsx";
import { getStoredProps } from "../utils/storage.js";

function PropertiesSection({ onPropertyClick }) {
  const properties = getStoredProps();
  return (
    <section id="property" style={{ padding: "100px 20px", background: "var(--white)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="section-subtitle">Properties</p>
          <h2 className="section-title">Featured Listings</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "24px" }}>
          {properties.map((p, i) => (
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

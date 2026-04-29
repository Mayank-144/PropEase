import { useState } from "react";
import Footer from "../Components/Layout/Footer.jsx";
import { amenityIcons } from "../data/mockdata.js";
import API_BASE_URL from "../config.js";

function PropertyDetail({ property, onBack, goToSlide }) {
  const [contactShown, setContactShown] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sendingMsg, setSendingMsg] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setSendingMsg(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property._id || property.id,
          ownerEmail: property.owner?.email || "owner@propease.com", // Fallback for mock data
          tenantName: contactForm.name,
          tenantEmail: contactForm.email,
          tenantPhone: contactForm.phone,
          message: contactForm.message
        }),
      });
      const data = await res.json();
      if (data.success || res.ok) {
        // Save to Local Storage so it appears in the Admin Panel
        const localMessages = JSON.parse(localStorage.getItem('hv_messages')) || [];
        localMessages.push({
          id: Date.now(),
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          message: contactForm.message,
          propertyId: property._id || property.id,
          date: new Date().toLocaleDateString()
        });
        localStorage.setItem('hv_messages', JSON.stringify(localMessages));

        alert("Message sent to the landlord successfully!");
        setContactForm({ name: "", email: "", phone: "", message: "" });
        setContactShown(false);
      } else {
        alert("Failed to send message: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error sending message.");
    }
    setSendingMsg(false);
  };

  // Load Razorpay Script Dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoadingPayment(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      setLoadingPayment(false);
      return;
    }

    try {
      // 1. Ask backend to create a new Order
      if (!property?.price || isNaN(property.price)) {
        alert("Invalid property price. Please contact support.");
        setLoadingPayment(false);
        return;
      }

      // Use standard fetch to the new /api/payment/create-order endpoint
      const orderResponse = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: property.price }),
      });
      const orderData = await orderResponse.json();

      if (!orderData.success) {
        alert("Server failed to generate order! Error: " + orderData.message);
        setLoadingPayment(false);
        return;
      }

      // 2. Setup Razorpay Popup Options
      const options = {
        key: "rzp_test_Sas9NK9VKRgrBy", // Injected from user's test keys
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "PropEase",
        description: `Rent payment for ${property.title}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          // 3. Verify Payment with your Backend AND Create Booking
          const loggedInUser = JSON.parse(localStorage.getItem('propease_user')) || null;

          const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              propertyId: property._id || property.id,
              userId: loggedInUser ? loggedInUser._id || loggedInUser.id : null,
              amount: property.price
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            // Update Local Storage immediately so the Frontend UI reflects the Backend Mongoose Change
            const localProps = JSON.parse(localStorage.getItem('hv_props')) || [];
            const activeId = property._id || property.id;
            const updatedProps = localProps.map(p => {
              // Match string or number IDs natively
              if (p.id == activeId || p._id == activeId) {
                return { ...p, available: false };
              }
              return p;
            });
            localStorage.setItem('hv_props', JSON.stringify(updatedProps));

            // Log this strictly to the User's personal bought/rented history
            const userHistory = JSON.parse(localStorage.getItem('hv_history')) || [];
            userHistory.push({
              transactionId: response.razorpay_payment_id,
              date: new Date().toLocaleDateString(),
              propertyId: activeId,
              title: property.title,
              price: property.price,
              image: property.image,
              type: property.type === "For Rent" ? "Rented" : "Purchased",
              userId: loggedInUser ? loggedInUser._id || loggedInUser.id : null
            });
            localStorage.setItem('hv_history', JSON.stringify(userHistory));

            alert(`Payment Successful! A formal lease agreement booking has been created in your account. The property is now marked as Rented!`);
            window.location.reload(); // Stay on the current page, don't redirect to home!
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: "Mayank User",
          email: "mayank@propease.com",
          contact: "9999999999",
        },
        theme: {
          color: "#ff6347", // Matching your var(--orange)
        },
      };

      // 3. Open Razorpay Window
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
    setLoadingPayment(false);
  };

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "var(--white)", animation: "fadeIn 0.4s ease" }}>
      <div className="container" style={{ padding: "40px 20px" }}>
        <button onClick={onBack} className="btn-outline" style={{ marginBottom: "32px" }}>← Back to Listings</button>

        <div className="responsive-grid">
          <div>
            <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "28px", boxShadow: "var(--shadow)" }}>
              <img src={property.images?.[0]?.url || property.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"} alt={property.title} style={{ width: "100%", height: "auto", minHeight: "300px", maxHeight: "500px", objectFit: "cover" }} />
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

            <div style={{ display: "flex", gap: "24px", padding: "20px 24px", background: "var(--cultured)", borderRadius: "12px", marginBottom: "28px", flexWrap: "wrap", justifyContent: "space-between" }}>
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
                  {property.owner?.name?.[0] || 'O'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--raisin)" }}>{property.owner?.name || "Verified Owner"}</div>
                  <div style={{ color: "var(--cadet)", fontSize: "0.82rem" }}>Property Owner</div>
                </div>
              </div>

              {contactShown ? (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <form onSubmit={handleSendMessage} style={{ marginTop: "16px" }}>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Your Name" required value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control" placeholder="Your Email" required value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <input type="tel" className="form-control" placeholder="Your Phone (optional)" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <textarea className="form-control" placeholder="Message to landlord" required value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
                    </div>
                    <button type="submit" disabled={sendingMsg} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: "8px" }}>
                      {sendingMsg ? "Sending..." : "✉️ Send Message"}
                    </button>
                    <button type="button" onClick={() => setContactShown(false)} className="btn-outline" style={{ width: "100%", justifyContent: "center" }}>Cancel</button>
                  </form>
                </div>
              ) : (
                <button onClick={() => setContactShown(true)} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>✉️ Send Message</button>
              )}
            </div>

            <div style={{ background: "linear-gradient(135deg, hsl(200,69%,14%), hsl(227,29%,13%))", borderRadius: "16px", padding: "28px", marginTop: "20px", color: "white" }}>
              {property.available !== false ? (
                <>
                  <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>Lease this Property</h4>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.7, marginBottom: "16px" }}>Instantly reserve this property securely via Razorpay.</p>
                  <button
                    onClick={handlePayment}
                    disabled={loadingPayment}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", background: loadingPayment ? "#999" : "var(--yellow-green)" }}
                  >
                    {loadingPayment ? "Processing..." : "💳 Pay Online Now"}
                  </button>
                </>
              ) : (
                <>
                  <h4 style={{ fontWeight: 700, marginBottom: "8px", color: "#ff6b6b" }}>🚫 Currently Rented Out</h4>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.7 }}>This property has already been leased and is no longer available.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer goToSlide={goToSlide} />
    </div>
  );
}

export default PropertyDetail;

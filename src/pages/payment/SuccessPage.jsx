import { useLocation, useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const persistedMetaRaw = localStorage.getItem("paymentOrderMeta");
  let persistedMeta = null;

  try {
    persistedMeta = persistedMetaRaw ? JSON.parse(persistedMetaRaw) : null;
  } catch (error) {
    persistedMeta = null;
  }

  const stateOrder = location.state?.order || {};
  const shouldUsePersistedMeta =
    persistedMeta &&
    (!stateOrder.orderCode || persistedMeta.orderCode === stateOrder.orderCode);

  const mergedOrder = shouldUsePersistedMeta
    ? { ...persistedMeta, ...stateOrder }
    : stateOrder;

  const order = {
    orderCode: mergedOrder.orderCode || "TX-88291",
    itemType: mergedOrder.itemType || "COURSE",
    itemTitle:
      mergedOrder.itemTitle ||
      mergedOrder.courseName ||
      mergedOrder.items?.[0]?.title ||
      "Han ngu Giao tiep So cap: Chinh phuc HSK 1-2",
    amount: mergedOrder.amount || 1250000,
    paidAt: mergedOrder.paidAt || "24/05/2024",
    quantity: mergedOrder.quantity || 1,
  };
  const isCourseOrder = String(order.itemType || "").toUpperCase() === "COURSE";
  const cardTitle = isCourseOrder ? "THONG TIN KHOA HOC" : "THONG TIN SAN PHAM";
  const itemBadge = isCourseOrder ? "C" : "B";

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&display=swap'); @keyframes pop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }`}</style>

      {/* Navbar */}
      <nav style={{ background: "#1a2b5e", padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: "rgba(245,197,24,0.15)", border: "1.5px solid rgba(245,197,24,0.35)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: "#f5c518", fontWeight: 700, fontSize: 15 }}>T</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: 2 }}>TOXI</div>
            <div style={{ fontSize: 9, color: "rgba(245,197,24,0.6)" }}>hoc di tri dung</div>
          </div>
        </a>
        <div style={{ display: "flex", gap: 24 }}>
          {["Khoa hoc", "Tai lieu", "Cong dong", "Ve chung toi"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, textDecoration: "none", letterSpacing: 1 }}>{l}</a>
          ))}
        </div>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(245,197,24,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f5c518" }}>U</div>
      </nav>

      {/* Steps */}
      <div style={{ background: "#1a2b5e", display: "flex", justifyContent: "center", padding: "16px 0 20px" }}>
        {["Thanh toan", "Cho xac nhan", "Hoan tat"].map((label, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < 2 ? "#4a7c59" : "#f5c518", border: `2px solid ${i < 2 ? "#4a7c59" : "#f5c518"}`, color: i < 2 ? "#fff" : "#1a2b5e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                {i < 2 ? "v" : "3"}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap", color: i < 2 ? "#4a7c59" : "#f5c518" }}>{label}</span>
            </div>
            {i < 2 && <div style={{ width: 64, height: 2, marginTop: 13, marginLeft: 4, marginRight: 4, background: "#4a7c59" }} />}
          </div>
        ))}
      </div>

      {/* Warm BG */}
      <div style={{ flex: 1, background: "linear-gradient(155deg, #c4956a 0%, #e8c49a 35%, #f0d4a8 50%, #7a8cb5 70%, #1a2b5e 100%)", padding: "48px 24px 0" }}>

        {/* Card */}
        <div style={{ maxWidth: 500, margin: "0 auto", background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 80px rgba(26,43,94,0.25)" }}>

          {/* Top */}
          <div style={{ padding: "40px 40px 24px", textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#4a7c59", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#fff", animation: "pop .5s ease-out" }}>v</div>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "#1a2b5e" }}>Cam on ban!</h2>
            <p style={{ color: "#8b7d5e", margin: "6px 0 0", fontSize: 13 }}>Thanh toan thanh cong</p>
          </div>

          {/* Order */}
          <div style={{ margin: "0 24px 24px", border: "1.5px solid #e8e4dc", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", background: "#f7f5f0", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#8b7d5e", textTransform: "uppercase" }}>{cardTitle}</div>
            <div style={{ padding: "16px", display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "linear-gradient(135deg, #c4956a, #8b6d4a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{itemBadge}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2b5e", lineHeight: 1.4, marginBottom: 6 }}>{order.itemTitle}</div>
                <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#8b7d5e" }}>
                  <span>Ma: <strong style={{ color: "#1a2b5e" }}>#{order.orderCode}</strong></span>
                  <span>Ngay: {order.paidAt}</span>
                  {!isCourseOrder ? <span>SL: {order.quantity}</span> : null}
                </div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#4a7c59", whiteSpace: "nowrap" }}>{order.amount.toLocaleString("vi-VN")}d</div>
            </div>
            <div style={{ padding: "10px 16px 14px", borderTop: "1px solid #f0ece6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#8b7d5e" }}>Tong cong:</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#4a7c59" }}>{order.amount.toLocaleString("vi-VN")}d</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ padding: "0 24px", display: "flex", gap: 12 }}>
            <button onClick={() => navigate("/")} style={{ flex: 1, padding: 13, borderRadius: 12, border: "1.5px solid #d5cfc4", background: "#fff", color: "#1a2b5e", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Ve trang chu
            </button>
            {isCourseOrder ? (
              <button onClick={() => navigate("/MyCourse")} style={{ flex: 1, padding: 13, borderRadius: 12, background: "#4a7c59", border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(74,124,89,0.3)" }}>
                Vao hoc ngay
              </button>
            ) : null}
          </div>

          <div style={{ textAlign: "center", fontSize: 11, color: "#a09080", padding: "16px 24px 24px", lineHeight: 1.7 }}>
            He thong da gui thong tin chi tiet vao email cua ban.<br />
            Neu can ho tro: <strong>1900-TOXI-88</strong>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#1a2b5e", color: "rgba(255,255,255,0.5)", padding: "40px 48px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 28, marginTop: 40 }}>
        <div>
          <div style={{ fontWeight: 800, color: "#f5c518", fontSize: 18, marginBottom: 10, letterSpacing: 2 }}>TOXI</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>Nen tang hoc tieng Trung hien dai.</div>
        </div>
        {[["Kham pha", ["Thu vien Han tu", "Luyen nghe Podcast", "Thi thu HSK"]], ["Ho tro", ["Huong dan thanh toan", "Chinh sach bao mat", "Cau hoi thuong gap"]]].map(([title, links]) => (
          <div key={title}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>{title}</div>
            {links.map(l => <a key={l} href="#" style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 8 }}>{l}</a>)}
          </div>
        ))}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>Ket noi</div>
          <div style={{ display: "flex", gap: 10 }}>
            {["f", "t", "Y"].map(s => <div key={s} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>{s}</div>)}
          </div>
        </div>
        <div style={{ gridColumn: "1/-1", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, textAlign: "center", fontSize: 11 }}>
          2024 TOXI Academy. Moi quyen duoc bao luu.
        </div>
      </footer>
    </div>
  );
}

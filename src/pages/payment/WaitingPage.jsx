import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const API = "http://localhost:8080/api";

export default function WaitingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order || { orderCode: "TOXI-12345678" };

  const [status, setStatus] = useState("AWAITING_CONFIRMATION");
  const [dots, setDots] = useState(".");
  const [checkCount, setCheckCount] = useState(0);
  const intervalRef = useRef(null);

  // ── Polling: check status mỗi 10 giây ──
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API}/payment/result/${order.orderCode}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        setCheckCount((c) => c + 1);

        if (data.status === "PAID") {
          clearInterval(intervalRef.current);
          // Chuyển sang SuccessPage với thông tin đơn hàng
          navigate("/success", {
            state: {
              order: {
                orderCode: order.orderCode,
                courseName: order.courseName || order.items?.[0]?.name || "Khóa học",
                amount: data.amount || order.amount,
                paidAt: new Date().toLocaleDateString("vi-VN"),
              },
            },
            replace: true,
          });
        } else {
          setStatus(data.status);
        }
      } catch (e) {
        // Bỏ qua lỗi mạng, thử lại sau
      }
    };

    // Check ngay lần đầu
    checkStatus();
    // Sau đó mỗi 10 giây
    intervalRef.current = setInterval(checkStatus, 10000);
    return () => clearInterval(intervalRef.current);
  }, [order.orderCode]);

  // ── Hiệu ứng dots loading ──
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? "." : d + ".")), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .spin { animation: spin 2s linear infinite; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        .fadeUp { animation: fadeUp 0.6s ease-out forwards; }
      `}</style>

      {/* Header */}
      <header style={{ background: "#1a2b5e", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, background: "rgba(245,197,24,0.15)", border: "1.5px solid rgba(245,197,24,0.4)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#f5c518", fontWeight: 700, fontSize: 17 }}>T</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: 2 }}>TOXI</div>
            <div style={{ fontSize: 9, color: "rgba(245,197,24,0.7)" }}>học để trí dùng</div>
          </div>
        </a>
        <span style={{ color: "#f5c518", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>ĐANG CHỜ XÁC NHẬN</span>
        <div style={{ width: 120 }} />
      </header>

      {/* Steps */}
      <div style={{ background: "#1a2b5e", display: "flex", justifyContent: "center", padding: "16px 0 20px" }}>
        {["Thanh toán", "Chờ xác nhận", "Hoàn tất"].map((label, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: i < 1 ? "#4a7c59" : i === 1 ? "transparent" : "transparent",
                border: `2px solid ${i < 1 ? "#4a7c59" : i === 1 ? "#f5c518" : "rgba(255,255,255,0.3)"}`,
                color: i < 1 ? "#fff" : i === 1 ? "#f5c518" : "rgba(255,255,255,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700
              }}>
                {i < 1 ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap", color: i < 1 ? "#4a7c59" : i === 1 ? "#f5c518" : "rgba(255,255,255,0.4)" }}>{label}</span>
            </div>
            {i < 2 && <div style={{ width: 64, height: 2, marginTop: 13, marginLeft: 4, marginRight: 4, background: i < 1 ? "#4a7c59" : "rgba(255,255,255,0.15)" }} />}
          </div>
        ))}
      </div>

      {/* Main BG */}
      <div style={{ flex: 1, background: "linear-gradient(155deg, #c4956a 0%, #d4a574 15%, #e8c49a 35%, #f0d4a8 50%, #7a8cb5 70%, #1a2b5e 100%)", padding: "40px 24px 0" }}>

        {/* Hero card */}
        <div className="fadeUp" style={{ maxWidth: 620, margin: "0 auto", background: "rgba(26,43,94,0.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(245,197,24,0.25)", borderRadius: 24, padding: "44px 48px", textAlign: "center", boxShadow: "0 24px 80px rgba(26,43,94,0.4)" }}>

          {/* Spinner */}
          <div style={{ width: 72, height: 72, margin: "0 auto 24px", position: "relative" }}>
            <div className="spin" style={{ width: 72, height: 72, borderRadius: "50%", border: "3px solid rgba(245,197,24,0.15)", borderTopColor: "#f5c518", position: "absolute" }} />
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.3)", position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⏳</div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: "#f5c518", textTransform: "uppercase", marginBottom: 10 }}>CẢM ƠN BẠN ĐÃ TIN TƯỞNG TOXI</div>

          <h2 className="pulse" style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
            Đang kiểm tra thanh toán{dots}
          </h2>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", lineHeight: 1.7 }}>
            Hệ thống đang tự động kiểm tra giao dịch của bạn.<br />
            Trang sẽ <strong style={{ color: "#f5c518" }}>tự động chuyển</strong> khi admin xác nhận.
          </p>

          {/* Order code */}
          <div style={{ background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.2)", borderRadius: 14, padding: "14px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Mã đơn hàng của bạn</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#f5c518", letterSpacing: 2, wordBreak: "break-all" }}>{order.orderCode}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 6, fontStyle: "italic" }}>Lưu lại mã này để được hỗ trợ nhanh nhất</div>
          </div>

          {/* Check counter */}
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>
            Đã kiểm tra {checkCount} lần · Tự động kiểm tra mỗi 10 giây
          </div>
        </div>

        {/* Support card */}
        <div className="fadeUp" style={{ maxWidth: 620, margin: "20px auto 0", background: "#fff", borderRadius: 20, padding: "24px 32px", display: "flex", alignItems: "flex-start", gap: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(26,43,94,0.08)", border: "1.5px solid rgba(26,43,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>💬</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2b5e", marginBottom: 5 }}>Chưa thấy xác nhận sau 30 phút?</div>
            <div style={{ fontSize: 12, color: "#5d5044", lineHeight: 1.7, marginBottom: 12 }}>Liên hệ ngay để được hỗ trợ:</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[["📞 Hotline", "#e74c3c", "tel:19001234"], ["Zalo", "#0068ff", "https://zalo.me"], ["Messenger", "#0099ff", "https://m.me"]].map(([label, bg, href]) => (
                <a key={label} href={href} style={{ padding: "8px 16px", borderRadius: 10, background: bg, color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>{label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", maxWidth: 480, margin: "24px auto", padding: "0 24px" }}>
          <button onClick={() => navigate("/")} style={{ flex: 1, padding: 14, borderRadius: 14, border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(8px)" }}>
            Về trang chủ
          </button>
          <button disabled style={{ flex: 1, padding: 14, borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.3)", fontSize: 13, fontWeight: 700, cursor: "not-allowed", fontFamily: "inherit" }}>
            Vào học ngay
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#1a2b5e", color: "rgba(255,255,255,0.5)", padding: "32px 48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24 }}>
        <div>
          <div style={{ fontWeight: 800, color: "#f5c518", fontSize: 16, marginBottom: 8, letterSpacing: 2 }}>TOXI</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>Hệ thống học tiếng Trung trực tuyến hiện đại.</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>Liên kết nhanh</div>
          {["Khóa học của tôi", "Chính sách bảo mật", "Điều khoản dịch vụ"].map(l => (
            <a key={l} href="#" style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 6 }}>{l}</a>
          ))}
        </div>
        <div style={{ gridColumn: "1/-1", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 16, textAlign: "center", fontSize: 11 }}>
          2024 TOXI Academy. Mọi quyền được bảo lưu.
        </div>
      </footer>
    </div>
  );
}

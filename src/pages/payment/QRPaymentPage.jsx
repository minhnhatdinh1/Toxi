import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function getQRUrl(amount, orderCode, bankInfo) {
  const info = encodeURIComponent(bankInfo.transferContent || orderCode);
  const name = encodeURIComponent(bankInfo.accountName || "");
  return `https://img.vietqr.io/image/${bankInfo.bankId}-${bankInfo.accountNo}-compact2.png?amount=${amount}&addInfo=${info}&accountName=${name}`;
}

function useCountdown(minutes) {
  const total = minutes * 60;
  const [sec, setSec] = useState(total);
  useEffect(() => {
    if (sec <= 0) return;
    const t = setInterval(() => setSec((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [sec]);
  return {
    mm: String(Math.floor(sec / 60)).padStart(2, "0"),
    ss: String(sec % 60).padStart(2, "0"),
    pct: (sec / total) * 100,
    urgent: sec < 120,
    expired: sec <= 0,
  };
}

function CopyBtn({ text, label = "Sao chép", small = false }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  if (small) {
    return (
      <button
        onClick={handle}
        className={`text-xs font-bold px-2 py-1 rounded border transition-all ${
          copied
            ? "bg-green-500 text-white border-green-500"
            : "bg-transparent text-slate-500 border-slate-300 hover:border-primary hover:text-primary"
        }`}
      >
        {copied ? "✓" : "Copy"}
      </button>
    );
  }
  return (
    <button
      onClick={handle}
      className={`px-4 py-2 rounded-lg text-xs font-black tracking-wider transition-all ${
        copied
          ? "bg-green-500 text-white"
          : "bg-secondary text-primary hover:brightness-95 active:scale-95"
      }`}
    >
      {copied ? "ĐÃ SAO" : label}
    </button>
  );
}

export default function QRPaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;
  const bankInfo = order?.bankInfo || {};

  // ✅ Tất cả hooks phải khai báo trước bất kỳ return nào
  const { mm, ss, pct, urgent, expired } = useCountdown(15);
  const [qrLoaded, setQrLoaded] = useState(false);
  const [loading, setLoading] = useState(false);


  // Không redirect tự động — nếu không có order chỉ hiện thông báo
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <p className="text-slate-500">Không tìm thấy thông tin đơn hàng.</p>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm"
          >
            Quay lại Checkout
          </button>
        </div>
      </div>
    );
  }

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:8080/api/orders/${order.orderCode}/pending-confirm`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ customerConfirmed: true }),
      });
    } catch (_) {}
    setTimeout(() => {
      setLoading(false);
      navigate("/payment/waiting", { state: { order } });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Header */}
      <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center text-primary font-black text-lg">T</div>
            <div>
              <div className="text-lg font-black tracking-widest leading-none">TOXI</div>
              <div className="text-[8px] text-secondary/80 tracking-widest uppercase">学以致用</div>
            </div>
          </a>
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <span className="material-symbols-outlined text-sm text-green-400">verified_user</span>
            Thanh toán bảo mật SSL
          </div>
        </div>
      </header>

      {/* Step indicator */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <li className="flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</span>
              Giỏ hàng
            </li>
            <li>/</li>
            <li className="flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</span>
              Thông tin
            </li>
            <li>/</li>
            <li className="flex items-center gap-1 text-primary font-bold">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">3</span>
              Thanh toán QR
            </li>
            <li>/</li>
            <li className="flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-[10px]">4</span>
              Hoàn tất
            </li>
          </ol>
        </div>
      </div>

      {/* Title */}
      <div className="text-center py-8">
        <h1 className="text-2xl font-black text-primary tracking-tight">Quét Mã QR Để Thanh Toán</h1>
        <p className="text-sm text-slate-400 mt-1">Mở app ngân hàng và quét mã bên dưới</p>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT - QR Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 pt-5 pb-4 border-b border-slate-100 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Giao dịch hết hạn sau</p>
              <div className={`text-5xl font-black tabular-nums ${urgent ? "text-red-500" : expired ? "text-slate-300" : "text-primary"}`}>
                {mm}:{ss}
              </div>
              <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${urgent ? "bg-red-500" : "bg-primary"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {urgent && !expired && (
                <p className="text-xs text-red-500 font-semibold mt-2 animate-pulse">⚠ Sắp hết thời gian!</p>
              )}
              {expired && (
                <p className="text-xs text-slate-400 font-semibold mt-2">Đơn hàng đã hết hạn</p>
              )}
            </div>

            <div className="p-6 flex flex-col items-center">
              <div className="w-52 h-52 rounded-2xl border-2 border-slate-200 overflow-hidden flex items-center justify-center bg-slate-50">
                {!qrLoaded && (
                  <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
                )}
                <img
                  src={getQRUrl(order.amount, order.orderCode, bankInfo)}
                  alt="QR Code"
                  onLoad={() => setQrLoaded(true)}
                  onError={() => setQrLoaded(true)}
                  className={`w-full h-full object-contain ${qrLoaded ? "block" : "hidden"}`}
                />
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Hỗ trợ tất cả ứng dụng ngân hàng & ví điện tử
              </p>
            </div>

            <div className="mx-5 mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs text-amber-700 leading-relaxed">
                <span className="font-bold">⚠ Lưu ý:</span> Giữ nguyên{" "}
                <span className="font-bold">nội dung chuyển khoản</span> để hệ thống tự động kích hoạt khóa học.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-4">
            {/* Order summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Thông tin đơn hàng</h3>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <span className="text-xs text-slate-400 shrink-0">Sản phẩm</span>
                  <span className="text-sm font-semibold text-slate-800 text-right">{order.courseName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Mã đơn hàng</span>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded">{order.orderCode}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-700">Tổng thanh toán</span>
                  <span className="text-xl font-black text-red-500">{Number(order.amount).toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            </div>

            {/* Bank info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Thông tin chuyển khoản</h3>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Số tiền</span>
                  <span className="text-sm font-black text-red-500">{Number(order.amount).toLocaleString("vi-VN")} VND</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Ngân hàng</span>
                  <span className="text-sm font-semibold text-slate-800">{bankInfo.bankName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Chủ tài khoản</span>
                  <span className="text-sm font-semibold text-slate-800">{bankInfo.accountName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Số tài khoản</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800 font-mono">{bankInfo.accountNo}</span>
                    <CopyBtn text={bankInfo.accountNo} small />
                  </div>
                </div>
              </div>

              <div className="mx-4 mb-4 bg-primary rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">Nội dung chuyển khoản</p>
                  <p className="text-secondary font-black text-base tracking-wider break-all">{bankInfo.transferContent}</p>
                </div>
                <CopyBtn text={bankInfo.transferContent} label="SAO CHÉP" />
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={expired || loading}
              className={`w-full py-4 rounded-2xl font-black text-base tracking-wide transition-all shadow-lg ${
                expired
                  ? "bg-slate-300 text-slate-400 cursor-not-allowed"
                  : loading
                  ? "bg-green-500 text-white cursor-wait"
                  : "bg-primary text-white hover:bg-primary/90 active:scale-95 shadow-primary/30"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Đang ghi nhận...
                </span>
              ) : expired ? "Đơn hàng đã hết hạn" : "✓ Tôi Đã Chuyển Khoản"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full text-center text-sm text-slate-400 hover:text-slate-600 transition-colors py-2"
            >
              ← Quay lại trang thanh toán
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

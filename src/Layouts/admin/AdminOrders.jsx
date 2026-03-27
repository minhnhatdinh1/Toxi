
import React, { useCallback, useEffect, useMemo, useState } from "react";
import AdminSidebar from "./AdminSidebar";

const API = "http://localhost:8080/api";
const ordersPerPage = 5;

const typeConfig = {
  COURSE: { label: "Khóa", className: "bg-blue-50 text-blue-600 border border-blue-100" },
  BOOK: { label: "Sách", className: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
  COMBO: { label: "Combo", className: "bg-purple-50 text-purple-600 border border-purple-100" },
};

const statusConfig = {
  PENDING: { label: "Chờ thanh toán", dot: "bg-slate-300", className: "bg-slate-100 text-slate-500 border border-slate-200" },
  AWAITING_CONFIRMATION: { label: "Chờ duyệt", dot: "bg-amber-400", className: "bg-amber-50 text-amber-700 border border-amber-200" },
  PAID: { label: "Đã thanh toán", dot: "bg-green-400", className: "bg-green-50 text-green-700 border border-green-200" },
  APPROVED: { label: "Đã duyệt", dot: "bg-green-400", className: "bg-green-50 text-green-700 border border-green-200" },
  FAILED: { label: "Hủy / Thất bại", dot: "bg-red-300", className: "bg-red-50 text-red-500 border border-red-200" },
  CANCELLED: { label: "Đã hủy", dot: "bg-red-300", className: "bg-red-50 text-red-500 border border-red-200" },
  EXPIRED: { label: "Hết hạn", dot: "bg-slate-400", className: "bg-slate-100 text-slate-400 border border-slate-200" },
};

const shippingStatusConfig = {
  NONE: { label: "Chưa giao ship", className: "bg-slate-100 text-slate-600 border border-slate-200" },
  PREPARING: { label: "Đang chuẩn bị", className: "bg-blue-50 text-blue-700 border border-blue-200" },
  SHIPPING: { label: "Đã bàn giao ship", className: "bg-amber-50 text-amber-700 border border-amber-200" },
  DELIVERED: { label: "Giao thành công", className: "bg-green-50 text-green-700 border border-green-200" },
  CANCELLED: { label: "Giao thất bại", className: "bg-red-50 text-red-600 border border-red-200" },
};

const avatarColor = (name = "") => {
  const colors = ["bg-orange-400", "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-red-400", "bg-yellow-500", "bg-pink-500", "bg-teal-500"];
  let hash = 0;
  for (const c of name) hash = c.charCodeAt(0) + hash;
  return colors[hash % colors.length];
};

const initials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const hasShippingItems = (order) =>
  Boolean(order?.hasPhysical) ||
  (order?.items || []).some((item) => item.type === "BOOK" || item.type === "COMBO");

const isPaidOrder = (order) => ["PAID", "APPROVED"].includes(order?.status);

const isAwaitingShipping = (order) =>
  hasShippingItems(order) &&
  isPaidOrder(order) &&
  ["NONE", "PREPARING"].includes((order?.shippingStatus || "NONE").toUpperCase());

const getShippingBadge = (order) => {
  if (!hasShippingItems(order) || !isPaidOrder(order)) return null;

  const shippingStatus = (order.shippingStatus || "NONE").toUpperCase();

  if (shippingStatus === "DELIVERED") {
    return {
      label: "Giao thành công",
      className: "border border-green-100 bg-green-50 text-green-700",
    };
  }

  if (shippingStatus === "CANCELLED") {
    return {
      label: "Giao thất bại",
      className: "border border-red-100 bg-red-50 text-red-700",
    };
  }

  if (shippingStatus === "SHIPPING") {
    return {
      label: "Đã bàn giao ship",
      className: "border border-amber-100 bg-amber-50 text-amber-700",
    };
  }

  return {
    label: "Cần giao hàng",
    className: "border border-emerald-100 bg-emerald-50 text-emerald-700",
  };
};

const formatMoney = (value) => `${Number(value || 0).toLocaleString("vi-VN")}đ`;
const formatDateTime = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("vi-VN");
};
const isToday = (value) => {
  if (!value) return false;
  const date = new Date(value);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

const buildPrintHtml = (title, orders) => `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
        h1 { font-size: 24px; margin-bottom: 8px; }
        p { margin: 0 0 12px; }
        .card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; margin-bottom: 16px; page-break-inside: avoid; }
        .row { margin-bottom: 8px; }
        .label { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold; }
        .value { font-size: 14px; font-weight: 600; }
        .items { margin-top: 10px; padding-top: 10px; border-top: 1px dashed #cbd5e1; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p>Tổng đơn: ${orders.length}</p>
      ${orders
        .map(
          (order) => `
            <div class="card">
              <div class="row"><div class="label">Mã đơn</div><div class="value">#${order.id}</div></div>
              <div class="row"><div class="label">Người nhận</div><div class="value">${order.shippingInfo?.fullName || order.student || "--"}</div></div>
              <div class="row"><div class="label">Số điện thoại</div><div class="value">${order.shippingInfo?.phone || order.phone || "--"}</div></div>
              <div class="row"><div class="label">Email</div><div class="value">${order.email || "--"}</div></div>
              <div class="row"><div class="label">Địa chỉ giao hàng</div><div class="value">${order.shippingInfo?.address || "--"}</div></div>
              <div class="row"><div class="label">Ngày thanh toán</div><div class="value">${formatDateTime(order.paymentAt)}</div></div>
              <div class="row"><div class="label">Tổng tiền</div><div class="value">${formatMoney(order.amount)}</div></div>
              <div class="items">
                <div class="label">Sản phẩm</div>
                <div class="value">${(order.items || []).map((item) => `${item.name} x${item.quantity || 1}`).join(", ") || "--"}</div>
              </div>
            </div>
          `
        )
        .join("")}
    </body>
  </html>
`;

export default function AdminOrderPage() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken") || localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/admin/orders`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Không thể tải đơn hàng");
      const data = await res.json();
      const normalized = data.map((o) => ({
        id: o.orderCode || o.id,
        student: o.username || o.fullName || "Học viên",
        email: o.email || "",
        phone: o.phone || "",
        shippingInfo: o.shippingInfo || null,
        hasPhysical: o.hasPhysical || false,
        items: (o.orderItems || o.items || []).map((item) => ({
          type: item.itemType || "COURSE",
          name: item.course?.title || item.book?.title || item.combo?.name || item.name || "Sản phẩm",
          quantity: item.quantity || item.qty || 1,
        })),
        amount: o.totalAmount || o.amount || 0,
        method: o.paymentMethod || "Chuyển khoản",
        status: o.status || "PENDING",
        shippingStatus: (o.shippingStatus || "NONE").toUpperCase(),
        createdAt: o.createdAt || "",
        paymentAt: o.paymentAt || "",
        customerConfirmed: o.customerConfirmed || false,
      }));
      setOrders(normalized);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleApprove = async (id) => {
    setApproving(true);
    try {
      const res = await fetch(`${API}/admin/orders/${id}/approve`, {
        method: "PATCH",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Duyệt thất bại");
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "PAID" } : o)));
      if (selected?.id === id) setSelected((s) => ({ ...s, status: "PAID" }));
    } catch (err) {
      alert(`Lỗi: ${err.message}`);
    } finally {
      setApproving(false);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Xác nhận hủy đơn hàng này?")) return;
    try {
      const res = await fetch(`${API}/admin/orders/${id}/reject`, {
        method: "PATCH",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Hủy thất bại");
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "CANCELLED" } : o)));
      if (selected?.id === id) setSelected((s) => ({ ...s, status: "CANCELLED" }));
    } catch (err) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  const handleShippingStatus = async (id, shippingStatus) => {
    try {
      const res = await fetch(
        `${API}/admin/orders/${id}/shipping-status?status=${shippingStatus}`,
        { method: "POST", headers: getAuthHeaders() }
      );
      if (!res.ok) throw new Error("Cập nhật trạng thái giao hàng thất bại");
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, shippingStatus } : o))
      );
      if (selected?.id === id) {
        setSelected((s) => ({ ...s, shippingStatus }));
      }
    } catch (err) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  const filtered = useMemo(
    () =>
      orders.filter((o) => {
        const matchTab =
          tab === "all" ||
          (tab === "pending_confirm" && o.status === "AWAITING_CONFIRMATION") ||
          (tab === "approved" && ["PAID", "APPROVED"].includes(o.status)) ||
          (tab === "shipping" && isAwaitingShipping(o)) ||
          (tab === "delivered" && o.shippingStatus === "DELIVERED") ||
          (tab === "shipping_failed" && o.shippingStatus === "CANCELLED");
        const keyword = search.toLowerCase();
        const matchSearch =
          o.student.toLowerCase().includes(keyword) ||
          String(o.id).toLowerCase().includes(keyword) ||
          o.items.some((i) => i.name.toLowerCase().includes(keyword));
        return matchTab && matchSearch;
      }),
    [orders, search, tab]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ordersPerPage));
  const paginated = filtered.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);
  const pendingConfirmCount = orders.filter((o) => o.status === "AWAITING_CONFIRMATION").length;
  const paidCount = orders.filter((o) => ["PAID", "APPROVED"].includes(o.status)).length;
  const revenue = orders.filter((o) => ["PAID", "APPROVED"].includes(o.status)).reduce((sum, o) => sum + Number(o.amount), 0);
  const newOrdersToday = orders.filter((o) => isToday(o.createdAt));
  const shippableOrders = orders.filter((o) => hasShippingItems(o) && isPaidOrder(o));
  const awaitingShippingOrders = orders.filter(isAwaitingShipping);
  const shippableToday = awaitingShippingOrders.filter((o) => isToday(o.createdAt));
  const awaitingShipCount = awaitingShippingOrders.length;
  const deliveredCount = orders.filter((o) => o.shippingStatus === "DELIVERED").length;
  const failedShippingCount = orders.filter((o) => o.shippingStatus === "CANCELLED").length;

  const printOrders = (title, printList) => {
    if (!printList.length) {
      alert("Không có đơn phù hợp để in.");
      return;
    }
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      alert("Trình duyệt đang chặn cửa sổ in.");
      return;
    }
    printWindow.document.write(buildPrintHtml(title, printList));
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex min-h-screen flex-1 flex-col overflow-y-auto chinese-pattern">
        <div className="sticky top-0 z-10 h-20 shrink-0 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900">Quản lý Đơn hàng</h2>
            {pendingConfirmCount > 0 && (
              <span className="animate-pulse rounded-full bg-amber-400 px-2.5 py-1 text-xs font-black text-slate-900">
                {pendingConfirmCount} chờ duyệt
              </span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => printOrders("Phiếu giao hàng hôm nay", shippableToday)}
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-100"
            >
              In phiếu hôm nay
            </button>
            <div className="group relative w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-400 group-focus-within:text-primary">search</span>
              <input
                type="text"
                placeholder="Tìm đơn hàng, học viên..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl bg-slate-100 py-2 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button onClick={fetchOrders} disabled={loading} className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:text-primary">
              <span className={`material-symbols-outlined text-[20px] ${loading ? "animate-spin" : ""}`}>refresh</span>
            </button>
            <div className="h-10 w-px bg-slate-200" />
            <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">AT</div>
          </div>
        </div>

        <div className="flex flex-1 gap-6 overflow-visible p-8">
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">Đơn mới hôm nay</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{newOrdersToday.length}</p>
                <p className="mt-1 text-sm text-slate-600">Có {newOrdersToday.filter((o) => isAwaitingShipping(o)).length} đơn có sản phẩm cần giao.</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">Đơn cần giao</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{awaitingShipCount}</p>
                <p className="mt-1 text-sm text-slate-600">Đây là các đơn mua sách/combo đã thanh toán và cần xử lý giao hàng.</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-700">Giao hàng thành công</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{deliveredCount}</p>
                <p className="mt-1 text-sm text-slate-600">Các đơn đã giao hoàn tất cho khách hàng.</p>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-rose-700">Giao hàng thất bại</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{failedShippingCount}</p>
                <p className="mt-1 text-sm text-slate-600">Các đơn giao không thành công cần kiểm tra lại.</p>
              </div>
            </div>

            {(newOrdersToday.length > 0 || awaitingShipCount > 0 || deliveredCount > 0 || failedShippingCount > 0) && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                    {newOrdersToday.length} đơn mới hôm nay
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                    {awaitingShipCount} đơn cần giao
                  </span>
                  <span className="rounded-full bg-green-50 px-3 py-1 font-semibold text-green-700">
                    {deliveredCount} đơn giao thành công
                  </span>
                  <span className="rounded-full bg-rose-50 px-3 py-1 font-semibold text-rose-700">
                    {failedShippingCount} đơn giao thất bại
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTab("all");
                      setSearch("");
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Xem tất cả
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTab("shipping");
                      setSearch("");
                      setCurrentPage(1);
                    }}
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                  >
                    Lọc đơn cần giao
                  </button>
                  <button
                    type="button"
                    onClick={() => printOrders("Phiếu giao hàng cần xử lý", awaitingShippingOrders)}
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary/90"
                  >
                    In tất cả đơn cần giao
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
                <button onClick={fetchOrders} className="font-semibold underline">Thử lại</button>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Tổng đơn", value: orders.length, icon: "receipt_long", iconColor: "text-blue-500 bg-blue-50" },
                { label: "Giao thành công", value: deliveredCount, icon: "local_shipping", iconColor: "text-green-500 bg-green-50" },
                { label: "Đã thanh toán", value: paidCount, icon: "check_circle", iconColor: "text-green-500 bg-green-50" },
                { label: "Doanh thu", value: formatMoney(revenue), icon: "payments", iconColor: "text-purple-500 bg-purple-50" },
              ].map((s) => (
                <div key={s.label} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-primary/5 transition-transform group-hover:scale-110" />
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.iconColor}`}>
                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                  <div className="mt-0.5 text-xs font-medium text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 p-4">
                <div className="flex gap-1">
                  {[["all", "Tất cả"], ["approved", "Đã duyệt"], ["shipping", "Cần giao"], ["delivered", "Giao hàng thành công"], ["shipping_failed", "Giao hàng thất bại"]].map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTab(key);
                        setCurrentPage(1);
                      }}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${tab === key ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-slate-400">{filtered.length} đơn hàng</div>
              </div>

              <div className="overflow-x-auto">
                {loading && orders.length === 0 ? (
                  <div className="py-20 text-center">
                    <span className="material-symbols-outlined mb-3 block animate-spin text-4xl text-slate-300">refresh</span>
                    <p className="text-sm text-slate-400">Đang tải đơn hàng...</p>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="px-6 py-4">Mã đơn</th>
                          <th className="px-6 py-4">Ngày</th>
                          <th className="px-6 py-4">Học viên</th>
                          <th className="px-6 py-4">Sản phẩm / Khóa học</th>
                          <th className="px-6 py-4">Tổng tiền</th>
                        <th className="px-6 py-4">Trạng thái</th>
                        <th className="px-6 py-4 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginated.map((order) => (
                        <tr key={order.id} onClick={() => setSelected(selected?.id === order.id ? null : order)} className={`cursor-pointer transition-colors hover:bg-slate-50 ${selected?.id === order.id ? "bg-primary/5" : ""}`}>
                          <td className="px-6 py-4">
                            <div>
                              <span className="text-sm font-black text-primary">#{order.id}</span>
                              {order.customerConfirmed && <div className="mt-0.5 flex items-center gap-0.5 text-[10px] font-semibold text-amber-600"><span className="material-symbols-outlined text-[11px]">info</span>KH đã xác nhận CK</div>}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-xs font-semibold text-slate-600">
                              {formatDateTime(order.paymentAt || order.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${avatarColor(order.student)} text-xs font-bold text-white`}>{initials(order.student)}</div>
                              <div>
                                <div className="text-sm font-semibold text-slate-700">{order.student}</div>
                                {order.email && <div className="text-[11px] text-slate-400">{order.email}</div>}
                                {getShippingBadge(order) && (
                                  <div className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${getShippingBadge(order).className}`}>
                                    <span className="material-symbols-outlined text-[12px]">local_shipping</span>
                                    {getShippingBadge(order).label}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="max-w-[260px] px-6 py-4">
                            <div className="flex flex-col gap-1">
                              {order.items.length > 0 ? order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                  <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-black ${typeConfig[item.type]?.className || ""}`}>{typeConfig[item.type]?.label || item.type}</span>
                                  <span className="truncate text-xs text-slate-600">{item.name}</span>
                                </div>
                              )) : <span className="text-xs text-slate-400">—</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4"><span className="text-sm font-black text-slate-800">{formatMoney(order.amount)}</span></td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold ${statusConfig[order.status]?.className || ""}`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${statusConfig[order.status]?.dot || "bg-slate-300"}`} />
                                {statusConfig[order.status]?.label || order.status}
                              </span>
                              {hasShippingItems(order) && ["PAID", "APPROVED"].includes(order.status) && (
                                <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold ${shippingStatusConfig[order.shippingStatus || "NONE"]?.className || shippingStatusConfig.NONE.className}`}>
                                  {shippingStatusConfig[order.shippingStatus || "NONE"]?.label || shippingStatusConfig.NONE.label}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              {order.status === "AWAITING_CONFIRMATION" && (
                                <>
                                  <button onClick={() => handleApprove(order.id)} disabled={approving} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-primary/90 disabled:opacity-50">Duyệt</button>
                                  <button onClick={() => handleReject(order.id)} className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-500 transition-all hover:bg-red-100">Hủy</button>
                                </>
                              )}
                              <button onClick={() => setSelected(selected?.id === order.id ? null : order)} className="p-2 text-slate-400 transition-colors hover:text-primary"><span className="material-symbols-outlined text-lg">visibility</span></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {!loading && filtered.length === 0 && (
                  <div className="py-20 text-center"><span className="material-symbols-outlined text-5xl text-slate-200">inbox</span><p className="mt-3 text-sm text-slate-400">Không có đơn hàng nào</p></div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 bg-gray-50 p-4">
                <p className="text-sm text-slate-500">Trang <span className="font-bold text-slate-800">{currentPage}</span> / <span className="font-bold text-slate-800">{totalPages}</span></p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="rounded-lg border px-3 py-1 text-sm transition-colors hover:bg-white disabled:opacity-40">Prev</button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`rounded-lg px-3 py-1 text-sm font-semibold ${currentPage === i + 1 ? "bg-primary text-white" : "border bg-white hover:bg-slate-50"}`}>{i + 1}</button>
                  ))}
                  <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="rounded-lg border px-3 py-1 text-sm transition-colors hover:bg-white disabled:opacity-40">Next</button>
                </div>
              </div>
            </div>
          </div>

          {selected && (
            <aside className="sticky top-24 max-h-[calc(100vh-8rem)] w-80 shrink-0 self-start overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h3 className="text-sm font-bold text-slate-800">Chi tiết đơn hàng</h3>
                <button onClick={() => setSelected(null)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 transition-colors hover:bg-slate-200"><span className="material-symbols-outlined text-[16px] text-slate-500">close</span></button>
              </div>

              <div className="space-y-5 p-5">
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="mb-1 text-xs text-slate-400">Mã đơn hàng</p>
                  <p className="text-base font-black text-primary">#{selected.id}</p>
                  {selected.customerConfirmed && <span className="mt-2 inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-600"><span className="material-symbols-outlined text-[12px]">payments</span>Khách đã xác nhận chuyển khoản</span>}
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Học viên</p>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${avatarColor(selected.student)} text-sm font-bold text-white`}>{initials(selected.student)}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{selected.student}</p>
                      {selected.email && <p className="text-xs text-slate-400">{selected.email}</p>}
                      {selected.phone && <p className="text-xs text-slate-400">{selected.phone}</p>}
                    </div>
                  </div>
                </div>

                {hasShippingItems(selected) && selected.shippingInfo && (
                  <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">Phiếu giao hàng</p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">Đơn có sản phẩm vật lý cần giao</p>
                      </div>
                      <button type="button" onClick={() => printOrders(`Phiếu giao hàng #${selected.id}`, [selected])} className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 hover:bg-emerald-50"><span className="material-symbols-outlined text-[14px]">print</span>In phiếu</button>
                    </div>

                    <div className="grid gap-2 text-xs">
                      <div className="rounded-xl border border-emerald-100 bg-white px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Người nhận</p><p className="mt-1 font-semibold text-slate-700">{selected.shippingInfo.fullName || selected.student}</p></div>
                      <div className="rounded-xl border border-emerald-100 bg-white px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Số điện thoại</p><p className="mt-1 font-semibold text-slate-700">{selected.shippingInfo.phone || selected.phone || "--"}</p></div>
                      <div className="rounded-xl border border-emerald-100 bg-white px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email</p><p className="mt-1 break-all font-semibold text-slate-700">{selected.email || "--"}</p></div>
                      <div className="rounded-xl border border-emerald-100 bg-white px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Địa chỉ giao hàng</p><p className="mt-1 leading-5 font-semibold text-slate-700">{selected.shippingInfo.address || "--"}</p></div>
                      <div className="rounded-xl border border-emerald-100 bg-white px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ngày thanh toán</p><p className="mt-1 font-semibold text-slate-700">{formatDateTime(selected.paymentAt)}</p></div>
                    </div>
                  </div>
                )}

                {hasShippingItems(selected) && !selected.shippingInfo && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-700">Thiếu thông tin giao hàng</p><p className="mt-2 text-sm text-slate-600">Đơn này có sản phẩm cần ship nhưng backend chưa trả về địa chỉ giao hàng.</p></div>
                )}

                {!hasShippingItems(selected) && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Đơn số</p><p className="mt-2 text-sm text-slate-600">Đơn này chỉ gồm khóa học hoặc sản phẩm số, không cần phiếu giao hàng.</p></div>
                )}

                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Sản phẩm</p>
                  <div className="space-y-2">
                    {selected.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5"><span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-black ${typeConfig[item.type]?.className || ""}`}>{typeConfig[item.type]?.label || item.type}</span><span className="text-xs font-medium text-slate-600">{item.name}</span></div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Thanh toán</p>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Phương thức</span><span className="font-semibold text-slate-700">{selected.method}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Ngày thanh toán</span><span className="font-semibold text-slate-700">{formatDateTime(selected.paymentAt)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Trạng thái</span><span className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] font-bold ${statusConfig[selected.status]?.className || ""}`}><span className={`h-1.5 w-1.5 rounded-full ${statusConfig[selected.status]?.dot || "bg-slate-300"}`} />{statusConfig[selected.status]?.label || selected.status}</span></div>
                    {hasShippingItems(selected) && ["PAID", "APPROVED"].includes(selected.status) && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Giao hàng</span>
                        <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] font-bold ${shippingStatusConfig[selected.shippingStatus || "NONE"]?.className || shippingStatusConfig.NONE.className}`}>
                          {shippingStatusConfig[selected.shippingStatus || "NONE"]?.label || shippingStatusConfig.NONE.label}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-2"><span className="text-sm font-bold text-slate-700">Tổng cộng</span><span className="text-lg font-black text-slate-800">{formatMoney(selected.amount)}</span></div>
                  </div>
                </div>

                {selected.status === "AWAITING_CONFIRMATION" && (
                  <div className="space-y-2">
                    <button onClick={() => handleApprove(selected.id)} disabled={approving} className="w-full rounded-xl bg-primary py-3 text-sm font-black text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50">{approving ? "Đang duyệt..." : "Xác nhận duyệt đơn"}</button>
                    <button onClick={() => handleReject(selected.id)} className="w-full rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-bold text-red-500 transition-all hover:bg-red-100">Hủy đơn hàng</button>
                  </div>
                )}
                {["PAID", "APPROVED"].includes(selected.status) && <div className="w-full rounded-xl border border-green-200 bg-green-50 py-3 text-center text-sm font-bold text-green-600">Đơn hàng đã được duyệt</div>}

                {hasShippingItems(selected) && ["PAID", "APPROVED"].includes(selected.status) && (
                  <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Xử lý giao hàng</p>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        type="button"
                        onClick={() => handleShippingStatus(selected.id, "SHIPPING")}
                        className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700 hover:bg-amber-100"
                      >
                        Đã bàn giao ship
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShippingStatus(selected.id, "DELIVERED")}
                        className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm font-bold text-green-700 hover:bg-green-100"
                      >
                        Giao thành công
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShippingStatus(selected.id, "CANCELLED")}
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
                      >
                        Giao thất bại
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}

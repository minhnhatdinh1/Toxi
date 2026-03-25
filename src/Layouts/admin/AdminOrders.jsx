import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";

const API = "http://localhost:8080/api";

const typeConfig = {
  COURSE: { label: "Khóa", className: "bg-blue-50 text-blue-600 border border-blue-100" },
  BOOK:   { label: "Sách", className: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
  COMBO:  { label: "Combo", className: "bg-purple-50 text-purple-600 border border-purple-100" },
};

const statusConfig = {
  PENDING:                { label: "Chờ thanh toán",       dot: "bg-slate-300",  className: "bg-slate-100 text-slate-500 border border-slate-200" },
  AWAITING_CONFIRMATION:  { label: "Chờ duyệt",            dot: "bg-amber-400",  className: "bg-amber-50 text-amber-700 border border-amber-200" },
  PAID:                   { label: "Đã thanh toán",        dot: "bg-green-400",  className: "bg-green-50 text-green-700 border border-green-200" },
  FAILED:                 { label: "Huỷ / Thất bại",       dot: "bg-red-300",    className: "bg-red-50 text-red-500 border border-red-200" },
  EXPIRED:                { label: "Hết hạn",              dot: "bg-slate-400",  className: "bg-slate-100 text-slate-400 border border-slate-200" },
};

// Avatar color từ tên
const avatarColor = (name = "") => {
  const colors = ["bg-orange-400","bg-blue-500","bg-purple-500","bg-green-500","bg-red-400","bg-yellow-500","bg-pink-500","bg-teal-500"];
  let hash = 0;
  for (let c of name) hash = c.charCodeAt(0) + hash;
  return colors[hash % colors.length];
};

const initials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

const ordersPerPage = 5;

export default function AdminOrderPage() {
  const [tab, setTab]               = useState("all");
  const [search, setSearch]         = useState("");
  const [orders, setOrders]         = useState([]);
  const [selected, setSelected]     = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading]       = useState(false);
  const [approving, setApproving]   = useState(false);
  const [error, setError]           = useState("");

  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  // ── Fetch orders từ backend ──
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/admin/orders`, { headers });
      if (!res.ok) throw new Error("Không thể tải đơn hàng");
      const data = await res.json();
      // Normalize data từ backend
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
        })),
        amount: o.totalAmount || o.amount || 0,
        method: o.paymentMethod || "Bank Transfer",
        status: o.status || "PENDING",
        createdAt: o.createdAt || "",
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
    // Auto-refresh mỗi 30 giây để bắt đơn mới
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // ── Duyệt đơn hàng ──
  const handleApprove = async (id) => {
    setApproving(true);
    try {
      const res = await fetch(`${API}/admin/orders/${id}/approve`, {
        method: "PATCH",
        headers,
      });
      if (!res.ok) throw new Error("Duyệt thất bại");
      // Cập nhật local state ngay
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "APPROVED" } : o));
      if (selected?.id === id) setSelected((s) => ({ ...s, status: "APPROVED" }));
    } catch (err) {
      alert("Lỗi: " + err.message);
    } finally {
      setApproving(false);
    }
  };

  // ── Từ chối đơn ──
  const handleReject = async (id) => {
    if (!window.confirm("Xác nhận huỷ đơn hàng này?")) return;
    try {
      const res = await fetch(`${API}/admin/orders/${id}/reject`, {
        method: "PATCH",
        headers,
      });
      if (!res.ok) throw new Error("Huỷ thất bại");
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "CANCELLED" } : o));
      if (selected?.id === id) setSelected((s) => ({ ...s, status: "CANCELLED" }));
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  // ── Filter ──
  const filtered = orders.filter((o) => {
    const matchTab =
      tab === "all" ||
      (tab === "pending_confirm" && o.status === "AWAITING_CONFIRMATION") ||
      (tab === "approved" && o.status === "PAID");
    const matchSearch =
      o.student.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    return matchTab && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ordersPerPage));
  const paginated  = filtered.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);
  const pendingConfirmCount = orders.filter((o) => o.status === "AWAITING_CONFIRMATION").length;

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 flex flex-col overflow-hidden chinese-pattern">

        {/* Header */}
        <div className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Quản lý Đơn hàng</h2>
            {pendingConfirmCount > 0 && (
              <span className="bg-amber-400 text-slate-900 text-xs font-black px-2.5 py-1 rounded-full animate-pulse">
                {pendingConfirmCount} chờ duyệt
              </span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-72 group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[18px]">search</span>
              <input type="text" placeholder="Tìm đơn hàng, học viên..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Refresh button */}
            <button onClick={fetchOrders} disabled={loading}
              className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:text-primary transition-colors"
              title="Làm mới"
            >
              <span className={`material-symbols-outlined text-[20px] ${loading ? "animate-spin" : ""}`}>refresh</span>
            </button>

            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-6">
              <button className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:text-primary relative">
                <span className="material-symbols-outlined">notifications</span>
                {pendingConfirmCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />}
              </button>
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">AT</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 flex gap-6">
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Error banner */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error} —
                <button onClick={fetchOrders} className="underline font-semibold">Thử lại</button>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Tổng đơn",      value: orders.length,                                              icon: "receipt_long",    iconColor: "text-blue-500 bg-blue-50" },
                { label: "Chờ duyệt",     value: pendingConfirmCount,                                        icon: "pending_actions", iconColor: "text-amber-500 bg-amber-50",  highlight: pendingConfirmCount > 0 },
                { label: "Đã thanh toán", value: orders.filter((o) => o.status === "PAID").length,       icon: "check_circle",    iconColor: "text-green-500 bg-green-50" },
                { label: "Doanh thu",     value: orders.filter((o) => o.status === "PAID").reduce((s, o) => s + Number(o.amount), 0).toLocaleString("vi-VN") + "đ", icon: "payments", iconColor: "text-purple-500 bg-purple-50" },
              ].map((s) => (
                <div key={s.label} className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border shadow-sm relative overflow-hidden group transition-all ${s.highlight ? "border-amber-300 shadow-amber-100" : "border-slate-200 dark:border-slate-800"}`}>
                  <div className="absolute right-0 top-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.iconColor}`}>
                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Table card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

              {/* Tabs */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 flex items-center justify-between">
                <div className="flex gap-1">
                  {[
                    ["all",             "Tất cả"],
                    ["pending_confirm", "Chờ duyệt"],
                    ["approved",        "Đã duyệt"],
                  ].map(([key, label]) => (
                    <button key={key} onClick={() => { setTab(key); setCurrentPage(1); }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        tab === key ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {label}
                      {key === "pending_confirm" && pendingConfirmCount > 0 && (
                        <span className={`ml-1.5 text-[10px] font-black px-1.5 py-0.5 rounded-full ${tab === key ? "bg-white/20 text-white" : "bg-amber-400 text-slate-900"}`}>
                          {pendingConfirmCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-slate-400">{filtered.length} đơn hàng</div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                {loading && orders.length === 0 ? (
                  <div className="py-20 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin block mb-3">refresh</span>
                    <p className="text-slate-400 text-sm">Đang tải đơn hàng...</p>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Mã đơn</th>
                        <th className="px-6 py-4">Học viên</th>
                        <th className="px-6 py-4">Sản phẩm / Khóa học</th>
                        <th className="px-6 py-4">Tổng tiền</th>
                        <th className="px-6 py-4">Trạng thái</th>
                        <th className="px-6 py-4 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {paginated.map((order) => (
                        <tr key={order.id}
                          onClick={() => setSelected(selected?.id === order.id ? null : order)}
                          className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer ${selected?.id === order.id ? "bg-primary/5" : ""} ${order.status === "AWAITING_CONFIRMATION" ? "border-l-4 border-l-amber-400" : ""}`}
                        >
                          <td className="px-6 py-4">
                            <div>
                              <span className="text-sm font-black text-primary">#{order.id}</span>
                              {order.customerConfirmed && (
                                <div className="text-[10px] text-amber-600 font-semibold mt-0.5 flex items-center gap-0.5">
                                  <span className="material-symbols-outlined text-[11px]">info</span>
                                  KH đã xác nhận CK
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`size-9 rounded-full ${avatarColor(order.student)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                {initials(order.student)}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">{order.student}</div>
                                {order.email && <div className="text-[11px] text-slate-400">{order.email}</div>}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 max-w-[220px]">
                            <div className="flex flex-col gap-1">
                              {order.items.length > 0 ? order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${typeConfig[item.type]?.className || ""}`}>
                                    {typeConfig[item.type]?.label || item.type}
                                  </span>
                                  <span className="text-xs text-slate-600 dark:text-slate-300 truncate">{item.name}</span>
                                </div>
                              )) : <span className="text-xs text-slate-400">—</span>}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-sm font-black text-slate-800 dark:text-white">
                              {Number(order.amount).toLocaleString("vi-VN")}đ
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold ${statusConfig[order.status]?.className || ""}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[order.status]?.dot || "bg-slate-300"}`} />
                              {statusConfig[order.status]?.label || order.status}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-end items-center gap-1">
                             {["PENDING", "AWAITING_CONFIRMATION"].includes(order.status) && (
  <>
    <button onClick={() => handleApprove(order.id)} disabled={approving}
      className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
    >
      ✓ Duyệt
    </button>
    <button onClick={() => handleReject(order.id)}
      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg text-xs font-bold transition-all border border-red-200"
    >
      ✕ Huỷ
    </button>
  </>
)}
                              <button onClick={() => setSelected(selected?.id === order.id ? null : order)}
                                className="p-2 text-slate-400 hover:text-primary transition-colors"
                              >
                                <span className="material-symbols-outlined text-lg">visibility</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {!loading && filtered.length === 0 && (
                  <div className="py-20 text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-200">inbox</span>
                    <p className="text-slate-400 text-sm mt-3">Không có đơn hàng nào</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="p-4 bg-gray-50 border-t border-slate-200 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Trang <span className="font-bold text-slate-800">{currentPage}</span> / <span className="font-bold text-slate-800">{totalPages}</span>
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40 hover:bg-white transition-colors">
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${currentPage === i + 1 ? "bg-primary text-white" : "bg-white border hover:bg-slate-50"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40 hover:bg-white transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <aside className="w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col shrink-0 overflow-y-auto self-start sticky top-0 max-h-[calc(100vh-8rem)]">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-sm">Chi tiết đơn hàng</h3>
                <button onClick={() => setSelected(null)} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-slate-500 text-[16px]">close</span>
                </button>
              </div>

              <div className="p-5 space-y-5">
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-slate-400 mb-1">Mã đơn hàng</p>
                  <p className="font-black text-primary text-base">#{selected.id}</p>
                  {selected.customerConfirmed && (
                    <span className="inline-flex items-center gap-1 mt-2 text-[11px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-1 rounded-lg font-semibold">
                      <span className="material-symbols-outlined text-[12px]">payments</span>
                      Khách đã xác nhận chuyển khoản
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Học viên</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${avatarColor(selected.student)} flex items-center justify-center text-white font-bold text-sm`}>
                      {initials(selected.student)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{selected.student}</p>
                      {selected.email && <p className="text-xs text-slate-400">{selected.email}</p>}
                      {selected.phone && <p className="text-xs text-slate-400">{selected.phone}</p>}
                    </div>
                  </div>
                </div>

                {selected.hasPhysical && selected.shippingInfo && (
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Địa chỉ giao hàng</p>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="material-symbols-outlined text-blue-400 text-[14px]">person</span>
                        <span className="font-semibold text-slate-700">{selected.shippingInfo.fullName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="material-symbols-outlined text-blue-400 text-[14px]">call</span>
                        <span className="text-slate-600">{selected.shippingInfo.phone}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="material-symbols-outlined text-blue-400 text-[14px] mt-0.5">location_on</span>
                        <span className="text-slate-600">{selected.shippingInfo.address}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Sản phẩm</p>
                  <div className="space-y-2">
                    {selected.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5">
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${typeConfig[item.type]?.className || ""}`}>
                          {typeConfig[item.type]?.label || item.type}
                        </span>
                        <span className="text-xs text-slate-600 font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Thanh toán</p>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Phương thức</span>
                      <span className="font-semibold text-slate-700">{selected.method}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Trạng thái</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold ${statusConfig[selected.status]?.className || ""}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[selected.status]?.dot || ""}`} />
                        {statusConfig[selected.status]?.label || selected.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="font-bold text-slate-700 text-sm">Tổng cộng</span>
                      <span className="text-lg font-black text-slate-800">{Number(selected.amount).toLocaleString("vi-VN")}đ</span>
                    </div>
                  </div>
                </div>

                {selected.status === "AWAITING_CONFIRMATION" && (
                  <div className="space-y-2">
                    <button onClick={() => handleApprove(selected.id)} disabled={approving}
                      className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-black text-sm transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50"
                    >
                      {approving ? "Đang duyệt..." : "✓ Xác nhận duyệt đơn"}
                    </button>
                    <button onClick={() => handleReject(selected.id)}
                      className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 rounded-xl font-bold text-sm transition-all"
                    >
                      ✕ Huỷ đơn hàng
                    </button>
                  </div>
                )}
                {selected.status === "PAID" && (
                  <div className="w-full py-3 bg-green-50 border border-green-200 text-green-600 rounded-xl font-bold text-sm text-center">
                    ✓ Đơn hàng đã được duyệt
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

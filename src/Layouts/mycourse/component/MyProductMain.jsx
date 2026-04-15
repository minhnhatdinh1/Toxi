import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MyUser from "./MyUser";
import MyHeader from "./MyHeader";
const BASE_URL = import.meta.env.VITE_API_URL;


const API = `${BASE_URL}/api`;
const buildOrderEndpoints = (userId) =>
  [
    `${API}/orders/my`,
    `${API}/my-orders`,
    `${API}/orders`,
    `${API}/orders/me`,
    `${API}/orders/history`,
    userId ? `${API}/orders?userId=${userId}` : null,
    userId ? `${API}/orders/history?userId=${userId}` : null,
    userId ? `${API}/my-orders?userId=${userId}` : null,
    `${API}/users/me/orders`,
    userId ? `${API}/orders/user/${userId}` : null,
    userId ? `${API}/users/${userId}/orders` : null,
    `${API}/admin/orders`,
  ].filter(Boolean);

const statusMeta = {
  PENDING: {
    tab: "pending",
    label: "Chờ thanh toán",
    icon: "payments",
    iconClass: "text-amber-500",
    textClass: "text-amber-600",
  },
  AWAITING_CONFIRMATION: {
    tab: "processing",
    label: "Đang xử lý",
    icon: "hourglass_top",
    iconClass: "text-blue-500",
    textClass: "text-blue-600",
  },
  PAID: {
    tab: "processing",
    label: "Đã thanh toán",
    icon: "check_circle",
    iconClass: "text-emerald-500",
    textClass: "text-emerald-600",
  },
  APPROVED: {
    tab: "processing",
    label: "Đã duyệt",
    icon: "verified",
    iconClass: "text-emerald-500",
    textClass: "text-emerald-600",
  },
  CANCELLED: {
    tab: "cancelled",
    label: "Đã hủy",
    icon: "cancel",
    iconClass: "text-red-500",
    textClass: "text-red-500",
  },
  FAILED: {
    tab: "cancelled",
    label: "Thất bại",
    icon: "cancel",
    iconClass: "text-red-500",
    textClass: "text-red-500",
  },
  EXPIRED: {
    tab: "cancelled",
    label: "Hết hạn",
    icon: "schedule",
    iconClass: "text-slate-400",
    textClass: "text-slate-500",
  },
};

const shippingMeta = {
  NONE: { tab: "processing", label: "Đang xử lý" },
  PREPARING: { tab: "processing", label: "Đang xử lý" },
  SHIPPING: { tab: "shipping", label: "Đang giao hàng" },
  DELIVERED: { tab: "completed", label: "Hoàn thành" },
  CANCELLED: { tab: "cancelled", label: "Đã hủy" },
};

const buildFileUrl = (value) => {
  if (!value || typeof value !== "string") return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const normalizedValue = value.replace(/^\/+/, "");

  if (normalizedValue.startsWith("api/files/")) {
    return `${BASE_URL}/${normalizedValue}`;
  }

  if (normalizedValue.startsWith("uploads/")) {
    return `${BASE_URL}/${normalizedValue}`;
  }

  return `${API}/files/${normalizedValue}`;
};

const formatMoney = (value) => `${Number(value || 0).toLocaleString("vi-VN")}đ`;

const PRODUCT_FALLBACK_IMAGE = "https://via.placeholder.com/160?text=No+Image";

const formatDateTime = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("vi-VN");
};

const getOrderStatus = (order) => {
  const shippingStatus = String(order.shippingStatus || "NONE").toUpperCase();
  if (shippingStatus === "SHIPPING") return shippingMeta.SHIPPING;
  if (shippingStatus === "DELIVERED") return shippingMeta.DELIVERED;
  if (shippingStatus === "CANCELLED") return shippingMeta.CANCELLED;
  return statusMeta[order.status] || shippingMeta[shippingStatus] || {
    tab: "processing",
    label: order.status || "Đang xử lý",
    icon: "inventory_2",
    iconClass: "text-slate-400",
    textClass: "text-slate-500",
  };
};

const normalizeItem = (item = {}) => {
  const source = item.book || item.course || item.combo || {};
  return {
    id: item.itemId || source.bookId || source.courseId || source.comboId || source.id,
    type: item.itemType || item.type || (item.book ? "BOOK" : item.course ? "COURSE" : item.combo ? "COMBO" : "ITEM"),
    name: item.course?.title || item.book?.title || item.combo?.name || item.name || "Sản phẩm",
    quantity: Number(item.quantity || item.qty || 1),
    image:
      buildFileUrl(
        item.imageUrl ||
          source.thumbnailUrl ||
          source.thumbnail ||
          source.imageUrl ||
          source.image ||
          (Array.isArray(source.imageUrls) ? source.imageUrls[0] : "")
      ) || PRODUCT_FALLBACK_IMAGE,
  };
};

const normalizeOrders = (payload, identity) => {
  const root = Array.isArray(payload)
    ? payload
    : payload?.data?.content || payload?.data || payload?.content || [];

  const username = String(identity.username || "").toLowerCase();
  const email = String(identity.email || "").toLowerCase();

  return (Array.isArray(root) ? root : [])
    .filter((order) => {
      if (!username && !email) return true;
      const ownerName = String(order.username || order.fullName || order.customerName || "").toLowerCase();
      const ownerEmail = String(order.email || "").toLowerCase();
      return ownerName === username || ownerEmail === email || (!ownerName && !ownerEmail);
    })
    .map((order) => ({
      id: order.orderCode || order.id,
      status: String(order.status || "PENDING").toUpperCase(),
      shippingStatus: String(order.shippingStatus || "NONE").toUpperCase(),
      createdAt: order.createdAt || order.paymentAt || order.created_at || "",
      amount: Number(order.totalAmount || order.amount || 0),
      items: (order.orderItems || order.items || []).map(normalizeItem),
    }));
};

export default function MyProductMain() {
  const [orderTab, setOrderTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const identity = {
        username: localStorage.getItem("userName"),
        email: localStorage.getItem("email"),
      };

      if (!token) {
        setOrders([]);
        setLoading(false);
        setError("Bạn cần đăng nhập để xem lịch sử đơn hàng.");
        return;
      }

      setLoading(true);
      setError("");
      const endpointErrors = [];

      for (const endpoint of buildOrderEndpoints(userId)) {
        try {
          const res = await fetch(endpoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            endpointErrors.push(`${endpoint} (${res.status})`);
            continue;
          }
          const data = await res.json();
          const normalized = normalizeOrders(data, identity);
          setOrders(normalized);
          setLoading(false);
          return;
        } catch (err) {
          console.error(`Load orders failed at ${endpoint}:`, err);
          endpointErrors.push(`${endpoint} (network)`);
        }
      }

      setOrders([]);
      setLoading(false);
      setError(
        endpointErrors.some((item) => item.includes("(403)"))
          ? "Backend đang chặn quyền xem lịch sử đơn hàng của tài khoản này."
          : "Không tìm thấy endpoint lịch sử đơn hàng phù hợp từ backend."
      );
    };

    loadOrders();
  }, []);

  const tabs = useMemo(() => {
    const counts = {
      all: orders.length,
      pending: orders.filter((order) => getOrderStatus(order).tab === "pending").length,
      processing: orders.filter((order) => getOrderStatus(order).tab === "processing").length,
      shipping: orders.filter((order) => getOrderStatus(order).tab === "shipping").length,
      completed: orders.filter((order) => getOrderStatus(order).tab === "completed").length,
      cancelled: orders.filter((order) => getOrderStatus(order).tab === "cancelled").length,
    };

    return [
      { key: "all", label: "Tất cả", count: counts.all },
      { key: "pending", label: "Chờ thanh toán", count: counts.pending },
      { key: "processing", label: "Đang xử lý", count: counts.processing },
      { key: "shipping", label: "Đang giao", count: counts.shipping },
      { key: "completed", label: "Hoàn thành", count: counts.completed },
      { key: "cancelled", label: "Đã hủy", count: counts.cancelled },
    ];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const status = getOrderStatus(order);
      const matchTab = orderTab === "all" || status.tab === orderTab;
      const keyword = search.trim().toLowerCase();
      const matchSearch =
        !keyword ||
        String(order.id || "").toLowerCase().includes(keyword) ||
        order.items.some((item) => item.name.toLowerCase().includes(keyword));
      return matchTab && matchSearch;
    });
  }, [orderTab, orders, search]);

  return (
    <>
      <MyHeader />
      {selectedOrder ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/45 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  Chi tiết đơn hàng
                </p>
                <h3 className="mt-1 text-xl font-black text-slate-900">
                  #{selectedOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid gap-6 px-6 py-6 md:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-500">Ngày đặt</p>
                      <p className="font-semibold text-slate-900">
                        {formatDateTime(selectedOrder.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Trạng thái</p>
                      <p className="font-semibold text-slate-900">
                        {getOrderStatus(selectedOrder).label}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4"
                    >
                      <div className="h-20 w-20 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 font-bold text-slate-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Loại: {item.type}
                        </p>
                        <p className="text-sm text-slate-500">
                          Số lượng: x{item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Tóm tắt đơn hàng
                  </p>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Mã đơn</span>
                      <span className="font-semibold text-slate-900">
                        #{selectedOrder.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Số sản phẩm</span>
                      <span className="font-semibold text-slate-900">
                        {selectedOrder.items.reduce(
                          (sum, item) => sum + Number(item.quantity || 1),
                          0
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Trạng thái</span>
                      <span className="font-semibold text-slate-900">
                        {getOrderStatus(selectedOrder).label}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="flex items-end justify-between">
                      <span className="text-sm font-bold text-slate-700">
                        Tổng cộng
                      </span>
                      <span className="text-2xl font-black text-primary">
                        {formatMoney(selectedOrder.amount)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-dark"
                >
                  Đóng chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <MyUser />
          <div className="lg:col-span-9 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#4c669a]">
              <a className="hover:text-primary" href="#">Trang chủ</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <a className="hover:text-primary" href="#">Tài khoản</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="font-medium text-[#0d121b]">Lịch sử đơn hàng</span>
            </div>

            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="flex items-center gap-3 text-3xl font-bold text-[#0d121b]">
                  Lịch sử đơn hàng
                  <span className="font-serif text-2xl font-normal text-gray-400" lang="zh">
                    订单历史
                  </span>
                </h1>
                <p className="mt-1 text-[#4c669a]">
                  Quản lý và theo dõi quá trình vận chuyển các đơn hàng của bạn.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm theo mã đơn hàng..."
                    className="h-10 w-64 rounded-lg border border-border-light bg-white pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-gray-400">
                    search
                  </span>
                </div>

                <button className="flex h-10 items-center gap-2 rounded-lg border border-border-light bg-white px-3 text-sm font-medium text-[#0d121b] hover:bg-gray-50">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                  Lọc
                </button>
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-border-light bg-surface-light shadow-sm">
              <div className="border-b border-border-light px-6">
                <div className="flex gap-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setOrderTab(tab.key)}
                      className={`relative border-b-[3px] py-4 text-sm font-medium transition-colors ${
                        orderTab === tab.key
                          ? "border-primary text-primary"
                          : "border-transparent text-[#4c669a] hover:text-primary"
                      }`}
                    >
                      {tab.label}
                      {tab.key === "all" || tab.count > 0 ? (
                        <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                          {tab.count}
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6 p-6">
                {loading ? (
                  <div className="py-16 text-center text-slate-400">
                    <span className="material-symbols-outlined mb-3 block animate-spin text-4xl">refresh</span>
                    Đang tải đơn hàng...
                  </div>
                ) : error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                    {error}
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-400">
                    Không có đơn hàng nào phù hợp.
                  </div>
                ) : (
                  filteredOrders.map((order) => {
                    const meta = getOrderStatus(order);
                    const firstItem = order.items[0];
                    const extraCount = Math.max(order.items.length - 1, 0);

                    return (
                      <div
                        key={order.id}
                        className={`group flex flex-col gap-4 rounded-xl border border-border-light bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md ${
                          meta.tab === "cancelled" ? "opacity-80 hover:opacity-100" : ""
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-gray-200 pb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold text-primary">
                                ĐƠN HÀNG
                              </span>
                              <span className={`font-bold ${meta.tab === "cancelled" ? "text-gray-500" : "text-[#0d121b]"}`}>
                                #{order.id}
                              </span>
                            </div>
                            <div className="text-sm text-[#4c669a]">|</div>
                            <div className="text-sm text-[#4c669a]">
                              Đặt ngày: {formatDateTime(order.createdAt)}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`material-symbols-outlined text-[20px] ${meta.iconClass || "text-slate-400"}`}>
                              {meta.icon || "inventory_2"}
                            </span>
                            <span className={`text-sm font-bold ${meta.textClass || "text-slate-500"}`}>
                              {meta.label}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 justify-between sm:flex-row sm:items-center">
                          <div className="flex flex-1 items-start gap-4">
                            {order.items.length > 1 ? (
                              <div className="flex -space-x-4">
                                {order.items.slice(0, 2).map((item, index) => (
                                  <div
                                    key={`${item.id}-${index}`}
                                    className={`relative size-20 shrink-0 overflow-hidden rounded-lg border-2 border-white bg-gray-50 shadow-sm ${index === 0 ? "z-10" : "z-0"}`}
                                  >
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className={`h-full w-full object-cover ${meta.tab === "cancelled" ? "grayscale" : ""}`}
                                      onError={(e) => {
                                        e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className={`relative size-20 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 ${meta.tab === "cancelled" ? "grayscale" : ""}`}>
                                <img
                                  src={firstItem?.image}
                                  alt={firstItem?.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                                  }}
                                />
                              </div>
                            )}

                            <div className="flex flex-col gap-1">
                              <h4 className={`line-clamp-1 font-bold ${meta.tab === "cancelled" ? "text-gray-600" : "text-[#0d121b]"}`}>
                                {firstItem?.name || "Sản phẩm"}
                              </h4>
                              <p className="text-sm text-[#4c669a]">
                                Phân loại: {firstItem?.type || "Sản phẩm"}
                                {extraCount > 0 ? ` + ${extraCount} sản phẩm khác` : ""}
                              </p>
                              <p className="text-sm text-[#4c669a]">
                                Số lượng: x{order.items.reduce((sum, item) => sum + Number(item.quantity || 1), 0)}
                              </p>
                            </div>
                          </div>

                          <div className="min-w-[140px] flex flex-col items-end gap-1 sm:border-l sm:border-gray-100 sm:pl-6">
                            <span className="text-sm text-[#4c669a]">Tổng tiền</span>
                            <span className={`text-xl font-bold ${meta.tab === "cancelled" ? "text-gray-500 line-through" : "text-primary"}`}>
                              {formatMoney(order.amount)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                          {meta.tab === "completed" ? (
                            <>
                              <button className="text-sm font-medium text-primary hover:underline">
                                Mua lại
                              </button>
                              <div className="h-4 w-[1px] bg-gray-300" />
                              <button
                                type="button"
                                onClick={() => setSelectedOrder(order)}
                                className="rounded-lg border border-border-light bg-white px-4 py-2 text-sm font-medium text-[#0d121b] transition-colors hover:bg-gray-50"
                              >
                                Xem chi tiết
                              </button>
                              <button className="flex items-center gap-2 rounded-lg bg-secondary/10 px-4 py-2 text-sm font-bold text-yellow-700 transition-colors hover:bg-secondary/20">
                                <span className="material-symbols-outlined text-[18px]">star</span>
                                Đánh giá
                              </button>
                            </>
                          ) : meta.tab === "cancelled" ? (
                            <button className="rounded-lg border border-border-light bg-white px-4 py-2 text-sm font-medium text-[#0d121b] transition-colors hover:bg-gray-50">
                              Mua lại
                            </button>
                          ) : (
                            <>
                              <button className="rounded-lg px-4 py-2 text-sm font-medium text-[#4c669a] hover:bg-gray-50 hover:text-[#0d121b]">
                                Liên hệ hỗ trợ
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedOrder(order)}
                                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark"
                              >
                                Xem chi tiết
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

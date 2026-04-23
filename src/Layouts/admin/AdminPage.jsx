import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { fetchQuizStatistics, fetchQuizzes } from "./api/apiquiz";
const BASE_URL = import.meta.env.VITE_API_URL;

const API = `${BASE_URL}/api`;
const REPORT_RANGES = [
  { value: "7d", label: "7 ng�y", days: 7 },
  { value: "1m", label: "1 th�ng", days: 30 },
  { value: "6m", label: "6 th�ng", days: 180 },
  { value: "1y", label: "1 nam", days: 365 },
];
const SNAPSHOT_DAYS = 30;
const CHART_DAYS = 180;

const money = (v) => `${Number(v || 0).toLocaleString("vi-VN")}d`;

const parseDate = (v) => {
  const d = v ? new Date(v) : null;
  return d && !Number.isNaN(d.getTime()) ? d : null;
};

const fmtDate = (v) => {
  const d = parseDate(v);
  return d
    ? d.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";
};

const inRange = (v, days) => {
  const d = parseDate(v);
  if (!d) return false;
  const diff = Date.now() - d.getTime();
  return diff >= 0 && diff <= days * 86400000;
};

const itemAmount = (item) =>
  Number(
    item.finalPrice ||
      item.price ||
      item.unitPrice ||
      item.discountPrice ||
      item.amount ||
      0
  ) * Number(item.quantity || item.qty || 1);

const tone = (type) =>
  type === "BOOK"
    ? {
        label: "S�ch",
        pill: "bg-amber-50 text-amber-700 border-amber-100",
        iconWrap: "bg-amber-100",
        icon: "text-amber-600",
        progress: "bg-amber-500",
      }
    : type === "COMBO"
      ? {
          label: "Combo",
          pill: "bg-violet-50 text-violet-700 border-violet-100",
          iconWrap: "bg-violet-100",
          icon: "text-violet-600",
          progress: "bg-violet-500",
        }
      : {
          label: "Kh�a h?c",
          pill: "bg-blue-50 text-blue-700 border-blue-100",
          iconWrap: "bg-blue-100",
          icon: "text-blue-600",
          progress: "bg-blue-500",
        };

function sumByType(orders) {
  const totals = { COURSE: 0, BOOK: 0, COMBO: 0 };
  orders.forEach((order) => {
    const items = order.items || [];
    if (!items.length) return;
    const byItem = items.reduce((s, i) => s + itemAmount(i), 0);
    if (byItem > 0) {
      items.forEach((i) => {
        const key = totals[i.type] != null ? i.type : "COMBO";
        totals[key] += itemAmount(i);
      });
      return;
    }
    const split = Number(order.amount || 0) / items.length;
    items.forEach((i) => {
      const key = totals[i.type] != null ? i.type : "COMBO";
      totals[key] += split;
    });
  });
  return ["COURSE", "BOOK", "COMBO"].map((key) => ({
    key,
    amount: totals[key],
    ...tone(key),
  }));
}

function countUnitsByType(orders, type) {
  return orders.reduce(
    (sum, order) =>
      sum +
      (order.items || []).reduce(
        (itemSum, item) =>
          itemSum +
          (item.type === type ? Number(item.quantity || item.qty || 1) : 0),
        0
      ),
    0
  );
}

function chartSeries(orders) {
  const filtered = [...orders]
    .filter((o) => parseDate(o.createdAt))
    .sort((a, b) => parseDate(a.createdAt) - parseDate(b.createdAt));
  if (!filtered.length) return [];

  const map = new Map();
  filtered.forEach((o) => {
    const d = parseDate(o.createdAt);
    const k = `${d.getFullYear()}-${d.getMonth() + 1}`;
    if (!map.has(k)) {
      map.set(k, {
        key: k,
        label: `Thg ${d.getMonth() + 1}`,
        COURSE: 0,
        BOOK: 0,
      });
    }
    const row = map.get(k);
    const s = sumByType([o]);
    row.COURSE += s.find((x) => x.key === "COURSE")?.amount || 0;
    row.BOOK += s.find((x) => x.key === "BOOK")?.amount || 0;
  });
  return [...map.values()].slice(-6);
}

function exportCsv(rangeLabel, orders, quizzes, typeRevenue) {
  const rows = [
    ["B�o c�o dashboard", rangeLabel],
    ["Xu?t l�c", new Date().toLocaleString("vi-VN")],
    [],
    ["T?ng doanh thu", orders.reduce((s, o) => s + Number(o.amount || 0), 0)],
    ["Doanh thu kh�a h?c", typeRevenue.find((x) => x.key === "COURSE")?.amount || 0],
    ["Doanh thu s�ch", typeRevenue.find((x) => x.key === "BOOK")?.amount || 0],
    ["Doanh thu combo", typeRevenue.find((x) => x.key === "COMBO")?.amount || 0],
    [],
    ["�on h�ng"],
    ["M� don", "H?c vi�n", "Gi� tr?", "Tr?ng th�i", "Ng�y t?o"],
    ...orders.map((o) => [o.id, o.customer, o.amount, o.status, fmtDate(o.createdAt)]),
    [],
    ["�? thi"],
    ["Ti�u d?", "HSK", "Tr?ng th�i", "S? c�u", "Lu?t l�m"],
    ...quizzes.map((q) => [q.title, q.hsklevel || "--", q.status || "--", q.totalQuestions || 0, q.playCount || 0]),
  ];

  const csv = rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bao-cao-${rangeLabel.replace(/\s+/g, "-")}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function Card({ icon, label, value, delta, toneData, footer }) {
  const hasDelta = typeof delta === "number" && Number.isFinite(delta);
  const up = hasDelta ? delta >= 0 : true;

  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${toneData.iconWrap}`}>
          <span className={`material-symbols-outlined text-[22px] ${toneData.icon}`}>{icon}</span>
        </div>
        {hasDelta ? (
          <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            <span className="material-symbols-outlined text-xs">{up ? "trending_up" : "trending_down"}</span>
            {`${up ? "+" : ""}${delta.toFixed(1)}%`}
          </div>
        ) : (
          <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">To�n th?i gian</div>
        )}
      </div>

      <div className="space-y-3">
        <p className="min-h-[32px] text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <h3 className="text-[40px] font-black leading-none text-slate-900">{value}</h3>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 px-3 py-3">
        <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-semibold text-slate-400">
          <span className="truncate">{footer.left}</span>
          <span className="shrink-0">{footer.right}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white">
          <div className={`h-full rounded-full ${toneData.progress}`} style={{ width: footer.progress }} />
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [showNoti, setShowNoti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [dashboard, setDashboard] = useState({ quizStats: null, quizzes: [], courses: [], orders: [] });
  const notiRef = useRef(null);
  const exportRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const onMouseDown = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) setShowNoti(false);
      if (exportRef.current && !exportRef.current.contains(e.target)) setShowExportMenu(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
        const [quizStatsRes, quizListRes, courseRes, orderRes] = await Promise.all([
          fetchQuizStatistics(),
          fetchQuizzes({ search: "", status: null, hsk: null, sortBy: "newest" }),
          fetch(`${API}/admin/courses`, { headers }).then((r) => r.json()),
          fetch(`${API}/admin/orders`, { headers }).then((r) => r.json()),
        ]);
        setDashboard({
          quizStats: quizStatsRes?.data || null,
          quizzes: quizListRes?.data?.data || [],
          courses: Array.isArray(courseRes) ? courseRes : courseRes?.data || [],
          orders: Array.isArray(orderRes) ? orderRes : orderRes?.data || [],
        });
      } catch (err) {
        console.error(err);
        setError("Kh�ng t?i du?c d? li?u dashboard.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const orders = useMemo(() => (dashboard.orders || []).map((o, i) => ({
    id: o.orderCode || o.id || `OD-${i + 1}`,
    customer: o.username || o.fullName || o.customerName || "H?c vi�n",
    amount: Number(o.totalAmount || o.amount || 0),
    status: o.status || "PENDING",
    createdAt: o.createdAt || o.created_at || "",
    items: (o.orderItems || o.items || []).map((item) => ({
      type: item.itemType || item.type || "OTHER",
      name: item.course?.title || item.book?.title || item.combo?.name || item.name || "S?n ph?m",
      quantity: item.quantity || item.qty || 1,
      finalPrice: item.finalPrice || item.price || item.unitPrice || item.discountPrice || item.amount || 0,
    })),
  })), [dashboard.orders]);

  const snapshotCourses = (dashboard.courses || []).filter((c) => inRange(c.createdAt || c.created_at, SNAPSHOT_DAYS));
  const chartOrders = orders.filter((o) => inRange(o.createdAt, CHART_DAYS));

  const totalRevenue = orders.reduce((s, o) => s + o.amount, 0);
  const typeRevenue = useMemo(() => sumByType(orders), [orders]);
  const totalCourseUnits = useMemo(() => countUnitsByType(orders, "COURSE"), [orders]);
  const totalBookUnits = useMemo(() => countUnitsByType(orders, "BOOK"), [orders]);
  const totalCustomers = useMemo(() => new Set(orders.map((o) => o.customer).filter(Boolean)).size, [orders]);
  const totalPaidOrders = useMemo(() => orders.filter((o) => o.status === "PAID").length, [orders]);

  const courseRevenue = typeRevenue.find((x) => x.key === "COURSE")?.amount || 0;
  const bookRevenue = typeRevenue.find((x) => x.key === "BOOK")?.amount || 0;
  const comboRevenue = typeRevenue.find((x) => x.key === "COMBO")?.amount || 0;
  const totalSalesRevenue = courseRevenue + bookRevenue + comboRevenue;
  const courseShare = totalSalesRevenue > 0 ? (courseRevenue / totalSalesRevenue) * 100 : 0;
  const bookShare = totalSalesRevenue > 0 ? (bookRevenue / totalSalesRevenue) * 100 : 0;
  const comboShare = totalSalesRevenue > 0 ? (comboRevenue / totalSalesRevenue) * 100 : 0;
  const graph = useMemo(() => chartSeries(chartOrders), [chartOrders]);
  const maxGraph = Math.max(...graph.flatMap((i) => [i.COURSE, i.BOOK]), 0);
  const recentOrders = [...orders].sort((a, b) => (parseDate(b.createdAt)?.getTime() || 0) - (parseDate(a.createdAt)?.getTime() || 0)).slice(0, 5);
  const recentQuizzes = [...(dashboard.quizzes || [])].sort((a, b) => (parseDate(b.createdAt)?.getTime() || 0) - (parseDate(a.createdAt)?.getTime() || 0)).slice(0, 2);
  const recentCourseOrders = recentOrders.filter((order) => order.items.some((item) => item.type === "COURSE"));
  const recentBookOrders = recentOrders.filter((order) => order.items.some((item) => item.type === "BOOK"));
  const notificationItems = [
    ...recentOrders.slice(0, 2).map((o, index) => ({
      id: `order-${o.id}-${index}`,
      icon: "shopping_bag",
      iconWrap: "bg-blue-100 text-blue-600",
      title: `�on h�ng m?i ${o.id}`,
      desc: `${o.customer} v?a t?o don tr? gi� ${money(o.amount)}.`,
      time: fmtDate(o.createdAt),
      unread: index === 0,
    })),
    ...recentQuizzes.slice(0, 1).map((q) => ({
      id: `quiz-${q.quizId || q.id || q.title}`,
      icon: "quiz",
      iconWrap: "bg-violet-100 text-violet-600",
      title: `�? thi ${q.title} v?a c?p nh?t`,
      desc: `Quiz HSK ${q.hsklevel || "--"} hi?n c� ${q.totalQuestions || 0} c�u. Ki?m tra ph?n h?i h?c vi�n n?u c?n.`,
      time: fmtDate(q.createdAt),
      unread: false,
    })),
    {
      id: "course-review-watch",
      icon: "star",
      iconWrap: "bg-amber-100 text-amber-600",
      title: "��nh gi� kh�a h?c c?n theo d�i",
      desc: recentCourseOrders.length
        ? `${recentCourseOrders.length} don kh�a h?c g?n d�y. Uu ti�n ki?m tra d�nh gi� m?i c?a h?c vi�n ? trang course.`
        : "Chua c� API d�nh gi� kh�a h?c ri�ng. Khi backend b? sung, m?c n�y s? hi?n th? review m?i t? d?ng.",
      time: recentCourseOrders[0] ? fmtDate(recentCourseOrders[0].createdAt) : "H�m nay",
      unread: recentCourseOrders.length > 0,
    },
    {
      id: "product-feedback-watch",
      icon: "chat",
      iconWrap: "bg-emerald-100 text-emerald-600",
      title: "Ph?n h?i s?n ph?m c?n theo d�i",
      desc: recentBookOrders.length
        ? `${recentBookOrders.length} don s�ch g?n d�y. Ki?m tra ph?n h?i v� b�nh lu?n c?a kh�ch ? trang product.`
        : "Chua c� ph?n h?i s?n ph?m m?i ho?c backend chua tr? feed ph?n h?i ri�ng.",
      time: recentBookOrders[0] ? fmtDate(recentBookOrders[0].createdAt) : "H�m nay",
      unread: recentBookOrders.length > 0,
    },
    {
      id: "quiz-plays",
      icon: "insights",
      iconWrap: "bg-slate-200 text-slate-700",
      title: "T�m t?t ho?t d?ng quiz",
      desc: `${dashboard.quizStats?.totalPlays || 0} lu?t l�m quiz hi?n c� trong h? th?ng.`,
      time: "T?c th?i",
      unread: false,
    },
  ];
  const unreadNotifications = notificationItems.filter((item) => item.unread).length;
  const feed = [
    ...recentOrders.slice(0, 3).map((o) => ({ time: fmtDate(o.createdAt), title: `�on h�ng ${o.id}`, desc: `${o.customer} v?a t?o don gi� tr? ${money(o.amount)}.`, tone: "bg-primary" })),
    ...recentQuizzes.map((q) => ({ time: fmtDate(q.createdAt), title: q.title, desc: `Quiz HSK ${q.hsklevel || "--"} ???c c?p nh?t v?i ${q.totalQuestions || 0} c�u.`, tone: "bg-amber-400" })),
    snapshotCourses[0] ? { time: fmtDate(snapshotCourses[0].createdAt || snapshotCourses[0].created_at), title: snapshotCourses[0].title || "Kh�a h?c m?i", desc: `�� ghi nh?n ${snapshotCourses.length} kh�a h?c m?i trong h? th?ng.`, tone: "bg-emerald-500" } : null,
  ].filter(Boolean);
  const suggestion = (() => {
    const top = [...typeRevenue].sort((a, b) => b.amount - a.amount)[0];
    if (!top || top.amount <= 0) return "Chua c� d? li?u doanh thu mua h�ng th?c t? d? dua ra g?i � trong l�c n�y.";
    if (top.key === "BOOK") return "Doanh thu s�ch dang d?n d?u. B?n c� th? d?y m?nh combo s�ch + d? thi th? d? tang gi� tr? don h�ng.";
    if (top.key === "COURSE") return "Kh�a h?c dang l� nh�m b�n t?t nh?t. N�n k?t h?p qu� t?ng s�ch ho?c workbook d? tang t? l? ch?t don.";
    return "Combo dang ho?t d?ng hi?u qu?. B?n c� th? m? r?ng th�m g�i combo HSK c?p d? cao hon.";
  })();
  const handleExport = (range) => {
    const reportOrders = orders.filter((o) => inRange(o.createdAt, range.days));
    const reportQuizzes = (dashboard.quizzes || []).filter((q) => inRange(q.createdAt, range.days));
    exportCsv(range.label, reportOrders, reportQuizzes, sumByType(reportOrders));
    setShowExportMenu(false);
  };

  if (loading) {
    return <div className="flex min-h-screen overflow-hidden"><AdminSidebar /><main className="flex min-w-0 flex-1 items-center justify-center bg-slate-50 px-4"><div className="text-center"><div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-primary" /><p className="text-sm font-semibold text-slate-600">�ang t?i dashboard...</p></div></main></div>;
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />
      <main className="flex min-w-0 flex-1 overflow-hidden bg-slate-100">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="z-10 flex min-h-20 flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="flex w-full flex-1 items-center gap-4">
              <div className="group relative w-full max-w-lg">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary">search</span>
                <input type="text" placeholder="T�m ki?m h?c vi�n, don h�ng, kh�a h?c..." className="w-full rounded-2xl border border-transparent bg-slate-100 py-3 pl-12 pr-4 text-sm transition-all focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5" />
              </div>
            </div>
            <div className="flex w-full items-center justify-end gap-3 sm:gap-4 lg:w-auto lg:gap-8">
              <div className="relative" ref={notiRef}>
                <button
                  type="button"
                  onClick={() => setShowNoti((v) => !v)}
                  className="relative flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition-all hover:bg-primary hover:text-white"
                >
                  <span className="material-symbols-outlined text-[22px]">notifications</span>
                  {unreadNotifications > 0 ? (
                    <span className="absolute -right-1 -top-1 inline-flex min-w-[22px] items-center justify-center rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-black text-white">
                      {unreadNotifications}
                    </span>
                  ) : null}
                </button>

                {showNoti ? (
                  <div className="absolute right-0 top-16 z-50 w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl">
                    <div className="border-b border-slate-100 px-5 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-black text-slate-900">Th�ng b�o qu?n tr?</p>
                          <p className="mt-1 text-xs font-medium text-slate-500">Theo d�i don m?i, ph?n h?i kh�ch h�ng v� d�nh gi� kh�a h?c.</p>
                        </div>
                        <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                          {notificationItems.length} m?c
                        </div>
                      </div>
                    </div>

                    <div className="max-h-[420px] overflow-y-auto px-3 py-3">
                      {notificationItems.map((item) => (
                        <div key={item.id} className="mb-2 rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-3 last:mb-0">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl ${item.iconWrap}`}>
                              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <p className="text-sm font-bold leading-5 text-slate-900">{item.title}</p>
                                {item.unread ? <span className="mt-1 size-2 shrink-0 rounded-full bg-rose-500" /> : null}
                              </div>
                              <p className="mt-1 text-xs leading-5 text-slate-500">{item.desc}</p>
                              <p className="mt-2 text-[11px] font-semibold text-slate-400">{item.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="group hidden cursor-pointer items-center gap-2 rounded-full bg-slate-100 px-4 py-2 transition-all hover:bg-primary hover:text-white sm:flex"><span className="material-symbols-outlined text-xl text-primary group-hover:text-white">language</span><span className="text-xs font-bold">VI / EN</span></div>
              <div className="hidden h-10 w-px bg-slate-200 lg:block" />
              <div className="flex cursor-pointer items-center gap-3"><div className="text-right"><p className="text-sm font-bold text-slate-900">Admin TOXI</p><p className="text-[11px] font-medium text-slate-500">Super Admin</p></div><span className="material-symbols-outlined text-slate-400">expand_more</span></div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">T?ng quan h? th?ng</h2>
                <div className="mt-2 flex items-center gap-2"><span className="size-2 animate-pulse rounded-full bg-green-500" /><p className="text-sm font-medium text-slate-500">{error || `H? th?ng ?ang ho?t ??ng ?n ??nh. ${orders.length} don h�ng, ${totalCourseUnits} kh�a h?c v� ${totalBookUnits} s�ch d� du?c ghi nh?n.`}</p></div>
              </div>
              <div className="flex w-full gap-4 sm:w-auto">
                <div className="relative" ref={exportRef}>
                  <button type="button" onClick={() => setShowExportMenu((v) => !v)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 sm:w-auto sm:px-6"><span className="material-symbols-outlined text-xl">download</span>Xu?t b�o c�o<span className="material-symbols-outlined text-base">expand_more</span></button>
                  {showExportMenu ? <div className="absolute right-0 top-14 z-40 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">{REPORT_RANGES.map((range) => <button key={range.value} type="button" onClick={() => handleExport(range)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"><span>B�o c�o {range.label}</span><span className="material-symbols-outlined text-base text-slate-400">download</span></button>)}</div> : null}
                </div>
              </div>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              <Card icon="payments" label="T?ng doanh thu" value={money(totalRevenue)} delta={null} toneData={{ iconWrap: "bg-primary/10", icon: "text-primary", progress: "bg-primary" }} footer={{ left: "To�n th?i gian", right: `${orders.length} don`, progress: "100%" }} />
              <Card icon="school" label="Doanh thu kh�a h?c" value={money(courseRevenue)} delta={null} toneData={tone("COURSE")} footer={{ left: "T?ng kh�a h?c d� b�n", right: `${totalCourseUnits} kh�a h?c`, progress: `${Math.max(courseShare, totalSalesRevenue > 0 ? 8 : 0)}%` }} />
              <Card icon="auto_stories" label="Doanh thu s�ch" value={money(bookRevenue)} delta={null} toneData={tone("BOOK")} footer={{ left: "T?ng s�ch d� b�n", right: `${totalBookUnits} quy?n`, progress: `${Math.max(bookShare, totalSalesRevenue > 0 ? 8 : 0)}%` }} />
              <Card icon="person_add" label="T?ng h?c vi�n" value={totalCustomers} delta={null} toneData={{ iconWrap: "bg-emerald-100", icon: "text-emerald-600", progress: "bg-emerald-500" }} footer={{ left: "Kh�ch h�ng d� mua", right: `${totalPaidOrders} don`, progress: `${Math.max(comboShare || Math.min(totalCustomers * 5, 100), totalPaidOrders > 0 ? 8 : 0)}%` }} />
            </div>

            <div className="mb-10 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6 lg:p-10">
              <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-5"><div className="flex size-14 items-center justify-center rounded-2xl bg-primary/5"><span className="material-symbols-outlined text-3xl text-primary">analytics</span></div><div><h3 className="text-2xl font-bold text-slate-900">So s�nh doanh thu</h3><p className="mt-1 text-sm font-medium text-slate-500">T? tr?ng gi?a kh�a h?c v� s�ch trong 6 th�ng g?n d�y</p></div></div>
                <div className="flex gap-4 rounded-2xl bg-slate-50 p-1.5"><div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-sm"><div className="size-3.5 rounded-full bg-gradient-to-b from-blue-600 to-sky-400" /><span className="text-xs font-bold text-slate-700">Doanh thu kh�a h?c</span></div><div className="flex items-center gap-2.5 px-4 py-2"><div className="size-3.5 rounded-full bg-gradient-to-b from-amber-500 to-yellow-300" /><span className="text-xs font-bold text-slate-500">S�ch v� s?n ph?m</span></div></div>
              </div>
              {graph.length === 0 || maxGraph === 0 ? (
                <div className="mt-8 flex h-[260px] items-center justify-center rounded-3xl bg-slate-50 text-sm font-semibold text-slate-400">Chua c� d? li?u doanh thu trong kho?ng th?i gian n�y.</div>
              ) : (
                <div className="relative mt-8 h-[320px] w-full sm:h-[360px] lg:h-[400px]">
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">{[100, 75, 50, 25, 0].map((l) => <div key={l} className="relative h-px w-full border-t border-slate-100"><span className="absolute -left-10 -top-2 text-[10px] font-bold text-slate-400">{l}%</span></div>)}</div>
                  <div className="absolute inset-0 flex items-end justify-around gap-4 px-2">
                    {graph.map((g) => {
                      const cH = `${Math.max((g.COURSE / maxGraph) * 100, g.COURSE > 0 ? 8 : 0)}%`;
                      const bH = `${Math.max((g.BOOK / maxGraph) * 100, g.BOOK > 0 ? 8 : 0)}%`;
                      return (
                        <div key={g.key} className="flex h-full max-w-[88px] flex-1 flex-col items-center justify-end">
                          <div className="flex w-full items-end justify-center gap-2">
                            <div className="group relative w-1/3"><div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-[10px] font-bold text-white group-hover:block">{money(g.COURSE)}</div><div className="w-full rounded-t-xl bg-gradient-to-b from-blue-600 to-sky-400 shadow-xl shadow-blue-500/15 transition-all duration-500 group-hover:scale-y-105" style={{ height: cH }} /></div>
                            <div className="group relative w-1/3"><div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-amber-500 px-2 py-1 text-[10px] font-bold text-white group-hover:block">{money(g.BOOK)}</div><div className="w-full rounded-t-xl bg-gradient-to-b from-amber-500 to-yellow-300 shadow-xl shadow-amber-500/15 transition-all duration-500 group-hover:scale-y-105" style={{ height: bH }} /></div>
                          </div>
                          <span className="mt-6 text-[11px] font-bold uppercase tracking-wider text-slate-500">{g.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-10 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-50 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8"><div><h3 className="text-xl font-bold text-slate-900">�on h�ng v� dang k� g?n d�y</h3><p className="mt-1 text-sm font-medium text-slate-500">Theo d�i c�c giao d?ch m?i nh?t trong h? th?ng</p></div><Link to="/admin/orders" className="inline-flex w-full items-center justify-center rounded-xl bg-slate-50 px-6 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white sm:w-auto">Xem t?t c?</Link></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left text-sm">
                  <thead className="bg-slate-50/60 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400"><tr><th className="px-8 py-5">M� don</th><th className="px-8 py-5">H?c vi�n</th><th className="px-8 py-5">Lo?i h�nh</th><th className="px-8 py-5">S?n ph?m</th><th className="px-8 py-5 text-right">Gi� tr?</th><th className="px-8 py-5 text-center">Tr?ng th�i</th></tr></thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentOrders.length === 0 ? <tr><td colSpan={6} className="px-8 py-10 text-center text-sm text-slate-400">Chua c� don h�ng d? hi?n th?.</td></tr> : recentOrders.map((o) => {
                      const t = tone(o.items[0]?.type === "BOOK" ? "BOOK" : o.items[0]?.type === "COMBO" ? "COMBO" : "COURSE");
                      return <tr key={o.id} className="cursor-pointer transition-all hover:bg-slate-50/80"><td className="px-8 py-5 font-mono text-xs font-bold text-primary">#{o.id}</td><td className="px-8 py-5 font-bold text-slate-700">{o.customer}</td><td className="px-8 py-5"><span className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase ${t.pill}`}>{t.label}</span></td><td className="px-8 py-5 font-medium text-slate-600">{o.items.map((i) => i.name).join(", ") || "--"}</td><td className="px-8 py-5 text-right font-extrabold text-slate-900">{money(o.amount)}</td><td className="px-8 py-5"><div className="flex justify-center"><span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase text-slate-600">{o.status}</span></div></td></tr>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <aside className="hidden w-[360px] border-l border-slate-200 bg-white 2xl:flex 2xl:flex-col">
          <div className="border-b border-slate-100 p-8">
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">Ho?t ??ng h? th?ng</h3>
            <p className="mt-1 text-sm font-medium text-slate-500">C?p nh?t tr?c ti?p t? d? li?u hi?n c�</p>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-4">
              {feed.length === 0 ? (
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-400">Chua c� ho?t d?ng n�o trong kho?ng th?i gian n�y.</div>
              ) : (
                feed.map((f, i) => (
                  <div key={`${f.title}-${i}`} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-start gap-3">
                      <div className={`mt-1 h-3 w-3 rounded-full ${f.tone}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{f.time}</p>
                        <p className="mt-1 text-lg font-bold leading-tight text-slate-900">{f.title}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">{f.desc}</p>
                  </div>
                ))
              )}
            </div>

            <div className="relative mt-8 overflow-hidden rounded-3xl border border-primary/10 bg-primary/5 p-8">
              <div className="absolute -right-6 -top-6 opacity-5"><span className="material-symbols-outlined text-[100px] text-primary">psychology</span></div>
              <div className="mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-xl text-primary">auto_awesome</span><h4 className="text-sm font-bold uppercase tracking-wider text-primary">L?i khuy�n AI</h4></div>
              <p className="text-sm leading-7 text-slate-600">{suggestion}</p>
              <button className="mt-6 w-full rounded-xl bg-primary py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:brightness-110">�p d?ng ngay</button>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Ch? s? nhanh</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">T?ng lu?t l�m quiz</span><span className="font-black text-slate-900">{dashboard.quizStats?.totalPlays || 0}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">�? thi c�ng khai</span><span className="font-black text-slate-900">{dashboard.quizStats?.activeQuizzes || 0}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">T?ng kh�a h?c d� b�n</span><span className="font-black text-slate-900">{totalCourseUnits}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">T?ng s�ch d� b�n</span><span className="font-black text-slate-900">{totalBookUnits}</span></div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

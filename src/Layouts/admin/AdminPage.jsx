import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { fetchQuizStatistics, fetchQuizzes } from "./api/apiquiz";

const API = "http://localhost:8080/api";
const REPORT_RANGES = [
  { value: "7d", label: "7 ngay", days: 7 },
  { value: "1m", label: "1 thang", days: 30 },
  { value: "6m", label: "6 thang", days: 180 },
  { value: "1y", label: "1 nam", days: 365 },
];
const SNAPSHOT_DAYS = 30;
const CHART_DAYS = 180;

const money = (v) => `${Number(v || 0).toLocaleString("vi-VN")}đ`;
const parseDate = (v) => {
  const d = v ? new Date(v) : null;
  return d && !Number.isNaN(d.getTime()) ? d : null;
};
const fmtDate = (v) => {
  const d = parseDate(v);
  return d
    ? d.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : "--";
};
const inRange = (v, days) => {
  const d = parseDate(v);
  if (!d) return false;
  const diff = Date.now() - d.getTime();
  return diff >= 0 && diff <= days * 86400000;
};
const itemAmount = (item) => Number(item.finalPrice || item.price || item.unitPrice || item.discountPrice || item.amount || 0) * Number(item.quantity || item.qty || 1);
const tone = (type) =>
  type === "BOOK"
    ? { label: "Sach", pill: "bg-amber-50 text-amber-700 border-amber-100", bar: "from-amber-500 to-yellow-300", iconWrap: "bg-amber-100", icon: "text-amber-600", progress: "bg-amber-500" }
    : type === "COMBO"
      ? { label: "Combo", pill: "bg-violet-50 text-violet-700 border-violet-100", bar: "from-violet-600 to-fuchsia-400", iconWrap: "bg-violet-100", icon: "text-violet-600", progress: "bg-violet-500" }
      : { label: "Khoa hoc", pill: "bg-blue-50 text-blue-700 border-blue-100", bar: "from-blue-600 to-sky-400", iconWrap: "bg-blue-100", icon: "text-blue-600", progress: "bg-blue-500" };

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
  return ["COURSE", "BOOK", "COMBO"].map((key) => ({ key, amount: totals[key], ...tone(key) }));
}

function countUnitsByType(orders, type) {
  return orders.reduce((sum, order) => (
    sum + (order.items || []).reduce((itemSum, item) => (
      itemSum + ((item.type === type ? Number(item.quantity || item.qty || 1) : 0))
    ), 0)
  ), 0);
}

function chartSeries(orders, range) {
  const filtered = [...orders].filter((o) => parseDate(o.createdAt)).sort((a, b) => parseDate(a.createdAt) - parseDate(b.createdAt));
  if (!filtered.length) return [];
  if (range === "7d") {
    const map = new Map();
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      map.set(d.toISOString().slice(0, 10), { key: d.toISOString().slice(0, 10), label: d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }), COURSE: 0, BOOK: 0 });
    }
    filtered.forEach((o) => {
      const k = parseDate(o.createdAt).toISOString().slice(0, 10);
      if (!map.has(k)) return;
      const row = map.get(k);
      const s = sumByType([o]);
      row.COURSE += s.find((x) => x.key === "COURSE")?.amount || 0;
      row.BOOK += s.find((x) => x.key === "BOOK")?.amount || 0;
    });
    return [...map.values()];
  }
  const map = new Map();
  filtered.forEach((o) => {
    const d = parseDate(o.createdAt);
    const k = `${d.getFullYear()}-${d.getMonth() + 1}`;
    if (!map.has(k)) map.set(k, { key: k, label: `Thg ${d.getMonth() + 1}`, COURSE: 0, BOOK: 0 });
    const row = map.get(k);
    const s = sumByType([o]);
    row.COURSE += s.find((x) => x.key === "COURSE")?.amount || 0;
    row.BOOK += s.find((x) => x.key === "BOOK")?.amount || 0;
  });
  return [...map.values()].slice(-6);
}

function change(now, prev) {
  if (!prev) return 100;
  return ((now - prev) / prev) * 100;
}

function exportCsv(rangeLabel, orders, quizzes, typeRevenue) {
  const rows = [
    ["Bao cao dashboard", rangeLabel],
    ["Xuat luc", new Date().toLocaleString("vi-VN")],
    [],
    ["Tong doanh thu", orders.reduce((s, o) => s + Number(o.amount || 0), 0)],
    ["Doanh thu khoa hoc", typeRevenue.find((x) => x.key === "COURSE")?.amount || 0],
    ["Doanh thu sach", typeRevenue.find((x) => x.key === "BOOK")?.amount || 0],
    ["Doanh thu combo", typeRevenue.find((x) => x.key === "COMBO")?.amount || 0],
    [],
    ["Don hang"],
    ["Ma don", "Hoc vien", "Gia tri", "Trang thai", "Ngay tao"],
    ...orders.map((o) => [o.id, o.customer, o.amount, o.status, fmtDate(o.createdAt)]),
    [],
    ["De thi"],
    ["Tieu de", "HSK", "Trang thai", "So cau", "Luot lam"],
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
        {hasDelta ? <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          <span className="material-symbols-outlined text-xs">{up ? "trending_up" : "trending_down"}</span>
          {`${up ? "+" : ""}${delta.toFixed(1)}%`}
        </div> : <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">Toan thoi gian</div>}
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
        setError("Khong tai duoc du lieu dashboard.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const orders = useMemo(() => (dashboard.orders || []).map((o, i) => ({
    id: o.orderCode || o.id || `OD-${i + 1}`,
    customer: o.username || o.fullName || o.customerName || "Hoc vien",
    amount: Number(o.totalAmount || o.amount || 0),
    status: o.status || "PENDING",
    createdAt: o.createdAt || o.created_at || "",
    items: (o.orderItems || o.items || []).map((item) => ({
      type: item.itemType || item.type || "OTHER",
      name: item.course?.title || item.book?.title || item.combo?.name || item.name || "San pham",
      quantity: item.quantity || item.qty || 1,
      finalPrice: item.finalPrice || item.price || item.unitPrice || item.discountPrice || item.amount || 0,
    })),
  })), [dashboard.orders]);

  const snapshotOrders = orders.filter((o) => inRange(o.createdAt, SNAPSHOT_DAYS));
  const snapshotQuizzes = (dashboard.quizzes || []).filter((q) => inRange(q.createdAt, SNAPSHOT_DAYS));
  const snapshotCourses = (dashboard.courses || []).filter((c) => inRange(c.createdAt || c.created_at, SNAPSHOT_DAYS));
  const chartOrders = orders.filter((o) => inRange(o.createdAt, CHART_DAYS));
  const previousOrders = orders.filter((o) => {
    const d = parseDate(o.createdAt);
    if (!d) return false;
    const diff = Date.now() - d.getTime();
    const ms = SNAPSHOT_DAYS * 86400000;
    return diff > ms && diff <= ms * 2;
  });

  const totalRevenue = orders.reduce((s, o) => s + o.amount, 0);
  const typeRevenue = useMemo(() => sumByType(orders), [orders]);
  const totalCourseUnits = useMemo(() => countUnitsByType(orders, "COURSE"), [orders]);
  const totalBookUnits = useMemo(() => countUnitsByType(orders, "BOOK"), [orders]);
  const totalComboUnits = useMemo(() => countUnitsByType(orders, "COMBO"), [orders]);
  const totalCustomers = useMemo(() => new Set(orders.map((o) => o.customer).filter(Boolean)).size, [orders]);
  const totalPaidOrders = useMemo(() => orders.filter((o) => o.status === "PAID").length, [orders]);
  const courseRevenue = typeRevenue.find((x) => x.key === "COURSE")?.amount || 0;
  const bookRevenue = typeRevenue.find((x) => x.key === "BOOK")?.amount || 0;
  const comboRevenue = typeRevenue.find((x) => x.key === "COMBO")?.amount || 0;
  const totalSalesRevenue = courseRevenue + bookRevenue + comboRevenue;
  const courseShare = totalSalesRevenue > 0 ? (courseRevenue / totalSalesRevenue) * 100 : 0;
  const bookShare = totalSalesRevenue > 0 ? (bookRevenue / totalSalesRevenue) * 100 : 0;
  const comboShare = totalSalesRevenue > 0 ? (comboRevenue / totalSalesRevenue) * 100 : 0;
  const graph = useMemo(() => chartSeries(chartOrders, "6m"), [chartOrders]);
  const maxGraph = Math.max(...graph.flatMap((i) => [i.COURSE, i.BOOK]), 0);
  const recentOrders = [...orders].sort((a, b) => (parseDate(b.createdAt)?.getTime() || 0) - (parseDate(a.createdAt)?.getTime() || 0)).slice(0, 5);
  const recentQuizzes = [...(dashboard.quizzes || [])].sort((a, b) => (parseDate(b.createdAt)?.getTime() || 0) - (parseDate(a.createdAt)?.getTime() || 0)).slice(0, 2);
  const notifications = [
    recentOrders[0] ? `Don ${recentOrders[0].id} vua duoc tao` : null,
    recentQuizzes[0] ? `De thi ${recentQuizzes[0].title} vua cap nhat` : null,
    `${dashboard.quizStats?.totalPlays || 0} luot lam quiz hien co`,
  ].filter(Boolean);
  const feed = [
    ...recentOrders.slice(0, 3).map((o) => ({ time: fmtDate(o.createdAt), title: `Don hang ${o.id}`, desc: `${o.customer} vua tao don gia tri ${money(o.amount)}.`, tone: "bg-primary" })),
    ...recentQuizzes.map((q) => ({ time: fmtDate(q.createdAt), title: q.title, desc: `Quiz HSK ${q.hsklevel || "--"} duoc cap nhat voi ${q.totalQuestions || 0} cau.`, tone: "bg-amber-400" })),
    snapshotCourses[0] ? { time: fmtDate(snapshotCourses[0].createdAt || snapshotCourses[0].created_at), title: snapshotCourses[0].title || "Khoa hoc moi", desc: `Da ghi nhan ${snapshotCourses.length} khoa hoc moi trong 30 ngay gan day.`, tone: "bg-emerald-500" } : null,
  ].filter(Boolean);
  const suggestion = (() => {
    const top = [...typeRevenue].sort((a, b) => b.amount - a.amount)[0];
    if (!top || top.amount <= 0) return "Chua co du lieu doanh thu mua hang thuc te de dua ra goi y trong luc nay.";
    if (top.key === "BOOK") return "Doanh thu sach dang dan dau. Ban co the day manh combo sach + de thi thu de tang gia tri don hang.";
    if (top.key === "COURSE") return "Khoa hoc dang la nhom ban tot nhat. Nen ket hop qua tang sach hoac workbook de tang ty le chot don.";
    return "Combo dang hoat dong hieu qua. Ban co the mo rong them goi combo HSK cap do cao hon.";
  })();
  const handleExport = (range) => {
    const reportOrders = orders.filter((o) => inRange(o.createdAt, range.days));
    const reportQuizzes = (dashboard.quizzes || []).filter((q) => inRange(q.createdAt, range.days));
    exportCsv(range.label, reportOrders, reportQuizzes, sumByType(reportOrders));
    setShowExportMenu(false);
  };

  if (loading) {
    return <div className="flex h-screen overflow-hidden"><AdminSidebar /><main className="flex flex-1 items-center justify-center bg-slate-50"><div className="text-center"><div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-primary" /><p className="text-sm font-semibold text-slate-600">Dang tai dashboard...</p></div></main></div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />
      <main className="flex flex-1 overflow-hidden bg-slate-100">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-10 shadow-sm">
            <div className="flex flex-1 items-center gap-4">
              <div className="group relative w-full max-w-lg">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary">search</span>
                <input type="text" placeholder="Tim kiem hoc vien, don hang, khoa hoc..." className="w-full rounded-2xl border border-transparent bg-slate-100 py-3 pl-12 pr-4 text-sm transition-all focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5" />
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="group flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 px-4 py-2 transition-all hover:bg-primary hover:text-white"><span className="material-symbols-outlined text-xl text-primary group-hover:text-white">language</span><span className="text-xs font-bold">VI / 中</span></div>
             
              <div className="h-10 w-px bg-slate-200" />
              <div className="flex cursor-pointer items-center gap-3"><div className="text-right"><p className="text-sm font-bold text-slate-900">Admin TOXI</p><p className="text-[11px] font-medium text-slate-500">Super Admin</p></div><span className="material-symbols-outlined text-slate-400">expand_more</span></div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-10">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Tong quan he thong</h2>
                <div className="mt-2 flex items-center gap-2"><span className="size-2 rounded-full bg-green-500 animate-pulse" /><p className="text-sm font-medium text-slate-500">{error || `He thong dang hoat dong on dinh. ${orders.length} don hang, ${totalCourseUnits} khoa hoc va ${totalBookUnits} sach da duoc ghi nhan.`}</p></div>
              </div>
              <div className="flex gap-4">
                <div className="relative" ref={exportRef}>
                  <button type="button" onClick={() => setShowExportMenu((v) => !v)} className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"><span className="material-symbols-outlined text-xl">download</span>Xuat bao cao<span className="material-symbols-outlined text-base">expand_more</span></button>
                  {showExportMenu ? <div className="absolute right-0 top-14 z-40 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">{REPORT_RANGES.map((range) => <button key={range.value} type="button" onClick={() => handleExport(range)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"><span>Bao cao {range.label}</span><span className="material-symbols-outlined text-base text-slate-400">download</span></button>)}</div> : null}
                </div>
              </div>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              <Card icon="payments" label="Tổng doanh thu" value={money(totalRevenue)} delta={null} toneData={{ iconWrap: "bg-primary/10", icon: "text-primary", progress: "bg-primary" }} footer={{ left: "Toan thoi gian", right: `${orders.length} don`, progress: "100%" }} />
              <Card icon="school" label="Doanh thu Khóa học" value={money(courseRevenue)} delta={null} toneData={tone("COURSE")} footer={{ left: "Tong khoa hoc da ban", right: `${totalCourseUnits} khoa hoc`, progress: `${Math.max(courseShare, totalSalesRevenue > 0 ? 8 : 0)}%` }} />
              <Card icon="auto_stories" label="Doanh thu Sách" value={money(bookRevenue)} delta={null} toneData={tone("BOOK")} footer={{ left: "Tong sach da ban", right: `${totalBookUnits} quyen`, progress: `${Math.max(bookShare, totalSalesRevenue > 0 ? 8 : 0)}%` }} />
              <Card icon="person_add" label="Tổng học viên" value={totalCustomers} delta={null} toneData={{ iconWrap: "bg-emerald-100", icon: "text-emerald-600", progress: "bg-emerald-500" }} footer={{ left: "Khach hang da mua", right: `${totalPaidOrders} don`, progress: `${Math.max(comboShare || Math.min(totalCustomers * 5, 100), totalPaidOrders > 0 ? 8 : 0)}%` }} />
            </div>

            <div className="mb-10 rounded-3xl border border-slate-100 bg-white p-10 shadow-sm">
              <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-5"><div className="flex size-14 items-center justify-center rounded-2xl bg-primary/5"><span className="material-symbols-outlined text-3xl text-primary">analytics</span></div><div><h3 className="text-2xl font-bold text-slate-900">So sanh doanh thu</h3><p className="mt-1 text-sm font-medium text-slate-500">Ty trong giua Khoa hoc va Sach trong 6 thang gan day</p></div></div>
                <div className="flex gap-4 rounded-2xl bg-slate-50 p-1.5"><div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-sm"><div className="size-3.5 rounded-full bg-gradient-to-b from-blue-600 to-sky-400" /><span className="text-xs font-bold text-slate-700">Doanh thu Khoa hoc</span></div><div className="flex items-center gap-2.5 px-4 py-2"><div className="size-3.5 rounded-full bg-gradient-to-b from-amber-500 to-yellow-300" /><span className="text-xs font-bold text-slate-500">Sach va san pham</span></div></div>
              </div>
              {graph.length === 0 || maxGraph === 0 ? (
                <div className="mt-8 flex h-[260px] items-center justify-center rounded-3xl bg-slate-50 text-sm font-semibold text-slate-400">
                  Chua co du lieu doanh thu trong khoang thoi gian nay.
                </div>
              ) : (
                <div className="relative mt-8 h-[400px] w-full">
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
              <div className="flex items-center justify-between border-b border-slate-50 p-8"><div><h3 className="text-xl font-bold text-slate-900">Don hang va dang ky gan day</h3><p className="mt-1 text-sm font-medium text-slate-500">Theo doi cac giao dich moi nhat trong he thong</p></div><Link to="/admin/orders" className="rounded-xl bg-slate-50 px-6 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white">Xem tat ca</Link></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left text-sm">
                  <thead className="bg-slate-50/60 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400"><tr><th className="px-8 py-5">Ma don</th><th className="px-8 py-5">Hoc vien</th><th className="px-8 py-5">Loai hinh</th><th className="px-8 py-5">San pham</th><th className="px-8 py-5 text-right">Gia tri</th><th className="px-8 py-5 text-center">Trang thai</th></tr></thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentOrders.length === 0 ? <tr><td colSpan={6} className="px-8 py-10 text-center text-sm text-slate-400">Chua co don hang de hien thi.</td></tr> : recentOrders.map((o) => {
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
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">Hoat dong he thong</h3>
            <p className="mt-1 text-sm font-medium text-slate-500">Cap nhat truc tiep tu du lieu hien co</p>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-4">
              {feed.length === 0 ? (
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-400">
                  Chua co hoat dong nao trong khoang thoi gian nay.
                </div>
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
              <div className="absolute -right-6 -top-6 opacity-5">
                <span className="material-symbols-outlined text-[100px] text-primary">psychology</span>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-primary">auto_awesome</span>
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Loi khuyen AI</h4>
              </div>
              <p className="text-sm leading-7 text-slate-600">{suggestion}</p>
              <button className="mt-6 w-full rounded-xl bg-primary py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:brightness-110">
                Ap dung ngay
              </button>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Chi so nhanh</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Tong luot lam quiz</span>
                  <span className="font-black text-slate-900">{dashboard.quizStats?.totalPlays || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">De thi cong khai</span>
                  <span className="font-black text-slate-900">{dashboard.quizStats?.activeQuizzes || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Tong khoa hoc da ban</span>
                  <span className="font-black text-slate-900">{totalCourseUnits}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Tong sach da ban</span>
                  <span className="font-black text-slate-900">{totalBookUnits}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

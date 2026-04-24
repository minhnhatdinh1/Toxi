import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

// ===== MOCK DATA =====
const INIT_DECKS = [
  { id: 1, title: "Chào hỏi cơ bản", description: "Các từ vựng chào hỏi thông dụng", level: "HSK 1", type: "Từ vựng", cardCount: 12, status: "Công khai", createdAt: "27/03/2026", views: 5 },
  { id: 2, title: "Gia đình", description: "Từ vựng về các thành viên trong gia đình", level: "HSK 1", type: "Từ vựng", cardCount: 8, status: "Công khai", createdAt: "27/03/2026", views: 3 },
  { id: 3, title: "Màu sắc & Hình dạng", description: "Miêu tả màu sắc và hình dạng cơ bản", level: "HSK 2", type: "Tổng hợp", cardCount: 15, status: "Nháp", createdAt: "25/03/2026", views: 0 },
  { id: 4, title: "Mua sắm & Giá cả", description: "Từ vựng thương mại và mua bán", level: "HSK 2", type: "Tổng hợp", cardCount: 10, status: "Công khai", createdAt: "25/03/2026", views: 7 },
  { id: 5, title: "Thành ngữ HSK 4", description: "Thành ngữ và cụm từ cố định HSK 4", level: "HSK 4", type: "Thành ngữ", cardCount: 20, status: "Ẩn", createdAt: "20/03/2026", views: 1 },
  { id: 6, title: "Hán tự phức tạp HSK 6", description: "Chữ Hán nâng cao cấp độ 6", level: "HSK 6", type: "Hán tự", cardCount: 30, status: "Công khai", createdAt: "15/03/2026", views: 2 },
  { id: 7, title: "Giao tiếp hàng ngày", description: "Câu giao tiếp thực tế cuộc sống", level: "HSK 1", type: "Giao tiếp", cardCount: 18, status: "Công khai", createdAt: "10/03/2026", views: 9 },
];


const LEVELS = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];
const TYPES = ["Từ vựng", "Tổng hợp", "Thành ngữ", "Hán tự", "Giao tiếp"];
const BAR_COLORS = ["#4ade80", "#60a5fa", "#c084fc", "#fb923c", "#f472b6", "#94a3b8"];

function LevelBadge({ level }) {
  const map = {
    "HSK 1": { bg: "#e8f5e9", color: "#2e7d32", border: "#a5d6a7" },
    "HSK 2": { bg: "#e3f2fd", color: "#1565c0", border: "#90caf9" },
    "HSK 3": { bg: "#f3e5f5", color: "#6a1b9a", border: "#ce93d8" },
    "HSK 4": { bg: "#fff3e0", color: "#e65100", border: "#ffcc80" },
    "HSK 5": { bg: "#fce4ec", color: "#880e4f", border: "#f48fb1" },
    "HSK 6": { bg: "#1a237e", color: "#fff", border: "#1a237e" },
  };
  const s = map[level] || { bg: "#f5f5f5", color: "#616161", border: "#e0e0e0" };
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontFamily: "inherit" }}
      className="text-[11px] font-black px-2.5 py-1 rounded-lg inline-block whitespace-nowrap">
      {level}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    "Công khai": { dot: "#22c55e", text: "#15803d" },
    "Nháp": { dot: "#f59e0b", text: "#b45309" },
    "Ẩn": { dot: "#94a3b8", text: "#64748b" },
  };
  const s = map[status] || map["Ẩn"];
  return (
    <span className="flex items-center gap-1.5 text-xs font-bold" style={{ color: s.text }}>
      <span className="size-2 rounded-full inline-block shrink-0" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

function DeckFormModal({ deck, onSave, onClose }) {
  const [form, setForm] = useState(
    deck ? { ...deck } : { title: "", description: "", level: "HSK 1", type: "Từ vựng", status: "Nháp" }
  );
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", width: "100%", maxWidth: 480, margin: "0 16px" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 800, fontSize: 15, color: "#1e293b" }}>{deck ? "Chỉnh sửa bộ thẻ" : "Tạo bộ thẻ mới"}</span>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20, color: "#94a3b8", padding: 4 }}>edit</button>
        </div>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Tên bộ thẻ *", key: "title", type: "input", placeholder: "Vd: Chào hỏi cơ bản" },
            { label: "Mô tả", key: "description", type: "textarea", placeholder: "Mô tả ngắn về bộ thẻ..." },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>{f.label}</label>
              {f.type === "textarea"
                ? <textarea value={form[f.key]} onChange={e => set(f.key, e.target.value)} rows={2} placeholder={f.placeholder}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 14, color: "#1e293b", resize: "none", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
                : <input value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 14, color: "#1e293b", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
              }
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { label: "Cấp độ", key: "level", options: LEVELS },
              { label: "Dạng thẻ", key: "type", options: TYPES },
              { label: "Trạng thái", key: "status", options: ["Nháp", "Công khai", "Ẩn"] },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>{f.label}</label>
                <select value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                  style={{ width: "100%", padding: "10px 10px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13, color: "#1e293b", outline: "none", fontFamily: "inherit", cursor: "pointer", background: "#fff" }}>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "16px 24px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{ padding: "9px 18px", borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", fontSize: 13, fontWeight: 700, color: "#64748b", cursor: "pointer", fontFamily: "inherit" }}>Hủy</button>
          <button onClick={() => form.title.trim() && onSave(form)}
            style={{ padding: "9px 18px", borderRadius: 12, border: "none", background: "#1a237e", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
            💾 {deck ? "Lưu thay đổi" : "Tạo bộ thẻ"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirm({ onConfirm, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)" }}>
      <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", width: "100%", maxWidth: 360, margin: "0 16px", padding: 32, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, background: "#fef2f2", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24 }}>🗑️</div>
        <h3 style={{ fontWeight: 800, fontSize: 16, color: "#1e293b", marginBottom: 8 }}>Xác nhận xóa</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24, lineHeight: 1.6 }}>Bạn có chắc muốn xóa bộ thẻ này? Hành động này không thể hoàn tác.</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", fontSize: 13, fontWeight: 700, color: "#64748b", cursor: "pointer", fontFamily: "inherit" }}>Hủy</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "none", background: "#ef4444", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Xóa</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminFlashcard() {
  const [decks, setDecks] = useState(INIT_DECKS);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("Tất cả");
  const [sort, setSort] = useState("Mới nhất");
  const [modal, setModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filterLevel, setFilterLevel] = useState(null);

  const total = decks.length;
  const cPublic = decks.filter(d => d.status === "Công khai").length;
  const cDraft = decks.filter(d => d.status !== "Công khai").length;
  const totalViews = decks.reduce((s, d) => s + d.views, 0);

  const hskCounts = LEVELS.map(l => ({ level: l, count: decks.filter(d => d.level === l).length }));
  const maxCount = Math.max(...hskCounts.map(h => h.count), 1);

  let filtered = decks.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === "Tất cả" || (tab === "Công khai" ? d.status === "Công khai" : tab === "Nháp" ? d.status === "Nháp" : d.status === "Ẩn");
    const matchLevel = !filterLevel || d.level === filterLevel;
    return matchSearch && matchTab && matchLevel;
  });
  if (sort === "Mới nhất") filtered = [...filtered].reverse();
  else if (sort === "Nhiều thẻ nhất") filtered = [...filtered].sort((a, b) => b.cardCount - a.cardCount);
  else if (sort === "Nhiều lượt xem") filtered = [...filtered].sort((a, b) => b.views - a.views);

  const handleSave = (form) => {
    if (!modal || modal === "add") {
      setDecks(prev => [...prev, { ...form, id: Date.now(), cardCount: 0, views: 0, createdAt: new Date().toLocaleDateString("vi-VN") }]);
    } else {
      setDecks(prev => prev.map(d => d.id === modal.id ? { ...d, ...form } : d));
    }
    setModal(null);
  };

  const handleDelete = () => {
    setDecks(prev => prev.filter(d => d.id !== deleteId));
    setDeleteId(null);
  };

  const handleDuplicate = (deck) => {
    setDecks(prev => [...prev, { ...deck, id: Date.now(), title: deck.title + " (bản sao)", status: "Nháp", views: 0, createdAt: new Date().toLocaleDateString("vi-VN") }]);
  };

  const S = {
    page: { display: "flex", minHeight: "100vh", background: "#f4f6fb", fontFamily: "'Segoe UI', system-ui, sans-serif" },
    sidebar: { width: 240, flexShrink: 0, background: "#1a237e", minHeight: "100vh", display: "flex", flexDirection: "column" },
    sidebarLogo: { padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 12 },
    logoIcon: { width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" },
    nav: { flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 },
    navItem: (active) => ({
      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12,
      fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", transition: "all 0.15s",
      color: active ? "#fff" : "rgba(255,255,255,0.6)", background: active ? "rgba(255,255,255,0.15)" : "transparent",
      border: "none", width: "100%", textAlign: "left",
    }),
    adminBar: { padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 10 },
    main: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" },
    topbar: { background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20 },
    content: { padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 },
    statGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 },
    statCard: { background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
    statIcon: (bg) => ({ width: 48, height: 48, borderRadius: 14, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }),
    section: { background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden" },
    th: { padding: "10px 18px", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "left", whiteSpace: "nowrap" },
    td: { padding: "14px 18px", verticalAlign: "middle" },
  };

  return (
    <div style={S.page}>
      <AdminSidebar />

      {/* MAIN */}
      <main style={S.main}>
        {/* Topbar */}
        <div style={S.topbar}>
          <div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 2 }}>
              Nội dung &rsaquo; <span style={{ color: "#475569", fontWeight: 500 }}>Quản lý Flashcards</span>
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#1e293b", margin: 0 }}>Quản lý Flashcards</h1>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", fontSize: 13, fontWeight: 700, color: "#475569", cursor: "pointer", fontFamily: "inherit" }}>
              ⬇ Xuất Excel
            </button>
            <button onClick={() => setModal("add")}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 12, border: "none", background: "#1a237e", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(26,35,126,0.3)" }}>
              ＋ Tạo bộ thẻ mới
            </button>
          </div>
        </div>

        <div style={S.content}>
          {/* STAT CARDS */}
          <div style={S.statGrid}>
            {[
              { label: "Tổng bộ thẻ", value: total, emoji: "🃏", bg: "#eff6ff", color: "#3b82f6" },
              { label: "Công khai", value: cPublic, emoji: "✅", bg: "#f0fdf4", color: "#22c55e" },
              { label: "Nháp / Ẩn", value: cDraft, emoji: "😑", bg: "#fffbeb", color: "#f59e0b" },
              { label: "Tổng lượt xem", value: totalViews, emoji: "👥", bg: "#f5f3ff", color: "#8b5cf6" },
            ].map(s => (
              <div key={s.label} style={S.statCard}>
                <div style={S.statIcon(s.bg)}>
                  <span style={{ fontSize: 22 }}>{s.emoji}</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#1e293b", lineHeight: 1 }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* HSK CHART */}
          <div style={{ ...S.section, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Phân bổ theo cấp độ HSK</span>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>Bấm vào cột để lọc</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 96 }}>
              {hskCounts.map((h, i) => {
                const barH = Math.max((h.count / maxCount) * 56, h.count > 0 ? 10 : 4);
                const isActive = filterLevel === h.level;
                const isFiltering = !!filterLevel;
                return (
                  <div key={h.level} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
                    onClick={() => setFilterLevel(filterLevel === h.level ? null : h.level)}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>{h.count}</span>
                    <div style={{
                      width: "100%", borderRadius: "6px 6px 0 0", height: barH,
                      background: isFiltering && !isActive ? "#e2e8f0" : BAR_COLORS[i],
                      transition: "all 0.2s", boxShadow: isActive ? `0 4px 12px ${BAR_COLORS[i]}55` : "none",
                    }} />
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? "#1a237e" : "#94a3b8" }}>
                        {h.level.replace("HSK ", "H")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filterLevel && (
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "#64748b" }}>Đang lọc:</span>
                <LevelBadge level={filterLevel} />
                <button onClick={() => setFilterLevel(null)} style={{ fontSize: 11, color: "#64748b", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Xóa lọc</button>
              </div>
            )}
          </div>

          {/* TABLE */}
          <div style={S.section}>
            {/* Controls */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94a3b8" }}>🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Tìm tên bộ thẻ..."
                  style={{ width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 8, paddingBottom: 8, borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13, color: "#1e293b", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
                {["Tất cả", "Công khai", "Nháp", "Ẩn"].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ padding: "8px 16px", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                      background: tab === t ? "#1a237e" : "transparent", color: tab === t ? "#fff" : "#64748b" }}>
                    {t}
                  </button>
                ))}
              </div>
              <select value={sort} onChange={e => setSort(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13, color: "#475569", outline: "none", cursor: "pointer", fontFamily: "inherit", background: "#fff" }}>
                <option>Mới nhất</option>
                <option>Nhiều thẻ nhất</option>
                <option>Nhiều lượt xem</option>
              </select>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    {["TÊN BỘ THẺ", "CẤP ĐỘ", "DẠNG THẺ", "SỐ THẺ", "LƯỢT XEM", "TRẠNG THÁI", "NGÀY TẠO", "THAO TÁC"].map(col => (
                      <th key={col} style={S.th}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ ...S.td, textAlign: "center", padding: "48px 0", color: "#94a3b8", fontSize: 14 }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 36 }}>🃏</span>
                          Không tìm thấy bộ thẻ nào
                        </div>
                      </td>
                    </tr>
                  ) : filtered.map((deck, idx) => (
                    <tr key={deck.id} style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #f8fafc" : "none", transition: "background 0.1s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={S.td}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>{deck.title}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{deck.description}</div>
                      </td>
                      <td style={S.td}><LevelBadge level={deck.level} /></td>
                      <td style={S.td}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 8, background: "#f1f5f9", color: "#475569" }}>{deck.type}</span>
                      </td>
                      <td style={S.td}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#374151" }}>{deck.cardCount} thẻ</div>
                        <div style={{ marginTop: 5, width: 56, height: 4, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "#60a5fa", borderRadius: 99, width: `${Math.min((deck.cardCount / 30) * 100, 100)}%` }} />
                        </div>
                      </td>
                      <td style={S.td}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "#374151" }}>{deck.views}</span>
                      </td>
                      <td style={S.td}><StatusBadge status={deck.status} /></td>
                      <td style={S.td}><span style={{ fontSize: 12, color: "#64748b" }}>{deck.createdAt}</span></td>
                      <td style={S.td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <button onClick={() => setModal(deck)}
                            style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 8, border: "none", background: "none", fontSize: 12, fontWeight: 700, color: "#3b82f6", cursor: "pointer", fontFamily: "inherit" }}
                            onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}>
                            ✏️ Sửa
                          </button>
                          <button title="Quản lý thẻ"
                            style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}
                            onMouseEnter={e => e.currentTarget.style.background = "#f1f5f9"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}>⚙️</button>
                          <button onClick={() => handleDuplicate(deck)} title="Nhân bản"
                            style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}
                            onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}>📋</button>
                          <button onClick={() => setDeleteId(deck.id)}
                            style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}
                            onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>Hiển thị {filtered.length} / {decks.length} bộ thẻ</span>
              <div style={{ display: "flex", gap: 4 }}>
                {["‹", "1", "›"].map((p, i) => (
                  <button key={p} style={{ width: 32, height: 32, borderRadius: 8, border: i === 1 ? "none" : "1px solid #e2e8f0", background: i === 1 ? "#1a237e" : "#fff", color: i === 1 ? "#fff" : "#475569", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {modal && <DeckFormModal deck={modal === "add" ? null : modal} onSave={handleSave} onClose={() => setModal(null)} />}
      {deleteId && <DeleteConfirm onConfirm={handleDelete} onClose={() => setDeleteId(null)} />}
    </div>
  );
}


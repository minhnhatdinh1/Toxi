import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

// ─── DATA ────────────────────────────────────────────────────────────────────
const INITIAL_DECKS = [
  {
    id: 1,
    title: "Chào hỏi cho bé",
    subtitle: "Từ vựng HSK 1 · Mẫu câu dễ nhớ",
    level: "HSK 1",
    icon: "🤚",
    status: "active",
    updated: "21/04/2026",
    cards: [
      { hanzi: "你好", pinyin: "Nǐ hǎo", vietnamese: "Xin chào", example: "你好，我是 Na Na。" },
      { hanzi: "您好", pinyin: "Nín hǎo", vietnamese: "Con chào ạ", example: "您好，老师！" },
      { hanzi: "谢谢", pinyin: "Xièxiè", vietnamese: "Cảm ơn", example: "谢谢妈妈。" },
      { hanzi: "再见", pinyin: "Zàijiàn", vietnamese: "Tạm biệt", example: "再见，明天见！" },
      { hanzi: "对不起", pinyin: "Duìbuqǐ", vietnamese: "Xin lỗi", example: "对不起，我来晚了。" },
    ],
  },
  {
    id: 2,
    title: "Gia đình cho bé",
    subtitle: "Từ vựng HSK 1 · Người thân quen thuộc",
    level: "HSK 1",
    icon: "👨‍👩‍👧",
    status: "active",
    updated: "20/04/2026",
    cards: [
      { hanzi: "爸爸", pinyin: "Bàba", vietnamese: "Bố / Ba", example: "我爸爸爱我。" },
      { hanzi: "妈妈", pinyin: "Māma", vietnamese: "Mẹ / Má", example: "我妈妈很温柔。" },
      { hanzi: "哥哥", pinyin: "Gēgē", vietnamese: "Anh trai", example: "我哥哥和我一起玩。" },
      { hanzi: "妹妹", pinyin: "Mèimei", vietnamese: "Em gái", example: "我妹妹很可爱。" },
    ],
  },
  {
    id: 3,
    title: "Màu sắc",
    subtitle: "Từ vựng HSK 2 · Miêu tả",
    level: "HSK 2",
    icon: "🎨",
    status: "active",
    updated: "19/04/2026",
    cards: [
      { hanzi: "红色", pinyin: "Hóngsè", vietnamese: "Màu đỏ", example: "她穿了一件红色的裙子。" },
      { hanzi: "蓝色", pinyin: "Lánsè", vietnamese: "Màu xanh dương", example: "天空是蓝色的。" },
      { hanzi: "黄色", pinyin: "Huángsè", vietnamese: "Màu vàng", example: "这朵花是黄色的。" },
      { hanzi: "绿色", pinyin: "Lǜsè", vietnamese: "Màu xanh lá", example: "树叶是绿色的。" },
    ],
  },
  {
    id: 4,
    title: "Mua sắm",
    subtitle: "Từ vựng HSK 2 · Thương mại",
    level: "HSK 2",
    icon: "🛍",
    status: "draft",
    updated: "18/04/2026",
    cards: [
      { hanzi: "多少钱", pinyin: "Duōshao qián", vietnamese: "Bao nhiêu tiền?", example: "这件衣服多少钱？" },
      { hanzi: "便宜", pinyin: "Piányí", vietnamese: "Rẻ", example: "这里的东西很便宜。" },
      { hanzi: "贵", pinyin: "Guì", vietnamese: "Đắt", example: "这个包太贵了。" },
      { hanzi: "买", pinyin: "Mǎi", vietnamese: "Mua", example: "我想买一本书。" },
    ],
  },
  {
    id: 5,
    title: "Thành ngữ HSK 4",
    subtitle: "Thành ngữ · Nâng cao",
    level: "HSK 4",
    icon: "📖",
    status: "active",
    updated: "15/04/2026",
    cards: [
      { hanzi: "一石二鸟", pinyin: "Yī shí èr niǎo", vietnamese: "Một mũi tên trúng hai đích", example: "这个计划真是一石二鸟。" },
      { hanzi: "马到成功", pinyin: "Mǎ dào chénggōng", vietnamese: "Thành công ngay lập tức", example: "祝你马到成功！" },
      { hanzi: "半途而废", pinyin: "Bàn tú ér fèi", vietnamese: "Bỏ cuộc giữa chừng", example: "做事不能半途而废。" },
    ],
  },
  {
    id: 6,
    title: "Hán tự HSK 6",
    subtitle: "Hán tự nâng cao · Cấp độ 6",
    level: "HSK 6",
    icon: "🏆",
    status: "active",
    updated: "10/04/2026",
    cards: [
      { hanzi: "瞬息万变", pinyin: "Shùn xī wàn biàn", vietnamese: "Thay đổi chớp nhoáng", example: "市场瞬息万变，我们要随机应变。" },
      { hanzi: "举足轻重", pinyin: "Jǔ zú qīng zhòng", vietnamese: "Có tầm ảnh hưởng lớn", example: "他在公司里举足轻重。" },
      { hanzi: "叹为观止", pinyin: "Tàn wéi guān zhǐ", vietnamese: "Tuyệt vời đến mức thán phục", example: "这幅画真是叹为观止。" },
    ],
  },
];

const FILTERS = ["Tất cả", "HSK 1", "HSK 2", "HSK 4", "HSK 6"];

const LEVEL_STYLES = {
  "HSK 1": { bg: "#d1fae5", color: "#065f46" },
  "HSK 2": { bg: "#dbeafe", color: "#1e40af" },
  "HSK 3": { bg: "#dbeafe", color: "#1e40af" },
  "HSK 4": { bg: "#fce7f3", color: "#9d174d" },
  "HSK 5": { bg: "#fce7f3", color: "#9d174d" },
  "HSK 6": { bg: "#1e2a80", color: "#ffffff" },
};

const EMPTY_CARD = () => ({ hanzi: "", pinyin: "", vietnamese: "", example: "" });

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function StatCard({ icon, iconBg, value, label }) {
  return (
    <div style={{
      flex: 1, background: "white", borderRadius: 14,
      border: "1px solid #e2e6f3", padding: "14px 16px",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1f3a" }}>{value}</div>
        <div style={{ fontSize: 12, color: "#7b82a8" }}>{label}</div>
      </div>
    </div>
  );
}

function LevelBadge({ level }) {
  const style = LEVEL_STYLES[level] || { bg: "#f3f5fb", color: "#1a1f3a" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 800, letterSpacing: "0.3px",
      background: style.bg, color: style.color,
    }}>{level}</span>
  );
}

// ─── MODAL ───────────────────────────────────────────────────────────────────

function DeckModal({ deck, onClose, onSave }) {
  const isEdit = !!deck?.id;

  const [title, setTitle] = useState(deck?.title || "");
  const [subtitle, setSubtitle] = useState(deck?.subtitle || "");
  const [level, setLevel] = useState(deck?.level || "HSK 1");
  const [icon, setIcon] = useState(deck?.icon || "📚");
  const [cards, setCards] = useState(
    deck?.cards?.length ? deck.cards : [EMPTY_CARD()]
  );

  const updateCard = (idx, field, val) => {
    setCards((prev) => prev.map((c, i) => (i === idx ? { ...c, [field]: val } : c)));
  };
  const addCard = () => setCards((prev) => [...prev, EMPTY_CARD()]);
  const removeCard = (idx) => setCards((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = () => {
    if (!title.trim()) { alert("Vui lòng nhập tên bộ thẻ!"); return; }
    onSave({ title, subtitle, level, icon, cards });
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, background: "rgba(15,23,80,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 20,
      }}
    >
      <div style={{
        background: "white", borderRadius: 20, width: 560,
        maxHeight: "90vh", overflowY: "auto", padding: 28,
        boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1f3a" }}>
              {isEdit ? "Chỉnh sửa bộ thẻ" : "Thêm bộ thẻ mới"}
            </div>
            <div style={{ fontSize: 13, color: "#7b82a8", marginTop: 2 }}>
              Điền thông tin và danh sách từ vựng
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: 8, border: "1px solid #e2e6f3",
            background: "white", cursor: "pointer", fontSize: 16, color: "#7b82a8",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>✕</button>
        </div>

        {/* Form */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <FormLabel>Tên bộ thẻ</FormLabel>
            <FormInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="VD: Chào hỏi cho bé" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <FormLabel>Mô tả</FormLabel>
            <FormInput value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="VD: Từ vựng HSK 1 · Mẫu câu dễ nhớ" />
          </div>
          <div>
            <FormLabel>Cấp độ HSK</FormLabel>
            <select value={level} onChange={(e) => setLevel(e.target.value)} style={inputStyle}>
              {["HSK 1","HSK 2","HSK 3","HSK 4","HSK 5","HSK 6"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <FormLabel>Biểu tượng (emoji)</FormLabel>
            <FormInput value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="VD: 📚" />
          </div>
        </div>

        {/* Cards */}
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1f3a", margin: "18px 0 10px", display: "flex", alignItems: "center", gap: 8 }}>
          Danh sách thẻ từ vựng
          <div style={{ flex: 1, height: 1, background: "#e2e6f3" }} />
        </div>

        {cards.map((card, idx) => (
          <div key={idx} style={{
            background: "#f8f9fc", borderRadius: 12, padding: 14,
            marginBottom: 10, border: "1px solid #e2e6f3",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#7b82a8", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                Thẻ {idx + 1}
              </span>
              {cards.length > 1 && (
                <button onClick={() => removeCard(idx)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, color: "#ef4444",
                }}>🗑</button>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { field: "hanzi", label: "Hán tự", placeholder: "你好" },
                { field: "pinyin", label: "Pinyin", placeholder: "Nǐ hǎo" },
                { field: "vietnamese", label: "Tiếng Việt", placeholder: "Xin chào" },
                { field: "example", label: "Ví dụ", placeholder: "你好，我是..." },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <FormLabel>{label}</FormLabel>
                  <FormInput
                    value={card[field]}
                    onChange={(e) => updateCard(idx, field, e.target.value)}
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={addCard} style={{
          width: "100%", padding: 10, border: "2px dashed #e2e6f3",
          borderRadius: 12, background: "transparent", color: "#2d3aaf",
          fontSize: 13, fontWeight: 700, cursor: "pointer",
        }}>+ Thêm thẻ từ vựng</button>

        {/* Footer */}
        <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            padding: "9px 20px", borderRadius: 10, border: "1.5px solid #e2e6f3",
            background: "white", color: "#1a1f3a", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>Hủy</button>
          <button onClick={handleSave} style={{
            padding: "9px 20px", borderRadius: 10, border: "none",
            background: "#2d3aaf", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>💾 Lưu bộ thẻ</button>
        </div>
      </div>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const inputStyle = {
  width: "100%", padding: "9px 12px", border: "1.5px solid #e2e6f3",
  borderRadius: 10, fontSize: 13, color: "#1a1f3a", outline: "none",
  fontFamily: "inherit", background: "white",
};

function FormLabel({ children }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 700, color: "#7b82a8", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.4px" }}>
      {children}
    </div>
  );
}
function FormInput(props) {
  return <input {...props} style={inputStyle} />;
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function FlashcardAdmin() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState(INITIAL_DECKS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tất cả");
  const [modal, setModal] = useState(null); // null | { mode: 'add' | 'edit', deck?: object }
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(() => {
    return decks.filter((d) => {
      const matchQ = `${d.title} ${d.subtitle}`.toLowerCase().includes(search.toLowerCase());
      const matchF = filter === "Tất cả" || d.level === filter;
      return matchQ && matchF;
    });
  }, [decks, search, filter]);

  const totalCards = decks.reduce((s, d) => s + d.cards.length, 0);

  const handleSave = (data) => {
    if (modal.mode === "edit") {
      setDecks((prev) =>
        prev.map((d) =>
          d.id === modal.deck.id
            ? { ...d, ...data, updated: new Date().toLocaleDateString("vi-VN") }
            : d
        )
      );
    } else {
      const newDeck = {
        ...data,
        id: Date.now(),
        status: "draft",
        updated: new Date().toLocaleDateString("vi-VN"),
      };
      setDecks((prev) => [...prev, newDeck]);
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setDecks((prev) => prev.filter((d) => d.id !== id));
    setConfirmDelete(null);
  };

  const toggleStatus = (id) => {
    setDecks((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: d.status === "active" ? "draft" : "active" } : d
      )
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f4f6fb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <AdminSidebar />

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{
          background: "white", borderBottom: "1px solid #e2e6f3",
          padding: "0 24px", height: 58, display: "flex",
          alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1f3a" }}>Quản lý Flashcards</div>
            <div style={{ fontSize: 12, color: "#7b82a8", marginTop: 1 }}>Bộ thẻ từ vựng HSK 1-6</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{
              padding: "8px 16px", borderRadius: 10, background: "white",
              color: "#2d3aaf", border: "1.5px solid #2d3aaf",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>↓ Xuất Excel</button>
            <button
              onClick={() => navigate("/adminAddNewFlashcard")}
              style={{
                padding: "8px 16px", borderRadius: 10, background: "#2d3aaf",
                color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
              }}>+ Thêm bộ thẻ</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 14, padding: "16px 24px 0", flexShrink: 0 }}>
          <StatCard icon="⚡" iconBg="#eef1ff" value={decks.length} label="Tổng bộ thẻ" />
          <StatCard icon="🃏" iconBg="#f0fdf4" value={totalCards} label="Tổng flashcard" />
          <StatCard icon="🏆" iconBg="#fffbeb" value="HSK 1-6" label="Cấp độ bao phủ" />
          <StatCard icon="👁" iconBg="#fff1f2" value="1,248" label="Lượt xem hôm nay" />
        </div>

        {/* Toolbar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 24px", flexShrink: 0,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "white", border: "1px solid #e2e6f3", borderRadius: 10,
            padding: "0 12px", height: 36, width: 280,
          }}>
            <span style={{ color: "#7b82a8", fontSize: 16 }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm bộ thẻ theo tên..."
              style={{ border: "none", outline: "none", fontSize: 13, background: "transparent", width: "100%", color: "#1a1f3a" }}
            />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {FILTERS.map((f) => {
              const isActive = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                    cursor: "pointer", border: `1.5px solid ${isActive ? "#2d3aaf" : "#e2e6f3"}`,
                    background: isActive ? "#2d3aaf" : "white",
                    color: isActive ? "white" : "#7b82a8",
                  }}>{f}</button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>
          <div style={{ background: "white", borderRadius: 14, border: "1px solid #e2e6f3", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8f9fc" }}>
                  {["#", "Bộ thẻ", "Cấp độ", "Số thẻ", "Trạng thái", "Cập nhật", ""].map((h, i) => (
                    <th key={i} style={{
                      padding: "11px 14px", textAlign: i === 6 ? "right" : "left",
                      fontSize: 11, fontWeight: 700, color: "#7b82a8",
                      textTransform: "uppercase", letterSpacing: "0.6px",
                      borderBottom: "1px solid #e2e6f3",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: 32, color: "#7b82a8" }}>
                      Không tìm thấy bộ thẻ nào
                    </td>
                  </tr>
                ) : (
                  filtered.map((deck, i) => (
                    <tr key={deck.id} style={{ borderBottom: "1px solid #f3f5fb" }}>
                      <td style={{ padding: "13px 14px", color: "#7b82a8", fontWeight: 600, fontSize: 13 }}>{i + 1}</td>
                      <td style={{ padding: "13px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 40, height: 40, borderRadius: 10, background: "#eef1ff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 20, flexShrink: 0,
                          }}>{deck.icon}</div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1f3a" }}>{deck.title}</div>
                            <div style={{ fontSize: 12, color: "#7b82a8", marginTop: 2 }}>{deck.subtitle}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "13px 14px" }}>
                        <LevelBadge level={deck.level} />
                      </td>
                      <td style={{ padding: "13px 14px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          background: "#f3f5fb", borderRadius: 8,
                          padding: "4px 10px", fontSize: 12, fontWeight: 700, color: "#2d3aaf",
                        }}>🃏 {deck.cards.length} thẻ</span>
                      </td>
                      <td style={{ padding: "13px 14px" }}>
                        <button
                          onClick={() => toggleStatus(deck.id)}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            fontSize: 12, fontWeight: 600, background: "none", border: "none",
                            cursor: "pointer", color: deck.status === "active" ? "#10b981" : "#f59e0b",
                          }}
                        >
                          <span style={{
                            width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                            background: deck.status === "active" ? "#10b981" : "#f59e0b",
                          }} />
                          {deck.status === "active" ? "Công khai" : "Nháp"}
                        </button>
                      </td>
                      <td style={{ padding: "13px 14px", fontSize: 13, color: "#7b82a8" }}>{deck.updated}</td>
                      <td style={{ padding: "13px 14px" }}>
                        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                          <ActionBtn
                            color="#10b981" bg="#f0fdf4" border="#bbf7d0"
                            onClick={() => alert(`Bộ thẻ: ${deck.title}\nSố thẻ: ${deck.cards.length}`)}>
                            👁 Xem
                          </ActionBtn>
                          <ActionBtn
                            color="#2d3aaf" bg="white" border="#2d3aaf"
                            onClick={() => setModal({ mode: "edit", deck })}>
                            ✏️ Sửa
                          </ActionBtn>
                          <ActionBtn
                            color="#ef4444" bg="#fef2f2" border="#fecaca"
                            onClick={() => setConfirmDelete(deck)}>
                            🗑
                          </ActionBtn>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 13, color: "#7b82a8", marginTop: 12 }}>
            Hiển thị {filtered.length} / {decks.length} bộ thẻ
          </div>
        </div>
      </div>

      {/* MODAL ADD/EDIT */}
      {modal && (
        <DeckModal
          deck={modal.deck}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* CONFIRM DELETE */}
      {confirmDelete && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setConfirmDelete(null); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(15,23,80,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
          }}
        >
          <div style={{
            background: "white", borderRadius: 20, padding: 28, width: 380,
            boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🗑️</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1f3a", marginBottom: 8 }}>
              Xóa bộ thẻ?
            </div>
            <div style={{ fontSize: 14, color: "#7b82a8", marginBottom: 22 }}>
              Bạn có chắc muốn xóa bộ thẻ <strong style={{ color: "#1a1f3a" }}>"{confirmDelete.title}"</strong>? Hành động này không thể hoàn tác.
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setConfirmDelete(null)} style={{
                padding: "9px 20px", borderRadius: 10, border: "1.5px solid #e2e6f3",
                background: "white", color: "#1a1f3a", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>Hủy</button>
              <button onClick={() => handleDelete(confirmDelete.id)} style={{
                padding: "9px 20px", borderRadius: 10, border: "none",
                background: "#ef4444", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>Xóa bộ thẻ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionBtn({ children, color, bg, border, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 11px", borderRadius: 8, fontSize: 12, fontWeight: 600,
      cursor: "pointer", background: bg, color, border: `1.5px solid ${border}`,
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>{children}</button>
  );
}

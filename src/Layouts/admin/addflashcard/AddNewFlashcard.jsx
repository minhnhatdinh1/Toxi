import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../../mycourse/component/MyHeader";
import { uploadImage } from "../api/apiFile";
import { createDeck, createFlashcard } from "../api/apiFlashCard";

const HSK_LEVELS = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];
const HSK_COLORS = {
  "HSK 1": "bg-green-100 text-green-800",
  "HSK 2": "bg-blue-100 text-blue-800",
  "HSK 3": "bg-yellow-100 text-yellow-800",
  "HSK 4": "bg-orange-100 text-orange-800",
  "HSK 5": "bg-pink-100 text-pink-800",
  "HSK 6": "bg-purple-100 text-purple-800",
};

let _id = 0;
const newCard = () => ({
  id: ++_id,
  hanzi: "", pinyin: "", meaning: "",
  exampleZh: "", exampleVi: "",
  stroke: "", radical: "", level: "",
  title: "", tips: "", related: "",
});

function Toast({ message, type }) {
  const bg = type === "warn" ? "bg-amber-500" : type === "error" ? "bg-red-500" : "bg-primary";
  if (!message) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold shadow-2xl ${bg} animate-bounce-in`}>
      {message}
    </div>
  );
}

function ProgressRing({ pct, size = 44, stroke = 4, color = "#1D9E75" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s ease" }} />
    </svg>
  );
}

function Field({ label, children, span }) {
  const spanClass = span === 2 ? "col-span-2" : span === 3 ? "col-span-3" : span === 4 ? "col-span-4" : "";
  return (
    <div className={`flex flex-col gap-1.5 ${spanClass}`}>
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "px-3 py-2 border-[1.5px] border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 font-medium placeholder-slate-300 dark:placeholder-slate-600";
const selectCls = inputCls + " cursor-pointer";

function CardItem({ card, index, deckLevel, collapsed, onToggle, onDelete, onChange }) {
  const level = card.level || deckLevel;
  const preview = card.hanzi || "—";
  const sub = [card.pinyin, card.meaning].filter(Boolean).join(" · ") || "Chua dien";
  const levelColor = HSK_COLORS[level] || "";

  return (
    <div className={`bg-white dark:bg-surface-dark rounded-2xl border-[1.5px] transition-all duration-150 overflow-hidden ${!collapsed ? "border-primary/40 shadow-sm" : "border-slate-200 dark:border-slate-700"}`}>
      <div
        className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 cursor-pointer select-none"
        onClick={onToggle}
      >
        <div className="size-7 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shrink-0">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-primary leading-none">{preview}</span>
            {level && (
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${levelColor}`}>{level}</span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">{sub}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="size-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all text-sm"
        >
          <span className="material-symbols-outlined text-[16px]">{collapsed ? "expand_more" : "expand_less"}</span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="size-7 rounded-lg flex items-center justify-center text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      {!collapsed && (
        <div className="p-4 flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Field label="Han tu *">
              <input
                type="text"
                value={card.hanzi}
                placeholder="VD: 你好"
                onChange={(e) => onChange("hanzi", e.target.value)}
                className={inputCls + " text-2xl font-black text-primary"}
              />
            </Field>
            <Field label="Pinyin *">
              <input
                type="text"
                value={card.pinyin}
                placeholder="VD: Ni hao"
                onChange={(e) => onChange("pinyin", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Nghia tieng Viet *">
              <input
                type="text"
                value={card.meaning}
                placeholder="VD: Xin chao"
                onChange={(e) => onChange("meaning", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Cap do rieng">
              <select
                value={card.level}
                onChange={(e) => onChange("level", e.target.value)}
                className={selectCls}
              >
                <option value="">-- Dung cap bo --</option>
                {HSK_LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </Field>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Vi du (Tieng Trung)">
              <input
                type="text"
                value={card.exampleZh}
                placeholder="VD: 你好，很高兴认识你。"
                onChange={(e) => onChange("exampleZh", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Vi du (Tieng Viet)">
              <input
                type="text"
                value={card.exampleVi}
                placeholder="VD: Xin chao, rat vui duoc lam quen."
                onChange={(e) => onChange("exampleVi", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Field label="So net">
              <input
                type="text"
                value={card.stroke}
                placeholder="VD: 5 net"
                onChange={(e) => onChange("stroke", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Bo thu">
              <input
                type="text"
                value={card.radical}
                placeholder="VD: 你 (ni)"
                onChange={(e) => onChange("radical", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Chu de">
              <input
                type="text"
                value={card.title}
                placeholder="VD: Chao hoi"
                onChange={(e) => onChange("title", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Tu lien quan">
              <input
                type="text"
                value={card.related}
                placeholder="VD: 你好吗, 大家好"
                onChange={(e) => onChange("related", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Meo ghi nho" span={4}>
              <textarea
                rows={2}
                value={card.tips}
                placeholder="Goi y giup hoc vien ghi nho tu nay de hon..."
                onChange={(e) => onChange("tips", e.target.value)}
                className={inputCls + " resize-none"}
              />
            </Field>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AddNewFlashcard({ onSave, onCancel }) {
  const navigate = useNavigate();
  const [deckName, setDeckName] = useState("");
  const [deckLevel, setDeckLevel] = useState("");
  const [deckType, setDeckType] = useState("");
  const [deckStatus, setDeckStatus] = useState("public");
  const [deckDesc, setDeckDesc] = useState("");
  const [deckCoverUrl, setDeckCoverUrl] = useState("");
  const [deckCoverFile, setDeckCoverFile] = useState(null);
  const [deckCoverPreview, setDeckCoverPreview] = useState("");
  const coverUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (coverUrlRef.current) {
        URL.revokeObjectURL(coverUrlRef.current);
      }
    };
  }, []);

  const [cards, setCards] = useState(() => {
    return [newCard(), newCard(), newCard()];
  });
  const [collapsedIds, setCollapsedIds] = useState(new Set());

  const [toast, setToast] = useState({ message: "", type: "success" });
  const toastTimer = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = useCallback((message, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast({ message: "", type: "success" }), 2800);
  }, []);

  const addCard = useCallback(() => {
    setCards((prev) => [...prev, newCard()]);
  }, []);

  const addMultiple = useCallback((count = 5) => {
    setCards((prev) => [...prev, ...Array.from({ length: count }, () => newCard())]);
  }, []);

  const deleteCard = useCallback((id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    setCollapsedIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
    showToast("Da xoa the");
  }, [showToast]);

  const updateCard = useCallback((id, field, value) => {
    setCards((prev) => prev.map((c) => c.id === id ? { ...c, [field]: value } : c));
  }, []);

  const toggleCard = useCallback((id) => {
    setCollapsedIds((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  }, []);

  const expandAll = () => setCollapsedIds(new Set());
  const collapseAll = () => setCollapsedIds(new Set(cards.map((c) => c.id)));

  const clearEmpty = () => {
    const before = cards.length;
    setCards((prev) => prev.filter((c) => c.hanzi.trim() || c.meaning.trim()));
    const removed = before - cards.filter((c) => c.hanzi.trim() || c.meaning.trim()).length;
    showToast(removed > 0 ? `Da xoa ${removed} the trong` : "Khong co the trong", removed > 0 ? "success" : "warn");
  };

  const filledCards = cards.filter((c) => c.hanzi.trim() && c.meaning.trim());
  const totalCards = cards.length;
  const filledCount = filledCards.length;
  const emptyCount = totalCards - filledCount;
  const pct = totalCards > 0 ? Math.round((filledCount / totalCards) * 100) : 0;

  const validate = () => {
    if (!deckName.trim()) { showToast("⚠ Vui long nhap ten bo the", "warn"); return false; }
    if (!deckLevel) { showToast("⚠ Vui long chon cap do HSK", "warn"); return false; }
    if (filledCount === 0) { showToast("⚠ Can it nhat 1 the da dien day du", "warn"); return false; }
    return true;
  };

  const resolveImageUrl = (uploadResult) => {
    if (!uploadResult) return "";
    if (typeof uploadResult === "string") return uploadResult;
    return uploadResult.url || uploadResult.imageUrl || uploadResult.data?.url || uploadResult.data?.imageUrl || "";
  };

  const handleSave = async (isDraft = false) => {
    if (!deckName.trim()) { showToast("⚠ Vui long nhap ten bo the", "warn"); return; }
    if (!isDraft && !validate()) return;

    try {
      setIsSaving(true);

      let finalImageUrl = deckCoverUrl.trim();
      if (deckCoverFile) {
        const uploaded = await uploadImage(deckCoverFile);
        finalImageUrl = resolveImageUrl(uploaded);
      }

      const deckPayload = {
        title: deckName.trim(),
        subtitle: deckDesc.trim() || [deckType.trim(), deckLevel].filter(Boolean).join(" · "),
        level: deckLevel,
        imageUrl: finalImageUrl,
      };

      const deckResponse = await createDeck(deckPayload);
      const deckId = deckResponse.data?.id;

      if (!deckId) {
        throw new Error("Khong nhan duoc deckId tu backend.");
      }

      const validCards = filledCards.map(({ id, title, related, level, tips, ...rest }) => ({
        ...rest,
        hanzi: rest.hanzi.trim(),
        pinyin: rest.pinyin.trim(),
        meaning: rest.meaning.trim(),
        exampleZh: rest.exampleZh?.trim() || "",
        exampleVi: rest.exampleVi?.trim() || "",
        stroke: rest.stroke?.trim() || "",
        radical: rest.radical?.trim() || "",
        tip: tips?.trim() || "",
        related: typeof related === "string"
          ? related.split(",").map((item) => item.trim()).filter(Boolean)
          : [],
      }));

      await Promise.all(
        validCards.map((card) =>
          createFlashcard({
            deck: { id: deckId },
            hanzi: card.hanzi,
            pinyin: card.pinyin,
            meaning: card.meaning,
            exampleZh: card.exampleZh,
            exampleVi: card.exampleVi,
            stroke: card.stroke,
            radical: card.radical,
            tip: card.tip,
            related: card.related,
            imageUrl: "",
          })
        )
      );

      if (onSave) {
        onSave({
          deckId,
          title: deckName.trim(),
          level: deckLevel,
          cardCount: validCards.length,
        });
      }

      showToast(isDraft ? "📝 Da luu nhap thanh cong" : `✓ Da tao bo the voi ${validCards.length} the!`);
      setTimeout(() => navigate("/adminFlashCards"), 900);
    } catch (error) {
      showToast(error.response?.data?.message || error.message || "Khong the luu bo flashcard.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <MyHeader />

      <div className="flex-1 max-w-[1100px] mx-auto w-full px-4 py-6 pb-32">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
          <span>Noi dung</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span>Quan ly Flashcards</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-primary font-bold">Tao bo the moi</span>
        </div>

        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Tao bo Flashcard moi</h1>
            <p className="text-sm text-slate-400 mt-1">Them nhieu the tu vung cung luc — dien thong tin va nhan luu</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => showToast("📂 Tinh nang nhap Excel sap ra mat!", "warn")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-primary hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">upload</span>
              Nhap tu Excel
            </button>
            <button
              onClick={() => showToast(`👁 Xem truoc ${filledCount} the — tinh nang dang phat trien`, "warn")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-primary hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              Xem truoc
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all shadow-sm hover:shadow-md"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              {isSaving ? "Dang luu..." : "Luu bo the"}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-[16px]">description</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-primary">Thong tin bo the</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Ten bo the *" span={2}>
              <input
                type="text"
                value={deckName}
                placeholder="VD: Tu vung giao tiep HSK 1 — Chao hoi co ban"
                onChange={(e) => setDeckName(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Cap do HSK *">
              <select value={deckLevel} onChange={(e) => setDeckLevel(e.target.value)} className={selectCls}>
                <option value="">-- Chon cap do --</option>
                {HSK_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Dang the">
              <input
                type="text"
                value={deckType}
                placeholder="VD: Gia dinh"
                onChange={(e) => setDeckType(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Trang thai">
              <select value={deckStatus} onChange={(e) => setDeckStatus(e.target.value)} className={selectCls}>
                <option value="public">🟢 Cong khai</option>
                <option value="draft">📝 Nhap</option>
                <option value="hidden">👁 An</option>
              </select>
            </Field>
            <Field label="Anh bia" span={3}>
              <div className="flex flex-col gap-3">
                <input
                  type="url"
                  placeholder="https://example.com/cover.jpg"
                  value={deckCoverUrl}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDeckCoverUrl(value);
                    setDeckCoverFile(null);
                    setDeckCoverPreview(value);
                    if (coverUrlRef.current) {
                      URL.revokeObjectURL(coverUrlRef.current);
                      coverUrlRef.current = null;
                    }
                  }}
                  className={inputCls}
                />
                <label className="aspect-video w-full rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center bg-slate-50 dark:bg-primary/5 group cursor-pointer hover:border-primary hover:bg-primary/10 transition-all overflow-hidden">
                  {deckCoverPreview ? (
                    <img
                      src={deckCoverPreview}
                      alt="Deck cover preview"
                      className="w-full h-full object-cover"
                      onError={(e) => e.currentTarget.src = "https://via.placeholder.com/900x300?text=Invalid+Image"}
                    />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-primary/40 group-hover:text-primary transition-colors">
                        image
                      </span>
                      <p className="text-sm text-slate-400 mt-2 font-medium">
                        Click de chon anh bia
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (coverUrlRef.current) {
                        URL.revokeObjectURL(coverUrlRef.current);
                        coverUrlRef.current = null;
                      }
                      if (file) {
                        const preview = URL.createObjectURL(file);
                        coverUrlRef.current = preview;
                        setDeckCoverPreview(preview);
                        setDeckCoverUrl("");
                      } else {
                        setDeckCoverPreview("");
                      }
                      setDeckCoverFile(file);
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </Field>
            <Field label="Mo ta bo the" span={3}>
              <textarea
                rows={2}
                value={deckDesc}
                placeholder="Mo ta ngan ve noi dung va muc tieu cua bo the nay..."
                onChange={(e) => setDeckDesc(e.target.value)}
                className={inputCls + " resize-none"}
              />
            </Field>
          </div>
        </div>

        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl px-5 py-4 mb-5 flex items-center gap-4 flex-wrap">
          {[
            { label: "Tong the", val: totalCards, color: "text-slate-700 dark:text-slate-300" },
            { label: "Da dien", val: filledCount, color: "text-green-700 dark:text-green-400" },
            { label: "Con trong", val: emptyCount, color: "text-red-500" },
            { label: "Hoan thanh", val: `${pct}%`, color: "text-primary" },
          ].map(({ label, val, color }, i, arr) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center min-w-[56px]">
                <span className={`text-2xl font-black ${color} leading-none`}>{val}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</span>
              </div>
              {i < arr.length - 1 && <div className="w-px h-9 bg-primary/20" />}
            </React.Fragment>
          ))}
          <div className="flex-1 min-w-[80px] max-w-[200px] ml-auto">
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 rounded-xl mb-5">
          <span className="material-symbols-outlined text-blue-500 text-[20px] shrink-0">info</span>
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            Ban co the <strong>nhap hang loat tu Excel/CSV</strong> — moi hang la mot the voi cot: Han tu, Pinyin, Nghia, Vi du TQ, Vi du VI, So net, Bo thu, Meo. Hoac them thu cong tung the ben duoi.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 rounded-xl mb-4 flex-wrap">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Hang loat:</span>
          {[
            { label: "▼ Mo tat ca", onClick: expandAll, cls: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-100" },
            { label: "▲ Thu tat ca", onClick: collapseAll, cls: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-100" },
            { label: "+ Them 5 the", onClick: () => addMultiple(5), cls: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-100" },
            { label: "✕ Xoa the trong", onClick: clearEmpty, cls: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/40 text-red-600 dark:text-red-400 hover:bg-red-100" },
          ].map(({ label, onClick, cls }) => (
            <button key={label} onClick={onClick}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-all ${cls}`}>
              {label}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-[10px] text-slate-400">Keo de sap xep lai the (sap ra mat)</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[15px]">style</span>
            Danh sach the ({totalCards})
          </h2>
          <button
            onClick={addCard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:border-primary hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            Them 1 the
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {cards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
              <span className="material-symbols-outlined text-5xl">style</span>
              <p className="font-semibold text-sm">Chua co the nao. Nhan nut ben duoi de bat dau.</p>
            </div>
          ) : (
            cards.map((card, index) => (
              <CardItem
                key={card.id}
                card={card}
                index={index}
                deckLevel={deckLevel}
                collapsed={collapsedIds.has(card.id)}
                onToggle={() => toggleCard(card.id)}
                onDelete={() => deleteCard(card.id)}
                onChange={(field, value) => updateCard(card.id, field, value)}
              />
            ))
          )}
        </div>

        <button
          onClick={addCard}
          className="w-full mt-4 py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-slate-400 text-sm font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Them the moi
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between gap-4 flex-wrap shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <ProgressRing pct={pct} size={40} stroke={4} />
            <span className="absolute text-[9px] font-black text-primary">{pct}%</span>
          </div>
          <div>
            <p className="text-sm font-black text-slate-800 dark:text-white">
              <span className="text-primary">{filledCount} the</span> da san sang
            </p>
            <p className="text-[11px] text-slate-400">
              {emptyCount > 0 ? `${emptyCount} the chua dien du thong tin` : "Tat ca the da hoan chinh ✓"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-bold hover:border-red-300 hover:text-red-500 transition-all"
            >
              Huy
            </button>
          )}
          <button
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-primary hover:text-primary transition-all"
          >
            {isSaving ? "Dang luu..." : "Luu nhap"}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="flex items-center gap-1.5 whitespace-nowrap px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all shadow-sm hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            {isSaving ? "Dang luu..." : "Luu & Xuat ban"}
          </button>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}

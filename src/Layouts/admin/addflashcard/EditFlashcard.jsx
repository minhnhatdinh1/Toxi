import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyHeader from "../../mycourse/component/MyHeader";
import { uploadImage } from "../api/apiFile";
import {
  createFlashcard,
  deleteFlashcard,
  getDeckById,
  getDecks,
  getFlashcardsByDeckId,
  updateDeck,
  updateFlashcard,
} from "../api/apiFlashCard";

const HSK_LEVELS = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];
const HSK_COLORS = {
  "HSK 1": "bg-green-100 text-green-800",
  "HSK 2": "bg-blue-100 text-blue-800",
  "HSK 3": "bg-yellow-100 text-yellow-800",
  "HSK 4": "bg-orange-100 text-orange-800",
  "HSK 5": "bg-pink-100 text-pink-800",
  "HSK 6": "bg-purple-100 text-purple-800",
};

let uid = 5000;
const genId = () => ++uid;

const inputCls =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-all placeholder-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/10";
const selectCls = `${inputCls} cursor-pointer`;
const inputChangedCls = " !border-amber-400 focus:!border-amber-500 focus:!ring-amber-100";

function normalizeCard(card) {
  return {
    _key: genId(),
    id: card?.id ?? null,
    hanzi: card?.hanzi ?? "",
    pinyin: card?.pinyin ?? "",
    meaning: card?.meaning ?? "",
    exampleZh: card?.exampleZh ?? "",
    exampleVi: card?.exampleVi ?? "",
    stroke: card?.stroke ?? "",
    radical: card?.radical ?? "",
    tips: card?.tip ?? card?.tips ?? "",
    related: Array.isArray(card?.related) ? card.related.join(", ") : (card?.related ?? ""),
    _isNew: !card?.id,
  };
}

function blankCard() {
  return {
    _key: genId(),
    id: null,
    hanzi: "",
    pinyin: "",
    meaning: "",
    exampleZh: "",
    exampleVi: "",
    stroke: "",
    radical: "",
    tips: "",
    related: "",
    _isNew: true,
  };
}

const CARD_FIELDS = ["hanzi", "pinyin", "meaning", "exampleZh", "exampleVi", "stroke", "radical", "tips", "related"];

function cardChanged(card, snap) {
  if (!snap) return false;
  return CARD_FIELDS.some((field) => (card[field] ?? "") !== (snap[field] ?? ""));
}

function Field({ label, children, span }) {
  const spanClass =
    span === 2 ? "col-span-2" :
    span === 3 ? "col-span-3" :
    span === 4 ? "col-span-4" :
    "";

  return (
    <div className={`flex flex-col gap-1.5 ${spanClass}`}>
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</label>
      {children}
    </div>
  );
}

function ProgressRing({ pct, size = 44, stroke = 4, color = "#1D9E75" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (pct / 100) * circ;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={off}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset .5s ease" }}
      />
    </svg>
  );
}

function Toast({ message, type }) {
  if (!message) return null;
  const bg = type === "warn" ? "bg-amber-500" : type === "error" ? "bg-red-500" : "bg-primary";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-2xl ${bg}`}
      style={{ animation: "slideUp .25s ease" }}
    >
      {message}
    </div>
  );
}

function DeleteModal({ card, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-red-100">
            <span className="material-symbols-outlined text-[24px] text-red-500">delete_forever</span>
          </div>
          <div>
            <p className="text-base font-black leading-tight text-slate-900">
              Xoa the "{card?.hanzi || "nay"}"?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              The se bi xoa khi ban nhan luu thay doi.
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-500 transition-all hover:border-primary hover:text-primary"
          >
            Huy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-500 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-red-600"
          >
            Xac nhan xoa
          </button>
        </div>
      </div>
    </div>
  );
}

function CardItem({ card, index, deckLevel, snapshot, collapsed, onToggle, onDelete, onChange, onUndo }) {
  const level = deckLevel;
  const preview = card.hanzi || "-";
  const sub = [card.pinyin, card.meaning].filter(Boolean).join(" · ") || "Chua dien";
  const levelColor = HSK_COLORS[level] || "";
  const isChanged = !card._isNew && cardChanged(card, snapshot);
  const fc = (field) => isChanged && snapshot && (card[field] ?? "") !== (snapshot[field] ?? "");

  return (
    <div
      className={`overflow-hidden rounded-2xl border-[1.5px] bg-white transition-all duration-150 ${
        !collapsed ? "border-primary/40 shadow-sm" : "border-slate-200"
      } ${card._isNew ? "border-l-[3px] border-l-blue-400" : isChanged ? "border-l-[3px] border-l-amber-400" : ""}`}
    >
      <div
        className="flex cursor-pointer select-none items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3"
        onClick={onToggle}
      >
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-white">
          {index + 1}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-black leading-none text-primary">{preview}</span>
            {level ? <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${levelColor}`}>{level}</span> : null}
            {card._isNew ? (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-700">MOI</span>
            ) : null}
            {isChanged ? (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">DA SUA</span>
            ) : null}
          </div>
          <p className="mt-0.5 truncate text-[11px] text-slate-400">{sub}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {isChanged ? (
            <button
              type="button"
              title="Hoan tac"
              onClick={(event) => {
                event.stopPropagation();
                onUndo();
              }}
              className="flex size-7 items-center justify-center rounded-lg text-amber-500 transition-all hover:bg-amber-50 hover:text-amber-600"
            >
              <span className="material-symbols-outlined text-[15px]">undo</span>
            </button>
          ) : null}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
            className="flex size-7 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-primary/10 hover:text-primary"
          >
            <span className="material-symbols-outlined text-[16px]">{collapsed ? "expand_more" : "expand_less"}</span>
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            className="flex size-7 items-center justify-center rounded-lg text-slate-300 transition-all hover:bg-red-50 hover:text-red-500"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>

      {!collapsed ? (
        <div className="flex flex-col gap-4 p-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Field label="Han tu *">
              <input
                type="text"
                value={card.hanzi}
                placeholder="VD: 你好"
                onChange={(event) => onChange("hanzi", event.target.value)}
                className={`${inputCls} text-2xl font-black text-primary${fc("hanzi") ? inputChangedCls : ""}`}
              />
            </Field>
            <Field label="Pinyin *">
              <input
                type="text"
                value={card.pinyin}
                placeholder="VD: Ni hao"
                onChange={(event) => onChange("pinyin", event.target.value)}
                className={`${inputCls}${fc("pinyin") ? inputChangedCls : ""}`}
              />
            </Field>
            <Field label="Nghia tieng Viet *">
              <input
                type="text"
                value={card.meaning}
                placeholder="VD: Xin chao"
                onChange={(event) => onChange("meaning", event.target.value)}
                className={`${inputCls}${fc("meaning") ? inputChangedCls : ""}`}
              />
            </Field>
            <Field label="Cap do bo the">
              <input type="text" value={deckLevel || ""} disabled className={`${inputCls} bg-slate-50`} />
            </Field>
          </div>

          <hr className="border-slate-100" />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field label="Vi du (Tieng Trung)">
              <input
                type="text"
                value={card.exampleZh}
                onChange={(event) => onChange("exampleZh", event.target.value)}
                className={`${inputCls}${fc("exampleZh") ? inputChangedCls : ""}`}
              />
            </Field>
            <Field label="Vi du (Tieng Viet)">
              <input
                type="text"
                value={card.exampleVi}
                onChange={(event) => onChange("exampleVi", event.target.value)}
                className={`${inputCls}${fc("exampleVi") ? inputChangedCls : ""}`}
              />
            </Field>
          </div>

          <hr className="border-slate-100" />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Field label="So net">
              <input
                type="text"
                value={card.stroke}
                onChange={(event) => onChange("stroke", event.target.value)}
                className={`${inputCls}${fc("stroke") ? inputChangedCls : ""}`}
              />
            </Field>
            <Field label="Bo thu">
              <input
                type="text"
                value={card.radical}
                onChange={(event) => onChange("radical", event.target.value)}
                className={`${inputCls}${fc("radical") ? inputChangedCls : ""}`}
              />
            </Field>
            <Field label="Tu lien quan">
              <input
                type="text"
                value={card.related}
                placeholder="VD: 你好吗, 大家好"
                onChange={(event) => onChange("related", event.target.value)}
                className={`${inputCls}${fc("related") ? inputChangedCls : ""}`}
              />
            </Field>
            <Field label="Meo ghi nho">
              <textarea
                rows={2}
                value={card.tips}
                onChange={(event) => onChange("tips", event.target.value)}
                className={`${inputCls} resize-none${fc("tips") ? inputChangedCls : ""}`}
              />
            </Field>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function normalizeImageUrl(value) {
  if (!value || typeof value !== "string") return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const normalizedValue = value.replace(/^\/+/, "");
  if (normalizedValue.startsWith("api/files/")) {
    return `${import.meta.env.VITE_API_URL}/${normalizedValue}`;
  }
  if (normalizedValue.startsWith("files/")) {
    return `${import.meta.env.VITE_API_URL}/api/${normalizedValue}`;
  }
  return `${import.meta.env.VITE_API_URL}/api/files/${normalizedValue}`;
}

function resolveImageUrl(uploadResult) {
  if (!uploadResult) return "";
  if (typeof uploadResult === "string") return normalizeImageUrl(uploadResult);

  const rawUrl = uploadResult.url || uploadResult.imageUrl || uploadResult.path || uploadResult.data?.url || uploadResult.data?.imageUrl || uploadResult.data?.path || "";
  return normalizeImageUrl(rawUrl);
}

function buildDeckMeta(deck) {
  return {
    id: deck?.id ?? null,
    name: deck?.title ?? "",
    level: deck?.level ?? "",
    description: deck?.subtitle ?? "",
    coverUrl: normalizeImageUrl(deck?.imageUrl ?? deck?.coverUrl ?? ""),
  };
}

export default function EditFlashcard() {
  const navigate = useNavigate();
  const { deckId } = useParams();

  const [deckMeta, setDeckMeta] = useState(() => buildDeckMeta(null));
  const [metaSnap, setMetaSnap] = useState(() => buildDeckMeta(null));
  const [cards, setCards] = useState([]);
  const [cardSnaps, setCardSnaps] = useState({});
  const [deletedCardIds, setDeletedCardIds] = useState([]);
  const [collapsedIds, setCollapsedIds] = useState(new Set());
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deckCoverFile, setDeckCoverFile] = useState(null);
  const [deckCoverPreview, setDeckCoverPreview] = useState("");
  const toastTimer = useRef(null);
  const coverUrlRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast({ message: "", type: "success" }), 2800);
  }, []);

  const loadDeck = useCallback(async () => {
    if (!deckId) return;

    try {
      setLoading(true);
      setError("");

      let deckResponse;
      try {
        deckResponse = await getDeckById(deckId);
      } catch {
        const listResponse = await getDecks();
        const matched = Array.isArray(listResponse.data)
          ? listResponse.data.find((item) => String(item.id) === String(deckId))
          : null;
        deckResponse = { data: matched || null };
      }

      const [flashcardsResponse] = await Promise.all([
        getFlashcardsByDeckId(deckId),
      ]);

      const nextMeta = buildDeckMeta(deckResponse.data);
      const nextCards = Array.isArray(flashcardsResponse.data)
        ? flashcardsResponse.data.map(normalizeCard)
        : [];
      const nextSnaps = {};

      nextCards.forEach((card) => {
        if (card.id != null) {
          nextSnaps[card.id] = { ...card };
        }
      });

      setDeckMeta(nextMeta);
      setMetaSnap(nextMeta);
      setCards(nextCards);
      setCardSnaps(nextSnaps);
      setDeletedCardIds([]);
      setCollapsedIds(new Set(nextCards.map((card) => card._key)));
      setSearch("");
      setFilterTab("all");
      setDeckCoverFile(null);
      setDeckCoverPreview(nextMeta.coverUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Khong the tai bo flashcard.");
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    loadDeck();
  }, [loadDeck]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (coverUrlRef.current) URL.revokeObjectURL(coverUrlRef.current);
    };
  }, []);

  const updateMeta = (field, value) => {
    setDeckMeta((prev) => ({ ...prev, [field]: value }));
  };

  const isDeckChanged = useMemo(() => (
    Object.keys(metaSnap).some((key) => (deckMeta[key] ?? "") !== (metaSnap[key] ?? ""))
  ), [deckMeta, metaSnap]);

  const addCard = () => {
    const card = blankCard();
    setCards((prev) => [...prev, card]);
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      next.delete(card._key);
      return next;
    });
  };

  const addMultiple = (count = 5) => {
    const newItems = Array.from({ length: count }, () => blankCard());
    setCards((prev) => [...prev, ...newItems]);
  };

  const updateCard = useCallback((key, field, value) => {
    setCards((prev) => prev.map((card) => (card._key === key ? { ...card, [field]: value } : card)));
  }, []);

  const undoCard = useCallback((key) => {
    setCards((prev) => prev.map((card) => {
      if (card._key !== key || card.id == null) return card;
      const snap = cardSnaps[card.id];
      return snap ? { ...snap, _key: card._key, _isNew: false } : card;
    }));
    showToast("Da hoan tac the");
  }, [cardSnaps, showToast]);

  const undoDeckMeta = () => {
    setDeckMeta(metaSnap);
    setDeckCoverFile(null);
    setDeckCoverPreview(metaSnap.coverUrl);
    showToast("Da hoan tac thong tin bo the");
  };

  const undoAllChanges = () => {
    loadDeck();
    showToast("Da hoan tac tat ca thay doi");
  };

  const toggleCard = useCallback((key) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const expandAll = () => setCollapsedIds(new Set());
  const collapseAll = () => setCollapsedIds(new Set(cards.map((card) => card._key)));

  const clearEmpty = () => {
    const before = cards.length;
    setCards((prev) => prev.filter((card) => card.hanzi.trim() || card.meaning.trim()));
    const remaining = cards.filter((card) => card.hanzi.trim() || card.meaning.trim()).length;
    const removed = before - remaining;
    showToast(removed > 0 ? `Da xoa ${removed} the trong` : "Khong co the trong", removed > 0 ? "success" : "warn");
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.id != null) {
      setDeletedCardIds((prev) => Array.from(new Set([...prev, deleteTarget.id])));
    }
    setCards((prev) => prev.filter((card) => card._key !== deleteTarget._key));
    setDeleteTarget(null);
    showToast("Da danh dau xoa the");
  };

  const newCards = useMemo(() => cards.filter((card) => card._isNew), [cards]);
  const changedCards = useMemo(
    () => cards.filter((card) => !card._isNew && card.id != null && cardChanged(card, cardSnaps[card.id])),
    [cards, cardSnaps]
  );
  const deletedCount = deletedCardIds.length;
  const filledCount = cards.filter((card) => card.hanzi.trim() && card.meaning.trim()).length;
  const pct = cards.length ? Math.round((filledCount / cards.length) * 100) : 0;
  const hasChanges = isDeckChanged || newCards.length > 0 || changedCards.length > 0 || deletedCount > 0;

  const visibleCards = useMemo(() => (
    cards.filter((card) => {
      const q = search.trim().toLowerCase();
      const matchSearch = !q || [card.hanzi, card.pinyin, card.meaning, card.exampleZh]
        .some((field) => (field ?? "").toLowerCase().includes(q));

      if (!matchSearch) return false;
      if (filterTab === "new") return card._isNew;
      if (filterTab === "changed") return !card._isNew && card.id != null && cardChanged(card, cardSnaps[card.id]);
      if (filterTab === "ok") return !card._isNew && card.id != null && !cardChanged(card, cardSnaps[card.id]);
      return true;
    })
  ), [cards, search, filterTab, cardSnaps]);

  const validate = () => {
    if (!deckMeta.name.trim()) {
      showToast("Vui long nhap ten bo the", "warn");
      return false;
    }
    if (!deckMeta.level) {
      showToast("Vui long chon cap do HSK", "warn");
      return false;
    }
    if (!filledCount) {
      showToast("Can it nhat 1 the hop le", "warn");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate() || !deckId) return;

    try {
      setIsSaving(true);

      let finalImageUrl = deckMeta.coverUrl.trim();
      if (deckCoverFile) {
        const uploaded = await uploadImage(deckCoverFile);
        finalImageUrl = resolveImageUrl(uploaded);
      }

      await updateDeck(deckId, {
        title: deckMeta.name.trim(),
        subtitle: deckMeta.description.trim(),
        level: deckMeta.level,
        imageUrl: finalImageUrl,
      });

      if (deletedCardIds.length > 0) {
        await Promise.all(deletedCardIds.map((id) => deleteFlashcard(id)));
      }

      if (changedCards.length > 0) {
        await Promise.all(changedCards.map((card) => updateFlashcard(card.id, {
          deck: { id: Number(deckId) },
          hanzi: card.hanzi.trim(),
          pinyin: card.pinyin.trim(),
          meaning: card.meaning.trim(),
          exampleZh: card.exampleZh?.trim() || "",
          exampleVi: card.exampleVi?.trim() || "",
          stroke: card.stroke?.trim() || "",
          radical: card.radical?.trim() || "",
          tip: card.tips?.trim() || "",
          related: typeof card.related === "string"
            ? card.related.split(",").map((item) => item.trim()).filter(Boolean)
            : [],
          imageUrl: "",
        })));
      }

      const validNewCards = newCards.filter((card) => card.hanzi.trim() && card.meaning.trim());
      if (validNewCards.length > 0) {
        await Promise.all(validNewCards.map((card) => createFlashcard({
          deck: { id: Number(deckId) },
          hanzi: card.hanzi.trim(),
          pinyin: card.pinyin.trim(),
          meaning: card.meaning.trim(),
          exampleZh: card.exampleZh?.trim() || "",
          exampleVi: card.exampleVi?.trim() || "",
          stroke: card.stroke?.trim() || "",
          radical: card.radical?.trim() || "",
          tip: card.tips?.trim() || "",
          related: typeof card.related === "string"
            ? card.related.split(",").map((item) => item.trim()).filter(Boolean)
            : [],
          imageUrl: "",
        })));
      }

      await loadDeck();
      showToast("Cap nhat bo flashcard thanh cong");
    } catch (err) {
      showToast(err.response?.data?.message || err.message || "Khong the luu bo flashcard.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light">
        <MyHeader />
        <div className="mx-auto flex max-w-[1100px] flex-col items-center px-4 py-20 text-center">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
          <p className="mt-4 text-sm font-medium text-slate-500">Dang tai bo flashcard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-light">
        <MyHeader />
        <div className="mx-auto max-w-[1100px] px-4 py-20 text-center">
          <h2 className="text-2xl font-black text-slate-900">Khong tai duoc du lieu</h2>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
          <button
            type="button"
            onClick={() => navigate("/adminFlashCards")}
            className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white"
          >
            Ve danh sach
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <MyHeader />

      <div className="mx-auto max-w-[1100px] px-4 py-6 pb-36">
        <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-400">
          <span>Noi dung</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span>Quan ly Flashcards</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="max-w-[200px] truncate font-bold text-primary">{deckMeta.name || "Chinh sua bo the"}</span>
        </div>

        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">Chinh sua bo the</h1>
              {hasChanges ? <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">Chua luu</span> : null}
            </div>
            <p className="text-sm text-slate-400">Sua thong tin bo the va tung flashcard bang du lieu API that.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {hasChanges ? (
              <button
                type="button"
                onClick={undoAllChanges}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-500 transition-all hover:border-amber-400 hover:text-amber-600"
              >
                <span className="material-symbols-outlined text-[15px]">history</span>
                Hoan tac tat ca
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => navigate("/adminFlashCards")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:border-primary hover:text-primary"
            >
              Ve danh sach
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white transition-all hover:bg-primary-dark disabled:opacity-60"
            >
              <span className={`material-symbols-outlined text-[15px] ${isSaving ? "animate-spin" : ""}`}>{isSaving ? "sync" : "save"}</span>
              {isSaving ? "Dang luu..." : "Luu thay doi"}
            </button>
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary">description</span>
              <h2 className="text-xs font-black uppercase tracking-widest text-primary">Thong tin bo the</h2>
              {isDeckChanged ? <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">DA SUA</span> : null}
            </div>
            {isDeckChanged ? (
              <button type="button" onClick={undoDeckMeta} className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                <span className="material-symbols-outlined text-[13px]">undo</span>
                Hoan tac thong tin bo
              </button>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Field label="Ten bo the *" span={2}>
              <input
                type="text"
                value={deckMeta.name}
                onChange={(event) => updateMeta("name", event.target.value)}
                className={`${inputCls}${deckMeta.name !== metaSnap.name ? inputChangedCls : ""}`}
              />
            </Field>
            <Field label="Cap do HSK *">
              <select
                value={deckMeta.level}
                onChange={(event) => updateMeta("level", event.target.value)}
                className={`${selectCls}${deckMeta.level !== metaSnap.level ? inputChangedCls : ""}`}
              >
                <option value="">-- Chon cap do --</option>
                {HSK_LEVELS.map((level) => <option key={level} value={level}>{level}</option>)}
              </select>
            </Field>
            <Field label="Anh bia URL">
              <input
                type="url"
                value={deckMeta.coverUrl}
                onChange={(event) => {
                  updateMeta("coverUrl", event.target.value);
                  setDeckCoverFile(null);
                  setDeckCoverPreview(event.target.value);
                  if (coverUrlRef.current) {
                    URL.revokeObjectURL(coverUrlRef.current);
                    coverUrlRef.current = null;
                  }
                }}
                className={`${inputCls}${deckMeta.coverUrl !== metaSnap.coverUrl ? inputChangedCls : ""}`}
              />
            </Field>
            <Field label="Mo ta bo the" span={4}>
              <textarea
                rows={2}
                value={deckMeta.description}
                onChange={(event) => updateMeta("description", event.target.value)}
                className={`${inputCls} resize-none${deckMeta.description !== metaSnap.description ? inputChangedCls : ""}`}
              />
            </Field>
            <Field label="Upload anh moi" span={4}>
              <label className="group flex aspect-[3/1] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/20 bg-slate-50 transition-all hover:border-primary hover:bg-primary/5">
                {deckCoverPreview ? (
                  <img
                    src={deckCoverPreview}
                    alt="Deck cover preview"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-4xl text-primary/40 transition-colors group-hover:text-primary">image</span>
                    <p className="mt-2 text-sm font-medium text-slate-400">Click de chon anh bia moi</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    if (coverUrlRef.current) {
                      URL.revokeObjectURL(coverUrlRef.current);
                      coverUrlRef.current = null;
                    }
                    if (file) {
                      const preview = URL.createObjectURL(file);
                      coverUrlRef.current = preview;
                      setDeckCoverPreview(preview);
                    } else {
                      setDeckCoverPreview(deckMeta.coverUrl);
                    }
                    setDeckCoverFile(file);
                  }}
                  className="hidden"
                />
              </label>
            </Field>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
          {[
            { label: "Tong the", val: cards.length, color: "text-slate-700" },
            { label: "Hop le", val: filledCount, color: "text-green-700" },
            { label: "The moi", val: newCards.length, color: "text-blue-600" },
            { label: "Da sua", val: changedCards.length, color: "text-amber-600" },
            { label: "Da xoa", val: deletedCount, color: "text-red-500" },
          ].map((item) => (
            <div key={item.label} className="flex min-w-[60px] flex-col items-center">
              <span className={`text-2xl font-black leading-none ${item.color}`}>{item.val}</span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">{item.label}</span>
            </div>
          ))}
          <div className="ml-auto min-w-[80px] flex-1 max-w-[200px]">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-0.5 text-right text-[10px] text-slate-400">{pct}% hop le</p>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3">
          <span className="mr-2 text-xs font-bold uppercase tracking-widest text-slate-400">Hang loat:</span>
          <button type="button" onClick={expandAll} className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-[11px] font-bold text-green-700">Mo tat ca</button>
          <button type="button" onClick={collapseAll} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-600">Thu tat ca</button>
          <button type="button" onClick={() => addMultiple(5)} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">Them 5 the</button>
          <button type="button" onClick={clearEmpty} className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-bold text-red-600">Xoa the trong</button>
        </div>

        <div className="mb-4 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: `Tat ca (${cards.length})` },
              { key: "new", label: `Moi (${newCards.length})` },
              { key: "changed", label: `Da sua (${changedCards.length})` },
              { key: "ok", label: `Chua sua (${Math.max(cards.length - newCards.length - changedCards.length, 0)})` },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setFilterTab(item.key);
                  setSearch("");
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                  filterTab === item.key
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">search</span>
            <input
              type="text"
              value={search}
              placeholder="Tim theo Han tu, Pinyin, nghia..."
              onChange={(event) => setSearch(event.target.value)}
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
            <span className="material-symbols-outlined text-[15px] text-primary">style</span>
            {search || filterTab !== "all" ? `Hien thi ${visibleCards.length} / ${cards.length} the` : `Danh sach the (${cards.length})`}
          </h2>
          <button
            type="button"
            onClick={addCard}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition-all hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            Them 1 the
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {visibleCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-400">
              <span className="material-symbols-outlined text-5xl">manage_search</span>
              <p className="text-sm font-semibold">Khong co the phu hop.</p>
            </div>
          ) : visibleCards.map((card) => (
            <CardItem
              key={card._key}
              card={card}
              index={cards.findIndex((item) => item._key === card._key)}
              deckLevel={deckMeta.level}
              snapshot={card._isNew || card.id == null ? null : cardSnaps[card.id]}
              collapsed={collapsedIds.has(card._key)}
              onToggle={() => toggleCard(card._key)}
              onDelete={() => setDeleteTarget(card)}
              onUndo={() => undoCard(card._key)}
              onChange={(field, value) => updateCard(card._key, field, value)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addCard}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 py-4 text-sm font-bold text-slate-400 transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Them the moi
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-white/95 px-6 py-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <ProgressRing pct={pct} size={40} stroke={4} />
            <span className="absolute text-[9px] font-black text-primary">{pct}%</span>
          </div>
          <div>
            <p className="text-sm font-black text-slate-800">
              <span className="text-primary">{filledCount} the</span> hop le / {cards.length} tong
            </p>
            <p className="text-[11px] text-slate-400">
              {hasChanges
                ? [
                    newCards.length ? `+${newCards.length} the moi` : "",
                    changedCards.length ? `${changedCards.length} the da sua` : "",
                    deletedCount ? `${deletedCount} the da xoa` : "",
                    isDeckChanged ? "thong tin bo da sua" : "",
                  ].filter(Boolean).join(" · ")
                : "Chua co thay doi nao"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/adminFlashCards")}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-500 transition-all hover:border-red-300 hover:text-red-500"
          >
            Huy
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-dark disabled:opacity-60"
          >
            <span className={`material-symbols-outlined text-[16px] ${isSaving ? "animate-spin" : ""}`}>{isSaving ? "sync" : "save"}</span>
            {isSaving ? "Dang luu..." : "Luu thay doi"}
          </button>
        </div>
      </div>

      {deleteTarget ? (
        <DeleteModal
          card={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      ) : null}

      <Toast message={toast.message} type={toast.type} />

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

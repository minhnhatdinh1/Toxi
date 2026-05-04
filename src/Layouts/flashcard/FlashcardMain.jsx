import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MyHeader from "../mycourse/component/MyHeader.jsx";
import { getFlashcardsByDeckId } from "../admin/api/apiFlashCard";

function speak(text, lang) {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

function SpeakerButton({ text, lang, variant = "light", label, size = "sm" }) {
  const [playing, setPlaying] = useState(false);

  const handleSpeak = (event) => {
    event.stopPropagation();
    setPlaying(true);
    speak(text, lang);
    setTimeout(() => setPlaying(false), 1500);
  };

  const baseClass = `flex items-center gap-1.5 rounded-full border font-semibold transition-all duration-150 ${
    size === "xs" ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
  }`;

  const variantClass =
    variant === "dark"
      ? playing
        ? "border-white/60 bg-white/30 text-white"
        : "border-white/30 bg-white/10 text-white/80 hover:bg-white/20"
      : playing
        ? "border-primary bg-primary/20 text-primary"
        : "border-slate-200 bg-slate-100 text-slate-500 hover:border-primary hover:text-primary";

  return (
    <button type="button" onClick={handleSpeak} className={`${baseClass} ${variantClass}`}>
      <span className={`material-symbols-outlined ${size === "xs" ? "text-[13px]" : "text-[15px]"} ${playing ? "animate-pulse" : ""}`}>
        {playing ? "graphic_eq" : "volume_up"}
      </span>
      {label}
    </button>
  );
}

function ProgressRing({ pct, size = 48, stroke = 4, color = "#1D9E75" }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
    </svg>
  );
}

function normalizeFlashcard(card) {
  return {
    id: card.id,
    deckId: card.deckId,
    hanzi: card.hanzi || "",
    pinyin: card.pinyin || "",
    meaning: card.meaning || "",
    exampleZh: card.exampleZh || "",
    exampleVi: card.exampleVi || "",
    stroke: card.stroke || "Chua cap nhat",
    radical: card.radical || "Chua cap nhat",
    tip: card.tip || "Chua co meo ghi nho cho the nay.",
    related: Array.isArray(card.related) ? card.related : [],
  };
}

function LeftSidebar({ flashcards, currentIdx, setCurrentIdx, setIsFlipped, knownIds, unknownIds }) {
  const progress = flashcards.length > 0 ? Math.round((knownIds.size / flashcards.length) * 100) : 0;

  return (
    <aside className="hidden w-[280px] shrink-0 flex-col gap-4 py-6 pl-6 pr-2 lg:flex">
      <div className="rounded-2xl border border-slate-100 bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Tien do hoc</span>
          <span className="text-xs font-black text-primary">{progress}%</span>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Tong", value: flashcards.length, className: "bg-slate-50 text-slate-700" },
            { label: "Da thuoc", value: knownIds.size, className: "bg-green-50 text-green-700" },
            { label: "Chua thuoc", value: unknownIds.size, className: "bg-red-50 text-red-600" },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl p-2 ${item.className}`}>
              <p className="text-xl font-black">{item.value}</p>
              <p className="mt-0.5 text-[9px] font-semibold text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
          <span className="material-symbols-outlined text-[16px] text-primary">style</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Danh sach the</span>
        </div>
        <div className="custom-scrollbar flex max-h-[360px] flex-col overflow-y-auto">
          {flashcards.map((card, index) => {
            const isActive = index === currentIdx;
            const isKnown = knownIds.has(card.id);
            const isUnknown = unknownIds.has(card.id);

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => {
                  setCurrentIdx(index);
                  setIsFlipped(false);
                }}
                className={`flex items-center gap-3 border-b border-slate-50 px-4 py-3 text-left transition-all last:border-0 ${
                  isActive ? "bg-primary/8" : "hover:bg-slate-50"
                }`}
              >
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-lg font-black ${
                  isActive ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {card.hanzi?.[0] || "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm font-bold ${isActive ? "text-primary" : "text-slate-700"}`}>{card.hanzi}</p>
                  <p className="truncate text-[11px] text-slate-400">{card.pinyin} · {card.meaning}</p>
                </div>
                {isKnown ? <span className="material-symbols-outlined shrink-0 text-[16px] text-green-500">check_circle</span> : null}
                {isUnknown ? <span className="material-symbols-outlined shrink-0 text-[16px] text-red-400">cancel</span> : null}
                {!isKnown && !isUnknown ? <span className="size-2 shrink-0 rounded-full bg-slate-200" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">lightbulb</span>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Meo hoc</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          Hay doc to chu Han khi lat the de ket hop ca tri nho thi giac va thinh giac.
        </p>
      </div>
    </aside>
  );
}

function RightSidebar({ card, flashcards, knownIds }) {
  const masteryPct = flashcards.length > 0 ? Math.round((knownIds.size / flashcards.length) * 100) : 0;

  if (!card) return null;

  return (
    <aside className="hidden w-[280px] shrink-0 flex-col gap-4 py-6 pr-6 pl-2 lg:flex">
      <div className="rounded-2xl border border-slate-100 bg-white p-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">info</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Thong tin tu</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { icon: "gesture", label: "So net", value: card.stroke },
            { icon: "category", label: "Bo thu", value: card.radical },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-slate-50 p-2.5">
              <div className="mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-slate-400">{item.icon}</span>
                <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{item.label}</span>
              </div>
              <p className="text-xs font-bold text-slate-700">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {card.related.length > 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary">hub</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Tu lien quan</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {card.related.map((item) => (
              <div key={item} className="flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 px-2.5 py-1.5">
                <span className="text-sm font-black text-primary">{item}</span>
                <SpeakerButton text={item} lang="zh-CN" size="xs" />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-100 bg-white p-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-amber-500">lightbulb</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Meo ghi nho</span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-600">{card.tip}</p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4">
        <div className="relative flex shrink-0 items-center justify-center">
          <ProgressRing pct={masteryPct} size={60} stroke={6} color="#1D9E75" />
          <span className="absolute text-[11px] font-black text-primary">{masteryPct}%</span>
        </div>
        <div>
          <p className="text-sm font-black text-slate-800">Muc thanh thao</p>
          <p className="mt-0.5 text-xs text-slate-400">
            Da thuoc <span className="font-bold text-green-600">{knownIds.size}/{flashcards.length}</span> the
          </p>
        </div>
      </div>
    </aside>
  );
}

export default function FlashcardMain() {
  const location = useLocation();
  const { deckId } = useParams();

  const [flashcards, setFlashcards] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState(new Set());
  const [unknownIds, setUnknownIds] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("all");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getFlashcardsByDeckId(deckId);
        const payload = Array.isArray(response.data) ? response.data.map(normalizeFlashcard) : [];

        if (!mounted) return;
        setFlashcards(payload);
        setCurrentIdx(0);
        setIsFlipped(false);
        setKnownIds(new Set());
        setUnknownIds(new Set());
        setActiveFilter("all");
        setShowResult(false);
      } catch (err) {
        if (!mounted) return;
        setError(err.response?.data?.message || "Khong the tai flashcard cua bo the nay.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (deckId) {
      fetchFlashcards();
    }

    return () => {
      mounted = false;
    };
  }, [deckId]);

  const filtered = useMemo(() => {
    return flashcards.filter((card) => {
      if (activeFilter === "known") return knownIds.has(card.id);
      if (activeFilter === "unknown") return unknownIds.has(card.id);
      return true;
    });
  }, [activeFilter, flashcards, knownIds, unknownIds]);

  useEffect(() => {
    if (filtered.length === 0) {
      setCurrentIdx(0);
      return;
    }

    setCurrentIdx((prev) => Math.min(prev, filtered.length - 1));
  }, [filtered.length]);

  const card = filtered[currentIdx] ?? filtered[0] ?? null;
  const progress = flashcards.length > 0 ? Math.round((knownIds.size / flashcards.length) * 100) : 0;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const value = params.get("card");
    if (value === null || flashcards.length === 0) return;

    const index = Number.parseInt(value, 10);
    if (!Number.isNaN(index) && index >= 0 && index < flashcards.length) {
      setCurrentIdx(index);
    }
  }, [location.search, flashcards.length]);

  const goNext = useCallback(() => {
    if (filtered.length === 0) return;
    setCurrentIdx((prev) => (prev + 1) % filtered.length);
    setIsFlipped(false);
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    if (filtered.length === 0) return;
    setCurrentIdx((prev) => (prev - 1 + filtered.length) % filtered.length);
    setIsFlipped(false);
  }, [filtered.length]);

  const markKnown = () => {
    if (!card) return;

    setKnownIds((prev) => new Set([...prev, card.id]));
    setUnknownIds((prev) => {
      const next = new Set(prev);
      next.delete(card.id);
      return next;
    });

    if (currentIdx < filtered.length - 1) {
      goNext();
    } else {
      setShowResult(true);
    }
  };

  const markUnknown = () => {
    if (!card) return;

    setUnknownIds((prev) => new Set([...prev, card.id]));
    setKnownIds((prev) => {
      const next = new Set(prev);
      next.delete(card.id);
      return next;
    });

    goNext();
  };

  const resetAll = () => {
    setKnownIds(new Set());
    setUnknownIds(new Set());
    setCurrentIdx(0);
    setIsFlipped(false);
    setShowResult(false);
    setActiveFilter("all");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light">
        <MyHeader />
        <main className="flex min-h-[70vh] items-center justify-center p-6">
          <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
            <h2 className="mt-5 text-2xl font-black text-slate-900">Dang tai flashcard</h2>
            <p className="mt-2 text-slate-500">Cho minh lay du lieu cua bo the nay nhe.</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-light">
        <MyHeader />
        <main className="flex min-h-[70vh] items-center justify-center p-6">
          <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400">
              <span className="material-symbols-outlined text-[32px]">error</span>
            </div>
            <h2 className="mt-5 text-2xl font-black text-slate-900">Khong tai duoc flashcard</h2>
            <p className="mt-2 text-slate-500">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-background-light flex flex-col">
        <MyHeader />
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl bg-white p-10 text-center shadow-2xl">
            <div className="relative flex items-center justify-center">
              <ProgressRing pct={progress} size={100} stroke={7} color="#1D9E75" />
              <span className="absolute text-2xl font-black text-primary">{progress}%</span>
            </div>
            <div>
              <h2 className="mb-1 text-2xl font-black text-slate-900">Hoan thanh!</h2>
              <p className="text-sm text-slate-500">
                Ban da thuoc <span className="font-bold text-green-600">{knownIds.size}</span> / {flashcards.length} the
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-2xl font-black text-green-700">{knownIds.size}</p>
                <p className="mt-1 text-xs font-semibold text-green-600">Da thuoc</p>
              </div>
              <div className="rounded-2xl bg-red-50 p-4">
                <p className="text-2xl font-black text-red-700">{unknownIds.size}</p>
                <p className="mt-1 text-xs font-semibold text-red-600">Chua thuoc</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3">
              {unknownIds.size > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("unknown");
                    setCurrentIdx(0);
                    setIsFlipped(false);
                    setShowResult(false);
                  }}
                  className="w-full rounded-2xl bg-primary py-3 font-bold text-white transition-colors hover:bg-primary-dark"
                >
                  On lai the chua thuoc ({unknownIds.size})
                </button>
              ) : null}
              <button
                type="button"
                onClick={resetAll}
                className="w-full rounded-2xl bg-slate-100 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-200"
              >
                Hoc lai tu dau
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      <MyHeader />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1">
        <LeftSidebar
          flashcards={flashcards}
          currentIdx={currentIdx}
          setCurrentIdx={setCurrentIdx}
          setIsFlipped={setIsFlipped}
          knownIds={knownIds}
          unknownIds={unknownIds}
        />

        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto flex max-w-xl flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">Hoc tu vung</p>
                <h2 className="text-xl font-black text-slate-900">Bo the {deckId}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Tien do</p>
                  <p className="text-sm font-black text-primary">{knownIds.size}/{flashcards.length}</p>
                </div>
                <div className="relative flex items-center justify-center">
                  <ProgressRing pct={progress} size={44} stroke={4} />
                  <span className="absolute text-[10px] font-black text-primary">{progress}%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: `Tat ca (${flashcards.length})` },
                { key: "unknown", label: `Chua thuoc (${unknownIds.size})` },
                { key: "known", label: `Da thuoc (${knownIds.size})` },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveFilter(item.key);
                    setCurrentIdx(0);
                    setIsFlipped(false);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                    activeFilter === item.key
                      ? "border-primary bg-primary text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {card ? (
              <>
                <div
                  className="w-full cursor-pointer"
                  style={{ perspective: "1200px" }}
                  onClick={() => setIsFlipped((prev) => !prev)}
                >
                  <div
                    className="relative w-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      minHeight: "380px",
                    }}
                  >
                    <div
                      className="absolute inset-0 flex min-h-[380px] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-primary/20 bg-white shadow-xl"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className="absolute top-3 right-4" onClick={(event) => event.stopPropagation()}>
                        <SpeakerButton text={card.hanzi} lang="zh-CN" label="Tieng Trung" />
                      </div>
                      <h3 className="text-8xl font-black leading-none tracking-tighter text-primary sm:text-9xl">{card.hanzi}</h3>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">gesture</span>
                          {card.stroke}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">category</span>
                          {card.radical}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 animate-pulse">Nhan de xem nghia</p>
                      <div className="flex items-center justify-center gap-1.5">
                        {filtered.map((_, index) => (
                          <div
                            key={index}
                            className={`rounded-full transition-all duration-300 ${
                              index === currentIdx ? "h-2 w-5 bg-primary" : "h-2 w-2 bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 flex min-h-[380px] flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#085041] px-6 py-7 pb-24 text-center shadow-xl sm:px-8"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[140px] font-black leading-none text-white/5 select-none sm:text-[170px]">
                        {card.hanzi}
                      </span>

                      <div className="relative z-10 flex flex-col items-center gap-3 pt-2">
                        <span className="max-w-full break-words px-4 text-2xl font-black tracking-[0.16em] text-[#9FE1CB] sm:text-4xl">
                          {card.pinyin}
                        </span>
                        <h3 className="max-w-[88%] break-words text-4xl font-black leading-tight text-white sm:text-6xl">
                          {card.meaning}
                        </h3>
                        <div className="mt-1 h-0.5 w-12 rounded-full bg-white/20" />
                      </div>

                      <div className="relative z-10 flex flex-1 items-center py-4">
                        {(card.exampleZh || card.exampleVi) ? (
                          <div className="w-full rounded-2xl bg-white/10 p-4 sm:p-5">
                            <div className="text-left">
                              {card.exampleZh ? <p className="text-sm font-semibold italic leading-relaxed text-white sm:text-base">"{card.exampleZh}"</p> : null}
                              {card.exampleVi ? <p className="mt-1 text-xs leading-relaxed text-white/70 sm:text-sm">{card.exampleVi}</p> : null}
                            </div>
                          </div>
                        ) : (
                          <p className="w-full text-sm font-medium text-white/70">Nhan nut loa de nghe phat am va nghia cua the.</p>
                        )}
                      </div>

                      <div
                        className="absolute inset-x-6 bottom-6 z-10 flex flex-wrap justify-center gap-2 sm:inset-x-8"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <SpeakerButton text={card.hanzi} lang="zh-CN" variant="dark" label="Phat am (TQ)" />
                        <SpeakerButton text={card.meaning} lang="vi-VN" variant="dark" label="Phat am (VN)" />
                        {card.exampleZh ? (
                          <SpeakerButton text={card.exampleZh} lang="zh-CN" variant="dark" label="Doc vi du" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={markUnknown}
                    className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 text-sm font-bold text-red-600 transition-all hover:bg-red-100"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                    Chua thuoc
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFlipped((prev) => !prev)}
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:scale-110"
                  >
                    <span className="material-symbols-outlined text-[26px]">sync</span>
                  </button>
                  <button
                    type="button"
                    onClick={markKnown}
                    className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 text-sm font-bold text-green-700 transition-all hover:bg-green-100"
                  >
                    <span className="material-symbols-outlined text-[20px]">check</span>
                    Da thuoc
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 pb-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all hover:border-primary hover:text-primary"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <span className="text-sm font-bold text-slate-400">The {currentIdx + 1} / {filtered.length}</span>
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all hover:border-primary hover:text-primary"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-24 text-slate-400">
                <span className="material-symbols-outlined text-5xl">style</span>
                <p className="font-semibold">Khong co the nao trong bo loc nay</p>
                <button type="button" onClick={() => setActiveFilter("all")} className="text-sm font-bold text-primary underline">
                  Xem tat ca
                </button>
              </div>
            )}
          </div>
        </main>

        <RightSidebar card={card} flashcards={flashcards} knownIds={knownIds} />
      </div>
    </div>
  );
}

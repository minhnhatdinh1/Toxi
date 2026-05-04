import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDecks } from "../admin/api/apiFlashCard";

const FILTERS = ["Tat ca", "HSK 1", "HSK 2", "HSK 4", "HSK 6"];

const DECK_THEMES = [
  {
    coverClass: "from-emerald-100 via-lime-50 to-cyan-50",
    accentClass: "bg-emerald-600",
    textClass: "text-emerald-700",
    icon: "front_hand",
  },
  {
    coverClass: "from-amber-100 via-orange-50 to-yellow-50",
    accentClass: "bg-amber-500",
    textClass: "text-amber-700",
    icon: "diversity_3",
  },
  {
    coverClass: "from-sky-100 via-cyan-50 to-blue-50",
    accentClass: "bg-sky-600",
    textClass: "text-sky-700",
    icon: "palette",
  },
  {
    coverClass: "from-indigo-100 via-violet-50 to-indigo-50",
    accentClass: "bg-indigo-600",
    textClass: "text-indigo-700",
    icon: "shopping_bag",
  },
  {
    coverClass: "from-rose-100 via-pink-50 to-rose-50",
    accentClass: "bg-rose-600",
    textClass: "text-rose-700",
    icon: "auto_stories",
  },
  {
    coverClass: "from-slate-800 via-indigo-800 to-blue-800",
    accentClass: "bg-slate-900",
    textClass: "text-slate-100",
    icon: "workspace_premium",
  },
];

function decorateDeck(deck, index) {
  return {
    ...deck,
    ...DECK_THEMES[index % DECK_THEMES.length],
  };
}

function DeckCard({ deck, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full max-w-[520px] overflow-hidden rounded-[22px] border border-slate-200 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${deck.coverClass} px-4 py-3`}>
        {deck.imageUrl ? (
          <img
            src={deck.imageUrl}
            alt={deck.title}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
        ) : null}
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/25" />
        <div className="absolute bottom-2 right-4 h-16 w-16 rounded-full border border-white/20" />
        <div className="relative z-10 flex items-start justify-between">
          <span className={`rounded-full border border-white/70 bg-white/60 px-2.5 py-1 text-[11px] font-bold ${deck.textClass}`}>
            {deck.level || "Chua phan cap"}
          </span>
          <span className="rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-bold text-white">
            {deck.cardCount} the
          </span>
        </div>
      </div>

      <div className="px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[1.45rem] font-black leading-tight tracking-tight text-slate-900">{deck.title}</h3>
            <p className="mt-1 text-sm leading-5 text-slate-500">{deck.subtitle || "Bo the tieng Trung"}</p>
          </div>
          <span className={`mt-1 h-2.5 w-2.5 rounded-full ${deck.accentClass}`} />
        </div>

        <div className="mt-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px] text-slate-500">
            <span className="material-symbols-outlined text-[16px] text-primary">style</span>
            {deck.cardCount} flashcard
          </div>
          <span className="text-[15px] font-bold text-primary transition group-hover:translate-x-1">Hoc ngay</span>
        </div>
      </div>
    </button>
  );
}

export default function FlashCard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tat ca");
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchDecks = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getDecks();
        const payload = Array.isArray(response.data) ? response.data : [];

        if (!mounted) return;
        setDecks(payload.map((deck, index) => decorateDeck(deck, index)));
      } catch (err) {
        if (!mounted) return;
        setError(err.response?.data?.message || "Khong the tai danh sach bo the.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDecks();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredDecks = useMemo(() => {
    return decks.filter((deck) => {
      const bySearch = `${deck.title || ""} ${deck.subtitle || ""}`.toLowerCase().includes(search.toLowerCase());
      const byFilter = filter === "Tat ca" || deck.level === filter;
      return bySearch && byFilter;
    });
  }, [decks, filter, search]);

  const groupedDecks = useMemo(() => {
    if (filter !== "Tat ca") {
      return [{ label: filter, decks: filteredDecks }];
    }

    return ["HSK 1", "HSK 2", "HSK 4", "HSK 6"]
      .map((level) => ({ label: level, decks: filteredDecks.filter((deck) => deck.level === level) }))
      .filter((group) => group.decks.length > 0);
  }, [filter, filteredDecks]);

  const totalCards = useMemo(
    () => decks.reduce((sum, deck) => sum + (Number(deck.cardCount) || 0), 0),
    [decks]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 xl:px-8">
        <main className="min-w-0">
          <section className="overflow-hidden rounded-[36px] bg-gradient-to-br from-primary via-[#313ea0] to-[#4150b8] text-white shadow-[0_20px_80px_rgba(49,62,160,0.25)]">
            <div className="relative overflow-hidden px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
              <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-white/5" />
              <div className="absolute right-14 top-8 h-48 w-48 rounded-full bg-white/5" />
              <div className="absolute bottom-0 left-1/4 h-44 w-44 rounded-full bg-white/5" />
              <div className="absolute bottom-8 right-1/4 h-52 w-52 rounded-full bg-white/5" />

              <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-secondary backdrop-blur-sm">
                  <span className="material-symbols-outlined text-base">style</span>
                  Flashcard tieng Trung
                </div>
                <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Hoc tu vung hieu qua,
                  <span className="block text-secondary">nho lau hon</span>
                </h1>
                <p className="mt-5 text-lg text-white/70">
                  {decks.length} bo the · {totalCards} flashcard · Phu hop theo cap do
                </p>

                <div className="mt-10 w-full max-w-xl">
                  <label className="group flex items-center gap-3 rounded-[22px] bg-white px-5 py-4 shadow-2xl shadow-slate-950/15">
                    <span className="material-symbols-outlined text-slate-400 transition group-focus-within:text-primary">search</span>
                    <input
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Tim bo the theo ten..."
                      className="w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="sticky top-24 z-30 mt-6 rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {FILTERS.map((item) => {
                  const isActive = item === filter;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                        isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-primary"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm font-medium text-slate-400">{filteredDecks.length} bo the</p>
            </div>

            <div className="grid gap-4 border-t border-slate-100 px-6 py-5 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: "style", value: decks.length, label: "Tong bo the" },
                { icon: "layers", value: totalCards, label: "Tong flashcard" },
                { icon: "workspace_premium", value: "HSK 1-6", label: "Cap do" },
                { icon: "auto_awesome", value: "100%", label: "Mien phi" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-2xl font-black tracking-tight text-slate-900">{item.value}</p>
                    <p className="text-sm text-slate-400">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-10">
            {loading ? (
              <div className="rounded-[30px] border border-slate-200 bg-white px-6 py-16 text-center">
                <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
                <h2 className="mt-5 text-2xl font-black text-slate-900">Dang tai bo the</h2>
                <p className="mt-2 text-slate-500">Cho minh lay du lieu tu he thong nhe.</p>
              </div>
            ) : error ? (
              <div className="rounded-[30px] border border-dashed border-red-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400">
                  <span className="material-symbols-outlined text-[32px]">error</span>
                </div>
                <h2 className="mt-5 text-2xl font-black text-slate-900">Khong tai duoc bo the</h2>
                <p className="mt-2 text-slate-500">{error}</p>
              </div>
            ) : filteredDecks.length === 0 ? (
              <div className="rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <span className="material-symbols-outlined text-[32px]">search_off</span>
                </div>
                <h2 className="mt-5 text-2xl font-black text-slate-900">Khong tim thay bo the nao</h2>
                <p className="mt-2 text-slate-500">Thu doi tu khoa tim kiem hoac chuyen bo loc HSK.</p>
              </div>
            ) : (
              groupedDecks.map((group) => (
                <div key={group.label}>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-8 w-1.5 rounded-full bg-primary" />
                    <h2 className="text-3xl font-black tracking-tight text-slate-900">{group.label}</h2>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                      {group.decks.length} bo
                    </span>
                  </div>

                  <div className="grid max-w-[980px] justify-start gap-6 md:grid-cols-[repeat(2,minmax(0,300px))]">
                    {group.decks.map((deck) => (
                      <DeckCard
                        key={deck.id}
                        deck={deck}
                        onClick={() => navigate(`/flashcard/session/${deck.id}`)}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

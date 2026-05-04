import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { getDecks } from "./api/apiFlashCard";

const FILTERS = ["Tat ca", "HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];

const COLOR_BY_LEVEL = {
  "HSK 1": "from-emerald-100 via-lime-50 to-cyan-50",
  "HSK 2": "from-sky-100 via-cyan-50 to-blue-50",
  "HSK 3": "from-violet-100 via-fuchsia-50 to-indigo-50",
  "HSK 4": "from-amber-100 via-orange-50 to-yellow-50",
  "HSK 5": "from-pink-100 via-rose-50 to-red-50",
  "HSK 6": "from-slate-800 via-indigo-800 to-blue-800",
};

function DeckCard({ deck, onLearn }) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
      <div className={`relative h-40 bg-gradient-to-br ${COLOR_BY_LEVEL[deck.level] || "from-slate-100 to-slate-50"} px-5 py-4`}>
        {deck.imageUrl ? <img src={deck.imageUrl} alt={deck.title} className="absolute inset-0 h-full w-full object-cover opacity-20" /> : null}
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/25" />
        <div className="relative z-10 flex items-start justify-between">
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-black text-slate-700">{deck.level || "Chua phan cap"}</span>
          <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-black text-white">{deck.cardCount || 0} the</span>
        </div>
        <div className="relative z-10 mt-8 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/50 text-slate-800 shadow-lg">
            <span className="material-symbols-outlined text-[30px]">style</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-black text-slate-900">{deck.title}</h3>
        <p className="mt-2 min-h-[40px] text-sm leading-5 text-slate-500">{deck.subtitle || "Bo the flashcard tieng Trung"}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm font-bold text-slate-500">{deck.cardCount || 0} flashcard</div>
          <button
            type="button"
            onClick={onLearn}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            Hoc ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminFlashCardPage() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tat ca");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchDecks = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getDecks();
        if (!mounted) return;
        setDecks(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        if (!mounted) return;
        setError(err.response?.data?.message || "Khong the tai bo the.");
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
      const matchesSearch = `${deck.title || ""} ${deck.subtitle || ""}`.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "Tat ca" || deck.level === filter;
      return matchesSearch && matchesFilter;
    });
  }, [decks, filter, search]);

  const totalCards = useMemo(
    () => decks.reduce((sum, deck) => sum + (Number(deck.cardCount) || 0), 0),
    [decks]
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="flex-1 px-8 py-6">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Admin / Flashcard page</p>
            <h1 className="text-3xl font-black text-slate-900">Quan ly bo the flashcard</h1>
            <p className="mt-2 text-sm text-slate-500">Theo doi bo the dang hien thi cho nguoi hoc va tao bo moi khi can.</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/adminFlashCards")}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Ve dashboard
            </button>
            <button
              type="button"
              onClick={() => navigate("/adminAddNewFlashcard")}
              className="rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              Them bo the
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { label: "Tong bo the", value: decks.length, icon: "style" },
            { label: "Tong the", value: totalCards, icon: "layers" },
            { label: "Da co anh bia", value: decks.filter((deck) => !!deck.imageUrl).length, icon: "image" },
            { label: "Da san sang hoc", value: decks.filter((deck) => (Number(deck.cardCount) || 0) > 0).length, icon: "school" },
          ].map((item) => (
            <div key={item.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900">{item.value}</p>
                  <p className="text-sm text-slate-400">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[280px] flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tim bo the..."
                className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    filter === item ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:text-primary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="py-20 text-center">
                <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
                <p className="mt-4 text-sm font-medium text-slate-500">Dang tai bo the...</p>
              </div>
            ) : error ? (
              <div className="py-16 text-center">
                <h2 className="text-xl font-black text-slate-900">Khong tai duoc du lieu</h2>
                <p className="mt-2 text-sm text-slate-500">{error}</p>
              </div>
            ) : filteredDecks.length === 0 ? (
              <div className="py-16 text-center">
                <h2 className="text-xl font-black text-slate-900">Khong co bo the nao phu hop</h2>
                <p className="mt-2 text-sm text-slate-500">Thu doi tu khoa hoac tao bo flashcard moi.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredDecks.map((deck) => (
                  <DeckCard key={deck.id} deck={deck} onLearn={() => navigate(`/flashcard/session/${deck.id}`)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

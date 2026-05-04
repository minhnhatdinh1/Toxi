import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { deleteDeck, getDecks } from "./api/apiFlashCard";

const LEVELS = ["Tat ca", "HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];

function LevelBadge({ level }) {
  const map = {
    "HSK 1": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "HSK 2": "bg-sky-50 text-sky-700 border-sky-200",
    "HSK 3": "bg-violet-50 text-violet-700 border-violet-200",
    "HSK 4": "bg-amber-50 text-amber-700 border-amber-200",
    "HSK 5": "bg-rose-50 text-rose-700 border-rose-200",
    "HSK 6": "bg-slate-900 text-white border-slate-900",
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${map[level] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
      {level || "Chua phan cap"}
    </span>
  );
}

function DeleteModal({ deck, onClose, onConfirm, deleting }) {
  if (!deck) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <span className="material-symbols-outlined">delete</span>
        </div>
        <h2 className="mt-4 text-center text-2xl font-black text-slate-900">Xoa bo the?</h2>
        <p className="mt-2 text-center text-sm leading-6 text-slate-500">
          Bo the <span className="font-bold text-slate-700">{deck.title}</span> se bi xoa khoi he thong.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Huy
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Dang xoa..." : "Xoa"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminFlashCard() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("Tat ca");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

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
      const keyword = `${deck.title || ""} ${deck.subtitle || ""}`.toLowerCase();
      const bySearch = keyword.includes(search.toLowerCase());
      const byLevel = levelFilter === "Tat ca" || deck.level === levelFilter;
      return bySearch && byLevel;
    });
  }, [decks, levelFilter, search]);

  const totalCards = useMemo(
    () => decks.reduce((sum, deck) => sum + (Number(deck.cardCount) || 0), 0),
    [decks]
  );

  const handleDeleteDeck = async (deckId = deleteTarget?.id) => {
    if (!deckId) return;

    try {
      setDeleting(true);
      await deleteDeck(deckId);
      setDecks((prev) => prev.filter((deck) => deck.id !== deckId));
      setDeleteTarget(null);
    } catch (err) {
      setError(err.response?.data?.message || "Khong the xoa bo the nay.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="flex-1">
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-5">
            <div>
              <p className="text-sm text-slate-400">Noi dung / Quan ly flashcard</p>
              <h1 className="text-2xl font-black text-slate-900">Admin Flashcard</h1>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/adminflashcardPage")}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Xem danh sach
              </button>
              <button
                type="button"
                onClick={() => navigate("/adminAddNewFlashcard")}
                className="rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Tao bo the moi
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-8 py-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Tong bo the", value: decks.length, icon: "style" },
              { label: "Tong flashcard", value: totalCards, icon: "layers" },
              { label: "Bo co noi dung", value: decks.filter((deck) => (Number(deck.cardCount) || 0) > 0).length, icon: "task_alt" },
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

          <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 px-6 py-5">
              <div className="relative min-w-[260px] flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tim theo ten bo the..."
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setLevelFilter(level)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      levelFilter === level ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:text-primary"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
                <p className="mt-4 text-sm font-medium text-slate-500">Dang tai danh sach bo the...</p>
              </div>
            ) : error ? (
              <div className="px-6 py-16 text-center">
                <p className="text-lg font-black text-slate-900">Khong tai duoc du lieu</p>
                <p className="mt-2 text-sm text-slate-500">{error}</p>
              </div>
            ) : filteredDecks.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="text-lg font-black text-slate-900">Chua co bo the nao</p>
                <p className="mt-2 text-sm text-slate-500">Tao bo the moi de hien thi o trang flashcard nguoi dung.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      <th className="px-6 py-4">Bo the</th>
                      <th className="px-6 py-4">Cap do</th>
                      <th className="px-6 py-4">So the</th>
                      <th className="px-6 py-4">Trang thai</th>
                      <th className="px-6 py-4 text-right">Thao tac</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDecks.map((deck) => (
                      <tr key={deck.id} className="border-b border-slate-100 last:border-b-0">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            {deck.imageUrl ? (
                              <img
                                src={deck.imageUrl}
                                alt={deck.title}
                                className="h-14 w-20 rounded-2xl object-cover"
                              />
                            ) : (
                              <div className="flex h-14 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">style</span>
                              </div>
                            )}
                            <div>
                              <p className="text-base font-black text-slate-900">{deck.title}</p>
                              <p className="mt-1 text-sm text-slate-400">{deck.subtitle || "Bo the flashcard tieng Trung"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <LevelBadge level={deck.level} />
                        </td>
                        <td className="px-6 py-5 text-sm font-bold text-slate-700">{deck.cardCount || 0} the</td>
                        <td className="px-6 py-5">
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">San sang</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => navigate(`/flashcard/session/${deck.id}`)}
                              title="Xem flashcard"
                              aria-label="Xem flashcard"
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-primary hover:text-primary"
                            >
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => navigate(`/adminEditFlashcard/${deck.id}`)}
                              title="Sua bo flashcard"
                              aria-label="Sua bo flashcard"
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 text-amber-500 transition hover:bg-amber-50 hover:text-amber-600"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                setDeleteTarget(deck);
                              }}
                              title="Xoa bo flashcard"
                              aria-label="Xoa bo flashcard"
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <DeleteModal
        deck={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => handleDeleteDeck(deleteTarget?.id)}
        deleting={deleting}
      />
    </div>
  );
}

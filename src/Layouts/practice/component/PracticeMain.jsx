import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatExamPayload(quiz) {
  return {
    id: quiz.quizId,
    title: quiz.title || "De thi HSK",
    level: `HSK ${quiz.hsklevel || 1}`,
    description: quiz.description || "De luyen tap duoc bien soan de ban lam quen voi cau truc bai thi.",
    image:
      quiz.thumbnail ||
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
    duration: `${quiz.timeLimit || 0} phut`,
    questions: `${quiz.totalQuestions || 0} cau`,
    attempts: `${quiz.playCount || 0} luot`,
    rating: 4.8,
  };
}

export default function PracticeMain() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/quizzes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Loi API: " + res.status);
        return res.json();
      })
      .then((res) => {
        setExamData((res.data || []).map(formatExamPayload));
      })
      .catch((err) => {
        console.error("Loi:", err);
      });
  }, []);

  const filteredExams = examData
    .filter((exam) => {
      const haystack = `${exam.title} ${exam.description}`.toLowerCase();
      const matchSearch = haystack.includes(searchTerm.toLowerCase());
      const matchLevel = !selectedLevel || exam.level === selectedLevel;
      return matchSearch && matchLevel;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "popular") return parseInt(b.attempts, 10) - parseInt(a.attempts, 10);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const goToDetail = (id) => {
    navigate(`/quiz/${id}`);
  };

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-16 md:px-10 lg:px-14">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-secondary/15 blur-3xl" />
          <div className="absolute left-20 top-28 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(248,250,252,0.88)_45%,_rgba(255,248,235,0.8)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-secondary/20 bg-white/80 px-4 py-2 shadow-sm">
              <div className="h-[2px] w-8 bg-secondary" />
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-secondary">
                HSK Preparation
              </span>
              <div className="h-[2px] w-8 bg-secondary" />
            </div>

            <h1 className="mb-5 text-4xl font-black tracking-tight text-primary md:text-6xl">
              Ngan hang de thi{" "}
              <span className="bg-gradient-to-b from-secondary to-orange-300 bg-clip-text text-transparent">
                HSK
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-8 text-slate-600 md:text-xl">
              Kham pha kho de thi duoc bien soan ky luong, chia theo cap do va toi uu de ban
              luyen de nhanh truoc khi vao bai thi that.
            </p>
          </div>

          <div className="mt-12 rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur md:p-7">
            <div className="grid gap-5 lg:grid-cols-[1.3fr_1.5fr_220px] lg:items-end">
              <div>
                <label className="mb-3 block text-[11px] font-black uppercase tracking-[0.25em] text-primary/45">
                  Tim kiem
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="material-symbols-outlined text-slate-400">search</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tim kiem de thi..."
                    className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-[11px] font-black uppercase tracking-[0.25em] text-primary/45">
                  Cap do HSK
                </label>
                <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-2">
                  <button
                    onClick={() => setSelectedLevel("")}
                    className={`rounded-xl px-4 py-3 text-xs font-black transition ${
                      !selectedLevel
                        ? "bg-primary text-secondary shadow-md"
                        : "text-slate-500 hover:bg-white hover:text-primary"
                    }`}
                  >
                    Tat ca
                  </button>
                  {["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`rounded-xl px-4 py-3 text-xs font-black transition ${
                        selectedLevel === level
                          ? "bg-primary text-secondary shadow-md"
                          : "text-slate-500 hover:bg-white hover:text-primary"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-[11px] font-black uppercase tracking-[0.25em] text-primary/45">
                  Sap xep
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-primary outline-none transition focus:border-secondary"
                >
                  <option value="newest">Moi nhat</option>
                  <option value="popular">Luot lam cao nhat</option>
                  <option value="rating">Danh gia cao nhat</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10 lg:px-14">
        {filteredExams.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredExams.map((exam) => (
              <article
                key={exam.id}
                onClick={() => goToDetail(exam.id)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={exam.image}
                    alt={exam.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/10 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-secondary shadow-lg">
                    {exam.level}
                  </div>
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1.5 text-[11px] font-black text-amber-900 shadow-lg">
                    <span>★</span>
                    {exam.rating}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="line-clamp-2 text-2xl font-black leading-tight text-primary transition group-hover:text-secondary">
                    {exam.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500">
                    {exam.description}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-slate-50 p-4">
                    <div className="text-center">
                      <span className="material-symbols-outlined mb-1 text-secondary">schedule</span>
                      <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">Thoi gian</p>
                      <p className="mt-1 text-sm font-bold text-primary">{exam.duration}</p>
                    </div>
                    <div className="border-x border-slate-200 text-center">
                      <span className="material-symbols-outlined mb-1 text-secondary">list_alt</span>
                      <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">So cau</p>
                      <p className="mt-1 text-sm font-bold text-primary">{exam.questions}</p>
                    </div>
                    <div className="text-center">
                      <span className="material-symbols-outlined mb-1 text-secondary">person_play</span>
                      <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">Luot lam</p>
                      <p className="mt-1 text-sm font-bold text-primary">{exam.attempts}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                      Xem chi tiet
                    </span>
                    <span className="material-symbols-outlined text-2xl text-secondary transition group-hover:translate-x-1">
                      arrow_right_alt
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-600">Khong tim thay de thi phu hop</p>
            <p className="mt-2 text-sm text-slate-400">Thu doi tu khoa tim kiem hoac cap do HSK.</p>
          </div>
        )}

        {filteredExams.length > 0 && (
          <div className="mt-14 flex items-center justify-center gap-3">
            <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 shadow-sm transition hover:border-secondary hover:text-secondary">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary font-black text-secondary shadow-lg">
              1
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white font-black text-slate-600 shadow-sm transition hover:border-secondary hover:text-secondary">
              2
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white font-black text-slate-600 shadow-sm transition hover:border-secondary hover:text-secondary">
              3
            </button>
            <span className="px-1 text-slate-300">...</span>
            <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white font-black text-slate-600 shadow-sm transition hover:border-secondary hover:text-secondary">
              12
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 shadow-sm transition hover:border-secondary hover:text-secondary">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </section>

      <section className="relative overflow-hidden bg-primary py-20 text-white">
        <div className="absolute inset-0 bg-chinese-pattern opacity-10" />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 px-6 md:flex-row md:px-10 lg:px-14">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-3xl font-black leading-tight md:text-4xl">
              Ban chua xac dinh duoc trinh do?
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              Lam bai kiem tra nhanh mien phi de TOXI goi y lo trinh on luyen HSK phu hop
              va tiet kiem thoi gian cho ban.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <button className="rounded-2xl border-2 border-secondary/40 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-secondary transition hover:bg-secondary/10">
              Tu van lo trinh
            </button>
            <button className="rounded-2xl bg-secondary px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-primary shadow-xl transition hover:brightness-105">
              Thi thu nhanh
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

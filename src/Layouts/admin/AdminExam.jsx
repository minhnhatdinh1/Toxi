import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import LoadingSpinner from "../common/LoadingSpinner";
import { fetchQuizDetail, fetchQuizzes, getErrorMessage } from "./api/apiquiz";

const SKILL_BADGE = {
  nghe: "bg-blue-100 text-blue-800",
  doc: "bg-emerald-100 text-emerald-800",
  viet: "bg-orange-100 text-orange-800",
};

const SKILL_LABEL = {
  nghe: "Nghe",
  doc: "Doc",
  viet: "Viet",
};

const HSK_BADGE = {
  "HSK 1": "bg-emerald-100 text-emerald-800",
  "HSK 2": "bg-blue-100 text-blue-800",
  "HSK 3": "bg-violet-100 text-violet-800",
  "HSK 4": "bg-orange-100 text-orange-800",
  "HSK 5": "bg-red-100 text-red-800",
  "HSK 6": "bg-slate-800 text-slate-100",
};

const TYPE_LABELS = {
  "dung-sai": "Dung / Sai",
  "abc-anh": "A B C anh",
  "gop-cau": "Gop cau",
  "abcd-vanban": "A B C D van ban",
  "dung-sai-anh": "Dung sai + anh",
  "gop-anh": "Gop cau anh",
  "gop-van": "Gop cau van",
  "abcd-doan": "A B C D doan",
  "sap-xep": "Sap xep tu",
  "sap-xep-viet": "Sap xep tu",
  "dien-tu": "Dien tu",
  "viet-doan": "Viet doan van",
};

function Modal({ title, sub, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              {sub ? <p className="mt-1 text-xs leading-relaxed text-slate-500">{sub}</p> : null}
            </div>
            <button onClick={onClose} className="ml-4 flex-shrink-0 text-slate-400 transition hover:text-slate-600">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function getHskLevel(value, fallback = 1) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const match = value.match(/\d+/);
    if (match) return parseInt(match[0], 10);
  }
  return fallback;
}

function normalizeSkill(value) {
  const raw = String(value || "").toLowerCase();
  if (raw.includes("viet") || raw.includes("write")) return "viet";
  if (raw.includes("doc") || raw.includes("read")) return "doc";
  return "nghe";
}

function normalizeType(value) {
  const raw = String(value || "").trim();
  return TYPE_LABELS[raw] || raw || "Khac";
}

function normalizeStatus(value) {
  const raw = String(value || "").toUpperCase();
  if (["DONE", "ACTIVE", "COMPLETED", "PUBLISHED"].includes(raw)) return "done";
  return "draft";
}

function formatDate(value) {
  if (!value) return "--/--/----";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return parsed.toLocaleDateString("vi-VN");
}

function getQuestionContent(question) {
  if (question?.content) return question.content;
  if (question?.questionText) return question.questionText;
  if (question?.title) return question.title;
  if (Array.isArray(question?.subQuestions) && question.subQuestions.length > 0) {
    return question.subQuestions[0]?.content || question.subQuestions[0]?.questionText || "Cau hoi nhom";
  }
  return "Cau hoi khong co noi dung";
}

function getQuestionAnswers(question) {
  const options = question?.quizOptions || question?.options || [];
  if (Array.isArray(options) && options.length > 0) {
    return options.map((option, index) => {
      return option?.content || option?.text || option?.imageUrl || option?.label || `Dap an ${index + 1}`;
    });
  }
  if (Array.isArray(question?.subQuestions) && question.subQuestions.length > 0) {
    return question.subQuestions.slice(0, 5).map((item, index) => {
      return item?.content || item?.questionText || `Lua chon ${index + 1}`;
    });
  }
  return [];
}

function getCorrectAnswerIndex(question) {
  const options = question?.quizOptions || question?.options || [];
  const foundIndex = options.findIndex((option) => option?.isCorrect);
  return foundIndex >= 0 ? foundIndex : 0;
}

function buildEditRoute(item) {
  const firstQuiz = item.attachedQuizzes?.[0];
  if (!firstQuiz?.quizId || !item.editQuestionId) return null;
  if (item.skill === "nghe") return `/adminQuiz/${firstQuiz.quizId}/edit-question/listen/${item.editQuestionId}`;
  if (item.skill === "doc") return `/adminQuiz/${firstQuiz.quizId}/edit-question/read/${item.editQuestionId}`;
  return `/adminQuiz/${firstQuiz.quizId}/edit-question/write/${item.editQuestionId}`;
}

function addRoute(skill) {
  if (skill === "nghe") return "/listenQuiz";
  if (skill === "doc") return "/readQuiz";
  return "/writtingQuiz";
}

function mapQuestionFromQuiz(question, quiz, index) {
  const hskLevel = getHskLevel(question?.hskLevel ?? quiz?.hsklevel, 1);
  return {
    bankKey: String(question?.questionId ?? question?.baseQuestionId ?? question?.id ?? `${quiz?.quizId || quiz?.id}-${index}`),
    id: question?.questionId ?? question?.id ?? question?.quizQuestionId,
    editQuestionId: question?.quizQuestionId ?? question?.id ?? question?.questionId,
    skill: normalizeSkill(question?.skill),
    type: normalizeType(question?.questionType),
    hsk: `HSK ${hskLevel}`,
    content: getQuestionContent(question),
    pinyin: question?.pinyin || "",
    answers: getQuestionAnswers(question),
    correct: getCorrectAnswerIndex(question),
    status: normalizeStatus(question?.status),
    date: formatDate(question?.createdAt || quiz?.createdAt),
    attachedQuizzes: [{ quizId: quiz?.quizId || quiz?.id, title: quiz?.title || quiz?.name || "De thi" }],
  };
}

function mergeQuestionEntries(entries) {
  const mergedMap = new Map();
  entries.forEach((entry) => {
    const existing = mergedMap.get(entry.bankKey);
    if (!existing) {
      mergedMap.set(entry.bankKey, entry);
      return;
    }
    const quizIds = new Set(existing.attachedQuizzes.map((quiz) => quiz.quizId));
    entry.attachedQuizzes.forEach((quiz) => {
      if (!quizIds.has(quiz.quizId)) existing.attachedQuizzes.push(quiz);
    });
  });
  return Array.from(mergedMap.values()).sort((a, b) => (b.attachedQuizzes?.length || 0) - (a.attachedQuizzes?.length || 0));
}

export default function AdminExam() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSkill, setActiveSkill] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [activeHSK, setActiveHSK] = useState("all");
  const [activeSt, setActiveSt] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [detailItem, setDetailItem] = useState(null);
  const [view, setView] = useState("grid");
  const perPage = 9;

  useEffect(() => {
    let cancelled = false;

    const loadQuestionBank = async () => {
      try {
        setLoading(true);
        setError(null);

        const quizResponse = await fetchQuizzes({
          search: "",
          status: null,
          hsk: null,
          sortBy: "newest",
        });

        const quizzes = quizResponse?.data?.data || [];
        const detailResponses = await Promise.all(
          quizzes.map(async (quiz) => {
            try {
              const detailResponse = await fetchQuizDetail(quiz.quizId || quiz.id);
              return { quiz, detail: detailResponse?.data || {} };
            } catch (detailError) {
              console.error("Error loading quiz detail:", detailError);
              return { quiz, detail: {} };
            }
          })
        );

        const questionEntries = detailResponses.flatMap(({ quiz, detail }) => {
          return (detail.questions || []).map((question, index) => mapQuestionFromQuiz(question, quiz, index));
        });

        if (!cancelled) setData(mergeQuestionEntries(questionEntries));
      } catch (loadError) {
        if (!cancelled) setError(getErrorMessage(loadError));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadQuestionBank();
    return () => {
      cancelled = true;
    };
  }, []);

  const total = data.length;
  const done = data.filter((item) => item.status === "done").length;
  const bySkill = {
    nghe: data.filter((item) => item.skill === "nghe").length,
    doc: data.filter((item) => item.skill === "doc").length,
    viet: data.filter((item) => item.skill === "viet").length,
  };

  const typeOptions = useMemo(() => {
    return {
      all: [...new Set(data.map((item) => item.type))],
      nghe: [...new Set(data.filter((item) => item.skill === "nghe").map((item) => item.type))],
      doc: [...new Set(data.filter((item) => item.skill === "doc").map((item) => item.type))],
      viet: [...new Set(data.filter((item) => item.skill === "viet").map((item) => item.type))],
    };
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchesSkill = activeSkill === "all" || item.skill === activeSkill;
      const matchesType = activeType === "all" || item.type === activeType;
      const matchesHsk = activeHSK === "all" || item.hsk === activeHSK;
      const matchesStatus = activeSt === "all" || item.status === activeSt;
      const keyword = search.trim().toLowerCase();
      const matchesSearch =
        !keyword ||
        item.content.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword) ||
        item.attachedQuizzes.some((quiz) => quiz.title.toLowerCase().includes(keyword));
      return matchesSkill && matchesType && matchesHsk && matchesStatus && matchesSearch;
    });
  }, [activeHSK, activeSkill, activeSt, activeType, data, search]);

  const totalFiltered = filtered.length;
  const pages = Math.ceil(totalFiltered / perPage);
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  function setSkill(skill) {
    setActiveSkill(skill);
    setActiveType("all");
    setPage(1);
  }

  useEffect(() => {
    setPage(1);
  }, [activeType, activeHSK, activeSt, search]);

  if (loading) return <LoadingSpinner fullScreen text="Dang tai ngan hang cau hoi..." />;

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 px-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <p className="mb-2 text-base font-bold text-red-600">Khong tai duoc ngan hang cau hoi</p>
          <p className="text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex flex-shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-6 py-4">
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-[11px] text-slate-400">
              Noi dung {">"} <span className="text-slate-700">Ngan hang cau hoi</span>
            </p>
            <h1 className="text-lg font-bold text-slate-900">Ngan hang cau hoi</h1>
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
            <span className="material-symbols-outlined text-base">download</span>
            Xuat Excel
          </button>
          <Link to="/adminAddNewExam" className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white shadow-md shadow-primary/20 transition hover:bg-primary/90">
            <span className="material-symbols-outlined text-base">add_circle</span>
            Them cau hoi moi
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="grid grid-cols-5 gap-4">
            {[
              ["Tong cau hoi", total, "quiz", "bg-blue-50", "text-blue-500", "text-slate-900"],
              ["Hoan thien", done, "check_circle", "bg-emerald-50", "text-emerald-500", "text-emerald-600"],
              ["Nhap", total - done, "pending", "bg-amber-50", "text-amber-500", "text-amber-600"],
              ["Ky nang Nghe", bySkill.nghe, "hearing", "bg-blue-50", "text-blue-600", "text-blue-700"],
              ["Ky nang Doc", bySkill.doc, "menu_book", "bg-emerald-50", "text-emerald-600", "text-emerald-700"],
            ].map(([label, value, icon, bg, iconColor, valueColor]) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${bg}`}>
                  <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
                </div>
                <div>
                  <p className="text-xs font-medium leading-tight text-slate-500">{label}</p>
                  <p className={`text-xl font-bold ${valueColor}`}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex border-b border-slate-200">
              {[
                { key: "all", label: "Tat ca", count: total },
                { key: "nghe", label: "Nghe", count: bySkill.nghe },
                { key: "doc", label: "Doc", count: bySkill.doc },
                { key: "viet", label: "Viet", count: bySkill.viet },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSkill(tab.key)}
                  className={`flex items-center gap-2 border-b-2 px-5 py-3.5 text-sm font-semibold transition ${activeSkill === tab.key ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                  {tab.label}
                  <span className={`rounded-lg px-2 py-0.5 text-xs font-bold ${activeSkill === tab.key ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
              <div className="flex-1" />
              <div className="flex items-center gap-1 px-4">
                <button onClick={() => setView("grid")} className={`rounded-lg p-1.5 ${view === "grid" ? "bg-primary/10 text-primary" : "text-slate-400 hover:bg-slate-100"}`}>
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                </button>
                <button onClick={() => setView("table")} className={`rounded-lg p-1.5 ${view === "table" ? "bg-primary/10 text-primary" : "text-slate-400 hover:bg-slate-100"}`}>
                  <span className="material-symbols-outlined text-lg">table_rows</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50/50 p-4">
              <div className="relative min-w-48 flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base text-slate-400">search</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tim noi dung cau hoi..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setActiveType("all")} className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${activeType === "all" ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>
                  Tat ca dang
                </button>
                {(typeOptions[activeSkill] || []).map((type) => (
                  <button key={type} onClick={() => setActiveType(type)} className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${activeType === type ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>
                    {type}
                  </button>
                ))}
              </div>

              <select value={activeHSK} onChange={(event) => setActiveHSK(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:outline-none">
                <option value="all">Tat ca HSK</option>
                {["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"].map((item) => <option key={item} value={item}>{item}</option>)}
              </select>

              <select value={activeSt} onChange={(event) => setActiveSt(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:outline-none">
                <option value="all">Tat ca trang thai</option>
                <option value="done">Hoan thien</option>
                <option value="draft">Nhap</option>
              </select>

              <div className="ml-auto flex gap-1.5">
                {["nghe", "doc", "viet"].map((skill) => (
                  <Link key={skill} to={addRoute(skill)} className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                    <span className="material-symbols-outlined text-sm">add</span>
                    {SKILL_LABEL[skill]}
                  </Link>
                ))}
              </div>
            </div>

            {view === "grid" ? (
              <div className="p-4">
                {rows.length === 0 ? (
                  <div className="py-16 text-center">
                    <span className="material-symbols-outlined mb-3 block text-5xl text-slate-300">search_off</span>
                    <p className="mb-4 text-sm text-slate-400">Khong tim thay cau hoi nao</p>
                    <Link to="/adminAddNewExam" className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white transition hover:bg-primary/90">
                      Them cau hoi dau tien
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {rows.map((item) => {
                      const route = buildEditRoute(item);
                      return (
                        <div key={item.bankKey} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-primary/30 hover:shadow-sm">
                          <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                            <span className={`rounded-lg px-2 py-0.5 text-xs font-bold ${SKILL_BADGE[item.skill]}`}>{SKILL_LABEL[item.skill]}</span>
                            <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">{item.type}</span>
                            <span className={`rounded-lg px-2 py-0.5 text-xs font-bold ${HSK_BADGE[item.hsk]}`}>{item.hsk}</span>
                            <span className={`ml-auto h-2 w-2 flex-shrink-0 rounded-full ${item.status === "done" ? "bg-emerald-500" : "bg-amber-500"}`} />
                          </div>

                          <div className="px-4 pb-2 pt-3">
                            <p className="mb-2 line-clamp-2 text-sm font-medium leading-relaxed text-slate-800">{item.content}</p>
                            {item.pinyin ? <p className="mb-2 text-xs italic text-slate-400">{item.pinyin}</p> : null}
                            {item.answers.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {item.answers.slice(0, 4).map((answer, answerIndex) => (
                                  <span key={`${item.bankKey}-${answerIndex}`} className={`flex items-center gap-0.5 rounded-lg border px-2 py-1 text-xs ${answerIndex === item.correct ? "border-emerald-200 bg-emerald-50 font-semibold text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-500"}`}>
                                    <span className="font-bold">{String.fromCharCode(65 + answerIndex)}.</span>
                                    {answer.length > 12 ? `${answer.slice(0, 12)}...` : answer}
                                    {answerIndex === item.correct ? <span className="material-symbols-outlined ml-0.5 text-[10px] text-emerald-600">check</span> : null}
                                  </span>
                                ))}
                              </div>
                            ) : null}

                            {item.attachedQuizzes.length > 0 ? (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {item.attachedQuizzes.slice(0, 2).map((quiz) => (
                                  <span key={`${item.bankKey}-${quiz.quizId}`} className="rounded-lg bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                    {quiz.title}
                                  </span>
                                ))}
                                {item.attachedQuizzes.length > 2 ? <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">+{item.attachedQuizzes.length - 2}</span> : null}
                              </div>
                            ) : null}
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-2.5">
                            <span className="text-[10px] text-slate-400">ID #{item.id} · {item.date}</span>
                            <div className="flex gap-1">
                              <button onClick={() => setDetailItem(item)} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200" title="Chi tiet">
                                <span className="material-symbols-outlined text-base">visibility</span>
                              </button>
                              {route ? (
                                <Link to={route} className="flex items-center gap-0.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
                                  <span className="material-symbols-outlined text-sm">edit</span>
                                  Sua
                                </Link>
                              ) : (
                                <span className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-400">
                                  Khong sua duoc
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left" style={{ minWidth: 800 }}>
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      {["Noi dung cau hoi", "Ky nang", "Dang", "HSK", "Dap an dung", "Gan vao de", "Trang thai", "Thao tac"].map((header) => (
                        <th key={header} className="whitespace-nowrap px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.length === 0 ? (
                      <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-slate-400">Khong tim thay cau hoi nao</td></tr>
                    ) : rows.map((item) => {
                      const route = buildEditRoute(item);
                      return (
                        <tr key={item.bankKey} className="transition hover:bg-slate-50">
                          <td className="max-w-xs px-4 py-3">
                            <p className="line-clamp-2 text-sm font-medium leading-relaxed text-slate-800">{item.content}</p>
                            {item.pinyin ? <p className="mt-0.5 text-xs italic text-slate-400">{item.pinyin}</p> : null}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3"><span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${SKILL_BADGE[item.skill]}`}>{SKILL_LABEL[item.skill]}</span></td>
                          <td className="whitespace-nowrap px-4 py-3"><span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{item.type}</span></td>
                          <td className="whitespace-nowrap px-4 py-3"><span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${HSK_BADGE[item.hsk]}`}>{item.hsk}</span></td>
                          <td className="px-4 py-3">
                            {item.answers.length > 0 ? (
                              <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                {String.fromCharCode(65 + item.correct)}. {item.answers[item.correct]?.slice(0, 16)}{item.answers[item.correct]?.length > 16 ? "..." : ""}
                              </span>
                            ) : <span className="text-xs text-slate-400">Khong co dap an</span>}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {item.attachedQuizzes.slice(0, 2).map((quiz) => (
                                <span key={`${item.bankKey}-table-${quiz.quizId}`} className="whitespace-nowrap rounded-lg bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{quiz.title}</span>
                              ))}
                              {item.attachedQuizzes.length > 2 ? <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">+{item.attachedQuizzes.length - 2}</span> : null}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`flex items-center gap-1.5 text-xs font-semibold ${item.status === "done" ? "text-emerald-600" : "text-amber-600"}`}>
                              <span className={`inline-block h-2 w-2 rounded-full ${item.status === "done" ? "bg-emerald-500" : "bg-amber-500"}`} />
                              {item.status === "done" ? "Hoan thien" : "Nhap"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => setDetailItem(item)} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100">
                                <span className="material-symbols-outlined text-base">visibility</span>
                              </button>
                              {route ? (
                                <Link to={route} className="flex items-center gap-0.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
                                  <span className="material-symbols-outlined text-sm">edit</span>
                                  Sua
                                </Link>
                              ) : <span className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-400">Khong sua duoc</span>}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
              <span className="text-xs text-slate-400">Hien thi {totalFiltered === 0 ? 0 : (page - 1) * perPage + 1}-{Math.min(page * perPage, totalFiltered)} trong {totalFiltered} cau hoi</span>
              <div className="flex gap-1">
                <button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40">‹</button>
                {Array.from({ length: Math.min(pages, 7) }, (_, index) => index + 1).map((item) => (
                  <button key={item} onClick={() => setPage(item)} className={`h-8 w-8 rounded-lg border text-xs font-semibold transition ${item === page ? "border-primary bg-primary text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{item}</button>
                ))}
                <button onClick={() => setPage((current) => Math.min(pages || 1, current + 1))} disabled={page >= pages || pages === 0} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40">›</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {detailItem ? (
        <Modal title={`Chi tiet cau hoi #${detailItem.id}`} onClose={() => setDetailItem(null)}>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${SKILL_BADGE[detailItem.skill]}`}>{SKILL_LABEL[detailItem.skill]}</span>
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{detailItem.type}</span>
              <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${HSK_BADGE[detailItem.hsk]}`}>{detailItem.hsk}</span>
              <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${detailItem.status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{detailItem.status === "done" ? "Hoan thien" : "Nhap"}</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Noi dung</p>
              <p className="text-sm font-medium leading-relaxed text-slate-800">{detailItem.content}</p>
              {detailItem.pinyin ? <p className="mt-1 text-xs italic text-slate-400">{detailItem.pinyin}</p> : null}
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Dap an</p>
              <div className="space-y-1.5">
                {detailItem.answers.length > 0 ? detailItem.answers.map((answer, index) => (
                  <div key={`${detailItem.bankKey}-detail-${index}`} className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-sm ${index === detailItem.correct ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                    <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold ${index === detailItem.correct ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"}`}>{String.fromCharCode(65 + index)}</span>
                    <span className={index === detailItem.correct ? "font-semibold text-emerald-700" : "text-slate-600"}>{answer}</span>
                  </div>
                )) : <p className="text-sm text-slate-400">Cau hoi nay chua co danh sach dap an hien thi.</p>}
              </div>
            </div>

            {detailItem.attachedQuizzes.length > 0 ? (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Gan vao de thi</p>
                <div className="flex flex-wrap gap-2">
                  {detailItem.attachedQuizzes.map((quiz) => (
                    <span key={`${detailItem.bankKey}-modal-${quiz.quizId}`} className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{quiz.title}</span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="border-t border-slate-100 pt-3">
              {buildEditRoute(detailItem) ? (
                <Link to={buildEditRoute(detailItem)} onClick={() => setDetailItem(null)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-white transition hover:bg-primary/90">
                  <span className="material-symbols-outlined text-base">edit</span>
                  Chinh sua
                </Link>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-400">
                  Cau hoi nay chua co lien ket de thi de mo trang chinh sua.
                </div>
              )}
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

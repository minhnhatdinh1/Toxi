import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import toxiLogo from "../../assets/image/LOGO (1).png";

// ─── mock API stubs ───────────────────────────────────────────────────────────
// import { createLessonApi, addLessonToChapterApi, fetchChaptersApi,
//          createChapterApi, updateChapterApi, deleteChapterApi, updateLessonApi, deleteLessonApi }
//   from "./api/apiCourseContent.js";

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = [
    { id: "dashboard",  label: "Bảng điều khiển", icon: "dashboard",    path: "/adminaddvideo" },
    { id: "adminvideo", label: "Video & Bài giảng", icon: "account_tree", path: "/adminvideo" },
  ];
  return (
    <aside className="sticky top-0 h-screen w-72 border-r border-primary/20 bg-primary p-6 flex flex-col gap-8 shrink-0 z-50">
      <div className="flex flex-col items-center border-b border-white/10 pb-6">
        <Link to="/" className="flex flex-col items-center">
          <div className="h-16 w-16 flex items-center justify-center drop-shadow-lg">
            <img src={toxiLogo} alt="TOXI Logo" className="object-contain w-full h-full" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white mt-1">TOXI</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-[1px] w-4 bg-secondary" />
            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Education</p>
            <div className="h-[1px] w-4 bg-secondary" />
          </div>
        </Link>
      </div>
      <nav className="flex flex-col gap-1.5">
        <p className="text-[10px] font-bold text-white/30 uppercase px-4 mb-2">Menu chính</p>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.id} onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                isActive ? "bg-white text-primary shadow-lg font-bold" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}>
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto space-y-4">
        <div className="p-4 bg-white/10 rounded-2xl border border-white/10 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Hỗ trợ 24/7</p>
            <p className="text-xs text-white/80 font-medium">Cần hỗ trợ kỹ thuật?</p>
            <button className="mt-3 text-xs font-bold text-secondary hover:underline">Liên hệ Admin</button>
          </div>
          <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-6xl text-white/10 group-hover:scale-110 transition-transform">support_agent</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/10">
          <div className="size-10 rounded-xl bg-cover bg-center border-2 border-white/30 shrink-0"
            style={{ backgroundImage: 'url("https://i.pravatar.cc/40?img=12")' }} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Nguyễn Admin</p>
            <p className="text-[10px] text-white/40 truncate">Quản trị viên</p>
          </div>
          <button onClick={() => alert("Logout")} className="text-white/40 hover:text-red-300 transition-colors">
            <span className="material-symbols-outlined text-xl">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── VIDEO PREVIEW ────────────────────────────────────────────────────────────
function VideoPreview({ url }) {
  const getEmbedUrl = (raw) => {
    if (!raw) return null;
    const ytMatch = raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const viMatch = raw.match(/vimeo\.com\/(\d+)/);
    if (viMatch) return `https://player.vimeo.com/video/${viMatch[1]}`;
    return null;
  };
  const embed = getEmbedUrl(url);
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 aspect-video flex items-center justify-center">
      {embed ? (
        <iframe src={embed} className="w-full h-full" allowFullScreen title="preview" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-slate-300">
          <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-slate-400" style={{ fontVariationSettings: '"FILL" 1' }}>play_circle</span>
          </div>
          <p className="text-xs font-bold text-center px-4">Xem trước video sẽ hiển thị tại đây sau khi nhập URL hợp lệ</p>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const EMPTY_FORM = { title: "", url: "", visibility: "free", videoName: "", files: [], duration: "" };

export default function AdminCourseContent() {
  const navigate    = useNavigate();
  const { courseId } = useParams();

  // ── state ──
  const [chapters,    setChapters]    = useState([]);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [selectedCh,  setSelectedCh]  = useState(""); // chapterId for add/edit
  const [editLesson,  setEditLesson]  = useState(null); // { chapterId, lessonId } | null
  const [editChapter, setEditChapter] = useState(null); // chapterId being renamed
  const [editChTitle, setEditChTitle] = useState("");
  const [saving,      setSaving]      = useState(false);
  const [toast,       setToast]       = useState(null);
  const [expandedChs, setExpandedChs] = useState({});

  const videoRef  = useRef(null);
  const fileRef   = useRef(null);
  const chNameRef = useRef(null);

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };
  const setF = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // auto-select first chapter when chapters change
  useEffect(() => {
    if (chapters.length > 0 && !selectedCh) setSelectedCh(String(chapters[0].id));
  }, [chapters]);

  // focus chapter name input
  useEffect(() => {
    if (editChapter && chNameRef.current) chNameRef.current.focus();
  }, [editChapter]);

  // fetch
  useEffect(() => {
    if (!courseId) return;
    // fetchChaptersApi(courseId).then(res => { ... });
  }, [courseId]);

  // ── chapter CRUD ──
  const addChapter = () => {
    const id   = Date.now();
    const num  = chapters.length + 1;
    const ch   = { id, title: `Chương ${num}: Chưa đặt tên`, lessons: [] };
    setChapters(p => [...p, ch]);
    setExpandedChs(p => ({ ...p, [id]: true }));
    setSelectedCh(String(id));
    startEditChapter(id, ch.title);
  };

  const deleteChapter = (id) => {
    if (!window.confirm("Xóa chương này và tất cả bài học bên trong?")) return;
    setChapters(p => p.filter(c => c.id !== id));
    if (String(selectedCh) === String(id)) setSelectedCh(chapters[0]?.id ? String(chapters[0].id) : "");
  };

  const startEditChapter = (id, title) => { setEditChapter(id); setEditChTitle(title); };
  const saveChapterTitle  = () => {
    if (!editChTitle.trim()) return;
    setChapters(p => p.map(c => c.id === editChapter ? { ...c, title: editChTitle } : c));
    setEditChapter(null);
  };

  const toggleChapter = (id) => setExpandedChs(p => ({ ...p, [id]: !p[id] }));

  // ── lesson form ──
  const resetForm = () => { setForm(EMPTY_FORM); setEditLesson(null); };

  const startEdit = (chapterId, lesson) => {
    setEditLesson({ chapterId, lessonId: lesson.id });
    setSelectedCh(String(chapterId));
    setForm({
      title:      lesson.title,
      url:        lesson.url,
      visibility: lesson.visibility,
      videoName:  lesson.videoName,
      files:      lesson.files || [],
      duration:   lesson.duration || "",
    });
  };

  const saveLesson = () => {
    if (!form.title.trim()) { showToast("error", "Vui lòng nhập tiêu đề bài học"); return; }
    if (!selectedCh)        { showToast("error", "Vui lòng chọn chương");           return; }

    if (editLesson) {
      // update
      setChapters(p => p.map(c => c.id === Number(editLesson.chapterId)
        ? { ...c, lessons: c.lessons.map(l => l.id === editLesson.lessonId ? { ...l, ...form } : l) }
        : c));
      showToast("success", "Đã cập nhật bài học!");
    } else {
      // create
      const lesson = { id: Date.now(), ...form };
      setChapters(p => p.map(c => c.id === Number(selectedCh)
        ? { ...c, lessons: [...c.lessons, lesson] }
        : c));
      setExpandedChs(p => ({ ...p, [Number(selectedCh)]: true }));
      showToast("success", "Đã thêm bài học!");
    }
    resetForm();
  };

  const deleteLesson = (chapterId, lessonId) => {
    setChapters(p => p.map(c => c.id === chapterId
      ? { ...c, lessons: c.lessons.filter(l => l.id !== lessonId) }
      : c));
    if (editLesson?.lessonId === lessonId) resetForm();
  };

  // totals
  const totalLessons = chapters.reduce((s, c) => s + c.lessons.length, 0);

  const VISIBILITY_LABEL = { free: "Học thử", paid: "Học viên", draft: "Bản nháp" };
  const VISIBILITY_CLS   = {
    free:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    paid:  "bg-blue-50    text-blue-700    border-blue-200",
    draft: "bg-slate-100  text-slate-500   border-slate-200",
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <AdminSidebar />

      {/* toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl font-bold text-sm pointer-events-none
          ${toast.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
          <span className="material-symbols-outlined text-xl">{toast.type === "success" ? "check_circle" : "error"}</span>
          {toast.msg}
        </div>
      )}

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* ── TOP BAR ── */}
        <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/adminCourse")}
              className="size-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50 transition-all">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <nav className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
                <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/adminCourse")}>Khóa học</span>
                <span className="material-symbols-outlined text-[11px]">chevron_right</span>
                <span className="text-slate-600">Quản lý nội dung</span>
              </nav>
              <h1 className="text-lg font-black text-slate-900 leading-tight">Quản lý Nội dung Khóa học</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-blue-600 px-3 py-2 rounded-xl border border-blue-100">
                <span className="material-symbols-outlined text-sm">layers</span>{chapters.length} chương
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-2 rounded-xl border border-emerald-100">
                <span className="material-symbols-outlined text-sm">play_circle</span>{totalLessons} bài giảng
              </span>
            </div>
            <button onClick={addChapter}
              className="flex items-center gap-2 h-10 px-5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-base">add</span>
              + Thêm Chương mới
            </button>
          </div>
        </div>

        {/* ── 2-COLUMN BODY ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* ── LEFT: chapter list ── */}
          <div className="w-[480px] shrink-0 border-r border-slate-100 bg-white flex flex-col overflow-hidden">
            {/* header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>menu_book</span>
                <span className="font-black text-slate-800">Danh sách Chương</span>
              </div>
              <span className="text-xs font-black bg-primary text-white px-2.5 py-1 rounded-lg">{chapters.length} Chương</span>
            </div>

            {/* list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {chapters.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full py-20 text-slate-300">
                  <span className="material-symbols-outlined text-6xl mb-3">menu_book</span>
                  <p className="font-bold text-sm">Chưa có chương nào</p>
                  <p className="text-xs mt-1">Bấm "+ Thêm Chương mới" để bắt đầu</p>
                </div>
              )}

              {chapters.map((ch, idx) => {
                const isExpanded = !!expandedChs[ch.id];
                return (
                  <div key={ch.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
                    {/* chapter row */}
                    <div className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none transition-colors ${
                      String(selectedCh) === String(ch.id) ? "bg-primary/5" : "hover:bg-slate-50"
                    }`} onClick={() => { setSelectedCh(String(ch.id)); toggleChapter(ch.id); }}>
                      {/* index */}
                      <div className="size-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm shadow-primary/30">
                        <span className="text-white font-black text-xs">{String(idx+1).padStart(2,"0")}</span>
                      </div>

                      {/* title */}
                      <div className="flex-1 min-w-0">
                        {editChapter === ch.id ? (
                          <input ref={chNameRef}
                            value={editChTitle}
                            onChange={(e) => setEditChTitle(e.target.value)}
                            onBlur={saveChapterTitle}
                            onKeyDown={(e) => e.key === "Enter" && saveChapterTitle()}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full font-black text-sm text-slate-900 bg-white border-2 border-primary rounded-lg px-2 py-1 outline-none" />
                        ) : (
                          <p className="font-black text-sm text-slate-900 truncate">{ch.title}</p>
                        )}
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {ch.lessons.length} bài học
                          {ch.lessons.length > 0 && ` · ${ch.lessons.filter(l=>l.visibility==="free").length} học thử`}
                        </p>
                      </div>

                      {/* actions */}
                      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => startEditChapter(ch.id, ch.title)}
                          className="size-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-primary hover:bg-blue-50 transition-all">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button onClick={() => deleteChapter(ch.id)}
                          className="size-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                        <span className={`material-symbols-outlined text-slate-300 text-xl transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>expand_more</span>
                      </div>
                    </div>

                    {/* lesson rows */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/50">
                        {ch.lessons.length === 0 ? (
                          <p className="text-center text-xs text-slate-400 italic py-4 px-4">
                            Sử dụng form bên phải để thêm bài học vào chương này.
                          </p>
                        ) : (
                          ch.lessons.map((lesson, lIdx) => {
                            const isEditing = editLesson?.lessonId === lesson.id;
                            const vbadge = VISIBILITY_CLS[lesson.visibility] || VISIBILITY_CLS.draft;
                            const vlabel = VISIBILITY_LABEL[lesson.visibility] || "—";
                            const srcType = lesson.url?.includes("youtube") ? "YOUTUBE"
                              : lesson.url?.includes("vimeo") ? "VIMEO"
                              : lesson.videoName ? "UPLOAD" : "—";
                            return (
                              <div key={lesson.id}
                                className={`flex items-center gap-3 px-4 py-3 border-b border-slate-100 last:border-0 transition-colors ${isEditing ? "bg-yellow-50 border-l-4 border-l-yellow-400" : "hover:bg-white"}`}>
                                {/* number */}
                                <div className="size-7 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
                                  <span className="text-slate-600 font-black text-xs">{lIdx+1}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-sm text-slate-800 truncate">{lesson.title}</p>
                                  <p className="text-[11px] text-slate-400 font-medium">
                                    <span className="text-primary font-black">{srcType}</span>
                                    {lesson.duration ? ` · ${lesson.duration}` : ""}
                                  </p>
                                </div>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border shrink-0 ${vbadge}`}>{vlabel}</span>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button onClick={() => startEdit(ch.id, lesson)}
                                    className={`size-7 flex items-center justify-center rounded-lg transition-all ${isEditing ? "bg-yellow-400 text-white" : "text-slate-300 hover:text-primary hover:bg-blue-50"}`}>
                                    <span className="material-symbols-outlined text-base">edit</span>
                                  </button>
                                  <button onClick={() => deleteLesson(ch.id, lesson.id)}
                                    className="size-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                                    <span className="material-symbols-outlined text-base">delete</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: add / edit form ── */}
          <div className="flex-1 overflow-y-auto px-8 py-7 space-y-5">

            {/* form card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              {/* form header */}
              <div className="px-6 py-5 border-b border-slate-100 bg-primary flex items-center gap-3">
                <div className="size-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                    {editLesson ? "edit_note" : "video_call"}
                  </span>
                </div>
                <div>
                  <h2 className="font-black text-white text-base leading-tight">
                    {editLesson ? "Sửa Bài học" : "Thêm Bài học mới"}
                  </h2>
                  <p className="text-white/60 text-xs font-medium">
                    {editLesson ? "Cập nhật nội dung bài giảng video cho khóa học." : "Cập nhật nội dung bài giảng video cho khóa học."}
                  </p>
                </div>
                {editLesson && (
                  <button onClick={resetForm}
                    className="ml-auto size-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all">
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                )}
              </div>

              {/* form body */}
              <div className="p-6 space-y-5">
                {/* title */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Tiêu đề bài học</label>
                  <input value={form.title} onChange={(e) => setF("title", e.target.value)}
                    placeholder="Ví dụ: Cách sử dụng bổ ngữ kết quả"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:border-primary focus:bg-white outline-none transition-all text-sm" />
                </div>

                {/* url */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">URL Video (YouTube / Vimeo)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xl">link</span>
                    <input value={form.url} onChange={(e) => setF("url", e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm placeholder:text-slate-300 focus:border-primary focus:bg-white outline-none transition-all" />
                  </div>
                </div>

                {/* select chapter */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Chọn Chương</label>
                  {chapters.length === 0 ? (
                    <div className="px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-2xl text-sm text-amber-700 font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">warning</span>
                      Tạo ít nhất 1 chương trước
                    </div>
                  ) : (
                    <div className="relative">
                      <select value={selectedCh} onChange={(e) => setSelectedCh(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-900 focus:border-primary outline-none transition-all appearance-none">
                        {chapters.map(c => <option key={c.id} value={String(c.id)}>{c.title}</option>)}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-primary">
                        <span className="material-symbols-outlined">expand_more</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* visibility + duration row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Hiển thị</label>
                    <select value={form.visibility} onChange={(e) => setF("visibility", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-primary outline-none transition-all">
                      <option value="free">Học thử</option>
                      <option value="paid">Học viên</option>
                      <option value="draft">Bản nháp</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Thời lượng</label>
                    <input value={form.duration} onChange={(e) => setF("duration", e.target.value)}
                      placeholder="VD: 15:30"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-primary focus:bg-white outline-none transition-all" />
                  </div>
                </div>

                {/* upload video */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Hoặc tải lên file video</label>
                  <div className="flex items-center gap-3 flex-wrap">
                    <button onClick={() => videoRef.current.click()}
                      className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all border border-slate-200">
                      <span className="material-symbols-outlined text-base">upload</span>
                      Chọn file video
                    </button>
                    <input type="file" ref={videoRef} accept="video/*" className="hidden"
                      onChange={(e) => { if (e.target.files[0]) setF("videoName", e.target.files[0].name); }} />
                    {form.videoName
                      ? <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl text-sm font-medium text-blue-800">
                          <span className="material-symbols-outlined text-blue-500 text-sm">videocam</span>
                          {form.videoName}
                          <button onClick={() => setF("videoName", "")} className="text-red-400 hover:text-red-600 ml-1">×</button>
                        </div>
                      : <p className="text-xs text-slate-400 italic">Chưa có file</p>
                    }
                  </div>
                </div>

                {/* attachments */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Tài liệu đính kèm</label>
                  <div className="flex flex-wrap gap-2">
                    {form.files.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm">
                        <span className="material-symbols-outlined text-slate-400 text-sm">description</span>
                        <span className="text-slate-700 font-medium">{f}</span>
                        <button onClick={() => setF("files", form.files.filter((_,i)=>i!==idx))} className="text-red-400 hover:text-red-600 font-bold ml-1">×</button>
                      </div>
                    ))}
                    <button onClick={() => fileRef.current.click()}
                      className="flex items-center gap-1.5 border-dashed border-2 border-slate-200 px-3 py-2 rounded-xl text-sm text-slate-400 hover:border-primary hover:text-primary transition-all">
                      <span className="material-symbols-outlined text-sm">attach_file</span>
                      Thêm tài liệu
                    </button>
                    <input type="file" ref={fileRef} accept=".pdf,.doc,.docx" className="hidden"
                      onChange={(e) => { if (e.target.files[0]) setF("files", [...form.files, e.target.files[0].name]); }} />
                  </div>
                </div>
              </div>

              {/* form footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button onClick={saveLesson} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 disabled:opacity-60">
                  {saving
                    ? <><span className="material-symbols-outlined text-base animate-spin">autorenew</span>Đang lưu...</>
                    : <><span className="material-symbols-outlined text-base">save</span>{editLesson ? "Cập nhật bài học" : "Lưu bài học"}</>
                  }
                </button>
                {editLesson && (
                  <button onClick={resetForm}
                    className="h-12 px-6 border-2 border-slate-200 rounded-2xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-all">
                    Hủy bỏ
                  </button>
                )}
              </div>
            </div>

            {/* video preview */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-slate-400 text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>smart_display</span>
                <p className="font-black text-slate-700 text-sm">Xem trước Video</p>
              </div>
              <VideoPreview url={form.url} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

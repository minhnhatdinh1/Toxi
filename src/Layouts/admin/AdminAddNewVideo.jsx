import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import {
  createLessonApi,
  createLessonMultipartApi,
  addLessonToChapterApi,
  addQuizToChapterApi,
  fetchChaptersApi,
  createChapterApi,
  deleteContentApi,
  deleteChapterApi,
} from "./api/apiCourseContent.js";
import { fetchQuizzes } from "./api/apiquiz";
import toxiLogo from "../../assets/image/LOGO (1).png";
import { useEffect } from 'react';

// ── Chuẩn hóa chapter từ API: gán id = chapterId để dùng thống nhất ───────────
const normalizeChapter = (ch) => ({
  ...ch,
  id: ch.chapterId ?? ch.id,
  open: ch.open ?? false,
  items: ch.items ?? [],
  contents: ch.contents ?? [],
});

export default function AdminCourseContent() {

  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams();

  // ── 3 chương mặc định, mỗi chương có id hoàn toàn riêng biệt ────────────────
  const DEFAULT_CHAPTERS = [
    { id: 1, title: "Chương 01 - Nhập môn",            open: false, items: [], contents: [] },
    { id: 2, title: "Chương 02 - Ngữ pháp cơ bản",     open: false, items: [], contents: [] },
    { id: 3, title: "Chương 03 - Từ vựng & Giao tiếp", open: false, items: [], contents: [] },
  ];

  const [chapters, setChapters] = useState(DEFAULT_CHAPTERS);
  const [quizLibrary, setQuizLibrary] = useState([]);
  const [quizLibraryLoading, setQuizLibraryLoading] = useState(false);

  useEffect(() => {
    if (!courseId) return;
    fetchChaptersApi(courseId)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setChapters(res.data.map(normalizeChapter));
        }
        // Nếu API trả rỗng → giữ nguyên 3 chương mặc định
      })
      .catch(console.error);
  }, [courseId]);

  useEffect(() => {
    let isMounted = true;

    const loadQuizLibrary = async () => {
      try {
        setQuizLibraryLoading(true);
        const response = await fetchQuizzes({});
        const rawQuizzes = response?.data?.data || response?.data || [];
        const normalizedQuizzes = (Array.isArray(rawQuizzes) ? rawQuizzes : [])
          .map((quiz) => ({
            id: quiz.quizId ?? quiz.id,
            title: quiz.title || quiz.name || "Quiz chua dat ten",
            hsk: quiz.hsklevel ? `HSK ${quiz.hsklevel}` : quiz.hsk || "",
            type: quiz.quizType || quiz.type || "",
            status: quiz.status || "DRAFT",
          }))
          .filter((quiz) => quiz.id);

        if (isMounted) {
          setQuizLibrary(normalizedQuizzes);
        }
      } catch (error) {
        console.error("LOAD QUIZ LIBRARY ERROR:", error);
        if (isMounted) {
          setQuizLibrary([]);
        }
      } finally {
        if (isMounted) {
          setQuizLibraryLoading(false);
        }
      }
    };

    loadQuizLibrary();

    return () => {
      isMounted = false;
    };
  }, []);

  const [course, setCourse] = useState("Luyện thi HSK 3 Cấp tốc - Chinh phục 600 từ vựng");
  const [progress] = useState(85);

  const menu = [
    { id: "dashboard",  label: "Bảng điều khiển",  icon: "dashboard",    path: `/courseContent/${courseId || ""}` },
    { id: "adminvideo", label: "Video & Bài giảng", icon: "account_tree", path: `/adminvideo/${courseId || ""}` },
  ];

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // ── Chapter helpers – TẤT CẢ dùng chapter.id đã chuẩn hóa ──────────────────
  const toggleChapter = (id) =>
    setChapters((prev) => prev.map((c) => (c.id === id ? { ...c, open: !c.open } : c)));

  const deleteChapter = async (id) => {
    const chapter = chapters.find((c) => c.id === id);
    if (!chapter) return;
    if (!window.confirm(`Xóa chương "${chapter.title}"?`)) return;

    try {
      if (chapter.chapterId) {
        await deleteChapterApi(chapter.chapterId);
      }
      setChapters((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("DELETE CHAPTER ERROR:", error.response?.data || error);
      alert("Không thể xóa chương trong DB.");
    }
  };

  const addChapter = () =>
    setChapters((prev) => [
      ...prev,
      {
        id: Date.now(),   // id số nguyên lớn, không đụng id 1/2/3
        title: `Chương ${String(prev.length + 1).padStart(2, "0")} - Chương mới`,
        open: true,
        items: [],
        contents: [],
      },
    ]);

  const updateChapterTitle = (id, newTitle) =>
    setChapters((prev) => prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c)));

  // ── Item helpers – chỉ ảnh hưởng đúng chapter khớp id ───────────────────────
  const addVideoItem = (chapterId) =>
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId          // ← so sánh chính xác, chapter khác không bị thay đổi
          ? {
              ...c,
              items: [...c.items, {
                id: Date.now(),
                type: "video",
                title: "",
                url: "",
                visibility: "free",
                files: [],
                fileUploads: [],
                videoName: "",
                videoFile: null,
              }],
            }
          : c
      )
    );

  const addQuizItem = (chapterId) =>
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId
          ? { ...c, items: [...c.items, { id: Date.now(), type: "quiz", title: "", status: "public", selectedExam: "" }] }
          : c
      )
    );

  const deleteItem = (chapterId, itemId) =>
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
      )
    );

  const updateItem = (chapterId, itemId, field, value) =>
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId
          ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, [field]: value } : i)) }
          : c
      )
    );

  const addFileToItem = (chapterId, itemId, fileObj) =>
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId
          ? {
              ...c,
              items: c.items.map((i) =>
                i.id === itemId
                  ? {
                      ...i,
                      files: [...i.files, fileObj.name],
                      fileUploads: [...(i.fileUploads || []), fileObj],
                    }
                  : i
              ),
            }
          : c
      )
    );

  const removeFileFromItem = (chapterId, itemId, fileIndex) =>
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId
          ? {
              ...c,
              items: c.items.map((i) =>
                i.id === itemId
                  ? {
                      ...i,
                      files: i.files.filter((_, idx) => idx !== fileIndex),
                      fileUploads: (i.fileUploads || []).filter((_, idx) => idx !== fileIndex),
                    }
                  : i
              ),
            }
          : c
      )
    );

  const createLessonFromItem = async (item) => {
    const lessonPayload = {
      title: item.title,
      videoUrl: item.url?.trim() || "",
      duration: 120,
      isFree: item.visibility === "free",
      attachmentUrl: item.attachmentUrl?.trim() || "",
    };

    const videoFile = item.videoFile || null;
    const attachmentFile = item.fileUploads?.[0] || null;

    if (videoFile || attachmentFile) {
      return createLessonMultipartApi({
        lesson: lessonPayload,
        videoFile,
        attachmentFile,
      });
    }

    return createLessonApi(lessonPayload);
  };

  const handleDeleteSavedContent = async (chapterId, courseContentId, contentTitle) => {
    if (!window.confirm(`Xóa "${contentTitle || "nội dung này"}" khỏi DB?`)) return;

    try {
      await deleteContentApi(courseContentId);
      setChapters((prev) =>
        prev.map((chapter) =>
          chapter.id === chapterId
            ? {
                ...chapter,
                contents: (chapter.contents || []).filter((content) => content.courseContentId !== courseContentId),
              }
            : chapter
        )
      );
    } catch (error) {
      console.error("DELETE CONTENT ERROR:", error.response?.data || error);
      alert("Không thể xóa bài giảng trong DB.");
    }
  };

  // ── Đếm items của từng chapter (cả đã lưu lẫn local) ─────────────────────────
  const countItems = (chapter) => {
    const saved = chapter.contents || [];
    const local = chapter.items    || [];
    return {
      lessons: saved.filter(i => i.contentType === "LESSON").length + local.filter(i => i.type === "video").length,
      quizzes: saved.filter(i => i.contentType === "QUIZ").length   + local.filter(i => i.type === "quiz").length,
    };
  };

  // ── Save từng chapter (chỉ lưu items của chapter đó) ─────────────────────────
  const handleSave = async (chapterId) => {
    try {
      if (!courseId) { alert("❌ Không có courseId"); return; }

      const chapter = chapters.find((c) => c.id === chapterId);
      if (!chapter) return;

      const videoItems = chapter.items.filter((i) => i.type === "video" && i.title);
      if (videoItems.length === 0) { alert("⚠️ Chưa có bài giảng nào để lưu."); return; }

      // Tạo chapter trên server nếu chưa có chapterId thực
      let realChapterId = chapter.chapterId;
      if (!realChapterId) {
        const res = await createChapterApi(courseId, { title: chapter.title });
        realChapterId = res.data.chapterId;
        setChapters((prev) =>
          prev.map((c) => (c.id === chapterId ? { ...c, chapterId: realChapterId } : c))
        );
      }

      for (const item of videoItems) {
        const lessonRes = await createLessonFromItem(item);
        await addLessonToChapterApi(realChapterId, lessonRes.data.lessonId);
      }

      alert(`✅ Đã lưu ${videoItems.length} bài giảng vào "${chapter.title}"`);

      // Xóa local items sau khi lưu
      setChapters((prev) =>
        prev.map((c) => (c.id === chapterId ? { ...c, items: [] } : c))
      );
    } catch (error) {
      console.error("❌ ERROR:", error.response?.data || error);
      alert("❌ Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handleSaveChapter = async (chapterId) => {
    try {
      if (!courseId) {
        alert("Chua co courseId.");
        return;
      }

      const chapter = chapters.find((c) => c.id === chapterId);
      if (!chapter) return;

      const videoItems = chapter.items.filter((i) => i.type === "video" && i.title);
      const quizItems = chapter.items.filter((i) => i.type === "quiz" && i.selectedExam);

      if (videoItems.length === 0 && quizItems.length === 0) {
        alert("Chua co bai giang hoac quiz nao de luu.");
        return;
      }

      let realChapterId = chapter.chapterId;
      if (!realChapterId) {
        const res = await createChapterApi(courseId, { title: chapter.title });
        realChapterId = res.data.chapterId;
        setChapters((prev) =>
          prev.map((c) => (c.id === chapterId ? { ...c, chapterId: realChapterId } : c))
        );
      }

      for (const item of videoItems) {
        const lessonRes = await createLessonFromItem(item);

        await addLessonToChapterApi(realChapterId, lessonRes.data.lessonId);
      }

      for (const item of quizItems) {
        await addQuizToChapterApi(realChapterId, Number(item.selectedExam));
      }

      alert(`Da luu ${videoItems.length} bai giang va ${quizItems.length} quiz vao "${chapter.title}"`);

      setChapters((prev) =>
        prev.map((c) => (c.id === chapterId ? { ...c, items: [] } : c))
      );
    } catch (error) {
      console.error("SAVE CONTENT ERROR:", error.response?.data || error);
      alert("Co loi xay ra, vui long thu lai.");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-row chinese-pattern">

      {/* SIDEBAR */}
      <aside className="sticky top-0 h-screen w-72 border-r border-primary/20 bg-primary p-6 flex flex-col gap-8 shrink-0 z-50">
        <div className="flex flex-col items-center border-b border-white/10 pb-6">
          <Link to="/admincourse" className="flex flex-col items-center">
            <div className="h-16 w-16 flex items-center justify-center drop-shadow-lg">
              <img src={toxiLogo} alt="TOXI Logo" className="object-contain w-full h-full" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white mt-1">TOXI</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-[1px] w-4 bg-secondary"></div>
              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Education</p>
              <div className="h-[1px] w-4 bg-secondary"></div>
            </div>
          </Link>
        </div>

        <nav className="flex flex-col gap-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase px-4 mb-2">Menu chính</p>
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                  isActive ? "bg-white text-primary shadow-lg font-bold" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
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
            <div className="size-10 rounded-xl bg-cover bg-center border-2 border-white/30 shadow-sm shrink-0"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4wjMnInYp5mSKQslJxuOGAs7lC_NMA0Xk5-RCX7EluultAU_YQDxhsnlbCJhHTOFYqDEGtIoH2XKcXzSMGo6U9-vbJPraU5A9Ftw6FqQ7bxf-1IDGPN2EmHEXek9LyEnJwFnUaWij5TAZyry6GmpHhnyQEVlgdsjbrWh52lfQFG53RzoeXgmHWO5cuvmamJTUlGeabhU1EW-7QqbyLAEpSb-duLEFOoHd4kNfbiaXaAhEABPlYwTv-Z3rzXjQnryZDcWcHFQeKVI")' }}
            />
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

      {/* MAIN */}
      <main className="flex-1 flex flex-col p-10 max-w-7xl mx-auto w-full relative">

        <div className="absolute top-10 right-20 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[180px]">filter_vintage</span>
        </div>
        <div className="absolute bottom-20 left-10 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[150px] text-primary">cloud</span>
        </div>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase mb-4">
              <span className="hover:text-primary cursor-pointer" onClick={() => navigate('/adminCourse')}>Khóa học</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Thiết lập nội dung</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-2xl">
                <span className="material-symbols-outlined text-secondary text-3xl">auto_fix_high</span>
              </div>
              <div>
                <h1 className="text-slate-900 text-4xl font-black">Cấu hình Nội dung Khóa học</h1>
                <p className="text-slate-500 font-medium max-w-xl">
                  Xây dựng trải nghiệm học tập đỉnh cao bằng cách sắp xếp các chương mục, bài giảng và bài tập tương tác.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => alert("Preview")}
            className="flex h-12 items-center justify-center rounded-xl px-6 bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all font-bold text-sm shadow-sm self-end"
          >
            <span className="material-symbols-outlined mr-2">visibility</span>
            Xem trước
          </button>
        </div>

        {/* COURSE SELECT */}
        <div className="bg-white rounded-3xl p-8 mb-12 shadow-lg relative overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <label className="block mb-3 text-[10px] font-black text-slate-400 uppercase">Dự án đang chỉnh sửa</label>
              <div className="relative">
                <span className="absolute left-5 inset-y-0 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-primary text-xl">edit_note</span>
                </span>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="Nhập tên dự án / khóa học..."
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 pl-12 pr-5 py-4 text-slate-900 focus:border-primary focus:bg-white text-lg font-bold transition-all outline-none"
                />
              </div>
            </div>
            <div className="flex items-center lg:justify-end gap-6">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Tiến độ thiết lập</p>
                <p className="text-2xl font-black text-primary">{progress}%</p>
              </div>
              <div className="size-16 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
                <svg className="size-16 absolute -rotate-90">
                  <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent"
                    strokeDasharray={circumference} strokeDashoffset={offset} className="text-primary" />
                </svg>
                <span className="material-symbols-outlined text-primary">verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT STRUCTURE */}
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black">Cấu trúc Chương trình học</h2>
            <button onClick={addChapter} className="px-5 py-2 rounded-xl bg-primary/10 text-primary font-bold text-sm">
              + Thêm Chương mới
            </button>
          </div>

          <div className="space-y-6">
            {chapters.map((chapter, index) => {
              const { lessons, quizzes } = countItems(chapter);
              return (
                <div key={chapter.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group transition-all hover:shadow-md">

                  {/* Chapter header */}
                  <div className="p-6 bg-slate-50/50 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-2xl text-slate-300 cursor-grab">drag_indicator</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-primary bg-primary/5 px-2 py-1 rounded">
                          CHƯƠNG {String(index + 1).padStart(2, "0")}
                        </span>
                        <input
                          value={chapter.title}
                          onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-900 font-extrabold text-xl bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-primary focus:outline-none transition-all px-1"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 mr-4">
                        {lessons} Bài giảng • {quizzes} Quiz
                      </span>
                      <button onClick={() => toggleChapter(chapter.id)} className="size-10 flex items-center justify-center rounded-xl hover:text-primary hover:bg-white">
                        <span className="material-symbols-outlined">{chapter.open ? "expand_less" : "expand_more"}</span>
                      </button>
                      <button onClick={() => deleteChapter(chapter.id)} className="size-10 flex items-center justify-center rounded-xl hover:text-red-500 hover:bg-red-50">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Chapter body – chỉ render items của chính chapter này */}
                  {chapter.open && (
                    <div className="p-6 space-y-4">
                      {(chapter.contents || []).length > 0 && (
                        <div className="space-y-3">
                          <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Nội dung đã lưu</p>
                          {(chapter.contents || []).map((content) => {
                            const isLesson = content.contentType === "LESSON";
                            const title = isLesson ? content.lesson?.title : content.quiz?.title;

                            return (
                              <div key={content.courseContentId} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className="material-symbols-outlined text-primary">
                                    {isLesson ? "play_circle" : "quiz"}
                                  </span>
                                  <div className="min-w-0">
                                    <p className="text-sm font-bold text-slate-800 truncate">{title || "Nội dung chưa có tên"}</p>
                                    <p className="text-[11px] text-slate-400">{isLesson ? "Bài giảng đã lưu trong DB" : "Quiz đã lưu trong DB"}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDeleteSavedContent(chapter.id, content.courseContentId, title)}
                                  className="size-9 flex items-center justify-center rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                >
                                  <span className="material-symbols-outlined">delete</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {chapter.items.map(item =>
                        item.type === "video" ? (
                          <VideoLessonForm
                            key={item.id}
                            item={item}
                            chapterId={chapter.id}
                            onUpdate={updateItem}
                            onDelete={deleteItem}
                            onAddFile={addFileToItem}
                            onRemoveFile={removeFileFromItem}
                          />
                        ) : (
                            <QuizPickerForm
                              key={item.id}
                              item={item}
                              chapterId={chapter.id}
                              quizLibrary={quizLibrary}
                              quizLibraryLoading={quizLibraryLoading}
                              onUpdate={updateItem}
                              onDelete={deleteItem}
                            />
                        )
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <button
                          onClick={() => addVideoItem(chapter.id)}
                          className="group/btn py-5 border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary hover:text-primary hover:bg-blue-50/30 transition-all flex items-center justify-center gap-3 font-bold text-sm bg-white/50"
                        >
                          <span className="material-symbols-outlined group-hover/btn:scale-125 transition-transform">video_call</span>
                          Thêm Bài giảng Video
                        </button>
                        <button
                          onClick={() => addQuizItem(chapter.id)}
                          className="group/btn py-5 border-2 border-dashed border-slate-200 rounded-2xl hover:border-secondary hover:text-secondary hover:bg-yellow-50/30 transition-all flex items-center justify-center gap-3 font-bold text-sm bg-white/50"
                        >
                          <span className="material-symbols-outlined group-hover/btn:scale-125 transition-transform">add_task</span>
                          Thêm Bài tập (Quiz)
                        </button>
                      </div>

                      {/* Nút Lưu – chỉ hiện khi có items chưa lưu */}
                      {chapter.items.length > 0 && (
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => handleSaveChapter(chapter.id)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-all shadow"
                          >
                            <span className="material-symbols-outlined text-base">save</span>
                            Lưu chương này
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-8 flex justify-center">
              <button onClick={addChapter} className="group flex flex-col items-center gap-3">
                <div className="size-16 rounded-full bg-white shadow-xl flex items-center justify-center text-primary border border-slate-100 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl">add</span>
                </div>
                <span className="text-sm font-black text-slate-400 group-hover:text-primary tracking-widest uppercase">Thêm Chương bài mới</span>
              </button>
            </div>

            <div className="mt-24 mb-10 border-t border-slate-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3 opacity-40">
                <span className="material-symbols-outlined text-3xl">brightness_7</span>
                <span className="text-sm font-bold">Cân bằng tinh hoa truyền thống và công nghệ hiện đại</span>
              </div>
              <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                <span className="hover:text-primary cursor-pointer">Hướng dẫn soạn giáo án</span>
                <span className="hover:text-primary cursor-pointer">Báo cáo lỗi</span>
                <span className="hover:text-primary cursor-pointer">Phiên bản 4.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ===== VIDEO LESSON FORM =====
function VideoLessonForm({ item, chapterId, onUpdate, onDelete, onAddFile, onRemoveFile }) {
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  return (
    <div className="border-2 border-blue-100 rounded-2xl p-6 bg-blue-50/20 relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>play_circle</span>
        </div>
        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.15em]">Bài giảng Video</span>
        <button onClick={() => onDelete(chapterId, item.id)} className="ml-auto size-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      <div className="flex justify-between gap-4 mb-4">
        <input type="text" placeholder="Tên bài giảng..." value={item.title}
          onChange={(e) => onUpdate(chapterId, item.id, "title", e.target.value)}
          className="flex-1 px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl font-bold text-slate-900 focus:border-primary focus:outline-none transition-all" />
        <select value={item.visibility} onChange={(e) => onUpdate(chapterId, item.id, "visibility", e.target.value)}
          className="px-3 py-2 rounded-xl bg-yellow-50 text-xs font-bold border border-yellow-100 focus:outline-none">
          <option value="free">Học thử</option>
          <option value="paid">Học viên</option>
          <option value="draft">Bản nháp</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">URL Video (YouTube / Vimeo)</label>
        <input type="text" placeholder="https://youtube.com/watch?v=..." value={item.url}
          onChange={(e) => onUpdate(chapterId, item.id, "url", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-100 text-sm focus:border-primary focus:outline-none transition-all" />
      </div>

      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => videoRef.current.click()}
            className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all">
            <span className="material-symbols-outlined text-base">upload</span>
            Tải lên video
          </button>
          <input type="file" ref={videoRef}
            onChange={(e) => { if (e.target.files[0]) { onUpdate(chapterId, item.id, "videoName", e.target.files[0].name); onUpdate(chapterId, item.id, "videoFile", e.target.files[0]); onUpdate(chapterId, item.id, "url", ""); } }}
            className="hidden" accept="video/*" />
        </div>
        {item.videoName && (
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2.5 rounded-xl w-fit">
            <span className="material-symbols-outlined text-blue-500 text-sm">videocam</span>
            <span className="text-sm font-medium text-slate-700">{item.videoName}</span>
            <button onClick={() => onUpdate(chapterId, item.id, "videoName", "")} className="text-red-400 hover:text-red-600 font-bold text-sm ml-1">×</button>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-bold mb-2 text-slate-700">Tài liệu đính kèm</p>
        <div className="flex flex-wrap gap-2">
          {item.files.map((file, index) => (
            <div key={index} className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-2 rounded-xl">
              <span className="material-symbols-outlined text-blue-400 text-sm">description</span>
              <span className="text-sm text-slate-700">{file}</span>
              <button onClick={() => onRemoveFile(chapterId, item.id, index)} className="text-red-400 hover:text-red-600 font-bold text-sm">×</button>
            </div>
          ))}
          <button onClick={() => fileRef.current.click()}
            className="border-dashed border-2 border-slate-200 px-4 py-2 rounded-xl text-sm text-slate-400 hover:border-primary hover:text-primary transition-all">
            + Thêm tài liệu
          </button>
          <input type="file" ref={fileRef}
            onChange={(e) => { if (e.target.files[0]) onAddFile(chapterId, item.id, e.target.files[0]); }}
            className="hidden" accept=".pdf,.doc,.docx" />
        </div>
      </div>
    </div>
  );
}

// ===== QUIZ PICKER FORM =====
function QuizPickerForm({ item, chapterId, quizLibrary, quizLibraryLoading, onUpdate, onDelete }) {
  const selectedQuiz = quizLibrary.find((quiz) => String(quiz.id) === String(item.selectedExam));

  return (
    <div className="border-2 border-yellow-100 rounded-2xl p-6 bg-yellow-50/20 relative">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>quiz</span>
          </div>
          <span className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.15em]">Quiz co san</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Trang thai</label>
            <select
              value={item.status}
              onChange={(e) => onUpdate(chapterId, item.id, "status", e.target.value)}
              className="block w-36 rounded-xl border border-slate-100 bg-white text-[11px] font-bold py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/10"
            >
              <option value="public">Cong khai</option>
              <option value="hidden">An bai tap</option>
            </select>
          </div>
          <button onClick={() => onDelete(chapterId, item.id)} className="size-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Ten quiz hien thi trong chuong..."
          value={item.title}
          onChange={(e) => onUpdate(chapterId, item.id, "title", e.target.value)}
          className="w-full bg-white border-2 border-slate-100 rounded-xl text-slate-900 px-4 py-2.5 font-bold focus:border-yellow-400 focus:outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">assignment</span>
          Chon quiz tu ngan hang de
        </label>
        <div className="relative">
          <select
            value={item.selectedExam}
            onChange={(e) => {
              const value = e.target.value;
              const matchedQuiz = quizLibrary.find((quiz) => String(quiz.id) === value);
              onUpdate(chapterId, item.id, "selectedExam", value);
              if (matchedQuiz) {
                onUpdate(chapterId, item.id, "title", matchedQuiz.title);
              }
            }}
            className="block w-full rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <option value="">{quizLibraryLoading ? "-- Dang tai danh sach quiz --" : "-- Chon quiz da tao --"}</option>
            {quizLibrary.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}{quiz.hsk ? ` - ${quiz.hsk}` : ""}{quiz.type ? ` - ${quiz.type}` : ""}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-yellow-500">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
        </div>
        {selectedQuiz && (
          <div className="rounded-xl border border-yellow-100 bg-white px-4 py-3 text-xs text-slate-500">
            <p className="font-bold text-slate-800">{selectedQuiz.title}</p>
            <p className="mt-1">
              {selectedQuiz.hsk || "Khong ro cap do"}
              {selectedQuiz.type ? ` • ${selectedQuiz.type}` : ""}
              {selectedQuiz.status ? ` • ${selectedQuiz.status}` : ""}
            </p>
          </div>
        )}
        <p className="text-[11px] text-slate-400 font-medium italic">
          Ban co the tao them quiz moi trong trang quan ly quiz, sau do quay lai day de gan vao chuong.
        </p>
      </div>
    </div>
  );
}

// ===== QUIZ FORM =====
function QuizForm({ item, chapterId, onUpdate, onDelete }) {
  return (
    <div className="border-2 border-yellow-100 rounded-2xl p-6 bg-yellow-50/20 relative">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>quiz</span>
          </div>
          <span className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.15em]">Bài kiểm tra (Quiz)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Trạng thái</label>
            <select value={item.status} onChange={(e) => onUpdate(chapterId, item.id, "status", e.target.value)}
              className="block w-36 rounded-xl border border-slate-100 bg-white text-[11px] font-bold py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/10">
              <option value="public">Công khai</option>
              <option value="hidden">Ẩn bài tập</option>
            </select>
          </div>
          <button onClick={() => onDelete(chapterId, item.id)} className="size-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input type="text" placeholder="Tên bài kiểm tra..." value={item.title}
          onChange={(e) => onUpdate(chapterId, item.id, "title", e.target.value)}
          className="w-full bg-white border-2 border-slate-100 rounded-xl text-slate-900 px-4 py-2.5 font-bold focus:border-yellow-400 focus:outline-none transition-all" />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">assignment</span>
          Thư viện đề thi tương ứng
        </label>
        <div className="relative">
          <select value={item.selectedExam} onChange={(e) => onUpdate(chapterId, item.id, "selectedExam", e.target.value)}
            className="block w-full rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-300">
            <option value="">-- Chọn bài thi đã tạo từ thư viện --</option>
            <option>HSK 1 Mock Test - Part A (30 câu)</option>
            <option>HSK 2 Grammar Practice - Beginner</option>
            <option>HSK 3 Vocabulary Test - Full</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-yellow-500">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 font-medium italic">
          Tạo đề thi mới tại mục{" "}
          <span className="text-primary font-bold hover:underline cursor-pointer">Quản lý ngân hàng đề</span>.
        </p>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toxiLogo from "../../assets/image/LOGO (1).png";
import {
  updateLessonApi,
  updateChapterApi,
  updateQuizApi,
  createLessonApi,
  addLessonToChapterApi,
  addQuizToChapterApi,
  deleteContentApi,
  deleteChapterApi,       // DELETE /admin/chapters/:chapterId
} from "./api/apiCourseContent";
import { uploadImage } from "./api/apiFile";
import { fetchQuizzes } from "./api/apiquiz";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_BASE = `${BASE_URL}/api`;

// ─── HELPER: lấy đúng ID của chapter dù API trả về chapterId hay id ────────────
const getChapterId = (ch) => ch?.chapterId ?? ch?.id ?? null;

const resolveUploadedPath = (uploaded) => {
  if (!uploaded) return "";
  if (typeof uploaded === "string") return uploaded;
  if (typeof uploaded?.data === "string") return uploaded.data;
  if (typeof uploaded?.result === "string") return uploaded.result;
  if (typeof uploaded?.fileName === "string") return uploaded.fileName;
  if (typeof uploaded?.url === "string") return uploaded.url;
  if (typeof uploaded?.path === "string") return uploaded.path;
  if (typeof uploaded?.fileUrl === "string") return uploaded.fileUrl;
  if (typeof uploaded?.filePath === "string") return uploaded.filePath;
  if (uploaded?.data && typeof uploaded.data === "object") {
    return resolveUploadedPath(uploaded.data);
  }
  return "";
};

const parseDurationToSeconds = (value) => {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.round(value));

  const normalized = String(value).trim();
  if (!normalized) return null;

  if (/^\d+$/.test(normalized)) {
    return Math.max(0, parseInt(normalized, 10));
  }

  const parts = normalized.split(":").map((part) => part.trim());
  if (!parts.every((part) => /^\d+$/.test(part))) return null;

  if (parts.length === 2) {
    const [minutes, seconds] = parts.map(Number);
    return minutes * 60 + seconds;
  }

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts.map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  return null;
};

// ─── FILE UPLOAD ZONE ──────────────────────────────────────────────────────────
function FileUploadZone({ files, onChange, existingFiles = [], onRemoveExisting }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (incoming) => {
    const arr = Array.from(incoming);
    onChange(prev => [...(prev || []), ...arr]);
  };
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); };
  const removeFile = (idx) => onChange(prev => prev.filter((_, i) => i !== idx));
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  const getFileIcon = (file) => {
    const t = file.type;
    if (t.startsWith('video/')) return { icon: 'videocam', color: 'text-blue-500', bg: 'bg-blue-50' };
    if (t.startsWith('image/')) return { icon: 'image', color: 'text-emerald-500', bg: 'bg-emerald-50' };
    if (t === 'application/pdf') return { icon: 'picture_as_pdf', color: 'text-red-500', bg: 'bg-red-50' };
    if (t.includes('word') || t.includes('document')) return { icon: 'description', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (t.includes('spreadsheet') || t.includes('excel')) return { icon: 'table_chart', color: 'text-green-600', bg: 'bg-green-50' };
    return { icon: 'attach_file', color: 'text-slate-500', bg: 'bg-slate-100' };
  };

  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-1.5">
        Tệp đính kèm
        <span className="ml-2 text-xs font-normal text-slate-400">PDF, Video, Hình ảnh, Tài liệu...</span>
      </label>
      <div
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all
          ${dragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50/80'}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input ref={inputRef} type="file" multiple className="hidden"
          onChange={e => handleFiles(e.target.files)}
          accept="video/*,image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" />
        <div className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-colors
          ${dragging ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
          <span className="material-symbols-outlined text-2xl">{dragging ? 'file_download' : 'cloud_upload'}</span>
        </div>
        <p className="text-sm font-bold text-slate-600">{dragging ? 'Thả file vào đây...' : 'Kéo & thả file, hoặc nhấn để chọn'}</p>
        <p className="text-xs text-slate-400 mt-1">Hỗ trợ: MP4, PDF, DOCX, XLSX, JPG, PNG</p>
      </div>
      {existingFiles && existingFiles.length > 0 && (
        <div className="mt-3 space-y-2">
          {existingFiles.map((file, idx) => {
            const iconData = getFileIcon({ type: file.type || "video/mp4" });
            return (
              <div key={`existing-${idx}`} className="flex items-center gap-3 px-4 py-3 bg-blue-50/60 rounded-xl border border-blue-100 group/file">
                <div className={`w-9 h-9 rounded-lg ${iconData.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined text-base ${iconData.color}`}>{iconData.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{file.name}</p>
                  <p className="text-xs text-slate-400 truncate">Đang dùng</p>
                </div>
                {onRemoveExisting ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveExisting(file.key);
                    }}
                    className="p-1.5 opacity-0 group-hover/file:opacity-100 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                    title="Bỏ file hiện tại"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
      {files && files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, idx) => {
            const { icon, color, bg } = getFileIcon(file);
            return (
              <div key={idx} className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 group/file">
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined text-base ${color}`}>{icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{file.name}</p>
                  <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                  className="p-1.5 opacity-0 group-hover/file:opacity-100 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all">
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── ADD LESSON MODAL ──────────────────────────────────────────────────────────
function AddLessonModal({ chapterId, chapterTitle, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: '',
    videoUrl: '',
    duration: '',
    description: '',
  });
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  useEffect(() => {
    const videoFile = attachedFiles.find((file) => file.type?.startsWith("video/"));
    if (!videoFile) return;

    const objectUrl = URL.createObjectURL(videoFile);
    const video = document.createElement("video");
    video.preload = "metadata";

    const handleLoadedMetadata = () => {
      setForm((prev) => ({
        ...prev,
        duration: String(Math.max(0, Math.round(video.duration || 0))),
      }));
      URL.revokeObjectURL(objectUrl);
    };

    const handleError = () => {
      URL.revokeObjectURL(objectUrl);
    };

    video.onloadedmetadata = handleLoadedMetadata;
    video.onerror = handleError;
    video.src = objectUrl;

    return () => {
      video.onloadedmetadata = null;
      video.onerror = null;
      URL.revokeObjectURL(objectUrl);
    };
  }, [attachedFiles]);

  const handleSave = async () => {
    if (!chapterId) {
      setError('Không xác định được chương. Vui lòng đóng modal và thử lại.');
      return;
    }
    if (!form.title.trim()) {
      setError('Vui lòng nhập tên bài học.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const videoFile = attachedFiles.find((file) => file.type?.startsWith("video/"));
      const documentFile = attachedFiles.find((file) => !file.type?.startsWith("video/"));

      let uploadedVideoUrl = form.videoUrl.trim();
      let uploadedAttachmentUrl = null;

      if (!uploadedVideoUrl && videoFile) {
        const uploadedVideo = await uploadImage(videoFile);
        uploadedVideoUrl = resolveUploadedPath(uploadedVideo);
      }

      if (documentFile) {
        const uploadedAttachment = await uploadImage(documentFile);
        uploadedAttachmentUrl = resolveUploadedPath(uploadedAttachment);
      }

      if (!uploadedVideoUrl && videoFile) {
        throw new Error("Upload video khong tra ve duong dan hop le.");
      }
      // Bước 1: tạo lesson → nhận lessonId
      const lessonDuration = parseDurationToSeconds(form.duration);

      const lessonRes = await createLessonApi({
        title: form.title,
        videoUrl: uploadedVideoUrl,
        duration: lessonDuration,
        description: form.description,
        isFree: true,
        attachmentUrl: uploadedAttachmentUrl,
      });
      const lessonId = lessonRes.data?.lessonId;
      console.log("✅ Lesson created, lessonId:", lessonId);

      // Bước 2: gắn lesson vào đúng chapter
      await addLessonToChapterApi(chapterId, lessonId);
      console.log("✅ Lesson added to chapterId:", chapterId);

      await onSaved(); // reload course
      onClose();
    } catch (e) {
      console.error("❌ AddLesson error:", e);
      setError(e.response?.data?.message || e.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'title',       label: 'Tên bài học *',              type: 'text',     placeholder: 'VD: 1.1 Giới thiệu cấu trúc đề thi' },
    { key: 'videoUrl',    label: 'URL Video (YouTube / Vimeo)', type: 'text',     placeholder: 'https://youtube.com/...' },
    { key: 'duration',    label: 'Thời lượng',                 type: 'text',     placeholder: 'VD: 12:45' },
    { key: 'description', label: 'Mô tả bài học',              type: 'textarea', placeholder: 'Nội dung bài học này bao gồm...' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modalIn 0.22s cubic-bezier(.22,1,.36,1)' }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-blue-500">add_circle</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5 truncate">
              {chapterTitle || 'Chương'}
            </p>
            <h2 className="text-xl font-extrabold text-slate-900">Thêm Bài học mới</h2>
          </div>
          <button
            onClick={onClose}
            className="ml-auto p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Warning nếu chapterId undefined */}
          {!chapterId && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-yellow-50 border border-yellow-200">
              <span className="material-symbols-outlined text-yellow-500 text-[18px] flex-shrink-0">warning</span>
              <p className="text-sm text-yellow-700 font-medium">
                Không tìm thấy ID chương. Vui lòng đóng và thử lại.
              </p>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
              <span className="material-symbols-outlined text-red-500 text-[18px] flex-shrink-0">error</span>
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={form[f.key]}
                  onChange={e => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none transition"
                />
              ) : (
                <input
                  type="text"
                  value={form[f.key]}
                  onChange={e => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition
                    ${f.key === 'title' && error && !form.title.trim()
                      ? 'border-red-300 bg-red-50/40'
                      : 'border-slate-200'}`}
                />
              )}
            </div>
          ))}

          <div className="pt-1">
            <div className="border-t border-slate-100 mb-5"></div>
            <FileUploadZone files={attachedFiles} onChange={setAttachedFiles} />
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t bg-slate-50/60 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !chapterId}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:opacity-90 hover:-translate-y-0.5 transition-all shadow disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
            )}
            {loading ? 'Đang lưu...' : 'Thêm bài học'}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddQuizModal({ chapterId, chapterTitle, onClose, onSaved }) {
  const [quizList, setQuizList] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadQuizzes() {
      setLoading(true);
      setError("");
      try {
        const res = await fetchQuizzes({ status: "ACTIVE" });
        const quizzes = res.data?.data || [];
        if (!alive) return;
        setQuizList(quizzes);
      } catch (e) {
        if (!alive) return;
        console.error("LOAD QUIZ BANK ERROR:", e);
        setError(e.response?.data?.message || "Khong tai duoc danh sach quiz.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadQuizzes();
    return () => {
      alive = false;
    };
  }, []);

  const filteredQuizzes = quizList.filter((quiz) => {
    const haystack = `${quiz.title || ""} ${quiz.quizType || ""} HSK ${quiz.hsklevel || ""}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  const handleSave = async () => {
    if (!chapterId || !selectedQuizId) {
      setError("Vui long chon quiz de them vao chuong.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await addQuizToChapterApi(chapterId, Number(selectedQuizId));
      await onSaved();
      onClose();
    } catch (e) {
      console.error("ADD QUIZ TO CHAPTER ERROR:", e);
      setError(e.response?.data?.message || "Khong the them quiz vao chuong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalIn 0.22s cubic-bezier(.22,1,.36,1)" }}
      >
        <div className="flex items-center gap-4 border-b px-8 pb-6 pt-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
            <span className="material-symbols-outlined text-orange-500">quiz</span>
          </div>
          <div className="min-w-0">
            <p className="mb-0.5 truncate text-xs font-bold uppercase tracking-widest text-slate-400">
              {chapterTitle || "Chuong"}
            </p>
            <h2 className="text-xl font-extrabold text-slate-900">Them Quiz co san</h2>
          </div>
          <button
            onClick={onClose}
            className="ml-auto rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-5 px-8 py-6">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">Tim quiz</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tim theo ten de, dang de, HSK..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <span className="material-symbols-outlined text-[18px] text-red-500">error</span>
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          )}

          <div className="max-h-[50vh] space-y-2 overflow-y-auto pr-1">
            {loading ? (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-10 text-center text-sm text-slate-400">
                Dang tai danh sach quiz...
              </div>
            ) : filteredQuizzes.length === 0 ? (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-10 text-center text-sm text-slate-400">
                Khong tim thay quiz phu hop.
              </div>
            ) : (
              filteredQuizzes.map((quiz) => {
                const selected = String(selectedQuizId) === String(quiz.quizId);
                return (
                  <button
                    key={quiz.quizId}
                    type="button"
                    onClick={() => setSelectedQuizId(String(quiz.quizId))}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selected
                        ? "border-primary bg-blue-50 shadow-sm"
                        : "border-slate-200 hover:border-primary/40 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-slate-900">{quiz.title}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-bold text-slate-700">
                            HSK {quiz.hsklevel || 1}
                          </span>
                          <span className="rounded-full bg-orange-50 px-2.5 py-1 font-bold text-orange-600">
                            {quiz.quizType || "Quiz"}
                          </span>
                          <span className={`rounded-full px-2.5 py-1 font-bold ${
                            quiz.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-600"
                              : quiz.status === "DRAFT"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-slate-100 text-slate-500"
                          }`}>
                            {quiz.status || "UNKNOWN"}
                          </span>
                        </div>
                      </div>
                      <div className={`mt-1 h-5 w-5 rounded-full border-2 ${selected ? "border-primary" : "border-slate-300"}`}>
                        <div className={`m-0.5 h-2.5 w-2.5 rounded-full ${selected ? "bg-primary" : "bg-transparent"}`} />
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t bg-slate-50/60 px-8 py-5">
          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50"
          >
            Huy
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !selectedQuizId}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0"
          >
            {saving && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>}
            {saving ? "Dang them..." : "Them quiz vao chuong"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── EDIT MODAL ────────────────────────────────────────────────────────────────
function EditModal({ type, data, onClose, onSave }) {
  const [form, setForm] = useState({ ...data });
  const [attachedFiles, setAttachedFiles] = useState([]);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const handleSave = () => { onSave({ ...form, files: attachedFiles }); onClose(); };

  const config = {
    chapter: {
      title: 'Chỉnh sửa Chương', icon: 'folder_open', color: 'text-primary', bg: 'bg-blue-50',
      fields: [
        { key: 'title', label: 'Tên chương', type: 'text', placeholder: 'VD: Nhập môn HSK 4' },
        { key: 'description', label: 'Mô tả', type: 'textarea', placeholder: 'Mô tả ngắn về nội dung chương...' },
        { key: 'duration', label: 'Thời lượng ước tính', type: 'text', placeholder: 'VD: 45 phút' },
      ],
    },
    lesson: {
      title: 'Chỉnh sửa Bài học', icon: 'play_circle', color: 'text-blue-500', bg: 'bg-blue-50',
      fields: [
        { key: 'title', label: 'Tên bài học', type: 'text', placeholder: 'VD: 1.1 Giới thiệu cấu trúc đề thi' },
        { key: 'videoUrl', label: 'URL Video (YouTube / Vimeo)', type: 'text', placeholder: 'https://youtube.com/...' },
        { key: 'duration', label: 'Thời lượng', type: 'text', placeholder: 'VD: 12:45' },
        { key: 'description', label: 'Mô tả bài học', type: 'textarea', placeholder: 'Nội dung bài học này bao gồm...' },
      ],
    },
    quiz: {
      title: 'Chỉnh sửa Quiz', icon: 'quiz', color: 'text-orange-500', bg: 'bg-orange-50',
      fields: [
        { key: 'title', label: 'Tên quiz', type: 'text', placeholder: 'VD: Kiểm tra chương 1' },
        { key: 'questionCount', label: 'Số câu hỏi', type: 'number', placeholder: '15' },
        { key: 'passPercent', label: 'Điểm đạt (%)', type: 'number', placeholder: '80' },
        { key: 'timeLimit', label: 'Thời gian làm bài (phút)', type: 'number', placeholder: '30' },
        { key: 'description', label: 'Hướng dẫn', type: 'textarea', placeholder: 'Hướng dẫn cho học viên...' },
      ],
    },
  };

  const cfg = config[type];
  const existingFiles = type === "lesson"
    ? [
        form.videoUrl
          ? {
              key: "videoUrl",
              name: String(form.videoUrl).split("/").pop(),
              type: "video/mp4",
            }
          : null,
        form.attachmentUrl
          ? {
              key: "attachmentUrl",
              name: String(form.attachmentUrl).split("/").pop(),
              type: "application/octet-stream",
            }
          : null,
      ].filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modalIn 0.22s cubic-bezier(.22,1,.36,1)' }}>
        <div className="px-8 pt-8 pb-6 border-b flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl ${cfg.bg} flex items-center justify-center`}>
            <span className={`material-symbols-outlined ${cfg.color}`}>{cfg.icon}</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              {type === 'chapter' ? 'Chương' : type === 'lesson' ? 'Bài học' : 'Quiz'}
            </p>
            <h2 className="text-xl font-extrabold text-slate-900">{cfg.title}</h2>
          </div>
          <button onClick={onClose} className="ml-auto p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="px-8 py-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {cfg.fields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea rows={3} value={form[f.key] || ''} onChange={e => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none transition" />
              ) : (
                <input type={f.type} value={form[f.key] || ''} onChange={e => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
              )}
            </div>
          ))}
          <div className="pt-1">
            <div className="border-t border-slate-100 mb-5"></div>
            <FileUploadZone
              files={attachedFiles}
              onChange={setAttachedFiles}
              existingFiles={existingFiles}
              onRemoveExisting={
                type === "lesson"
                  ? (key) => setForm((prev) => ({ ...prev, [key]: "" }))
                  : undefined
              }
            />
          </div>
        </div>
        <div className="px-8 py-5 border-t bg-slate-50/60 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">Hủy</button>
          <button onClick={handleSave} className="px-6 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:opacity-90 hover:-translate-y-0.5 transition-all shadow">Lưu thay đổi</button>
        </div>
      </div>
    </div>
  );
}

// ─── CHAPTER CARD ──────────────────────────────────────────────────────────────
function ChapterCard({ ch, ci, onEditChapter, onEditLesson, onEditQuiz, onAddLesson, onAddQuiz, onDeleteChapter, onDeleteContent }) {
  const [expanded, setExpanded] = useState(true);
  const lessons = ch.contents?.filter(i => i.contentType === 'LESSON') || [];
  const quizzes = ch.contents?.filter(i => i.contentType === 'QUIZ') || [];
  const totalItems = (ch.contents || []).length;

  const chapterId = getChapterId(ch);

  const handleAddLesson = () => {
    console.log("🔍 Chapter raw object:", ch);
    console.log("🆔 Resolved chapterId:", chapterId);
    if (!chapterId) {
      alert("⚠️ Không tìm thấy ID chương. Kiểm tra console để xem tên field đúng.");
      return;
    }
    onAddLesson(chapterId, ch.title);
  };

  const handleAddQuiz = () => {
    if (!chapterId) {
      alert("Khong tim thay ID chuong.");
      return;
    }
    onAddQuiz(chapterId, ch.title);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      style={{ animation: `fadeUp 0.35s cubic-bezier(.22,1,.36,1) ${ci * 0.07}s both` }}>

      {/* Chapter header */}
      <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-slate-50/80 to-white border-b border-slate-100">

        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex flex-col items-center justify-center shadow-sm shadow-primary/30">
          <span className="text-[9px] font-black text-white/50 uppercase tracking-wider leading-none">CH</span>
          <span className="text-lg font-black text-white leading-none">{String(ci + 1).padStart(2, '0')}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-slate-900 text-base truncate">{ch.title}</h3>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            {lessons.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <span className="material-symbols-outlined text-sm text-blue-400">play_circle</span>
                {lessons.length} Video
              </span>
            )}
            {quizzes.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <span className="material-symbols-outlined text-sm text-orange-400">quiz</span>
                  {quizzes.length} Quiz
                </span>
              </>
            )}
            {totalItems === 0 && (
              <span className="text-xs text-slate-400 italic">Chưa có nội dung</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleAddLesson}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Bài học
          </button>
          <button
            onClick={handleAddLesson}
            className="flex sm:hidden p-2 text-primary hover:bg-blue-50 rounded-lg transition-colors"
            title="Thêm bài học"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
          <button
            onClick={handleAddQuiz}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-sm">quiz</span>
            Quiz
          </button>
          <button
            onClick={handleAddQuiz}
            className="flex sm:hidden p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
            title="Them quiz"
          >
            <span className="material-symbols-outlined text-[18px]">quiz</span>
          </button>
          <button
            onClick={() => onEditChapter(ch, ci)}
            className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
            title="Chinh sua chuong">
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            onClick={() => onDeleteChapter(chapterId, ch.title)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Xoa chuong">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
          <div className="w-px h-5 bg-slate-200 mx-0.5"></div>
          <button
            onClick={() => setExpanded(v => !v)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
            <span className="material-symbols-outlined text-[18px] transition-transform duration-200 block"
              style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
              expand_more
            </span>
          </button>
        </div>
      </div>

      {/* Content list */}
      {expanded && (
        <div>
          {totalItems === 0 ? (
            <div className="py-10 flex flex-col items-center gap-3 bg-slate-50/40">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-slate-300">playlist_add</span>
              </div>
              <p className="text-sm text-slate-400 font-medium">Chuong nay chua co bai giang.</p>
              <button
                onClick={handleAddLesson}
                className="text-xs font-bold text-primary hover:underline uppercase tracking-widest"
              >
                Bat dau tao bai hoc
              </button>
              <button
                onClick={handleAddQuiz}
                className="text-xs font-bold text-orange-500 hover:underline uppercase tracking-widest"
              >
                Them quiz co san
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-50/80">
              {ch.contents.map((item, idx) => {
                if (item.contentType === 'LESSON') {
                  return (
                    <div key={item.courseContentId}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-blue-50/25 group/row transition-colors">
                      <span className="material-symbols-outlined text-slate-200 cursor-grab text-[18px] flex-shrink-0">drag_indicator</span>
                      <span className="text-[11px] font-bold text-slate-300 w-5 text-right flex-shrink-0">{idx + 1}</span>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[16px] text-blue-500">play_circle</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate leading-snug">{item.lesson?.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.lesson?.duration && <span className="mr-1.5">{item.lesson.duration}</span>}
                          <span className="text-blue-400 font-medium">Video</span>
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                        <button onClick={() => onEditLesson(item, ci, idx)}
                          className="p-1.5 hover:bg-blue-50 hover:text-primary rounded-lg transition-all text-slate-300"
                          title="Chỉnh sửa">
                          <span className="material-symbols-outlined text-[15px]">edit</span>
                        </button>
                        <button onClick={() => onDeleteContent(item.courseContentId, "bài học", item.lesson?.title)}
                          className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all text-slate-300" title="Xóa bài học">
                          <span className="material-symbols-outlined text-[15px]">delete</span>
                        </button>
                      </div>
                    </div>
                  );
                }
                if (item.contentType === 'QUIZ') {
                  return (
                    <div key={item.courseContentId}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-orange-50/25 group/row transition-colors">
                      <span className="material-symbols-outlined text-slate-200 cursor-grab text-[18px] flex-shrink-0">drag_indicator</span>
                      <span className="text-[11px] font-bold text-slate-300 w-5 text-right flex-shrink-0">{idx + 1}</span>
                      <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[16px] text-orange-500">quiz</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/quiz/${item.quiz?.quizId || item.quiz?.id}`}
                          className="block text-sm font-semibold text-slate-800 truncate leading-snug hover:text-primary transition-colors"
                        >
                          {item.quiz?.title}
                        </Link>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {item.quiz?.questionCount && (
                            <span className="text-[11px] text-slate-400">{item.quiz.questionCount} câu</span>
                          )}
                          {item.quiz?.passPercent && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span className="text-[11px] font-medium text-orange-400">{item.quiz.passPercent}% pass</span>
                            </>
                          )}
                          {!item.quiz?.questionCount && (
                            <span className="text-[11px] text-orange-400 font-medium">Quiz</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                        <button onClick={() => onEditQuiz(item, ci, idx)}
                          className="p-1.5 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-all text-slate-300"
                          title="Chỉnh sửa">
                          <span className="material-symbols-outlined text-[15px]">edit</span>
                        </button>
                        <button onClick={() => onDeleteContent(item.courseContentId, "quiz", item.quiz?.title)}
                          className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all text-slate-300" title="Xóa quiz">
                          <span className="material-symbols-outlined text-[15px]">delete</span>
                        </button>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AdminCourseContent() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [modal, setModal] = useState(null);
  const [addLessonModal, setAddLessonModal] = useState(null);
  const [addQuizModal, setAddQuizModal] = useState(null);
const API_BASE = import.meta.env.VITE_API_URL;
  const fetchCourse = async () => {

    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    const res = await fetch(`${BASE_URL}/api/courses/${courseId}`, {

      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
    });
    const data = await res.json();
    console.log("📦 Course data:", data);
    console.log("📦 First chapter sample:", data?.chapters?.[0]);
    setCourse(data);
    return data;
  };

  useEffect(() => {
    if (!courseId) return;
    fetchCourse().catch(err => console.error(err));
  }, [courseId]);

  const openEdit = (type, data, chapterIdx = null, itemIdx = null) =>
    setModal({ type, data, chapterIdx, itemIdx });
  const closeModal = () => setModal(null);

  const handleSave = async (updated) => {
    if (!modal) return;
    try {
      const { files, ...cleanData } = updated;
      if (modal.type === 'lesson') {
        const lessonFiles = Array.isArray(files) ? files : [];
        const videoFile = lessonFiles.find((file) => file.type?.startsWith("video/"));
        const documentFile = lessonFiles.find((file) => !file.type?.startsWith("video/"));

        let nextVideoUrl = cleanData.videoUrl?.trim?.() || modal.data.videoUrl || "";
        let nextAttachmentUrl = cleanData.attachmentUrl || modal.data.attachmentUrl || null;

        if (videoFile) {
          const uploadedVideo = await uploadImage(videoFile);
          nextVideoUrl = resolveUploadedPath(uploadedVideo);
        }

        if (documentFile) {
          const uploadedAttachment = await uploadImage(documentFile);
          nextAttachmentUrl = resolveUploadedPath(uploadedAttachment);
        }

        await updateLessonApi(modal.data.id, {
          ...cleanData,
          videoUrl: nextVideoUrl,
          duration: parseDurationToSeconds(cleanData.duration),
          attachmentUrl: nextAttachmentUrl,
        });
      }
      if (modal.type === 'chapter') await updateChapterApi(modal.data.id, cleanData);
      if (modal.type === 'quiz')    await updateQuizApi(modal.data.id, cleanData);
      await fetchCourse();
    } catch (err) {
      console.error('UPDATE ERROR:', err);
    }
    closeModal();
  };

  const openAddLesson = (chapterId, chapterTitle) => {
    console.log("➕ openAddLesson — chapterId:", chapterId, "| title:", chapterTitle);
    setAddLessonModal({ chapterId, chapterTitle });
  };

  const closeAddLesson = () => setAddLessonModal(null);
  const handleLessonSaved = () => fetchCourse();
  const openAddQuiz = (chapterId, chapterTitle) => setAddQuizModal({ chapterId, chapterTitle });
  const closeAddQuiz = () => setAddQuizModal(null);
  const handleQuizSaved = () => fetchCourse();

  // ── Delete handlers ───────────────────────────────────────────────────────────
  const handleDeleteContent = async (courseContentId, type, name) => {
    if (!window.confirm(`Xóa ${type} "${name || ''}"?\nHành động này không thể hoàn tác.`)) return;
    try {
      await deleteContentApi(courseContentId);
      await fetchCourse();
    } catch (err) {
      console.error("DELETE CONTENT ERROR:", err);
      alert(`❌ Xóa thất bại: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDeleteChapter = async (chapterId, title) => {
    if (!window.confirm(`Xóa chương "${title}"?\nTất cả bài học trong chương này cũng sẽ bị xóa.`)) return;
    try {
      await deleteChapterApi(chapterId);
      await fetchCourse();
    } catch (err) {
      console.error("DELETE CHAPTER ERROR:", err);
      alert(`❌ Xóa chương thất bại: ${err.response?.data?.message || err.message}`);
    }
  };

  const totalVideos = course?.chapters?.reduce((acc, ch) =>
    acc + (ch.contents?.filter(c => c.contentType === 'LESSON').length || 0), 0) || 0;
  const totalQuizzes = course?.chapters?.reduce((acc, ch) =>
    acc + (ch.contents?.filter(c => c.contentType === 'QUIZ').length || 0), 0) || 0;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {modal && (
        <EditModal type={modal.type} data={modal.data} onClose={closeModal} onSave={handleSave} />
      )}

      {addLessonModal && (
        <AddLessonModal
          chapterId={addLessonModal.chapterId}
          chapterTitle={addLessonModal.chapterTitle}
          onClose={closeAddLesson}
          onSaved={handleLessonSaved}
        />
      )}

      {addQuizModal && (
        <AddQuizModal
          chapterId={addQuizModal.chapterId}
          chapterTitle={addQuizModal.chapterTitle}
          onClose={closeAddQuiz}
          onSaved={handleQuizSaved}
        />
      )}

      <div className="flex min-h-screen bg-slate-50/60">

        {/* ── SIDEBAR ── */}
        <aside className="hidden md:flex flex-col w-64 bg-primary text-white sticky top-0 h-screen shadow-xl z-20">
          <div className="flex flex-col items-center border-b border-white/10 pb-6 px-6 py-7">
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
          <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
            <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/12 text-white font-bold text-sm">
              <span className="material-symbols-outlined text-accent-yellow text-[20px]">grid_view</span>
              Nội dung khóa học
            </Link>
            {[
              { icon: 'people', label: 'Học viên' },
              { icon: 'bar_chart', label: 'Thống kê' },
              { icon: 'settings', label: 'Cài đặt' },
            ].map((item, i) => (
              <Link key={i} to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/8 text-white/60 hover:text-white transition-all text-sm">
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-3 mx-3 mb-4 bg-white/8 rounded-2xl">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-white/60">Tiến độ</span>
              <span className="font-bold text-accent-yellow">35%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-accent-yellow h-full rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/70 flex items-center justify-between px-6 md:px-8">
            <nav className="flex items-center gap-2 text-sm min-w-0">
              <button className="md:hidden p-1.5 text-slate-500 mr-1">
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
              <span className="text-slate-400 flex-shrink-0">Khóa học</span>
              <span className="material-symbols-outlined text-slate-300 text-sm flex-shrink-0">chevron_right</span>
              <span className="text-primary font-bold truncate">{course?.title || 'Đang tải...'}</span>
            </nav>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 flex-shrink-0 ml-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-700 hidden sm:block">Live Editor</span>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8">
            <div className="max-w-4xl mx-auto">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div style={{ animation: 'fadeUp 0.3s ease both' }}>
                  <p className="text-[11px] font-black text-primary/50 uppercase tracking-widest mb-1">Curriculum Manager</p>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Quản lý Nội dung</h1>
                  <p className="text-slate-500 text-sm mt-1">Sắp xếp lộ trình học tập, quản lý bài giảng và quiz.</p>
                </div>
                <button
                  onClick={() => navigate(`/adminAddNewVideo/${courseId}`)}
                  className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-md shadow-primary/20 flex-shrink-0"
                  style={{ animation: 'fadeUp 0.3s 0.05s ease both' }}>
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  Thêm Chương mới
                </button>
              </div>

              {course && (
                <div className="grid grid-cols-3 gap-3 mb-7" style={{ animation: 'fadeUp 0.3s 0.1s ease both' }}>
                  {[
                    { label: 'Chương', value: course.chapters?.length || 0, icon: 'folder_open', iconColor: 'text-primary', bg: 'bg-blue-50' },
                    { label: 'Video', value: totalVideos, icon: 'play_circle', iconColor: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Quiz', value: totalQuizzes, icon: 'quiz', iconColor: 'text-orange-500', bg: 'bg-orange-50' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200/80 px-4 md:px-5 py-4 flex items-center gap-3 shadow-sm">
                      <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                        <span className={`material-symbols-outlined text-xl ${s.iconColor}`}>{s.icon}</span>
                      </div>
                      <div>
                        <p className="text-xl font-extrabold text-slate-900 leading-none">{s.value}</p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!course && (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200/80 h-20 animate-pulse" />
                  ))}
                </div>
              )}

              <div className="space-y-4">
                {course?.chapters?.map((ch, ci) => (
                  <ChapterCard
                    key={ch.chapterId ?? ch.id ?? ci}
                    ch={ch}
                    ci={ci}
                    onAddLesson={openAddLesson}
                    onAddQuiz={openAddQuiz}
                    onDeleteChapter={handleDeleteChapter}
                    onDeleteContent={handleDeleteContent}
                    onEditChapter={(ch) => openEdit('chapter', {
                      id: getChapterId(ch),
                      title: ch.title, description: ch.description || '', duration: ch.duration || ''
                    }, ci)}
                    onEditLesson={(item, ci, li) => openEdit('lesson', {
                      id: item.lesson?.lessonId,
                      title: item.lesson?.title || '', videoUrl: item.lesson?.videoUrl || '',
                      duration: item.lesson?.duration || '', description: item.lesson?.description || '',
                      attachmentUrl: item.lesson?.attachmentUrl || ''
                    }, ci, li)}
                    onEditQuiz={(item, ci, qi) => openEdit('quiz', {
                      id: item.quiz?.quizId,
                      title: item.quiz?.title || '', questionCount: item.quiz?.questionCount || '',
                      passPercent: item.quiz?.passPercent || '', timeLimit: item.quiz?.timeLimit || 30,
                      description: item.quiz?.description || ''
                    }, ci, qi)}
                  />
                ))}
              </div>

              {course && (!course.chapters || course.chapters.length === 0) && (
                <div className="text-center py-20" style={{ animation: 'fadeUp 0.3s ease both' }}>
                  <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
                    <span className="material-symbols-outlined text-4xl text-slate-300">library_books</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-700 mb-2">Khóa học chưa có nội dung</h3>
                  <p className="text-slate-400 text-sm mb-6">Bắt đầu bằng cách thêm chương đầu tiên.</p>
                  <button
                    onClick={() => navigate(`/adminAddNewVideo/${courseId}`)}
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-md shadow-primary/20">
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    Thêm Chương đầu tiên
                  </button>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </>
  );
}

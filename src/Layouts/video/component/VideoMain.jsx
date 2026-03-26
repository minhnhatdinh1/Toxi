import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../../../assets/image/LOGO (1).png';
import { useParams } from "react-router-dom";
import axios from "axios";

// ===== MOCK DOCUMENTS DATA =====
const mockLessonDocuments = [
  { id: 1, name: "Giáo án bài 1 - Pinyin & Thanh điệu", type: "pdf", size: "2.4 MB", url: "/documents/bai1-pinyin.pdf", description: "Tài liệu lý thuyết đầy đủ về hệ thống phiên âm Pinyin", downloads: 342, icon: "picture_as_pdf", color: "text-red-500 bg-red-50 border-red-100" },
  { id: 2, name: "Bảng từ vựng Chương 1", type: "xlsx", size: "1.1 MB", url: "/documents/vocabulary-ch1.xlsx", description: "Danh sách 80 từ vựng cơ bản kèm phiên âm và nghĩa", downloads: 519, icon: "table_chart", color: "text-green-600 bg-green-50 border-green-100" },
  { id: 3, name: "Bài tập luyện viết Hán tự", type: "pdf", size: "3.8 MB", url: "/documents/writing-exercise.pdf", description: "Tập bài tập viết 50 chữ Hán cơ bản có hướng dẫn nét", downloads: 278, icon: "edit_note", color: "text-blue-500 bg-blue-50 border-blue-100" },
  { id: 4, name: "Audio Phát âm - 4 Thanh điệu", type: "mp3", size: "18.5 MB", url: "/documents/tones-audio.zip", description: "File audio luyện nghe phát âm 4 thanh điệu chuẩn giọng Bắc Kinh", downloads: 461, icon: "audio_file", color: "text-purple-500 bg-purple-50 border-purple-100" },
  { id: 5, name: "Slide bài giảng (PowerPoint)", type: "pptx", size: "5.2 MB", url: "/documents/slides-bai1.pptx", description: "Bộ slide trình chiếu đầy đủ của bài giảng có thể chỉnh sửa", downloads: 195, icon: "slideshow", color: "text-orange-500 bg-orange-50 border-orange-100" },
];

const typeLabel = { pdf: "PDF", xlsx: "Excel", pptx: "PowerPoint", mp3: "Audio", zip: "ZIP", docx: "Word" };

// ===== DOCUMENT ROW =====
function DocumentRow({ doc }) {
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(doc.downloads);

  const handleDownload = () => {
    if (doc.url) {
      window.open(doc.url, "_blank", "noopener,noreferrer");
      setDone(true);
      setCount((c) => c + 1);
      return;
    }

    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDone(true);
      setCount((c) => c + 1);
      alert(`Đang tải xuống: ${doc.name}`);
    }, 1500);
  };

  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-all group">
      <div className={`size-11 rounded-xl border flex items-center justify-center shrink-0 ${doc.color}`}>
        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>{doc.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{doc.name}</p>
          <span className="shrink-0 text-[9px] font-black px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 uppercase">
            {typeLabel[doc.type] || doc.type.toUpperCase()}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 font-medium truncate">{doc.description}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-[10px] text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-sm">storage</span>{doc.size}</span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-sm">download</span>{count} lượt tải</span>
        </div>
      </div>
      <button onClick={handleDownload} disabled={downloading}
        className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
          done ? "bg-green-50 border-green-200 text-green-600"
          : downloading ? "bg-slate-50 border-slate-200 text-slate-400 cursor-wait"
          : "bg-white border-slate-200 text-slate-600 hover:bg-primary hover:text-white hover:border-primary group-hover:shadow-sm"
        }`}
      >
        {downloading ? (<><svg className="animate-spin size-3.5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Đang tải...</>)
        : done ? (<><span className="material-symbols-outlined text-base">check_circle</span>Đã tải</>)
        : (<><span className="material-symbols-outlined text-base">download</span>Tải về</>)}
      </button>
    </div>
  );
}

// ===== MAIN COMPONENT =====
export default function VideoMain() {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [isDragging, setIsDragging] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [courseProgress, setCourseProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const getOrderedLessons = (chapter) =>
    [...(chapter?.contents || [])]
      .filter((content) => content.contentType === "LESSON" && content.lesson)
      .sort((a, b) => {
        const aOrder = a.orderIndex ?? a.order_index ?? a.lesson?.orderIndex ?? a.lesson?.order_index ?? Number.MAX_SAFE_INTEGER;
        const bOrder = b.orderIndex ?? b.order_index ?? b.lesson?.orderIndex ?? b.lesson?.order_index ?? Number.MAX_SAFE_INTEGER;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return Number(a.lesson?.lessonId || 0) - Number(b.lesson?.lessonId || 0);
      });

  const getOrderedContents = (chapter) =>
    [...(chapter?.contents || [])]
      .filter(
        (content) =>
          (content.contentType === "LESSON" && content.lesson) ||
          (content.contentType === "QUIZ" && content.quiz)
      )
      .sort((a, b) => {
        const aOrder =
          a.orderIndex ??
          a.order_index ??
          a.lesson?.orderIndex ??
          a.lesson?.order_index ??
          a.quiz?.orderIndex ??
          a.quiz?.order_index ??
          Number.MAX_SAFE_INTEGER;
        const bOrder =
          b.orderIndex ??
          b.order_index ??
          b.lesson?.orderIndex ??
          b.lesson?.order_index ??
          b.quiz?.orderIndex ??
          b.quiz?.order_index ??
          Number.MAX_SAFE_INTEGER;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return Number(a.lesson?.lessonId || a.quiz?.quizId || a.quiz?.id || 0) -
          Number(b.lesson?.lessonId || b.quiz?.quizId || b.quiz?.id || 0);
      });

  const isLocked = (orderedLessons, idx) => {
    if (idx === 0) return false;
    const prevLessonId = Number(orderedLessons[idx - 1]?.lesson?.lessonId);
    return !completedLessons.map(Number).includes(prevLessonId);
  };
  const [comments, setComments] = useState([
    { id: 1, author: 'Trần Hạnh', avatar: 'TH', time: '10 phút trước', content: 'Video giảng rất dễ hiểu ạ! Thầy có thể hướng dẫn kỹ hơn về thanh điệu không ạ?', likes: 0, replies: [] },
    { id: 2, author: 'Lý Minh', avatar: 'LM', time: '2 giờ trước', content: 'Từ 你好 dùng cho bạn bè, còn 您好 dùng cho người lớn tuổi đúng không thầy?', likes: 1, replies: [] }
  ]);
  const [newComment, setNewComment] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatarUrl") || null);

  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const lastSentRef = useRef(0);
  const isCompletingRef = useRef(false);
  const menuRef = useRef(null);
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const getAuthConfig = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    return token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
  };

  // ===== FETCH DATA =====
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    lastSentRef.current = 0;
    isCompletingRef.current = false;
    setLesson(null);
    setCourse(null);
    fetchData();
  }, [lessonId]);

  useEffect(() => {
  axios
    .get(`http://localhost:8080/api/progress/course/${courseId}`, getAuthConfig())
    .then((res) => setCourseProgress(res.data))
    .catch(() => setCourseProgress(0));
}, [courseId]);

 const fetchData = async () => {
  try {
    const courseRes = await axios.get(
      `http://localhost:8080/api/courses/${courseId}`
    );
    setCourse(courseRes.data);

    const lessonRes = await axios.get(
      `http://localhost:8080/api/lessons/${lessonId}`,
      getAuthConfig() // ✅ ĐÚNG CHỖ
      
    );
console.log("CONFIG:", getAuthConfig());
    setLesson(lessonRes.data);
  } catch (err) {
    console.error(err);
    
  }
};
  
useEffect(() => {
  axios
    .get(`http://localhost:8080/api/progress/user`, getAuthConfig())
    .then((res) => setCompletedLessons(res.data))
    .catch(() => setCompletedLessons([]));
}, []);

  useEffect(() => {
    const handleAvatarUpdated = (e) => {
      setAvatarUrl(e.detail);
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("avatarUpdated", handleAvatarUpdated);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdated);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===== DRAGGABLE PROGRESS BAR =====
  const seekToPosition = (clientX, element) => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    if (!dur || !isFinite(dur) || isNaN(dur)) return;
    const rect = element.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    videoRef.current.currentTime = percent * dur;
  };

  const handleProgressMouseDown = (e) => {
    setIsDragging(true);
    seekToPosition(e.clientX, e.currentTarget);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging || !progressBarRef.current) return;
      seekToPosition(e.clientX, progressBarRef.current);
    };
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // ===== VIDEO CONTROLS =====
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (err.name !== 'AbortError') console.error(err);
        });
      }
    }
  };
 const handleTimeUpdate = () => {
  if (!videoRef.current) return;

  const current = videoRef.current.currentTime;
  const dur = videoRef.current.duration;

  if (dur && isFinite(dur)) {
    const percent = (current / dur) * 100;

    setCurrentTime(current);
    setProgress(percent);

    // 🔥 gửi mỗi 5%
    if (percent - lastSentRef.current > 5) {
      lastSentRef.current = percent;

      axios.post(`http://localhost:8080/api/progress`, null, {
        params: {
          lessonId,
          percent,
          currentTime: current
        },
        ...getAuthConfig()
      });
    }

    // Khi gần hết video thì chỉ lưu 100%, không chặn luồng hoàn tất bài
    if (percent >= 95) {
      axios.post(`http://localhost:8080/api/progress`, null, {
        params: {
          lessonId,
          percent: 100,
          currentTime: current
        },
        ...getAuthConfig()
      }).catch(() => {});
    }
  }
};
const completeLessonAndGoNext = async () => {
  if (isCompletingRef.current) return;
  isCompletingRef.current = true;

  const allLessons = (course?.chapters || []).flatMap((chapter) =>
    getOrderedLessons(chapter).map((content) => content.lesson)
  );

  const currentIndex = allLessons.findIndex(
    (l) => String(l.lessonId) === String(lessonId)
  );

  if (currentIndex === -1) {
    isCompletingRef.current = false;
    return;
  }

  const finalTime = duration || videoRef.current?.duration || 0;
  const nextLesson = allLessons[currentIndex + 1];
  const currentLessonId = Number(lessonId);

  setProgress(100);
  setCurrentTime(finalTime);
  setCompletedLessons((prev) => {
    const normalized = prev.map(Number);
    return normalized.includes(currentLessonId)
      ? normalized
      : [...normalized, currentLessonId];
  });

  try {
    await axios.post(`http://localhost:8080/api/progress`, null, {
      params: {
        lessonId,
        percent: 100,
        currentTime: finalTime
      },
      ...getAuthConfig()
    });

    const res = await axios.get(
      `http://localhost:8080/api/progress/user`,
      getAuthConfig()
    );

    setCompletedLessons((prev) => {
      const merged = new Set([...prev.map(Number), ...res.data.map(Number), currentLessonId]);
      return [...merged];
    });
  } catch (err) {
    console.error("Save progress failed:", err);
  }

  if (!nextLesson || !nextLesson.lessonId) {
    alert("Ban da hoan thanh khoa hoc!");
  }

  isCompletingRef.current = false;
};

useEffect(() => {
  if (!duration || isCompletingRef.current) return;
  if (currentTime >= Math.max(duration - 0.25, 0)) {
    handleVideoEnd();
  }
}, [currentTime, duration]);

const handleVideoEnd = () => {
  completeLessonAndGoNext();
};

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;

  setDuration(videoRef.current.duration);

  axios
    .get(`http://localhost:8080/api/progress/${lessonId}`, getAuthConfig())
    .then((res) => {
      const time = res.data?.currentTime;

      if (time) {
        videoRef.current.currentTime = time;
      }
    })
    .catch(() => {});
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
  };

  const handlePlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
  };

  const handleFullscreen = () => {
    if (videoRef.current?.parentElement) {
      if (!document.fullscreenElement) {
        videoRef.current.parentElement.requestFullscreen().catch(err => console.log(err));
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const getVideoSource = (videoUrl) => {
    if (!videoUrl) return "";
    if (/^https?:\/\//i.test(videoUrl)) return videoUrl;

    const normalized = String(videoUrl).replace(/\\/g, "/").replace(/^\/+/, "");
    if (/^(uploads|upload)\//i.test(normalized)) {
      return `http://localhost:8080/${normalized}`;
    }

    return `http://localhost:8080/uploads/${normalized}`;
  };

  const lessonDocuments = lesson?.attachmentUrl
    ? [
        {
          id: `lesson-attachment-${lesson.lessonId}`,
          name: lesson.attachmentUrl.split("/").pop() || `Tai lieu bai ${lesson.lessonId}`,
          type: (lesson.attachmentUrl.split(".").pop() || "file").toLowerCase(),
          size: "Tai lieu dinh kem",
          url: getVideoSource(lesson.attachmentUrl),
          description: `Tai lieu dinh kem cua bai hoc ${lesson.title || ""}`.trim(),
          downloads: 0,
          icon: "description",
          color: "text-blue-500 bg-blue-50 border-blue-100",
        },
      ]
    : [];

  const videoProgressPercent = Math.max(0, Math.min(100, progress || 0));
  const allCourseLessons = (course?.chapters || [])
    .flatMap((chapter) => getOrderedLessons(chapter).map((content) => content.lesson))
    .filter(Boolean);
  const courseLessonIds = new Set(allCourseLessons.map((item) => Number(item.lessonId)));
  const completedCourseCount = completedLessons
    .map(Number)
    .filter((id, index, arr) => arr.indexOf(id) === index && courseLessonIds.has(id))
    .length;
  const currentLessonIdNumber = Number(lessonId);
  const currentLessonContribution = courseLessonIds.has(currentLessonIdNumber) &&
    !completedLessons.map(Number).includes(currentLessonIdNumber)
      ? videoProgressPercent / 100
      : 0;
  const localCourseProgress = allCourseLessons.length
    ? ((completedCourseCount + currentLessonContribution) / allCourseLessons.length) * 100
    : 0;
  const displayedCourseProgress = Math.max(courseProgress || 0, localCourseProgress);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, author: 'Bạn', avatar: 'BA', time: 'Vừa xong', content: newComment, likes: 0, replies: [] }]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
  };

  // ===== LOADING GUARD =====
  if (!lesson || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin size-8 text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm text-slate-400 font-medium">Đang tải bài học...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
        <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => setOpenLeft(true)} className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <Link to="/Home" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
            <div>
              <h1 className="text-2xl font-black tracking-tighter leading-none">TOXI</h1>
              <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">学以致用</p>
            </div>
            </Link>
          </div>
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <input type="text" placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
                className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60" />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">search</span>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button onClick={() => setOpenRight(true)} className="flex lg:hidden items-center justify-center size-10 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined">forum</span>
            </button>
            <Link to="/cart" className="relative cursor-pointer p-2">
              <span className="material-symbols-outlined text-[28px] text-secondary hover:text-white transition-colors">shopping_cart</span>
            </Link>
            {localStorage.getItem("token") ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 hover:bg-white/10 rounded-full px-2 py-1 transition-all"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm shadow-md">
                      {(localStorage.getItem("userName") || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-semibold max-w-[100px] truncate">
                    {localStorage.getItem("userName") || "User"}
                  </span>
                </button>
                {menuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100"
                    style={{ zIndex: 99999, boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
                  >
                    <div className="px-4 py-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {(localStorage.getItem("userName") || "U").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-sm truncate">{localStorage.getItem("userName") || "User"}</p>
                          <p className="text-xs text-slate-400 truncate">{localStorage.getItem("email") || "Học viên TOXI"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      {[
                        { icon: "person", label: "Trang cá nhân", to: "/Profile" },
                        { icon: "school", label: "Khóa học của tôi", to: "/MyCourse" },
                        { icon: "shopping_bag", label: "Đơn hàng", to: "/MyProduct" },
                        { icon: "info", label: "Thông tin cá nhân", to: "/Profile" },
                      ].map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-slate-600 text-sm"
                        >
                          <span className="material-symbols-outlined text-slate-400 text-[20px]">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 py-2">
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("userId");
                          localStorage.removeItem("userName");
                          localStorage.removeItem("email");
                          setMenuOpen(false);
                          navigate("/home");
                          window.location.reload();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-red-500 text-sm"
                      >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <button className="text-white/80 font-bold text-sm hover:text-white transition-colors">Đăng nhập</button>
                </Link>
                <Link to="/register">
                  <button className="bg-secondary text-primary px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:brightness-110 transition-all">Đăng ký</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {openLeft && <div onClick={() => setOpenLeft(false)} className="fixed inset-0 bg-black/20 z-40 md:hidden" />}

        {/* LEFT SIDEBAR */}
        <aside className={`fixed top-20 bottom-0 left-0 z-40 w-[320px] lg:w-[360px] bg-surface-light dark:bg-surface-dark transform transition-transform duration-300 ${openLeft ? "translate-x-0" : "-translate-x-full"} md:static md:top-auto md:bottom-auto md:translate-x-0 md:flex flex-col shrink-0`}>
          <button onClick={() => setOpenLeft(false)} className="absolute top-3 right-3 md:hidden">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
                <h1 className="text-slate-900 dark:text-white text-base font-bold">{course?.title}</h1>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Tiến độ khóa học</span>
                <span className="font-bold text-primary"> {displayedCourseProgress.toFixed(0)}%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-primary transition-all duration-300"
                  style={{ width: `${displayedCourseProgress}%` }}
                />
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Tiến độ video</span>
                  <span className="font-bold text-emerald-600">{videoProgressPercent.toFixed(0)}%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-primary transition-all duration-300"
                    style={{ width: `${videoProgressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-3">
            {course?.chapters?.map((chapter) => {
              const orderedLessons = getOrderedLessons(chapter);
              const orderedContents = getOrderedContents(chapter);
              return (
              <div key={chapter.chapterId} className="mb-3">
                <div className="flex items-center gap-2 p-2">
                  <span className="material-symbols-outlined text-green-500 text-[18px]">menu_book</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">{chapter.title}</span>
                </div>
                <div className="pl-4 space-y-1">
                  {orderedContents.map((content, idx) => {
  if (content.contentType === "QUIZ" && content.quiz) {
    const quizId = content.quiz.quizId || content.quiz.id;

    return (
      <div
        key={`quiz-${quizId}`}
        onClick={() => {
          navigate(`/quiz/${quizId}`);
          setOpenLeft(false);
        }}
        className="p-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px] text-orange-500">quiz</span>

        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-800 dark:text-white">{content.quiz.title}</span>
          <span className="text-xs text-orange-500 font-medium">Quiz trắc nghiệm</span>
        </div>
      </div>
    );
  }

  const l = content.lesson;
  const lessonIndex = orderedLessons.findIndex(
    (lessonContent) => String(lessonContent.lesson?.lessonId) === String(l?.lessonId)
  );
  const locked = isLocked(orderedLessons, lessonIndex);

  return (
    <div
      key={l.lessonId}
      onClick={() => {
        if (locked) return alert("🔒 Học bài trước đã");
        navigate(`/learn/${courseId}/${l.lessonId}`);
        setOpenLeft(false);
      }}
      className={`p-2 rounded-lg flex items-center gap-2 ${
        locked
          ? "opacity-40 cursor-not-allowed"
          : l.lessonId == lessonId
          ? "bg-primary text-white"
          : "hover:bg-slate-100 dark:hover:bg-slate-700"
      }`}
    >
      <span className="material-symbols-outlined text-[18px]">
        {locked ? "lock" : "play_circle"}
      </span>

      <div className="flex flex-col">
        <span className="text-sm font-bold">{l.title}</span>
        <span className="text-xs opacity-70">
          {l.duration || "00:00"} phút
        </span>
      </div>
    </div>
  );
})}
                </div>
              </div>
            )})}
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 h-full bg-background-light dark:bg-background-dark overflow-y-auto custom-scrollbar bg-chinese-pattern p-6">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Breadcrumb */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>{course?.title}</span>
                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                <span className="text-primary">{lesson?.title}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{lesson?.title}</h1>
            </div>

            {/* Video Player */}
            <div className="relative group aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">

              {/* Progress bar */}
              <div
                ref={progressBarRef}
                className="absolute left-0 right-0 bottom-14 z-20 cursor-pointer px-4"
                style={{ height: isDragging ? '6px' : '3px', transition: 'height 0.15s' }}
                onMouseDown={handleProgressMouseDown}
              >
                <div className="absolute inset-0 bg-white/20" />
                <div className="absolute top-0 left-0 h-full bg-red-500" style={{ width: `${progress}%` }}>
                  <div
                    className="absolute top-1/2 bg-red-500 rounded-full shadow-md"
                    style={{
                      width: isDragging ? '14px' : '10px',
                      height: isDragging ? '14px' : '10px',
                      right: 0,
                      transform: 'translate(50%, -50%)',
                      transition: 'width 0.15s, height 0.15s',
                    }}
                  />
                </div>
              </div>

              {/* Video */}
              <video
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={(e) => console.log('Video error:', e)}
                className="w-full h-full object-cover"
                poster={lesson?.thumbnailUrl || ""}
              >
              {lesson?.videoUrl && (
  <source
    src={getVideoSource(lesson.videoUrl)}
    type="video/mp4"
  />
)}

              </video>

              {/* Overlay play button (hover only) */}
              <div className="absolute inset-0 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                <button onClick={handlePlayPause} className="size-20 bg-primary/90 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                  <span className="material-symbols-outlined text-[48px] ml-1">{isPlaying ? 'pause' : 'play_arrow'}</span>
                </button>
              </div>

              {/* Bottom controls (luôn hiện) */}
              <div className="absolute bottom-0 inset-x-0 px-4 pt-6 pb-3 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between text-white text-[10px]">
                  <div className="flex items-center gap-4">
                    <button onClick={handlePlayPause} className="hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[20px]">{isPlaying ? 'pause' : 'play_arrow'}</span>
                    </button>
                    <span className="font-mono text-xs">{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">volume_up</span>
                      <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="w-16 h-1 cursor-pointer accent-white" />
                    </div>
                    <select value={playbackSpeed} onChange={(e) => handlePlaybackSpeed(parseFloat(e.target.value))}
                      className="bg-black/50 text-white text-xs p-1 rounded cursor-pointer border border-white/20">
                      <option value={0.5}>0.5x</option>
                      <option value={1}>1x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>
                    <button onClick={handleFullscreen} className="hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB BAR */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-100 dark:border-slate-800">
                {[
                  { id: "overview", label: "Tổng quan", icon: "overview" },
                  { id: "documents", label: "Tài liệu", icon: "folder_open", badge: lessonDocuments.length },
                  { id: "vocabulary", label: "Từ vựng", icon: "dictionary" },
                ].map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold transition-all border-b-2 relative ${activeTab === tab.id ? "border-primary text-primary bg-blue-50/50 dark:bg-blue-950/20" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                  >
                    <span className="material-symbols-outlined text-base">{tab.icon}</span>
                    {tab.label}
                    {tab.badge && (
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-primary text-white" : "bg-slate-100 text-slate-500"}`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {activeTab === "overview" && (
                <div className="p-6">
                  {lessonDocuments.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      <a href={lessonDocuments[0].url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-primary text-xs font-medium transition-colors">
                        <span className="material-symbols-outlined text-[16px]">description</span>TAI LIEU
                      </a>
                    </div>
                  )}
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Mục tiêu bài học:</h3>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4">
                      <li>Nhận diện và phát âm chuẩn từ "你好" (Nǐ hǎo).</li>
                      <li>Hiểu cách sử dụng kính ngữ "您好" (Nín hǎo).</li>
                      <li>Phát triển kỹ năng phản xạ khi chào hỏi.</li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full border border-white bg-slate-200" />
                      <div className="size-6 rounded-full border border-white bg-slate-300" />
                      <div className="size-6 rounded-full border border-white bg-slate-400" />
                      <span className="ml-4 text-[10px] text-slate-400">+120 học viên đã học xong</span>
                    </div>
                    <button className="px-4 py-2 bg-accent text-primary-dark font-bold text-[11px] rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      HOÀN THÀNH BÀI HỌC
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div>
                  <div className="divide-y divide-slate-50 dark:divide-slate-800">
                    {lessonDocuments.length > 0 ? (
                      lessonDocuments.map((doc) => <DocumentRow key={doc.id} doc={doc} />)
                    ) : (
                      <div className="px-6 py-10 text-center text-slate-400 text-sm">
                        Bai hoc nay chua co tai lieu dinh kem.
                      </div>
                    )}
                  </div>
                  <div className="px-6 py-3 bg-blue-50/50 dark:bg-blue-950/20 border-t border-blue-100/50 dark:border-blue-900/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400 text-base">info</span>
                      <p className="text-[10px] text-blue-500 dark:text-blue-400 font-medium">Tài liệu chỉ dành cho học viên đã đăng ký. Vui lòng không chia sẻ ra ngoài.</p>
                    </div>
                    {lessonDocuments.length > 0 && (
                      <a href={lessonDocuments[0].url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-sm shrink-0">
                        <span className="material-symbols-outlined text-base">download_for_offline</span>Tai tai lieu
                      </a>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "vocabulary" && (
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { zh: "你好", pinyin: "Nǐ hǎo", vi: "Xin chào" },
                      { zh: "您好", pinyin: "Nín hǎo", vi: "Xin chào (kính ngữ)" },
                      { zh: "谢谢", pinyin: "Xièxiè", vi: "Cảm ơn" },
                      { zh: "再见", pinyin: "Zàijiàn", vi: "Tạm biệt" },
                      { zh: "对不起", pinyin: "Duìbuqǐ", vi: "Xin lỗi" },
                      { zh: "没关系", pinyin: "Méi guānxi", vi: "Không sao" },
                    ].map((word, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:bg-blue-50/30 transition-all group">
                        <p className="text-2xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{word.zh}</p>
                        <p className="text-xs text-primary font-bold mb-0.5">{word.pinyin}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{word.vi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        {openRight && <div onClick={() => setOpenRight(false)} className="fixed inset-0 bg-black/20 z-40 md:hidden" />}
        <aside className={`fixed top-20 bottom-0 right-0 z-40 w-[360px] lg:w-[420px] bg-surface-light dark:bg-surface-dark border-l border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ${openRight ? "translate-x-0" : "translate-x-full"} md:static md:top-auto md:bottom-auto md:translate-x-0 flex flex-col shrink-0`}>
          <button onClick={() => setOpenRight(false)} className="md:hidden text-white">
            <span className="material-symbols-outlined text-[24px]">forum</span>
          </button>
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">forum</span>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Thảo luận ({comments.length})</h3>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-5">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="size-8 rounded-full bg-primary/20 shrink-0 flex items-center justify-center text-primary font-bold text-[10px]">{comment.avatar}</div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{comment.author}</span>
                    <span className="text-[9px] text-slate-400">{comment.time}</span>
                  </div>
                  <div className="p-2.5 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <button onClick={() => handleLikeComment(comment.id)} className="text-xs font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                      {comment.likes > 0 ? `${comment.likes} Thích` : 'Thích'}
                    </button>
                    <button className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">Trả lời</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-surface-light dark:bg-surface-dark">
            <div className="relative">
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 pr-10 text-[11px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary focus:border-primary resize-none placeholder-slate-400 custom-scrollbar"
                placeholder="Viết bình luận của bạn..." rows={2} />
              <button onClick={handleAddComment} disabled={!newComment.trim()}
                className="absolute right-2 bottom-2 size-8 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50">
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[14px]">image</span>Đính kèm ảnh
              </button>
              <span className="text-xs text-slate-400">Gõ @ để nhắc tên</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/image/LOGO (1).png";
import { useCart } from "../../../context/CartContext";
import axios from "axios";
import LoadingSpinner from "../../common/LoadingSpinner";
const BASE_URL = import.meta.env.VITE_API_URL;


export default function MyCourseMain() {
  const [courses, setCourses] = useState([]);
  const [courseProgressMap, setCourseProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  const getOrderedLessons = (course) =>
    (course?.chapters || []).flatMap((chapter) =>
      [...(chapter?.contents || [])]
        .filter((content) => content.contentType === "LESSON" && content.lesson)
        .sort((a, b) => {
          const aOrder = a.orderIndex ?? a.order_index ?? a.lesson?.orderIndex ?? a.lesson?.order_index ?? Number.MAX_SAFE_INTEGER;
          const bOrder = b.orderIndex ?? b.order_index ?? b.lesson?.orderIndex ?? b.lesson?.order_index ?? Number.MAX_SAFE_INTEGER;
          if (aOrder !== bOrder) return aOrder - bOrder;
          return Number(a.lesson?.lessonId || 0) - Number(b.lesson?.lessonId || 0);
        })
        .map((content) => content.lesson)
    );

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/my-courses`, {
          headers: getAuthHeaders()
        });
        setCourses(res.data);
        const completedRes = await axios.get(`${BASE_URL}/api/progress/user`, {
          headers: getAuthHeaders()
        });
        const completedIds = new Set((completedRes.data || []).map(Number));
        const courseDetails = await Promise.all(
          res.data.map(async (course) => {
            if (course?.chapters?.length) return course;
            try {
              const detailRes = await axios.get(`${BASE_URL}/api/courses/${course.courseId}`);
              return detailRes.data;
            } catch (error) {
              return course;
            }
          })
        );
        const progressEntries = courseDetails.map((course) => {
          const lessons = getOrderedLessons(course);
          const totalLessons = lessons.length;
          const completedCount = lessons.filter((lesson) => completedIds.has(Number(lesson.lessonId))).length;
          return [course.courseId, totalLessons ? (completedCount / totalLessons) * 100 : 0];
        });
        setCourseProgressMap(Object.fromEntries(progressEntries));
      } catch (err) {
        console.error("Lỗi tải khóa học:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userName = localStorage.getItem("userName") || "User";
  const getFirstLessonId = (course) => {
    const orderedLessons = getOrderedLessons(course);

    return orderedLessons[0]?.lessonId || null;
  };
  const handleContinueLearning = async (course) => {
    if (!(course.status === "active" || course.status === "completed")) {
      navigate(`/courses/${course.courseId}`);
      return;
    }

    let firstLessonId = getFirstLessonId(course);

    if (!firstLessonId) {
      try {
        const res = await axios.get(`${BASE_URL}/api/courses/${course.courseId}`);
        firstLessonId = getFirstLessonId(res.data);
      } catch (err) {
        console.error("Khong lay duoc lesson dau tien:", err);
      }
    }

    if (firstLessonId) {
      navigate(`/learn/${course.courseId}/${firstLessonId}`);
      return;
    }

    navigate(`/courses/${course.courseId}`);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-chinese-pattern overflow-x-hidden">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
        <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
          <Link to="/Home" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
            <div>
              <h1 className="text-2xl font-black tracking-tighter leading-none">TOXI</h1>
              <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">学以致用</p>
            </div>
          </Link>

          <div className="flex items-center gap-4 shrink-0">
            <Link to="/cart" className="relative cursor-pointer p-2">
              <span className="material-symbols-outlined text-[28px] text-secondary hover:text-white transition-colors">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 hover:bg-white/10 rounded-full px-2 py-1 transition-all">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm font-semibold">{userName}</span>
                <span className="material-symbols-outlined text-white/60 text-[18px]">
                  {menuOpen ? "expand_less" : "expand_more"}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100"
                  style={{ zIndex: 99999, boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}>
                  <div className="px-4 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{userName}</p>
                        <p className="text-xs text-slate-400">{localStorage.getItem("email") || "Học viên TOXI"}</p>
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
                      <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-600 text-sm">
                        <span className="material-symbols-outlined text-slate-400 text-[20px]">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 py-2">
                    <button onClick={() => {
                      localStorage.clear();
                      navigate("/Home");
                      window.location.reload();
                    }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-500 text-sm">
                      <span className="material-symbols-outlined text-[20px]">logout</span>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 flex flex-col items-center border-b border-slate-100 bg-slate-50/50">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white font-black text-3xl mb-3">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{userName}</h3>
                <p className="text-slate-500 text-sm">Học viên</p>
              </div>
              <nav className="p-3 space-y-1">
                {[
                  { icon: "school", label: "Khóa học của tôi", to: "/MyCourse", active: true },
                  { icon: "person", label: "Thông tin cá nhân", to: "/Profile" },
                  { icon: "bookmarks", label: "Từ vựng đã lưu", to: "/MyVocabulary" },
                  { icon: "receipt_long", label: "Lịch sử đơn hàng", to: "/MyProduct" },
                ].map((item) => (
                  <Link key={item.label} to={item.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                      item.active ? "bg-primary/10 text-primary font-bold" : "text-slate-600 hover:bg-slate-50"
                    }`}>
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="p-3 border-t border-slate-100">
                <button onClick={() => { localStorage.clear(); navigate("/Home"); window.location.reload(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 font-medium rounded-xl transition-colors">
                  <span className="material-symbols-outlined text-[22px]">logout</span>
                  Đăng xuất
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            <div>
              <span className="text-primary font-bold tracking-wider text-xs uppercase mb-1 block">Học để ứng dụng - 学以致用</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Khóa học của tôi</h2>
              <p className="text-slate-500 mt-1 text-sm">{courses.length} khóa học</p>
            </div>

            {loading ? (
              <LoadingSpinner text="Dang tai khoa hoc cua ban..." />
            ) : courses.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
                <span className="material-symbols-outlined text-6xl text-slate-300">school</span>
                <p className="text-slate-500 mt-4 text-lg font-medium">Bạn chưa có khóa học nào</p>
                <Link to="/course" className="mt-6 inline-block bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-all">
                  Khám phá khóa học
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <article key={course.courseId}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col">
                    {(() => {
                      const progressValue = Math.max(0, Math.min(100, Number(courseProgressMap[course.courseId] || 0)));
                      return (
                        <>
                    
                    {/* THUMBNAIL */}
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      {course.status === "completed" && (
                        <div className="absolute inset-0 bg-primary/10 z-10 flex items-center justify-center">
                          <div className="bg-white/90 text-primary font-bold px-3 py-1.5 rounded-full text-xs flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                            Đã hoàn thành
                          </div>
                        </div>
                      )}
                      <img
                        src={course.thumbnailUrl || "https://via.placeholder.com/400x200?text=Course"}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => e.target.src = "https://via.placeholder.com/400x200?text=No+Image"}
                      />
                    </div>

                    {/* INFO */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                          {course.type || "Khóa học"}
                        </span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          course.status === "completed" ? "bg-green-100 text-green-600" :
                          course.status === "active" ? "bg-blue-100 text-blue-600" :
                          "bg-slate-100 text-slate-500"
                        }`}>
                          {course.status === "completed" ? "Hoàn thành" :
                           course.status === "active" ? "Đang học" : "Mới đăng ký"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
                        {course.description}
                      </p>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                          <span>Tiến độ học tập</span>
                          <span className="font-bold text-primary">{progressValue.toFixed(0)}%</span>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-primary to-emerald-400 transition-all duration-500"
                            style={{ width: `${progressValue}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-auto">
                      <button
  onClick={() => handleContinueLearning(course)}
  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-xl shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 text-sm"
>
  <span>
    {course.status === "completed"
      ? "Xem lại"
      : course.status === "active"
      ? "Tiếp tục học"
      : "Chi tiết"}
  </span>
  <span className="material-symbols-outlined text-base">arrow_forward</span>
</button>
                      </div>
                    </div>
                        </>
                      );
                    })()}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}



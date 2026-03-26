import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/image/LOGO (1).png";
import LoginModal from "../../components/LoginModal";
import StarRating from "../../components/StarRating";
import { useCart } from "../../context/CartContext";
import LoadingSpinner from "../common/LoadingSpinner";

export default function CourseDetail() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingLesson, setPendingLesson] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);

      const diff = tomorrow - now;
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    refreshAccess();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
      setCourse(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAccess = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/course/${courseId}/access`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const nextAccess = !!res.data;
      setHasAccess(nextAccess);
      return nextAccess;
    } catch (error) {
      setHasAccess(false);
      return false;
    }
  };

  const handleAddToCart = () => {
    addToCart(course.courseId, "COURSE", 1);
    alert("Đã thêm vào giỏ hàng!");
  };

  const handleLessonNavigation = (lessonId, isPreview) => {
    if (!lessonId) return;

    if (isPreview) {
      navigate(`/learn/${courseId}/${lessonId}`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setPendingLesson({ lessonId, isPreview });
      setIsLoginModalOpen(true);
      return;
    }

    if (!hasAccess) {
      navigate(`/checkout/${courseId}`);
      return;
    }

    navigate(`/learn/${courseId}/${lessonId}`);
  };

  const handleLoginSuccess = async () => {
    setIsLoginModalOpen(false);

    if (!pendingLesson?.lessonId) return;

    const { lessonId, isPreview } = pendingLesson;
    setPendingLesson(null);

    const accessGranted = await refreshAccess();

    if (isPreview || accessGranted) {
      navigate(`/learn/${courseId}/${lessonId}`);
      return;
    }

    navigate(`/checkout/${courseId}`);
  };

  const getMediaUrl = (url) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    const normalized = String(url).replace(/\\/g, "/").replace(/^\/+/, "");
    if (normalized.startsWith("upload/") || normalized.startsWith("uploads/")) {
      return `http://localhost:8080/${normalized}`;
    }
    return `http://localhost:8080/uploads/${normalized}`;
  };

  if (loading) return <LoadingSpinner fullScreen text="Dang tai khoa hoc..." />;
  if (!course) return <div className="p-10">Không tìm thấy khóa học</div>;

  const hasDiscount = course.discountPrice && course.discountPrice < course.price;
  const finalPrice = hasDiscount ? course.discountPrice : course.price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (course.discountPrice / course.price) * 100)
    : 0;
  const introVideoUrl = getMediaUrl(course?.introVideoUrl);

  return (
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setPendingLesson(null);
        }}
        onSuccess={handleLoginSuccess}
        title="Đăng nhập để mở bài học"
        description="Khi đăng nhập xong, hệ thống sẽ đưa bạn trở lại nội dung khóa học bạn vừa chọn."
      />

      <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
        <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>

        <div className="relative z-10 mx-auto flex max-w-[1920px] items-center justify-between gap-8 px-4 py-4 md:px-8">
          <Link to="/Home" className="flex shrink-0 items-center gap-3">
            <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
            <div>
              <h1 className="text-2xl font-black leading-none tracking-tighter">TOXI</h1>
              <p className="text-[8px] font-bold uppercase tracking-widest text-secondary">学以致用</p>
            </div>
          </Link>

          <div className="hidden max-w-2xl flex-1 md:block">
            <div className="group relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
                className="w-full rounded-full border border-white/20 bg-white/10 py-2.5 pl-12 pr-4 text-sm transition-all placeholder-white/60 focus:bg-white focus:text-primary focus:ring-2 focus:ring-secondary"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">
                search
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-6">
            <div className="group relative cursor-pointer" onClick={() => navigate("/cart")}>
              <span className="material-symbols-outlined text-[28px] text-white transition-colors hover:text-secondary">
                shopping_cart
              </span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </div>

            <div className="hidden items-center gap-4 sm:flex">
              <Link to="/login" className="text-sm font-bold transition-colors hover:text-secondary">
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-primary shadow-lg transition-all hover:scale-105 hover:bg-secondary-dark"
              >
                Đăng ký tư vấn
              </Link>
            </div>

            <button className="text-white md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      <main className="ml-auto mr-auto flex-grow w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:pl-0">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <a href="/Home" className="text-slate-500 hover:text-primary dark:text-slate-400">
            Trang chủ
          </a>
          <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
          <a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400">
            Khóa học
          </a>
          <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
          <span className="font-medium text-[#0d141b] dark:text-white">{course?.breadcrumb}</span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-8 md:col-span-2 lg:col-span-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-black leading-tight tracking-[-0.02em] text-[#0d141b] dark:text-white md:text-4xl">
                {course.title}
              </h1>

              <p className="text-lg font-normal leading-relaxed text-slate-600 dark:text-slate-300">
                {course.description}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 md:gap-6">
                <div className="flex items-center gap-1.5">
                  <StarRating value={course.rating ? Math.round(course.rating) : 0} size="text-base" />
                  <span className="font-bold text-[#0d141b] dark:text-white">
                    {course.rating ? course.rating.toFixed(1) : "–"}
                  </span>
                  <span>({course.reviewCount || "1,250"} đánh giá)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  <span>3,400 học viên</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">update</span>
                  <span>Cập nhật: 06/2023</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">language</span>
                  <span>Tiếng Việt, Trung</span>
                </div>
              </div>
            </div>

            {introVideoUrl ? (
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black shadow-sm dark:border-slate-700">
                <video
                  controls
                  preload="metadata"
                  poster={course?.thumbnailUrl || undefined}
                  className="h-full w-full object-cover"
                  src={introVideoUrl}
                />
              </div>
            ) : (
              <div className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-black shadow-sm dark:border-slate-700">
                <div className="absolute inset-0 bg-cover bg-center opacity-80 transition-opacity duration-300 group-hover:opacity-60"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="flex size-20 items-center justify-center rounded-full bg-primary/90 pl-1 text-white shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <span className="material-symbols-outlined filled text-[40px]">play_arrow</span>
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <p className="text-lg font-bold">Giới thiệu khóa học</p>
                    <p className="text-sm opacity-90">Xem trước miễn phí</p>
                  </div>
                  <span className="rounded bg-black/50 px-2 py-1 font-mono text-xs">02:45</span>
                </div>
              </div>
            )}

            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:p-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
                <span className="material-symbols-outlined">info</span>
                Giới thiệu khóa học
              </h3>

              <div className="prose max-w-none text-slate-600 dark:prose-invert dark:text-slate-300">
                <p className="mb-2">Khóa học dành cho người đã có nền tảng cơ bản.</p>
                <p className="mb-2">Tập trung luyện nghe – nói – đọc – viết.</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:p-8">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-primary">
                <span className="material-symbols-outlined">check_circle</span>
                Bạn sẽ học được gì?
              </h3>

              <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-green-500">check</span>
                  <span>1200 từ vựng chuẩn HSK 4.</span>
                </div>

                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-green-500">check</span>
                  <span>Viết đoạn văn ngắn bằng tiếng Trung.</span>
                </div>

                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-green-500">check</span>
                  <span>Giao tiếp học tập và công việc.</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-bold text-primary">
                  <span className="material-symbols-outlined">menu_book</span>
                  Nội dung khóa học
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  8 Chương • 35 Bài giảng • 12h 30m
                </span>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                {course.chapters?.map((chapter, chapterIndex) => (
                  <details key={chapter.chapterId} className="group" open={chapterIndex === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180">
                          expand_more
                        </span>
                        <span className="font-bold text-[#0d141b] dark:text-white">{chapter.title}</span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {chapter.contents?.length || 0} nội dung
                      </span>
                    </summary>

                    <div className="divide-y divide-slate-100 border-t border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800">
                      {chapter.contents?.map((content) => {
                        const isLesson = content.contentType === "LESSON";
                        const title = isLesson ? content.lesson?.title : content.quiz?.title;
                        const isPreview = content.isPreview;

                        return (
                          <div
                            key={content.courseContentId}
                            onClick={() => {
                              if (!isLesson) return;
                              handleLessonNavigation(content.lesson?.lessonId, isPreview);
                            }}
                            className={`flex items-center justify-between p-4 ${
                              isLesson ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50" : ""
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-[20px] text-primary">
                                {isLesson ? (isPreview ? "play_circle" : "lock") : "quiz"}
                              </span>

                              <span className="text-sm text-slate-700 dark:text-slate-300">{title}</span>
                            </div>

                            {isLesson ? (
                              isPreview ? (
                                <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                                  Học thử
                                </span>
                              ) : (
                                <span className="text-xs text-slate-500">Khóa</span>
                              )
                            ) : (
                              <span className="text-xs font-medium text-purple-500">Quiz</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:p-8">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-primary">
                <span className="material-symbols-outlined">reviews</span>
                Đánh giá của học viên
              </h3>

              <div className="mb-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 dark:border-slate-600 dark:bg-slate-900/50">
                <h4 className="mb-4 text-lg font-bold text-[#0d141b] dark:text-white">Viết đánh giá của bạn</h4>

                <form className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">Chọn số sao của bạn:</p>

                    <div className="star-rating flex flex-row-reverse justify-end gap-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star}>
                          <input id={`star${star}`} name="rating" type="radio" value={star} className="hidden" />
                          <label
                            htmlFor={`star${star}`}
                            className="material-symbols-outlined filled cursor-pointer text-[32px]"
                          >
                            star
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <textarea
                      className="w-full rounded-lg border-slate-200 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                      placeholder="Chia sẻ trải nghiệm của bạn về khóa học này..."
                      rows={4}
                    />
                  </div>

                  <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <label className="group flex cursor-pointer items-center gap-2">
                      <div className="flex size-10 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-slate-400 transition-colors group-hover:border-primary group-hover:text-primary dark:border-slate-600">
                        <span className="material-symbols-outlined">add_a_photo</span>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">Đính kèm hình ảnh</span>
                      <input type="file" accept="image/*" className="hidden" />
                    </label>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-secondary px-8 py-3 font-bold text-primary shadow-md transition-all active:scale-95 hover:bg-[#e6b400] sm:w-auto"
                    >
                      Gửi đánh giá
                    </button>
                  </div>
                </form>
              </div>

              <div className="flex flex-wrap gap-x-12 gap-y-8">
                <div className="flex min-w-[150px] flex-col gap-2">
                  <p className="text-5xl font-black leading-tight tracking-[-0.033em] text-[#0d141b] dark:text-white">4.8+</p>
                  <div className="flex gap-1 text-secondary">
                    {[1, 2, 3, 4].map((_, i) => (
                      <span key={i} className="material-symbols-outlined filled">
                        star
                      </span>
                    ))}
                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">star</span>
                  </div>
                  <p className="text-sm font-normal text-slate-500">1,250 nhận xét</p>
                </div>

                <div className="min-w-[280px] flex-1">
                  {[
                    { label: "5 sao", percent: 72 },
                    { label: "4 sao", percent: 20 },
                    { label: "3 sao", percent: 5 },
                  ].map((item, index) => (
                    <div key={index} className="mb-2 flex items-center gap-3">
                      <div className="w-8 text-right text-xs font-medium dark:text-slate-300">{item.label}</div>
                      <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                        <div className="rounded-full bg-secondary" style={{ width: `${item.percent}%` }} />
                      </div>
                      <div className="w-8 text-right text-xs text-slate-500">{item.percent}%</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-6 border-t border-slate-100 pt-8 dark:border-slate-700">
                  <div className="flex gap-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      M
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold dark:text-white">Minh Hoàng</p>
                          <div className="mt-0.5 flex text-[14px] text-secondary">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="material-symbols-outlined filled">
                                star
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">2 ngày trước</span>
                      </div>

                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Khóa học rất hay, cô dạy dễ hiểu. Mình mất gốc mà học xong 3 chương đầu đã thấy
                        tự tin hơn hẳn khi phát âm.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                      L
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold dark:text-white">Lan Anh</p>
                          <div className="mt-0.5 flex text-[14px] text-secondary">
                            {[...Array(4)].map((_, i) => (
                              <span key={i} className="material-symbols-outlined filled">
                                star
                              </span>
                            ))}
                            <span className="material-symbols-outlined text-slate-300">star</span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">1 tuần trước</span>
                      </div>

                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Nội dung thực tế, không lý thuyết suông. Giá như có thêm nhiều bài tập tương tác
                        hơn nữa thì tuyệt vời.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-4">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary to-blue-400" />

                <div className="mb-2 flex items-end gap-2">
                  <span className="text-2xl font-black text-[#0d141b] dark:text-white">
                    {Number(finalPrice).toLocaleString()}đ
                  </span>

                  {hasDiscount && (
                    <span className="mb-1 text-lg text-slate-400 line-through">
                      {Number(course.price).toLocaleString()}đ
                    </span>
                  )}

                  {hasDiscount && <div className="text-sm font-semibold text-red-500">-{discountPercent}%</div>}
                </div>

                <p className="mb-6 flex items-center gap-1 text-sm font-medium text-red-500">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  Ưu đãi kết thúc sau {timeLeft}
                </p>

                <button
                  onClick={() => navigate(`/checkout/${courseId}`)}
                  className="mb-3 flex h-12 w-full items-center justify-center rounded-lg bg-secondary text-base font-bold tracking-wide text-primary shadow-md shadow-yellow-100 transition-all hover:bg-[#e6b400] dark:shadow-none"
                >
                  Mua ngay
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex h-12 w-full items-center justify-center rounded-lg border border-slate-200 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Thêm vào giỏ hàng
                </button>

                <div className="my-6 border-t border-slate-100 dark:border-slate-700" />

                <div className="flex flex-col gap-4">
                  <p className="text-sm font-bold text-[#0d141b] dark:text-white">Khóa học này bao gồm:</p>

                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[20px] text-slate-400">play_lesson</span>
                      <span>35 bài giảng video</span>
                    </li>

                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[20px] text-slate-400">description</span>
                      <span>20+ tài liệu PDF độc quyền</span>
                    </li>

                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[20px] text-slate-400">all_inclusive</span>
                      <span>Truy cập trọn đời</span>
                    </li>

                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[20px] text-slate-400">devices</span>
                      <span>Học trên Web và Mobile</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}



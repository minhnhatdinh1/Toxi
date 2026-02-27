import { useParams, Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/image/LOGO (1).png'
import axios from "axios";
import React, { useState, useEffect } from 'react';
export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    fetchCourse();
  }, [id]);
useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Thiết lập mốc 00:00:00 của ngày mai (tức là cuối ngày hôm nay)
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0); 

      const diff = tomorrow - now;
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const fetchCourse = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/courses/${id}`
      );
      setCourse(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy khóa học:", error);
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        courseId: course.courseId,
      }),
    });

    if (!res.ok) {
      throw new Error("Thêm giỏ hàng thất bại");
    }

    alert("Đã thêm vào giỏ hàng!");
  } catch (err) {
    console.error(err);
    alert("Có lỗi xảy ra!");
  }
};
  if (loading) return <div className="p-10">Đang tải...</div>;
  if (!course) return <div className="p-10">Không tìm thấy khóa học</div>;
const hasDiscount =
  course.discountPrice &&
  course.discountPrice < course.price;

const finalPrice = hasDiscount
  ? course.discountPrice
  : course.price;

const discountPercent = hasDiscount
  ? Math.round(
      100 - (course.discountPrice / course.price) * 100
    )
  : 0;

  
  return (
    <>
      <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>

        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
          {/* LOGO */}
          <Link to="/Home" className="flex items-center gap-3 shrink-0">
                    <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
                    <div>
                      <h1 className="text-2xl font-black tracking-tighter leading-none">
                        TOXI
                      </h1>
                      <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">
                        学以致用
                      </p>
                    </div>
                  </Link>

          {/* SEARCH */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
                className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">
                search
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-6 shrink-0">
            {/* CART */}
            <div className="relative group cursor-pointer">
              <span className="material-symbols-outlined text-[28px] text-white hover:text-secondary transition-colors">
                shopping_cart
              </span>
<span className="absolute -top-1 -right-1 bg-accent-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </div>

            {/* AUTH BUTTONS */}
            <div className="hidden sm:flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold hover:text-secondary transition-colors">
                Đăng nhập
              </Link>
              <Link to="/register" className="bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-secondary-dark transition-all transform hover:scale-105">
                Đăng ký tư vấn
              </Link>
            </div>

            {/* MOBILE MENU */}
            <button className="md:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow w-full max-w-7xl ml-auto mr-auto px-4 sm:px-6 lg:px-8 py-6 lg:pl-0">
  {/* Breadcrumb */}
  <div className="flex flex-wrap gap-2 items-center mb-6 text-sm">
    <a
      href="/Home"
      className="text-slate-500 hover:text-primary dark:text-slate-400"
    >
      Trang chủ
    </a>

    <span className="text-slate-300 material-symbols-outlined text-[16px]">
      chevron_right
    </span>

    <a
      href="#"
      className="text-slate-500 hover:text-primary dark:text-slate-400"
    >
      Khóa học
    </a>

    <span className="text-slate-300 material-symbols-outlined text-[16px]">
      chevron_right
    </span>

    <span className="text-[#0d141b] dark:text-white font-medium">
      {course?.breadcrumb}
    </span>
  </div>

  {/* Main grid */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    {/* Left content */}
    <div className="lg:col-span-8 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-[#0d141b] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.02em]">
         {course.title}
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-lg font-normal leading-relaxed">
          {course.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500 dark:text-slate-400 mt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-secondary material-symbols-outlined text-[18px] filled">
              star
            </span>
            <span className="font-bold text-[#0d141b] dark:text-white">
              4.8
            </span>
            <span>(1,250 đánh giá)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">
              group
            </span>
            <span>3,400 học viên</span>
          </div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">
              update
            </span>
            <span>Cập nhật: 06/2023</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">
              language
            </span>
            <span>Tiếng Việt, Trung</span>
          </div>
        </div>
      </div>
      {/* Video preview */}
<div className="relative w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 bg-black aspect-video group cursor-pointer">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-60 transition-opacity duration-300"
    style={{
      backgroundImage:
        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLTF0Qx…vzBuAvgDZkgonzonrnWrGscEpyqRmSLRuEKIp6TeGWj0tDeEIL3y3TD0GS5s")',
    }}
  />

  <div className="absolute inset-0 flex items-center justify-center">
    <button className="flex items-center justify-center rounded-full size-20 bg-primary/90 text-white shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 pl-1">
      <span className="material-symbols-outlined text-[40px] filled">
        play_arrow
      </span>
    </button>
  </div>

  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
    <div>
      <p className="font-bold text-lg">Giới thiệu khóa học</p>
      <p className="text-sm opacity-90">Xem trước miễn phí</p>
    </div>
    <span className="bg-black/50 px-2 py-1 rounded text-xs font-mono">
      02:45
    </span>
  </div>
</div>

{/* Course introduction */}
{/* Course introduction */}
<div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
    <span className="material-symbols-outlined">info</span>
    Giới thiệu khóa học
  </h3>

  <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
    <p className="mb-2">Khóa học dành cho người đã có nền tảng cơ bản.</p>
    <p className="mb-2">Tập trung luyện nghe – nói – đọc – viết.</p>
  </div>
</div>
{/* What you will learn */}
{/* What you will learn */}
<div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
    <span className="material-symbols-outlined">check_circle</span>
    Bạn sẽ học được gì?
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
    {/* Mục 1 */}
    <div className="flex gap-3">
      <span className="material-symbols-outlined text-green-500">check</span>
      <span>1200 từ vựng chuẩn HSK 4.</span>
    </div>

    {/* Mục 2 */}
    <div className="flex gap-3">
      <span className="material-symbols-outlined text-green-500">check</span>
      <span>Viết đoạn văn ngắn bằng tiếng Trung.</span>
    </div>

    {/* Mục 3 */}
    <div className="flex gap-3">
      <span className="material-symbols-outlined text-green-500">check</span>
      <span>Giao tiếp học tập và công việc.</span>
    </div>
  </div>
</div>

{/* Course content */}
<div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
  <div className="flex justify-between items-center mb-6">
    <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
      <span className="material-symbols-outlined">menu_book</span>
      Nội dung khóa học
    </h3>
    <span className="text-sm text-slate-500 dark:text-slate-400">
      8 Chương • 35 Bài giảng • 12h 30m
    </span>
  </div>

  <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
  {course.chapters?.map((chapter, chapterIndex) => (
    <details
      key={chapter.chapterId}
      className="group"
      open={chapterIndex === 0}
    >
      <summary className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors list-none">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">
            expand_more
          </span>
          <span className="font-bold text-[#0d141b] dark:text-white">
            {chapter.title}
          </span>
        </div>
        <span className="text-xs text-slate-500">
          {chapter.contents?.length || 0} nội dung
        </span>
      </summary>

      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
        {chapter.contents?.map((content) => {
          const isLesson = content.contentType === "LESSON";

          const title = isLesson
            ? content.lesson?.title
            : content.quiz?.title;

          const isPreview = content.isPreview;

          return (
            <div
              key={content.courseContentId}
              onClick={() => {
                if (isPreview && isLesson) {
                  navigate(
                    `/video/${content.lesson?.lessonId}`
                  );
                }
              }}
              className={`p-4 flex justify-between items-center ${
                isPreview && isLesson
                  ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  {isLesson
                    ? isPreview
                      ? "play_circle"
                      : "lock"
                    : "quiz"}
                </span>

                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {title}
                </span>
              </div>

              {isLesson ? (
                isPreview ? (
<span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Học thử
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">
                    Khóa
                  </span>
                )
              ) : (
                <span className="text-xs text-purple-500 font-medium">
                  Quiz
                </span>
              )}
            </div>
          );
        })}
      </div>
    </details>
  ))}
</div>
</div>
<div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
    <span className="material-symbols-outlined">reviews</span>
    Đánh giá của học viên
  </h3>

  {/* Write review */}
  <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
    <h4 className="font-bold text-lg mb-4 text-[#0d141b] dark:text-white">
      Viết đánh giá của bạn
    </h4>

    <form className="space-y-4">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
          Chọn số sao của bạn:
        </p>

        <div className="flex flex-row-reverse justify-end gap-1 star-rating">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star}>
              <input
                id={`star${star}`}
                name="rating"
                type="radio"
                value={star}
                className="hidden"
              />
              <label
                htmlFor={`star${star}`}
                className="material-symbols-outlined text-[32px] filled cursor-pointer"
              >
                star
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <textarea
          className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm"
          placeholder="Chia sẻ trải nghiệm của bạn về khóa học này..."
          rows={4}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="size-10 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-400 group-hover:border-primary group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined">add_a_photo</span>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Đính kèm hình ảnh
          </span>
          <input type="file" accept="image/*" className="hidden" />
        </label>

        <button
          type="submit"
className="w-full sm:w-auto px-8 py-3 bg-secondary hover:bg-[#e6b400] text-primary font-bold rounded-lg transition-all shadow-md active:scale-95"
        >
          Gửi đánh giá
        </button>
      </div>
    </form>
  </div>

  {/* Review statistics */}
  <div className="flex flex-wrap gap-x-12 gap-y-8">
    <div className="flex flex-col gap-2 min-w-[150px]">
      <p className="text-[#0d141b] dark:text-white text-5xl font-black leading-tight tracking-[-0.033em]">
        4.8+
      </p>
<div className="flex gap-1 text-secondary">
        {[1, 2, 3, 4].map((_, i) => (
          <span key={i} className="material-symbols-outlined filled">
            star
          </span>
        ))}
        <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">
          star
        </span>
      </div>

      <p className="text-slate-500 text-sm font-normal">1,250 nhận xét</p>
    </div>

    <div className="flex-1 min-w-[280px]">
      {[
        { label: "5 sao", percent: 72 },
        { label: "4 sao", percent: 20 },
        { label: "3 sao", percent: 5 },
      ].map((item, index) => (
        <div key={index} className="flex items-center gap-3 mb-2">
          <div className="w-8 text-xs font-medium text-right dark:text-slate-300">
            {item.label}
          </div>

          <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className="rounded-full bg-secondary"
              style={{ width: `${item.percent}%` }}
            />
          </div>

          <div className="w-8 text-xs text-slate-500 text-right">
            {item.percent}%
          </div>
        </div>
      ))}
    </div>
     <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-6">
      {/* Review 1 */}
      <div className="flex gap-4">
        <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
          M
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-sm dark:text-white">Minh Hoàng</p>
              <div className="flex text-secondary text-[14px] mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined filled"
                  >
                    star
                  </span>
                ))}
              </div>
            </div>
            <span className="text-xs text-slate-400">2 ngày trước</span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
            Khóa học rất hay, cô dạy dễ hiểu. Mình mất gốc mà học xong 3 chương
            đầu đã thấy tự tin hơn hẳn khi phát âm.
          </p>
        </div>
</div>

      {/* Review 2 */}
      <div className="flex gap-4">
        <div className="size-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-600">
          L
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-sm dark:text-white">Lan Anh</p>
              <div className="flex text-secondary text-[14px] mt-0.5">
{[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined filled"
                  >
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined text-slate-300">
                  star
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-400">1 tuần trước</span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
            Nội dung thực tế, không lý thuyết suông. Giá như có thêm nhiều bài
            tập tương tác hơn nữa thì tuyệt vời.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


    </div>
    
    <div className="lg:col-span-4">
  <div className="sticky top-24 flex flex-col gap-6">
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg relative overflow-hidden group">
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400" />


<div className="flex items-end gap-2 mb-2">
  <span className="text-2xl font-black text-[#0d141b] dark:text-white">
    {Number(finalPrice).toLocaleString()}đ
  </span>

  {hasDiscount && (
    <span className="text-lg text-slate-400 line-through mb-1">
      {Number(course.price).toLocaleString()}đ
    </span>
  )}
  
{hasDiscount && (
  <div className="text-red-500 text-sm font-semibold">
    -{discountPercent}%
  </div>
)}
      
</div>
  
     

 <p className="text-red-500 text-sm font-medium mb-6 flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px]">timer</span>
        Ưu đãi kết thúc sau {timeLeft}
      </p>

      <button className="w-full h-12 flex items-center justify-center rounded-lg bg-secondary hover:bg-[#e6b400] text-primary font-bold text-base tracking-wide transition-all shadow-md shadow-yellow-100 dark:shadow-none mb-3">
        Mua ngay 
      </button>

      <button  onClick={handleAddToCart} className="w-full h-12 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
        Thêm vào giỏ hàng
      </button>

      <div className="my-6 border-t border-slate-100 dark:border-slate-700" />
<div className="flex flex-col gap-4">
        <p className="font-bold text-sm text-[#0d141b] dark:text-white">
          Khóa học này bao gồm:
        </p>

        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">
              play_lesson
            </span>
            <span>35 bài giảng video</span>
          </li>
<li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">
              description
            </span>
            <span>20+ tài liệu PDF độc quyền</span>
          </li>

          <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">
              all_inclusive
            </span>
            <span>Truy cập trọn đời</span>
          </li>

          <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">
              devices
            </span>
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
  )
};

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useMemo } from 'react';
import axios from "axios";

const normalizeCourseStatus = (status) => {
  const normalized = String(status || "").trim().toUpperCase();
  if (["ACTIVE", "PUBLISHED", "PUBLIC"].includes(normalized)) return "PUBLISHED";
  if (["DRAFT", "DRAFTING"].includes(normalized)) return "DRAFT";
  if (["INACTIVE", "ARCHIVED", "HIDDEN"].includes(normalized)) return "INACTIVE";
  return normalized || "DRAFT";
};

const isVisibleCourse = (course) => normalizeCourseStatus(course?.status) === "PUBLISHED";

/* tiny hook: fade-in on scroll */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-visible'); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* Counter animation */
function AnimatedCounter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count.toLocaleString('vi-VN')}{suffix}</span>;
}

/* Section wrapper with fade animation */
function FadeSection({ children, className = '', delay = 0 }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-section ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeHero, setActiveHero] = useState(0);

  const blogs = [
    {
      id: 5,
      title: "Ý nghĩa của màu đỏ trong văn hóa Trung Hoa ngày Tết",
      category: "Văn hóa",
      date: "10/11/2023",
      author: "Admin",
      desc: "Tại sao người Trung Quốc lại thích màu đỏ? Tìm hiểu nguồn gốc và ý nghĩa tâm linh...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwsBsZIsyCmtSVufrnW8IQ3OcNeGQO6uv5_S2x_YweK8CwOgxS_j8F_1UlAP1CKu-MJ4a6fHrmJFtzUUcb_X4KSq8qWpLna00jvHLg7DEjci3_9aaWB-JPpLO0hbOLKlLYbtXWV_1gq2dYp2AdtNDqJHNF-j2XA-3y-JFm721_M16loDAuswddRMrVB91_VS9Tc0bFgo4Ft74lY4nteoQG2dIzPct6KXEEJ9A_vnNS8l55l5dzg3f46GB6CxSZ1N3nNlKt4Oc23S0",
      color: "secondary",
    },
    {
      id: 6,
      title: "5 sai lầm phổ biến khi mới bắt đầu học Hán ngữ",
      category: "Kinh nghiệm",
      date: "08/11/2023",
      author: "Admin",
      desc: "Phát âm thanh mẫu, vận mẫu và cách nhớ chữ Hán hiệu quả cho người mới...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhvprHGL6K93pHFVHLPVSFyKTZaBgwoiNwoZ6rufaP3po7sqtplcZ0ZwYV2GwP_0zun0jre0uIAbdySGtu4jG-uSCgC3yAEj_a49Fjunnm7lnluUwzOxT5LJN2DlK-mV7HEw8F0s7lXu7lzThvMEwBhVv1qGxDMQ0k589zZgj_A5-D1zb3exuWfXZ6VvlypTc_EcokCIn_ffDJPT0UKVdGasZVPsKRp-8BZ6p0Ng55-0HMo1e1E5gT-rBRAduNNVBO0Z1AhRqdGH8",
      color: "primary",
    },
  ];

  const instructors = [
    { name: "ThS. Lê Hương Giang", title: "Chuyên gia HSK 6 & Thương mại", exp: "12 năm giảng dạy", cert: "Chứng chỉ Putonghua cấp độ 1", students: "3.200+", avatar: "G", color: "#c8102e" },
    { name: "GV. Nguyễn Văn Minh", title: "Giảng viên Giao tiếp & Phát âm", exp: "8 năm kinh nghiệm", cert: "Tốt nghiệp ĐH Bắc Kinh", students: "2.800+", avatar: "M", color: "#8B0000" },
    { name: "GV. Trần Thị Mai", title: "Chuyên gia Hán ngữ Văn phòng", exp: "6 năm giảng dạy", cert: "Thạc sĩ Ngôn ngữ học", students: "1.900+", avatar: "T", color: "#B8860B" },
  ];

  const faqs = [
    { q: "Học bao lâu có thể thi HSK 4?", a: "Với lộ trình học 3-4 tiếng/tuần, học viên thường đạt HSK 4 sau 12-18 tháng. TOXI cam kết hoàn học phí nếu không đạt mục tiêu trong thời hạn đã ký kết." },
    { q: "TOXI có cam kết đầu ra không?", a: "Có. Chúng tôi ký hợp đồng đào tạo với cam kết đầu ra rõ ràng. Học viên được học lại miễn phí 100% nếu không đạt kết quả như cam kết." },
    { q: "Lớp học online hay offline?", a: "TOXI có cả hai hình thức: lớp trực tiếp tại Hà Nội & TP.HCM và lớp online live qua Zoom. Học viên có thể chuyển đổi linh hoạt." },
    { q: "Học phí có trả góp được không?", a: "Có. TOXI hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng hoặc ví điện tử. Liên hệ tư vấn viên để biết thêm chi tiết." },
    { q: "Giáo trình có khác so với trung tâm khác không?", a: "Giáo trình TOXI được biên soạn độc quyền bám sát HSK chuẩn mới 3.0, tích hợp văn hóa thực tế và công nghệ AI luyện phát âm - hoàn toàn khác biệt thị trường." },
  ];

  const hskPath = [
    { level: "HSK 1", label: "Vỡ lòng", desc: "150 từ vựng cơ bản", color: "#4ade80", weeks: "8 tuần" },
    { level: "HSK 2", label: "Sơ cấp", desc: "300 từ, giao tiếp đơn giản", color: "#facc15", weeks: "10 tuần" },
    { level: "HSK 3", label: "Trung sơ", desc: "600 từ, đời sống hàng ngày", color: "#fb923c", weeks: "14 tuần" },
    { level: "HSK 4", label: "Trung cấp", desc: "1.200 từ, giao tiếp tự nhiên", color: "#f87171", weeks: "18 tuần" },
    { level: "HSK 5", label: "Cao cấp", desc: "2.500 từ, thảo luận sâu", color: "#c084fc", weeks: "24 tuần" },
    { level: "HSK 6", label: "Thành thạo", desc: "5.000 từ, bản ngữ", color: "#60a5fa", weeks: "36 tuần" },
  ];

  const courseTabs = [
    { label: "Lộ trình HSK", icon: "school" },
    { label: "Giao tiếp", icon: "record_voice_over" },
    { label: "Cho người đi làm", icon: "work" },
  ];
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const getOrderedLessons = (course) =>
    (course?.chapters || []).flatMap((chapter) =>
      [...(chapter?.contents || [])]
        .filter((c) => c.contentType === "LESSON" && c.lesson)
        .sort((a, b) => {
          const ao = a.orderIndex ?? a.order_index ?? Number.MAX_SAFE_INTEGER;
          const bo = b.orderIndex ?? b.order_index ?? Number.MAX_SAFE_INTEGER;
          return ao !== bo ? ao - bo : Number(a.lesson?.lessonId || 0) - Number(b.lesson?.lessonId || 0);
        })
        .map((c) => c.lesson)
    );

  const getFirstLessonId = (course) => getOrderedLessons(course)[0]?.lessonId || null;

  const handleOpenCourse = async (course) => {
    const isOwned = myCourses.includes(Number(course.courseId));
    if (!isOwned) { navigate(`/courses/${course.courseId}`); return; }
    let firstLessonId = getFirstLessonId(course);
    if (!firstLessonId) {
      try {
        const res = await axios.get(`http://localhost:8080/api/courses/${course.courseId}`);
        firstLessonId = getFirstLessonId(res.data);
      } catch (err) { console.error(err); }
    }
    navigate(firstLessonId ? `/learn/${course.courseId}/${firstLessonId}` : `/courses/${course.courseId}`);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/courses")
      .then((res) => {
        const courseList = Array.isArray(res.data) ? res.data : [];
        setCourses(courseList.filter(isVisibleCourse));
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (!token) { setMyCourses([]); return; }
    axios.get("http://localhost:8080/api/my-courses", { headers: getAuthHeaders() })
      .then((res) => setMyCourses((res.data || []).map((c) => Number(c.courseId))))
      .catch(() => setMyCourses([]));
  }, []);

  const featuredCourses = courses.slice(0, 3);
  const fallbackImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCwxb7nc6Y1agbpHftxTY_o4gDjVVkTrjthWCSr5aBCwYASNCDteRUBSCZszZPjpyC_ojHXMdIfsGFN2TxXG-ynM7Ys8vjpEEM7SYFsxEap7wqxiraLyfoPwKZ_gct2jA74qnO8XM_x9Jc6aeaDM2oQwgSFd1HOfrukFmrN2vDgUOmaNV-a2e7z1IkWP6mUG0NVibB_lY0a0S0Rh34s8N6VIua_DB_UF5NXrbv8oiRT8CsANH17Kx7-D2oDZk8IoCqgcI_r32IbgF0",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDtVRXFknS_grfTIrQVmQmdLwKAo1xNkkJKHW9CWahlijN4S8g3c0dmeCe5bV8E30creqG7NGrK0vS-RqXB1c9BKVHSkm661aw6RxOaH6LnzJ5LOh5-kOsvC_rqeQeBvBsyq8ce_PfK4HNiiu9DjKUTlrAQsSa-kQPnlwUAB5bi92qJ5VaHA11lIkRCEs7cg_77QBKQI5xotjUgDwQ3FgNXXqXvuQ_Ot4cR6xUv0e_WO-iCBYQ9IAfbxrtjcchMQhOXdKRGJi5zG4I",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDFLYj59afdVrP74z9TI2skZU5rLCp33u4OROr59CQ8-n9_zr5jjF0D11cetdShmgGOw_0Wrn9ZfPFEwi4nbNhPXUgMTZKGB-WcB3RTvRyBaHBkF_3BMkjjhsIO9T89kGL_VxLgur7WLuxLkSseZsAMVEvhf3QK8myEY52RUeB-RnNmEof1Scr_B5lhuO8-B1tdpKMz8Se3qGLIIiYU4PnK7fN7hT37ttWTLW7XsBeiUHSU9kLzY9TI4Mc9hoYJSewdZDOcT0Vky0w",
  ];
  const heroSlides = useMemo(() => {
    const featured = courses
      .filter((course) => course?.thumbnailUrl)
      .slice(0, 5);

    if (featured.length > 0) {
      return featured.map((course, index) => ({
        id: course.courseId,
        eyebrow: course.courseType || "TOXI Education",
        title: course.title || `Khoa hoc ${index + 1}`,
        subtitle:
          course.description ||
          "Khám phá khóa học nổi bật của TOXI và mở trang chi tiết ngay từ banner.",
        image: course.thumbnailUrl || fallbackImages[index % fallbackImages.length],
        accent: index === 0 ? "Khám phá ngay" : "Xem chi tiết",
        metric: `${course.totalLesson || 0} bài học`,
      }));
    }

    return [
      {
        id: "hero-home-fallback",
        eyebrow: "TOXI Education",
        title: "Tinh hoa ngôn ngữ Trung Hoa",
        subtitle: "Banner sẽ tự động cập nhật theo khóa học nổi bật khi backend trả dữ liệu đầy đủ.",
        image: fallbackImages[0],
        accent: "HSK Roadmap",
        metric: "10.000+ học viên",
      },
    ];
  }, [courses]);

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <>
      {/* Global styles */}
      <style>{`
        .fade-section { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-section.is-visible { opacity: 1; transform: none; }
        .hero-char { animation: floatChar 6s ease-in-out infinite; }
        @keyframes floatChar { 0%,100%{transform:translateY(0) rotate(12deg)} 50%{transform:translateY(-14px) rotate(12deg)} }
        .marquee-track { display:flex; gap:3rem; animation: marquee 28s linear infinite; white-space:nowrap; }
        @keyframes marquee { to { transform: translateX(-50%); } }
        .shimmer { background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size:200% 100%; }
        .badge-glow { box-shadow: 0 0 18px rgba(200,16,46,0.35); }
        .card-lift { transition: transform 0.28s cubic-bezier(.22,.61,.36,1), box-shadow 0.28s ease; }
        .card-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.12); }
        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.38s ease, padding 0.28s ease; }
        .faq-answer.open { max-height: 200px; }
        .hsk-node { position:relative; }
        .hsk-node::after { content:''; position:absolute; right:-2rem; top:50%; width:2rem; height:2px; background:linear-gradient(90deg,#c8102e,transparent); }
        .hsk-node:last-child::after { display:none; }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 70%{transform:scale(1.35);opacity:0} 100%{transform:scale(1.35);opacity:0} }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        .tab-slider { transition: transform 0.28s cubic-bezier(.22,.61,.36,1); }
        @media (max-width: 767px) {
          .marquee-track { gap: 1rem; }
          .faq-answer.open { max-height: 320px; }
          .fade-section { transform: translateY(18px); }
        }
      `}</style>

      {/* ==============================================
          1. HERO SECTION (upgraded)
      ============================================== */}
      <section className="w-full bg-[#f4f7ff] pt-3 md:pt-5 lg:pt-6">
        <div className="bg-[#eef3ff]">
        <div className="mx-auto max-w-7xl px-4 pb-4 pt-3 sm:pb-5 md:px-6 md:pb-8 md:pt-5">
          <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_24px_80px_rgba(33,54,120,0.14)]">
            <div className="relative h-[260px] sm:h-[320px] lg:h-[410px]">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    if (String(slide.id).startsWith("hero-")) return;
                    navigate(`/courses/${slide.id}`);
                  }}
                  className={`absolute inset-0 ${String(slide.id).startsWith("hero-") ? "cursor-default" : "cursor-pointer text-left"} transition-all duration-700 ${
                    activeHero === index
                      ? "opacity-100 translate-x-0"
                      : index < activeHero
                      ? "opacity-0 -translate-x-6"
                      : "opacity-0 translate-x-6"
                  }`}
                >
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#082b73]/96 via-[#1747d6]/84 to-[#173ec9]/50" />
                  <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#061b4f]/92 via-[#0a2872]/72 to-transparent sm:w-[58%]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_62%_100%,rgba(255,255,255,0.12),transparent_22%)]" />

                  <div className="relative z-10 flex h-full items-center justify-center px-4 py-6 sm:px-10 sm:py-8 lg:px-14">
                    <div className="mx-auto max-w-3xl text-center text-white">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white/90 backdrop-blur-md sm:mb-4 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.28em]">
                        <span className="h-2 w-2 rounded-full bg-secondary" />
                        {slide.eyebrow}
                      </div>
                      <h1 className="mx-auto max-w-2xl text-[28px] font-black leading-tight sm:text-4xl lg:text-[48px] xl:text-[56px]">
                        {slide.title}
                      </h1>
                      <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-white/85 sm:mt-4 sm:text-base sm:leading-7">
                        {slide.subtitle}
                      </p>
                      <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:mt-6 sm:flex-row sm:gap-4">
                        <span className="rounded-full bg-white/14 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.22em]">{slide.accent}</span>
                        <div className="text-xs font-semibold text-white/80 sm:text-sm">{slide.metric}</div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/14 px-3 py-2 backdrop-blur-md sm:bottom-5">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveHero(index)}
                    aria-label={`Hero slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      activeHero === index ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="hidden relative min-h-[580px] md:min-h-[660px] w-full bg-primary overflow-hidden group">
        {/* Background */}
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2500ms] ease-out group-hover:scale-105"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwsBsZIsyCmtSVufrnW8IQ3OcNeGQO6uv5_S2x_YweK8CwOgxS_j8F_1UlAP1CKu-MJ4a6fHrmJFtzUUcb_X4KSq8qWpLna00jvHLg7DEjci3_9aaWB-JPpLO0hbOLKlLYbtXWV_1gq2dYp2AdtNDqJHNF-j2XA-3y-JFm721_M16loDAuswddRMrVB91_VS9Tc0bFgo4Ft74lY4nteoQG2dIzPct6KXEEJ9A_vnNS8l55l5dzg3f46GB6CxSZ1N3nNlKt4Oc23S0')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#7a0015]/95 via-primary/85 to-primary/30" />
          <div className="absolute inset-0 bg-chinese-pattern opacity-8" />
        </div>

        {/* Floating chars */}
        <div className="hero-char absolute top-8 right-12 text-secondary/15 font-serif text-[130px] leading-none select-none pointer-events-none hidden lg:block" style={{ animationDelay: "0s" }}>福</div>
        <div className="hero-char absolute bottom-12 right-[22%] text-white/8 font-serif text-[80px] leading-none select-none pointer-events-none hidden lg:block" style={{ animationDelay: "2s" }}>学</div>
        <div className="hero-char absolute top-[30%] right-[8%] text-secondary/10 font-serif text-[60px] leading-none select-none pointer-events-none hidden xl:block" style={{ animationDelay: '1s' }}>é“</div>

        {/* Decorative red pillar */}
        <div className="absolute top-0 right-[16%] w-1 h-40 bg-accent-red/70 hidden lg:block" />
        <div className="absolute top-40 right-[16%] -translate-x-1/2 w-24 h-28 bg-accent-red rounded-xl flex-col items-center justify-center border-t-8 border-b-8 border-secondary hidden lg:flex badge-glow">
          <div className="text-secondary font-serif text-4xl font-bold">春</div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24">
          <div className="max-w-2xl relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 border border-secondary/50 bg-black/30 backdrop-blur-md text-secondary px-5 py-2 rounded-full shadow-lg">
              <span className="material-symbols-outlined text-[16px] animate-pulse">festival</span>
              <span className="text-xs font-bold tracking-widest uppercase">Khai giảng khóa mới tháng 11</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-5 drop-shadow-xl">
              Tinh hoa ngôn ngữ<br />
              <span className="text-secondary relative">Trung Hoa</span>
            </h1>

            <p className="text-lg text-slate-200 mb-8 leading-relaxed max-w-xl font-light">
              Hệ thống đào tạo tiếng Trung chuẩn HSK, tập trung vào trải nghiệm học viên và văn hóa Á Đông.
              Học để ứng dụng - <span className="font-serif text-secondary">学以致用</span>.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link to="/practice"
                className="px-8 py-4 bg-secondary text-primary font-black rounded-xl shadow-[0_6px_0_#b8860b] active:shadow-none active:translate-y-1 hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 text-base">
                <span className="material-symbols-outlined">quiz</span>
                Kiểm tra trình độ FREE
              </Link>
              <Link to="/Introduction"
                className="px-8 py-4 bg-white/10 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-2 text-base">
                <span className="material-symbols-outlined">play_circle</span>
                Xem giới thiệu
              </Link>
            </div>

            {/* Mini social proof */}
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex -space-x-2">
                {['#c8102e','#1a3a5c','#8B0000','#B8860B'].map((c, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c }}>
                    {['H','M','T','A'][i]}
                  </div>
              ))}
              </div>
              <div>
                <div className="flex text-secondary text-sm">★★★★★</div>
                <p className="text-white/80 text-xs mt-0.5"><strong className="text-white">10.000+</strong> học viên đã tin chọn TOXI</p>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <p className="text-secondary font-black text-lg leading-none">95%</p>
                <p className="text-white/70 text-xs">đạt HSK 4+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          2. PARTNER LOGOS / MARQUEE
      ============================================== */}
      <div className="overflow-hidden border-b border-slate-100 bg-white py-4 sm:py-5">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center gap-4 mb-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">Tin tưởng bởi</p>
          <div className="h-px bg-slate-100 flex-1" />
        </div>
        <div className="relative overflow-hidden mt-2">
          <div className="marquee-track">
            {["Viện Khổng Tử", "HanNom Institute", "Đại học Hà Nội", "ĐH Ngoại thương", "HSK Vietnam", "Confucius HN", "Viện Khổng Tử", "HanNom Institute", "Đại học Hà Nội", "ĐH Ngoại thương", "HSK Vietnam", "Confucius HN"].map((name, i) => (
              <div key={i} className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 sm:px-6">
                <span className="material-symbols-outlined text-accent-red text-[16px]">school</span>
                <span className="text-sm font-bold text-slate-600">{name}</span>
              </div>
              ))}
          </div>
        </div>
        </div>
      </div>

      {/* ==============================================
          3. STATS SECTION
      ============================================== */}
      <FadeSection className="bg-gradient-to-br from-primary to-[#7a0015] px-4 py-10 sm:px-6 sm:py-12 md:px-6 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
            {[
              { n: 10000, suf: "+", label: "Học viên", icon: "groups" },
              { n: 95, suf: "%", label: "Đạt HSK 4+", icon: "verified" },
              { n: 8, suf: " năm", label: "Kinh nghiệm", icon: "history_edu" },
              { n: 50, suf: "+", label: "Giảng viên", icon: "support_agent" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-sm sm:p-5 md:p-6">
                <span className="material-symbols-outlined mb-2 block text-2xl text-secondary sm:text-3xl">{s.icon}</span>
                <div className="mb-1 text-3xl font-black text-white sm:text-4xl">
                  <AnimatedCounter target={s.n} suffix={s.suf} />
                </div>
                <p className="text-xs text-slate-300 sm:text-sm">{s.label}</p>
              </div>
              ))}
          </div>
        </div>
      </FadeSection>

      {/* ==============================================
          4. COURSES (tabbed)
      ============================================== */}
      <section className="bg-surface px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20" id="courses">
        <div className="max-w-5xl mx-auto">
          <FadeSection>
            <div className="mb-8 text-center sm:mb-10 md:mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-accent-red/10 text-accent-red text-xs font-bold uppercase tracking-widest mb-3">Khóa học</span>
              <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">Chọn lộ trình phù hợp</h2>
              <p className="mx-auto max-w-lg text-sm text-slate-500 sm:text-base">Từ con số 0 đến thành thạo - TOXI có mọi khóa học bạn cần.</p>
            </div>

            {/* Tabs */}
            <div className="mb-8 flex justify-center sm:mb-10">
              <div className="inline-flex w-full max-w-full gap-1 overflow-x-auto rounded-2xl border border-slate-100 bg-white p-1.5 shadow-md sm:w-auto">
                {courseTabs.map((tab, i) => (
                  <button key={i} onClick={() => setActiveTab(i)}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 sm:px-5 ${activeTab === i ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary'}`}>
                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeSection>

          {/* Tab 0: HSK courses */}
          {activeTab === 0 && (
            <FadeSection>
              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
                {featuredCourses.map((course, index) => {
                  const labels = ["NỀN TẢNG", "TRUNG CẤP", "CAO CẤP"];
                  const isOwned = myCourses.includes(Number(course.courseId));
                  return (
                    <button key={course.courseId} type="button" onClick={() => handleOpenCourse(course)}
                      className="card-lift block w-full text-left bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                      <div className="relative h-48 overflow-hidden sm:h-52">
                        <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full z-10 uppercase tracking-wide">
                          {labels[index] || course.level || "HSK"}
                        </div>
                        {isOwned && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full z-10">✓ Đã sở hữu</div>
                        )}
                        <div className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-700"
                          style={{ backgroundImage: `url('${course.thumbnailUrl || fallbackImages[index % fallbackImages.length]}')` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="p-4 sm:p-5">
                        <h3 className="text-lg font-black text-slate-900 mb-1 line-clamp-2 group-hover:text-primary">{course.title}</h3>
                        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-3">
                          <span className="text-lg font-black text-accent-red sm:text-xl">
                            {Number(course.discountPrice && course.discountPrice < course.price ? course.discountPrice : course.price || 0).toLocaleString("vi-VN")}đ
                          </span>
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${isOwned ? 'bg-green-100 text-green-600' : 'bg-primary text-white'}`}>
                            {isOwned ? "Tiếp tục học" : "Xem ngay →"}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 text-center sm:mt-8">
                <Link to="/course" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                  Xem tất cả khóa học <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </FadeSection>
          )}

          {/* Tab 1: Giao tiếp */}
          {activeTab === 1 && (
            <FadeSection>
              <div className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
                {[
                  { icon: "record_voice_over", title: "Giao tiếp Cơ bản", desc: "Phát âm chuẩn và mẫu câu thông dụng hàng ngày cho người mới bắt đầu.", color: "text-primary", bg: "bg-primary/8" },
                  { icon: "forum", title: "Giao tiếp Nâng cao", desc: "Thảo luận xã hội & văn hóa sâu sắc. Tăng cường biện luận, phản xạ.", color: "text-accent-red", bg: "bg-accent-red/8" },
                  { icon: "travel_explore", title: "Tiếng Trung Du lịch", desc: "Đặt phòng, hỏi đường, mua sắm, ăn uống - tất cả tình huống du lịch.", color: "text-yellow-600", bg: "bg-yellow-50" },
                ].map((c, i) => (
                  <div key={i} className={`card-lift rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7`}>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${c.bg} ${c.color} sm:mb-5 sm:h-14 sm:w-14`}>
                      <span className="material-symbols-outlined text-3xl">{c.icon}</span>
                    </div>
                    <h3 className="font-black text-xl text-slate-900 mb-2">{c.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{c.desc}</p>
                    <Link to="/course" className={`text-sm font-bold ${c.color} flex items-center gap-1 hover:gap-2 transition-all`}>
                      Khám phá <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
              ))}
              </div>
            </FadeSection>
          )}

          {/* Tab 2: Người đi làm */}
          {activeTab === 2 && (
            <FadeSection>
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
                {[
                  { title: "Tiếng Trung Văn phòng & Thương mại", img: fallbackImages[2], items: ["Soạn thảo email, hợp đồng thương mại", "Kỹ năng đàm phán, thuyết trình", "Văn hóa doanh nghiệp Trung Quốc"] },
                  { title: "Tiếng Trung Công xưởng & Kỹ thuật", img: fallbackImages[1], items: ["Từ vựng chuyên ngành kỹ thuật", "Giao tiếp với quản lý người Trung", "Quy trình sản xuất & an toàn lao động"] },
                ].map((c, i) => (
                  <div key={i} className="card-lift bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-48 md:h-auto bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${c.img}')` }} />
                    <div className="flex flex-col justify-between p-4 sm:p-6">
                      <div>
                        <h3 className="font-black text-lg text-slate-900 mb-4">{c.title}</h3>
                        <ul className="space-y-2 mb-5">
                          {c.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="w-4 h-4 rounded-full bg-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary block" />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="w-full py-2.5 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90 transition-all">Đăng ký ngay</button>
                    </div>
                  </div>
              ))}
              </div>
            </FadeSection>
          )}
        </div>
      </section>

      {/* ==============================================
          5. HSK LEARNING PATH
      ============================================== */}
      <FadeSection className="bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20" id="hsk">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center sm:mb-10 md:mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">Lộ trình</span>
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">Lộ trình HSK từ A-Z</h2>
            <p className="mx-auto max-w-lg text-sm text-slate-500 sm:text-base">Mỗi cấp độ được thiết kế bám sát tiêu chuẩn HSK quốc tế mới nhất 3.0</p>
          </div>

          {/* Desktop: horizontal path */}
          <div className="hidden md:flex items-start gap-0 relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-orange-400 to-blue-400 z-0" />
            {hskPath.map((node, i) => (
              <div key={i} className="flex-1 flex flex-col items-center relative z-10">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-lg border-4 border-white" style={{ backgroundColor: node.color }}>
                    {i + 1}
                  </div>
                  <div className="absolute -inset-2 rounded-2xl opacity-30 pulse-ring" style={{ backgroundColor: node.color }} />
                </div>
                <div className="text-center px-2">
                  <div className="font-black text-sm text-slate-900">{node.level}</div>
                  <div className="text-xs font-bold mb-1" style={{ color: node.color }}>{node.label}</div>
                  <div className="text-xs text-slate-500 mb-1">{node.desc}</div>
                  <div className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 inline-block">{node.weeks}</div>
                </div>
              </div>
              ))}
          </div>

          {/* Mobile: vertical */}
          <div className="space-y-3 md:hidden sm:space-y-4">
            {hskPath.map((node, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:gap-4 sm:p-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-sm shrink-0" style={{ backgroundColor: node.color }}>{i + 1}</div>
                <div className="flex-1">
                  <div className="font-black text-slate-900">{node.level} <span className="font-normal text-sm" style={{ color: node.color }}>· {node.label}</span></div>
                  <div className="text-xs text-slate-500">{node.desc}</div>
                </div>
                <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded-full text-slate-500 shrink-0">{node.weeks}</span>
              </div>
              ))}
          </div>

          <div className="mt-6 text-center sm:mt-8 md:mt-10">
            <Link to="/practice" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all">
              <span className="material-symbols-outlined">quiz</span> Test xem bạn đang ở level nào
            </Link>
          </div>
        </div>
      </FadeSection>

      {/* ==============================================
          6. WHY TOXI (upgraded)
      ============================================== */}
      <FadeSection className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20" id="why">
        <div className="max-w-5xl mx-auto">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-[8px] border-white">
                <div className="h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwxb7nc6Y1agbpHftxTY_o4gDjVVkTrjthWCSr5aBCwYASNCDteRUBSCZszZPjpyC_ojHXMdIfsGFN2TxXG-ynM7Ys8vjpEEM7SYFsxEap7wqxiraLyfoPwKZ_gct2jA74qnO8XM_x9Jc6aeaDM2oQwgSFd1HOfrukFmrN2vDgUOmaNV-a2e7z1IkWP6mUG0NVibB_lY0a0S0Rh34s8N6VIua_DB_UF5NXrbv8oiRT8CsANH17Kx7-D2oDZk8IoCqgcI_r32IbgF0')" }} />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 to-transparent p-5 sm:p-8">
                  <p className="w-full text-center font-serif text-lg italic text-white sm:text-xl">"Ngôn ngữ là cầu nối văn hóa"</p>
                </div>
              </div>
              {/* Stat badges */}
              <div className="absolute right-3 top-6 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl sm:-right-4 sm:top-1/4 sm:p-4">
                <div className="text-3xl font-black text-primary">95%</div>
                <div className="text-xs text-slate-500">Tỉ lệ đạt HSK 4+</div>
              </div>
              <div className="absolute left-3 bottom-6 rounded-2xl bg-secondary p-3 shadow-xl sm:-left-4 sm:bottom-1/4 sm:p-4">
                <div className="text-3xl font-black text-primary">10K+</div>
                <div className="text-xs text-primary/70">Học viên</div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1 rounded-full bg-accent-red/10 text-accent-red text-xs font-bold uppercase tracking-widest mb-4">Giá trị cốt lõi</span>
              <h2 className="mb-6 text-3xl font-black text-slate-900 sm:text-4xl md:mb-8 md:text-5xl">
                Tại sao <span className="text-primary">10.000+</span> học viên chọn TOXI?
              </h2>
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {[
                  { icon: "verified_user", title: "Cam kết đầu ra bằng văn bản", desc: "Hợp đồng minh bạch. Học lại miễn phí 100% nếu không đạt kết quả cam kết.", stat: "100% hoàn phí", color: "bg-primary" },
                  { icon: "record_voice_over", title: "Phương pháp Nhúng (Immersion)", desc: "Môi trường giao tiếp 100% tiếng Trung - phản xạ tự nhiên như người bản xứ.", stat: "2x nhanh hơn", color: "bg-accent-red" },
                  { icon: "auto_stories", title: "Giáo trình độc quyền HSK 3.0", desc: "Biên soạn bám sát chuẩn HSK mới nhất, kết hợp AI luyện phát âm.", stat: "Độc quyền TOXI", color: "bg-secondary" },
                ].map((item, i) => (
                  <div key={i} className="group flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-secondary/30 hover:shadow-md sm:gap-4">
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white shrink-0`}>
                      <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-start justify-between gap-3">
                        <h4 className="font-black text-slate-900 group-hover:text-primary transition-colors">{item.title}</h4>
                        <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 hidden sm:block">{item.stat}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ==============================================
          7. INSTRUCTORS
      ============================================== */}
      <FadeSection className="bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20" id="instructors">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center sm:mb-10 md:mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-yellow-700 text-xs font-bold uppercase tracking-widest mb-3">Đội ngũ giảng viên</span>
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">Học từ những chuyên gia hàng đầu</h2>
            <p className="mx-auto max-w-lg text-sm text-slate-500 sm:text-base">Giảng viên TOXI đều có chứng chỉ quốc tế và kinh nghiệm thực tiễn tại Trung Quốc.</p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
            {instructors.map((inst, i) => (
              <div key={i} className="card-lift bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Avatar section */}
                <div className="h-48 relative flex items-end" style={{ background: `linear-gradient(135deg, ${inst.color}22, ${inst.color}44)` }}>
                  <div className="absolute inset-0 opacity-5 bg-chinese-pattern" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-xl border-4 border-white" style={{ backgroundColor: inst.color }}>
                    {inst.avatar}
                  </div>
                  <div className="w-full px-4 pb-3 flex justify-end">
                    <span className="text-xs font-bold bg-white/80 backdrop-blur px-2 py-1 rounded-full text-slate-700">{inst.students} học viên</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-slate-900 text-lg mb-0.5">{inst.name}</h3>
                  <p className="text-sm font-bold mb-3" style={{ color: inst.color }}>{inst.title}</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="material-symbols-outlined text-[14px] text-slate-400">work</span>{inst.exp}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="material-symbols-outlined text-[14px] text-slate-400">verified</span>{inst.cert}
                    </div>
                  </div>
                  <div className="flex mt-3">{"★★★★★".split("").map((s, j) => <span key={j} className="text-secondary text-sm">{s}</span>)}</div>
                </div>
              </div>
              ))}
          </div>
        </div>
      </FadeSection>

      {/* ==============================================
          8. TESTIMONIALS
      ============================================== */}
      <FadeSection className="relative overflow-hidden bg-primary px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20" id="testimonials">
        <div className="absolute inset-0 bg-chinese-pattern opacity-8" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-8 text-center sm:mb-10 md:mb-14">
            <span className="inline-block px-4 py-1 rounded-full border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-widest mb-3">Học viên nói gì</span>
            <h2 className="mb-3 text-3xl font-black text-white sm:text-4xl md:text-5xl">10.000+ học viên tin tưởng</h2>
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
            {[
              { name: "Nguyễn Thu Hà", result: "Đạt HSK 6 - 280 điểm", quote: "TOXI giúp tôi đạt HSK 6 sau 2 năm học. Phương pháp dạy rất thực tế và giáo viên nhiệt tình.", avatar: "H", color: "#c8102e" },
              { name: "Trần Minh Tuấn", result: "Nhận học bổng Khổng Tử", quote: "Nhờ TOXI tôi tự tin giao tiếp với đối tác Trung Quốc và nhận được học bổng toàn phần.", avatar: "T", color: "#B8860B" },
              { name: "Lê Ngọc Anh", result: "Thăng chức tại công ty FDI", quote: "Tiếng Trung TOXI giúp tôi thăng tiến nhanh trong công ty có vốn đầu tư Trung Quốc.", avatar: "A", color: "#1a3a5c" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-all hover:bg-white/15 sm:p-6">
                <div className="flex text-secondary mb-4">{"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}</div>
                <p className="text-white/90 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ backgroundColor: t.color }}>{t.avatar}</div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-secondary text-xs">{t.result}</div>
                  </div>
                </div>
              </div>
              ))}
          </div>

          {/* Achievement board */}
          <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-5 sm:mt-8 sm:p-6 md:mt-10">
            <h3 className="text-white font-black text-center mb-6 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-secondary">emoji_events</span> Bảng Vàng Thành Tích
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { rank: "🥇", name: "Nguyễn Thu Hà", score: "HSK 6 - 280đ", color: "bg-yellow-400/20" },
                { rank: "🥈", name: "Trần Minh Tuấn", score: "HSK 5 - 265đ", color: "bg-slate-300/20" },
                { rank: "🥉", name: "Lê Ngọc Anh", score: "HB Khổng Tử 2023", color: "bg-orange-300/20" },
              ].map((r, i) => (
                <div key={i} className={`${r.color} rounded-xl p-3 text-center`}>
                  <div className="text-2xl mb-1">{r.rank}</div>
                  <div className="text-white font-bold text-sm">{r.name}</div>
                  <div className="text-secondary text-xs">{r.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ==============================================
          9. STORE
      ============================================== */}
      <FadeSection className="bg-surface px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20" id="store">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex items-center justify-center gap-3 sm:mb-10 md:mb-12 md:gap-4">
            <div className="h-px bg-slate-200 flex-1" />
            <div className="text-center">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Dụng cụ học tập</div>
              <h2 className="text-3xl font-black text-slate-900">TOXI Store</h2>
            </div>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">
            {[
              { id: 1, name: "Vở tập viết Thượng Hải", price: "89.000đ", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbkVSFExNteE9CGGXL4Qv8mk3Gt2EkENVuguiwfR2-T3GqYfUywrHFjc0RbL0juSTVR_ajo2oxbi9kreWP7qevea_-wD6AIC6d9Olp-8l2L53EJMwT0SVmAlAlrHTfeMO1IEa0d-MDfprIGo-0tMBWdsmgxrXQ88bXPgmzEiHg9Yj-cjf-HicH8czfkj0tRY8SfJq4y4LzurOHyh5nSDXAMbyIkwa8nL6bcZN0ao5v-juwqPnwuyaKfXjKCk1LENhUYPOpKg0S3Qk" },
              { id: 2, name: "Flashcard HSK 1-3", price: "250.000đ", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfeAdxPhgksrY8QFJ91EbYKlV9XXR2QamdXeEVsRakGCtbRskwOI2HO_kz8NPpRGVYESEgKuqTTa4-XczvNtRXaUWCjwN5FQEi7uPd6DU6kaJmRLgT0DiWNbgKOxl8kSAYSn2NrPqfGXBBdUVgoXHrTsjsfg6XgtVVFT14WdrNWWPPGeLvF1oQGXrP55PYQxLu5wRYzlHWNukZnIDCAoUxxfIsYVTGQW386LQtSZrjXVFP7hrwfy2EWORQQHW6ulcHTPdO9rJjStg" },
              { id: 3, name: "Giáo trình Hán ngữ Q1", price: "115.000đ", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb82Zl7_ZBUA4rQzh4vB3sSP9JJO06Rt2JATxjYWCrL_foyOJa5aXMMOrx-GJXj5tdiUqwz1VxxTuobg5iGAmC6f7YJU7T9voeVQuDTubrjH5mnlEtGifQVUhSqm4_dSMchhJBGoL8JT6a4Bpj10H-oQhPjIuELIUoI_-rjgxfvqIVzE5w5a9zmOAirMRZ1YU0msADojGz8NUnBZCb3JjgKZB9GzH77twiaE8DLzS8O_clnlLHmJgm2EXRXMQWPoA22Mvsj6tLVOw" },
              { id: 4, name: "Bộ bút lông thư pháp", price: "145.000đ", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh8Xr_PUz4IDYThA1TyDnkPT4BmJKLwhscu7FK-ySx4Kt2TTbRDod_9E_gpQ46epTfzi1k6QCNtXpm_ahEwyA8av66aj2PZ_nvmllqqP7fBMiosCgY5nUIq1E66J5bxV9mbxX_oOeoA46M-u2VXCLiaU6SRGbBTIPpgRz27skgwzo8h4rIMba5I_0GsL1fD4hSca5kIpGHkCuRnaGo0czuNYYQXQM3SzLiz0bomvuH4ZyFRuMvo26QM7rW4AOdgNearO3Cqofys3c", badge: "Best Seller" },
            ].map((item) => (
              <Link to={`/products/${item.id}`} key={item.id} className="card-lift group cursor-pointer">
                <div className="aspect-[3/4] rounded-2xl bg-slate-100 overflow-hidden mb-3 relative shadow-sm border border-slate-200">
                  {item.badge && (
                    <div className="absolute top-2 left-2 bg-accent-red text-white text-[10px] font-black px-2 py-0.5 rounded-full z-10">{item.badge}</div>
                  )}
                  <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url('${item.img}')` }} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-secondary transition-colors">
                      <span className="material-symbols-outlined">shopping_cart</span>
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-0.5 truncate text-center text-sm">{item.name}</h3>
                <p className="text-accent-red font-black text-center">{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ==============================================
          10. BLOG
      ============================================== */}
      <FadeSection className="bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20" id="blog">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:mb-10">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-2">Blog</span>
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">history_edu</span> Góc Văn Hóa & Blog
              </h2>
            </div>
            <a href="#" className="text-sm font-bold text-primary hover:text-secondary transition-colors">Xem thêm →</a>
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
            {blogs.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.id}`} state={blog} className="card-lift block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:border-secondary/30 group">
                <div className="h-48 relative overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url(${blog.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-3 left-3 text-[10px] font-black px-2 py-1 rounded-full ${blog.color === 'secondary' ? 'bg-secondary text-primary' : 'bg-primary text-white'}`}>{blog.category}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                  <p className="text-xs text-slate-400 mb-2">{blog.date} · {blog.author}</p>
                  <p className="text-sm text-slate-600 line-clamp-2">{blog.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ==============================================
          11. FAQ
      ============================================== */}
      <FadeSection className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center sm:mb-10 md:mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">FAQ</span>
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl">Câu hỏi thường gặp</h2>
            <p className="text-sm text-slate-500 sm:text-base">Không tìm thấy câu trả lời? Liên hệ tư vấn viên qua hotline.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left font-bold text-slate-900 transition-colors hover:text-primary sm:px-6">
                  <span>{faq.q}</span>
                  <span className={`material-symbols-outlined text-primary transition-transform duration-300 shrink-0 ml-4 ${activeFaq === i ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                <div className={`faq-answer ${activeFaq === i ? 'open' : ''} px-4 pb-0 sm:px-6`}>
                  <p className="text-slate-600 text-sm leading-relaxed pb-4">{faq.a}</p>
                </div>
              </div>
              ))}
          </div>
        </div>
      </FadeSection>

      {/* ==============================================
          12. FINAL CTA
      ============================================== */}
      <FadeSection className="relative overflow-hidden bg-gradient-to-br from-primary via-[#8a000e] to-[#7a0015] px-4 py-12 sm:px-6 sm:py-14 md:px-12 md:py-18 lg:py-24">
        <div className="absolute inset-0 bg-chinese-pattern opacity-10" />
        <div className="hero-char absolute right-12 top-1/2 -translate-y-1/2 text-white/8 font-serif text-[200px] leading-none select-none pointer-events-none hidden xl:block">龙</div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-white/10 px-4 py-1.5 text-secondary backdrop-blur-sm sm:mb-6 sm:px-5 sm:py-2">
            <span className="material-symbols-outlined text-[16px] animate-pulse">stars</span>
            <span className="text-xs font-bold tracking-widest uppercase">Ưu đãi khai giảng tháng 11</span>
          </div>
          <h2 className="mb-4 text-3xl font-black leading-tight text-white sm:mb-5 sm:text-4xl md:text-6xl">
            Bắt đầu hành trình<br />
            <span className="text-secondary">征服 Hán ngữ</span> hôm nay
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-slate-200 sm:mb-8 sm:text-base md:mb-10 md:text-lg">
            Tham gia cùng 10.000+ học viên đã thay đổi cuộc đời nhờ tiếng Trung. <strong>Test trình độ miễn phí</strong> - không cần đăng ký.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/practice"
              className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-base font-black text-primary shadow-[0_6px_0_#b8860b] transition-all hover:bg-yellow-300 active:translate-y-1 active:shadow-none sm:px-8 sm:py-4 sm:text-lg md:px-10">
              <span className="material-symbols-outlined">quiz</span>
              Test trình độ MIỄN PHÍ
            </Link>
            <Link to="/course"
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/15 px-6 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/25 sm:px-8 sm:py-4 sm:text-lg md:px-10">
              <span className="material-symbols-outlined">school</span>
              Xem tất cả khóa học
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/50 sm:mt-6 sm:text-sm">✓ Miễn phí hoàn toàn &nbsp;·&nbsp; ✓ Không cần thẻ tín dụng &nbsp;·&nbsp; ✓ Kết quả ngay lập tức</p>
        </div>
      </FadeSection>
    </>
  );
}












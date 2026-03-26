<<<<<<< HEAD
﻿import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
=======
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPublishedBlogs } from "../../admin/api/apiBlog";

const POSTS_PER_PAGE = 6;

const formatDate = (value) => {
  const d = value ? new Date(value) : null;
  return d && !Number.isNaN(d.getTime())
    ? d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "--";
};
>>>>>>> 024fd97384f83b187a4be9ca3dc2461993899838

export default function Blog() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
<<<<<<< HEAD
  const [activeHero, setActiveHero] = useState(0);

  const postsPerPage = 3;

  const heroSlides = [
    {
      eyebrow: "Knowledge Base",
      title: "Blog & Tin tức TOXI",
      subtitle: "Cập nhật kiến thức, kinh nghiệm học tập và văn hóa Trung Hoa mới nhất.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80",
      accent: "Blog Updates",
    },
    {
      eyebrow: "Learning Tips",
      title: "Mẹo học thông minh",
      subtitle: "Tổng hợp phương pháp ôn HSK dễ hiểu, dễ áp dụng và tối ưu kết quả.",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
      accent: "HSK Focus",
    },
    {
      eyebrow: "Culture",
      title: "Góc văn hóa Trung Hoa",
      subtitle: "Khám phá những câu chuyện văn hóa, lịch sử và ứng dụng thực tế.",
      image:
        "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1600&q=80",
      accent: "Culture Note",
    },
  ];

  const posts = [
    {
      id: 1,
      title: "Nghệ thuật trà đạo Trung Hoa: Tinh hoa truyền thống",
      category: "Culture",
      date: "20 Tháng 10, 2023",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBmQzIx-gqDWKbF3hBR5Tou2hyKZoWc6lBf5-vYanuncuCYTuPZoh62ZP-vHAONMdjbqmGxFLnreocoOtQdKym27pBvqAOFGcyH5JJhajZ1y6wKbFbBgwHff2SE9puzb2an3ddyrYkBOrs1sM7j_3zT2BVPPYuYkI9GjuAyJTPjuf2QQjWTIPNdNpuIUqWFecG2rluPqcWEKcX-4uCt7OLuSyEpMGVthPi9WRNLlFfel7eDQ8iiXM0bLs4j5msFr5tKLCVdALdMVpc",
      description:
        "Khám phá nét đẹp truyền thống trong từng chén trà, từ cách chọn lá đến nghi thức pha trà cầu kỳ của người Trung Hoa...",
    },
    {
      id: 2,
      title: "Bí quyết luyện thi HSK 6 hiệu quả trong 3 tháng",
      category: "Learning Tips",
      date: "18 Tháng 10, 2023",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCbSl2xGjJS3uEsDp51tEljl3hy_Fgae038Hk5QTHtJtbKzjDF1n-cRfAuYeHAnaNTfZK4JkmbbYSb43VLe6ZbbAOUEOqjnb51FFLUAtD_1CtmQHaXk6kipYvmZtA9sKw3cltOSbowxdRPKXAlttXtfluEH2l5pVuzTkaK8sxIyzDEmFWeNc-96f0InbB7do272hRdFZcnDXNSPQsZXpMmqT_TqaS82bLcFFeQVkYN0-pYgAeNiknPAlvOXTBPOK0M_R0X29tbLTx0",
      description:
        "Lộ trình ôn tập chi tiết giúp bạn chinh phục điểm số cao trong kỳ thi HSK 6 đầy thử thách với các mẹo ghi nhớ từ vựng...",
    },
    {
      id: 3,
      title: "Ứng dụng AI trong học tiếng Trung hiện đại",
      category: "AI in Learning",
      date: "15 Tháng 10, 2023",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDMwV8JAu5LOdbNg64VaAplo3Hw0RF0IJ7KLzUA-CayjyRDPeSOq4qe-t9auAVkkz0xMsPcH6jWh3jhnxD5hqI5aEDQSjLb759A1lFUXqvJqIcetYuUcEKu5tcBZnKBE2PyjpUB3WWykwnTm5z5ytc4rYOX2uCvVsetgVFdmZuqbVdQNSGRMieT4HBkWmX9n-_8d-Ll9NoiZPvmyFfcw9WICk5KGsaYwZYi2kOMVrScdhSOt_x_ac_viwMOmzh2quwE1f4E1ysM5T8",
      description:
        "Cách tận dụng trí tuệ nhân tạo để sửa phát âm, dịch thuật ngữ cảnh và cá nhân hóa lộ trình học tiếng Trung tại nhà...",
    },
    {
      id: 4,
      title: "Lễ hội Thuyền rồng và sự kiện đặc sắc 2024",
      category: "HSK News",
      date: "12 Tháng 10, 2023",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD2Ht6bALRMirJTc7YncnPPRrTI4PvfpuvC83KoZ89Rc0scCa0gSwQmwi5UhllBUg_I_MHvWWjHveKChJYq0S5in7JsxQOPUU6aPp5MWAULdTq0jNXszpidcaPznruvI77aKM06qYMo6sj7aw1vgJP76T-Q4MjbVdR3MMdVkjFXU0YWtD-UZwM8rv6PmRBU252C-zVtN_R1AvRY1ZpnHl0W_oi1X17jkSbIaKyadtLrl5hcpjj1P9AHtfomzbiF67vzEo3xYiynGoQ",
      description:
        "Những hoạt động không thể bỏ qua trong mùa lễ hội năm nay cùng các câu chuyện lịch sử đằng sau ngày Tết Đoan Ngọ...",
    },
    {
      id: 5,
      title: "Thư pháp: Tâm hồn trong từng nét bút",
      category: "Culture",
      date: "10 Tháng 10, 2023",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsCMeUh1QIN6E8QVzF0FnYmLGD1n90Lscvo6ZWo61s_J8808VJ2PhhhW-6APxIwDZTO5hBo7wBqugCry8GjzlVolFg7V3qoPybS6ddJr_g5_6j_Oz-RvuE_6_ecyEBUvq-98nFIpHcz5eYoeU4GiCfN90nquhx73pncjOvseZ4MmAnedXrO37IRZZP_qq8XmlkF4FyuOS4QByfyE4QLmufzE68qGXSVLp9djmhFJOsIcgdCemMW-MssnXRdnMqZEl4H150Q33Jfg8",
      description:
        "Tìm hiểu về Văn phòng tứ bảo và tầm quan trọng của thư pháp trong việc rèn luyện tính kiên nhẫn và thẩm mỹ...",
    },
  ];

  const categories = ["All", "Culture", "Learning Tips", "AI in Learning", "HSK News"];

  const filteredPosts =
    activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory);

=======
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        setPosts(await fetchPublishedBlogs());
      } catch (err) {
        console.error(err);
        setError("Không tải được bài viết.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = useMemo(
    () => ["Tất cả", ...new Set(posts.map((post) => post.category).filter(Boolean))],
    [posts]
  );

  const filteredPosts = useMemo(
    () => activeCategory === "Tất cả" ? posts : posts.filter((post) => post.category === activeCategory),
    [posts, activeCategory]
  );

>>>>>>> 024fd97384f83b187a4be9ca3dc2461993899838
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

<<<<<<< HEAD
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 relative">
        <section className="bg-[#f4f7ff] pt-2 md:pt-3 lg:pt-4 w-full mb-6">
          <div className="bg-[#eef3ff] rounded-2xl">
            <div className="mx-auto max-w-7xl px-3 pb-4 pt-3 md:px-4 md:pb-6 md:pt-4">
              <div className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_20px_60px_rgba(33,54,120,0.16)]">
                <div className="relative h-[240px] sm:h-[300px] lg:h-[360px]">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={slide.title}
                      className={`absolute inset-0 transition-all duration-700 ${
                        activeHero === index
                          ? "opacity-100 translate-x-0"
                          : index < activeHero
                          ? "opacity-0 -translate-x-6"
                          : "opacity-0 translate-x-6"
                      }`}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${slide.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#082b73]/96 via-[#1747d6]/84 to-[#173ec9]/50" />
                      <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#061b4f]/92 via-[#0a2872]/72 to-transparent" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_62%_100%,rgba(255,255,255,0.12),transparent_22%)]" />

                      <div className="relative z-10 flex h-full items-center justify-center px-6 py-8 sm:px-10 lg:px-14">
                        <div className="mx-auto max-w-3xl text-center text-white">
                          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-white/90 backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-secondary" />
                            {slide.eyebrow}
                          </div>
                          <h1 className="mx-auto max-w-2xl text-3xl font-black leading-tight sm:text-4xl lg:text-[48px]">
                            {slide.title}
                          </h1>
                          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                            {slide.subtitle}
                          </p>
                          <div className="mt-6 flex items-center justify-center gap-4">
                            <div className="rounded-full bg-white/14 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-secondary backdrop-blur-sm">
                              {slide.accent}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/14 px-3 py-2 backdrop-blur-md">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.accent}
                        type="button"
                        onClick={() => setActiveHero(index)}
                        aria-label={`Blog hero slide ${index + 1}`}
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

        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <a className="hover:text-primary transition-colors" href="/Home">
            Home
          </a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-medium">Blog</span>
        </nav>

        <div className="flex justify-between items-end mb-10 relative">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-8 bg-accent rounded-full"></span>
              <span className="text-accent font-bold uppercase tracking-widest text-xs">Knowledge Base</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Blog & Tin tức <br />
              <span className="text-primary underline decoration-accent/30 decoration-4 underline-offset-8">
                Văn hóa Trung Hoa
              </span>
            </h1>
          </div>

          <div className="hidden lg:block text-accent opacity-20 transform -translate-y-4">
            <span className="material-symbols-outlined text-8xl">festival</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(`/blog/${post.id}`, { state: post })}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-5 mb-6">{post.description}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/blog/${post.id}`, { state: post });
                  }}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                >
                  Read More
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center items-center gap-4 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${
                  currentPage === pageNumber
                    ? "bg-primary text-white"
                    : "border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </>
=======
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <main className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:ml-64 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <a className="transition-colors hover:text-primary" href="/Home">Home</a>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="font-medium text-primary">Blog</span>
      </nav>

      <div className="relative mb-10 flex items-end justify-between">
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Knowledge Base</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900">
            Blog & Tin tức
            <br />
            <span className="text-primary underline decoration-accent/30 decoration-4 underline-offset-8">
              Văn hóa Trung Hoa
            </span>
          </h1>
        </div>
      </div>

      <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">Đang tải bài viết...</div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-sm font-semibold text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {currentPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/blog/${post.id}`, { state: post })}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : null}
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary">{post.title}</h3>
                  <p className="mb-6 line-clamp-4 text-sm text-slate-500">{post.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/blog/${post.id}`, { state: post });
                    }}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
                  >
                    Đọc tiếp
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-primary hover:text-white disabled:opacity-40"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold transition-colors ${
                    currentPage === pageNumber
                      ? "bg-primary text-white"
                      : "border border-slate-200 text-slate-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-primary hover:text-white disabled:opacity-40"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </>
      )}
    </main>
>>>>>>> 024fd97384f83b187a4be9ca3dc2461993899838
  );
}

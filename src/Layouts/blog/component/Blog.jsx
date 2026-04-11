import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPublishedBlogs } from "../../admin/api/apiBlog";

const POSTS_PER_PAGE = 6;

const formatDate = (value) => {
  const d = value ? new Date(value) : null;
  return d && !Number.isNaN(d.getTime())
    ? d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "--";
};

export default function Blog() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Tat ca");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeHero, setActiveHero] = useState(0);
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
        setError("Khong tai duoc bai viet.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const categories = useMemo(
    () => ["Tat ca", ...new Set(posts.map((post) => post.category).filter(Boolean))],
    [posts]
  );

  const filteredPosts = useMemo(
    () =>
      activeCategory === "Tat ca"
        ? posts
        : posts.filter((post) => post.category === activeCategory),
    [posts, activeCategory]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const heroSlides = useMemo(() => {
    const featuredPosts = posts.filter((post) => post.image).slice(0, 5);

    if (featuredPosts.length > 0) {
      return featuredPosts.map((post, index) => ({
        id: post.id,
        title: post.title,
        subtitle: post.description || "Khám phá bài viết nổi bật mới nhất từ TOXI Education.",
        image: post.image,
        eyebrow: post.category || "Tin tức",
        accent: index === 0 ? "Đọc bài nổi bật" : "Xem chi tiết",
      }));
    }

    return [
      {
        id: "hero-fallback",
        title: "Blog & Tin tức TOXI Education",
        subtitle: "Khám phá các bài viết mới nhất về học tiếng Trung, HSK và kinh nghiệm học tập.",
        image:
          "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1600&q=80",
        eyebrow: "TOXI Education",
        accent: "Khám phá ngay",
      },
    ];
  }, [posts]);

  useEffect(() => {
    setActiveHero(0);
  }, [heroSlides.length]);

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="relative w-full bg-surface">
      <main className="relative flex-1 overflow-y-auto bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-[32px] border border-slate-200/70 bg-white px-6 py-6 shadow-sm sm:px-8 lg:px-10">
            <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
              <a className="transition-colors hover:text-primary" href="/Home">
                Home
              </a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="font-medium text-primary">Blog</span>
            </nav>

            <section className="mb-10 w-full bg-[#f4f7ff] pt-4 md:pt-5 lg:pt-6">
              <div className="rounded-[32px] bg-[#eef3ff] px-4 pb-6 pt-4 md:px-6 md:pb-8 md:pt-5">
                <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_24px_80px_rgba(33,54,120,0.14)]">
                  <div className="relative h-[280px] sm:h-[340px] lg:h-[410px]">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => {
                          if (String(slide.id).startsWith("hero-")) return;
                          const heroPost = posts.find(
                            (item) => String(item.id) === String(slide.id)
                          );
                          if (heroPost) {
                            navigate(`/blog/${heroPost.id}`, { state: heroPost });
                          }
                        }}
                        className={`absolute inset-0 w-full text-left transition-all duration-700 ${
                          activeHero === index
                            ? "translate-x-0 opacity-100"
                            : index < activeHero
                            ? "-translate-x-6 opacity-0"
                            : "translate-x-6 opacity-0"
                        }`}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: slide.image
                              ? `url('${slide.image}')`
                              : "linear-gradient(135deg, #1e3a8a 0%, #334155 100%)",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#082b73]/96 via-[#1747d6]/84 to-[#173ec9]/50" />
                        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#061b4f]/92 via-[#0a2872]/72 to-transparent" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_62%_100%,rgba(255,255,255,0.12),transparent_22%)]" />

                        <div className="relative z-10 flex h-full items-center justify-center px-6 py-8 sm:px-10 lg:px-14">
                          <div className="mx-auto max-w-3xl text-center text-white">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-white/90 backdrop-blur-md">
                              <span className="h-2 w-2 rounded-full bg-accent" />
                              {slide.eyebrow}
                            </div>

                            <h1 className="mx-auto max-w-2xl text-3xl font-black leading-tight sm:text-4xl lg:text-[48px] xl:text-[56px]">
                              {slide.title}
                            </h1>

                            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                              {slide.subtitle}
                            </p>

                            <div className="mt-6 flex items-center justify-center gap-4">
                              <span className="rounded-full bg-white/14 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-accent backdrop-blur-sm transition-colors hover:bg-white/20">
                                {slide.accent}
                              </span>
                              <div className="text-sm font-semibold text-white/80">
                                {formatDate(posts.find((item) => String(item.id) === String(slide.id))?.publishedAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}

                    {heroSlides.length > 1 ? (
                      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/14 px-3 py-2 backdrop-blur-md">
                        {heroSlides.map((slide, index) => (
                          <button
                            key={slide.id}
                            type="button"
                            onClick={() => setActiveHero(index)}
                            aria-label={`Hero slide ${index + 1}`}
                            className={`h-2.5 rounded-full transition-all ${
                              activeHero === index
                                ? "w-8 bg-white"
                                : "w-2.5 bg-white/45 hover:bg-white/70"
                            }`}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>

            <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center text-sm font-semibold text-slate-500">
                Dang tai bai viet...
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-sm font-semibold text-red-500">
                {error}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {currentPosts.map((post) => (
                    <article
                      key={post.id}
                      onClick={() => navigate(`/blog/${post.id}`, { state: post })}
                      className="group mx-auto flex h-full w-full max-w-md cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-56 overflow-hidden bg-slate-100">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : null}

                        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          {post.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>

                        <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>

                        <p className="mb-6 line-clamp-4 flex-1 text-sm leading-6 text-slate-500">
                          {post.description}
                        </p>

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/blog/${post.id}`, { state: post });
                          }}
                          className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
                        >
                          Doc tiep
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
          </div>
        </div>
      </main>
    </div>
  );
}

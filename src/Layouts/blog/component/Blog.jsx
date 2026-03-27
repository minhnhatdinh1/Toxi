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
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
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
    () =>
      activeCategory === "Tất cả"
        ? posts
        : posts.filter((post) => post.category === activeCategory),
    [posts, activeCategory]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <main className="relative flex-1 overflow-y-auto bg-slate-50 px-4 py-6 sm:px-6 lg:ml-64 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[32px] border border-slate-200/70 bg-white px-6 py-6 shadow-sm sm:px-8 lg:px-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <a className="transition-colors hover:text-primary" href="/Home">
              Home
            </a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-medium text-primary">Blog</span>
          </nav>

          <div className="mb-10 border-b border-slate-200 pb-8">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1 w-8 rounded-full bg-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                  Knowledge Base
                </span>
              </div>

              <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                Blog & Tin tức
                <br />
                <span className="text-primary underline decoration-accent/30 decoration-4 underline-offset-8">
                  Văn hóa Trung Hoa
                </span>
              </h1>
            </div>
          </div>

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
              Đang tải bài viết...
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
        </div>
      </div>
    </main>
  );
}

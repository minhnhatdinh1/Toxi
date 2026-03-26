import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchBlogById, fetchPublishedBlogs } from "../../admin/api/apiBlog";

const formatDate = (value) => {
  const d = value ? new Date(value) : null;
  return d && !Number.isNaN(d.getTime())
    ? d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "--";
};

export default function BlogDetailMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [post, setPost] = useState(location.state || null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const [detail, related] = await Promise.all([
          location.state ? Promise.resolve(location.state) : fetchBlogById(id),
          fetchPublishedBlogs(),
        ]);
        setPost(detail);
        setRelatedPosts(related.filter((item) => String(item.id) !== String(id)).slice(0, 3));
      } catch (err) {
        console.error(err);
        setError("Không tải được bài viết.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, location.state]);

  const current = post || {
    title: "Bài viết không tồn tại",
    category: "",
    image: "",
    galleryImages: [],
    description: "",
    content: "",
    author: "TOXI",
    authorRole: "Biên tập viên",
    readTime: "",
  };

  const paragraphs = useMemo(
    () => String(current.content || "").split("\n\n").map((item) => item.trim()).filter(Boolean),
    [current.content]
  );

  return (
    <main className="min-h-screen flex-1 bg-background-light lg:ml-64">
      <div className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/home" className="hover:text-primary">Home</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="truncate font-medium text-slate-900">{current.title}</span>
          </nav>
        </div>
      </div>

      {loading ? (
        <div className="mx-auto max-w-3xl px-6 py-16 text-center text-sm font-semibold text-slate-500">Đang tải bài viết...</div>
      ) : error ? (
        <div className="mx-auto max-w-3xl px-6 py-16 text-center text-sm font-semibold text-red-500">{error}</div>
      ) : (
        <>
          {current.image ? (
            <div className="relative h-[420px] w-full overflow-hidden bg-slate-100">
              <img src={current.image} alt={current.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
            </div>
          ) : null}

          <article className="mx-auto max-w-6xl px-6 py-12">
            <div className="mx-auto max-w-3xl">
              {current.category ? (
                <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {current.category}
                </span>
              ) : null}

              <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">{current.title}</h1>

              <div className="mb-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                    {current.authorImage ? <img src={current.authorImage} alt={current.author} className="h-full w-full object-cover" /> : <span className="material-symbols-outlined text-slate-500">person</span>}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{current.author}</p>
                    <p className="text-sm text-slate-500">{current.authorRole}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_month</span>{formatDate(current.publishedAt)}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span>{current.readTime}</span>
                </div>
              </div>

              {current.description ? (
                <p className="mb-12 border-l-4 border-primary pl-6 text-xl italic leading-relaxed text-slate-600">
                  {current.description}
                </p>
              ) : null}
            </div>

            <div className="space-y-12">
              {paragraphs.map((para, index) => {
                const image = current.galleryImages?.[index] || current.galleryImages?.[index % Math.max(current.galleryImages?.length || 1, 1)];
                const reverse = index % 2 === 1;
                return (
                  <section
                    key={`${index}-${para.slice(0, 20)}`}
                    className={`grid items-center gap-8 ${image ? "lg:grid-cols-2" : "grid-cols-1"}`}
                  >
                    {image ? (
                      <div className={reverse ? "lg:order-2" : ""}>
                        <div className="overflow-hidden rounded-[28px] bg-white shadow-lg shadow-slate-200/70">
                          <img src={image} alt={`${current.title}-${index + 1}`} className="h-[340px] w-full object-cover" />
                        </div>
                      </div>
                    ) : null}
                    <div className={`${image && reverse ? "lg:order-1" : ""} rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm`}>
                      <p className="text-[18px] leading-9 text-slate-700">{para}</p>
                    </div>
                  </section>
                );
              })}
            </div>

            {relatedPosts.length > 0 ? (
              <section className="mt-20 border-t border-slate-200 pt-12">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Bài blog khác để học</h3>
                    <p className="mt-2 text-sm text-slate-500">Tiếp tục đọc thêm những bài viết liên quan.</p>
                  </div>
                  <Link to="/blog" className="text-sm font-bold text-primary hover:underline">Xem tất cả</Link>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {relatedPosts.map((item) => (
                    <article
                      key={item.id}
                      onClick={() => navigate(`/blog/${item.id}`, { state: item })}
                      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="h-52 overflow-hidden bg-slate-100">
                        {item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : null}
                      </div>
                      <div className="p-6">
                        <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">{item.category}</span>
                        <h4 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-primary">{item.title}</h4>
                        <p className="line-clamp-3 text-sm leading-6 text-slate-500">{item.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        </>
      )}
    </main>
  );
}

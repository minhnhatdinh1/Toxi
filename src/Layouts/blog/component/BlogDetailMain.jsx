import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function BlogDetailMain() {
  const location = useLocation();
  const [post, setPost] = useState(location.state || null);

  const { id } = useParams();


  const defaultPost = {
    title: "Bài viết không tồn tại",
    category: "",
    date: "",
    image: "",
    description: "",
    content: "",
  };

  const current = post || defaultPost;

  return (
    <main className="flex-1 lg:ml-64 bg-background-light dark:bg-background-dark min-h-screen">

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/home" className="hover:text-primary">Home</Link>

            <span className="material-symbols-outlined text-sm">chevron_right</span>

            <Link to="/blog" className="hover:text-primary">Blog</Link>

            <span className="material-symbols-outlined text-sm">chevron_right</span>

            <span className="text-slate-900 dark:text-white font-medium truncate">
              {current.title}
            </span>
          </nav>
        </div>
      </div>


      {/* Hero */}
      {current.image && (
        <div className="w-full h-[380px] overflow-hidden">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}


      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-12">

        {/* Category */}
        {current.category && (
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
            {current.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white mb-6">
          {current.title}
        </h1>

        {/* Author + Date */}
        <div className="flex items-center justify-between mb-10">

          <div className="flex items-center gap-3">
            <img
              src={current.authorImage}
              alt={current.author}
              className="w-11 h-11 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {current.author}
              </p>

              <p className="text-sm text-slate-500">
                {current.authorRole}
              </p>
            </div>
          </div>

          <div className="text-sm text-slate-500 flex items-center gap-4">

            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                calendar_month
              </span>
              {current.date}
            </span>

            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              {current.readTime}
            </span>

          </div>
        </div>


        {/* Description */}
        {current.description && (
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-primary pl-6 italic mb-10">
            {current.description}
          </p>
        )}


        {/* Blog Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">

          {current.content &&
            current.content.split("\n\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))}

        </div>


        {/* Share */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">

          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">
            Chia sẻ bài viết
          </h3>

          <div className="flex gap-3">

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Facebook
            </button>

            <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-600">
              Twitter
            </button>

            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
              Copy Link
            </button>

          </div>
        </div>


        {/* Related posts */}
        <section className="mt-16">

          <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
            Bài viết liên quan
          </h3>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-xl mb-4">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <p className="text-xs text-primary font-semibold uppercase mb-2">
                Tài liệu
              </p>

              <h4 className="font-bold text-lg group-hover:text-primary transition">
                Top 5 giáo trình tiếng Trung tốt nhất hiện nay
              </h4>
            </div>


            <div className="group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-xl mb-4">
                <img
                  src="https://images.unsplash.com/photo-1517842645767-c639042777db"
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <p className="text-xs text-primary font-semibold uppercase mb-2">
                Kỹ năng
              </p>

              <h4 className="font-bold text-lg group-hover:text-primary transition">
                Luyện nghe tiếng Trung qua Podcast
              </h4>
            </div>

          </div>

        </section>

      </article>

    </main>
  );
}
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { deleteAdminBlog, fetchAdminBlogs } from "./api/apiBlog";

const POSTS_PER_PAGE = 8;

const formatDate = (value) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "--";
};

export default function AdminBlog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        setPosts(await fetchAdminBlogs());
      } catch (err) {
        console.error(err);
        setError("Không tải được danh sách bài viết.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => activeTab === "ALL" || post.status === activeTab)
      .filter((post) => {
        const q = searchTerm.trim().toLowerCase();
        if (!q) return true;
        return [post.title, post.category, post.author].some((value) =>
          String(value || "").toLowerCase().includes(q)
        );
      });
  }, [posts, activeTab, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  const totalPublished = posts.filter((post) => post.status === "PUBLISHED").length;
  const totalDrafts = posts.filter((post) => post.status === "DRAFT").length;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;

    try {
      await deleteAdminBlog(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
      window.alert("Không xóa được bài viết.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <main className="flex flex-1 flex-col overflow-hidden bg-slate-50">
        <div className="flex h-16 items-center justify-between border-b border-slate-100 bg-white/90 px-8 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <span className="material-symbols-outlined">article</span>
              Quản lý Blog
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                search
              </span>
              <input
                type="text"
                placeholder="Tìm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <button
              onClick={() => navigate("/admin/blog/add")}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Thêm bài viết
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-8">
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <p className="text-sm font-medium text-slate-500">Tổng bài viết</p>
                <h3 className="mt-1 text-3xl font-bold">{posts.length}</h3>
              </div>
              <div className="flex size-12 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
                <span className="material-symbols-outlined text-2xl">article</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <p className="text-sm font-medium text-slate-500">Đã xuất bản</p>
                <h3 className="mt-1 text-3xl font-bold">{totalPublished}</h3>
              </div>
              <div className="flex size-12 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <span className="material-symbols-outlined text-2xl">publish</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <p className="text-sm font-medium text-slate-500">Bản nháp</p>
                <h3 className="mt-1 text-3xl font-bold">{totalDrafts}</h3>
              </div>
              <div className="flex size-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <span className="material-symbols-outlined text-2xl">draft</span>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div className="flex gap-2">
                {["ALL", "PUBLISHED", "DRAFT"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                      activeTab === tab
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tab === "ALL"
                      ? "Tất cả"
                      : tab === "PUBLISHED"
                      ? "Đã xuất bản"
                      : "Bản nháp"}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="p-10 text-center text-sm font-semibold text-slate-500">
                Đang tải bài viết...
              </div>
            ) : error ? (
              <div className="p-10 text-center text-sm font-semibold text-red-500">{error}</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tiêu đề</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Chuyên mục</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tác giả</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Trạng thái</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ngày đăng</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5">
                      {currentPosts.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-400">
                            Chưa có bài viết nào.
                          </td>
                        </tr>
                      ) : (
                        currentPosts.map((post) => (
                          <tr key={post.id} className="transition-colors hover:bg-slate-50">
                            <td className="px-6 py-4 text-sm font-semibold text-slate-900">{post.title}</td>
                            <td className="px-6 py-4">
                              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                                {post.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">{post.author}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`text-xs font-bold uppercase ${
                                  post.status === "PUBLISHED"
                                    ? "text-green-500"
                                    : "text-yellow-500"
                                }`}
                              >
                                {post.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">{formatDate(post.publishedAt)}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                                  className="text-sm font-semibold text-primary"
                                >
                                  Sửa
                                </button>
                                <button
                                  onClick={() => handleDelete(post.id)}
                                  className="text-sm text-red-500"
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 p-6">
                  <p className="text-xs text-slate-500">
                    Hiển thị{" "}
                    {filteredPosts.length === 0 ? 0 : (currentPage - 1) * POSTS_PER_PAGE + 1}
                    {" "}đến {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} của{" "}
                    {filteredPosts.length} bài viết
                  </p>

                  {filteredPosts.length > POSTS_PER_PAGE && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-xs disabled:opacity-40"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`flex size-8 items-center justify-center rounded-lg text-xs ${
                            currentPage === page
                              ? "bg-slate-900 text-white"
                              : "border border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-xs disabled:opacity-40"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

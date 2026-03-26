import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { uploadImage } from "./api/apiFile";
import {
  createAdminBlog,
  fetchAdminBlogById,
  updateAdminBlog,
} from "./api/apiBlog";

const INPUT_CLS =
  "w-full rounded-lg border border-slate-200 bg-white p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

export default function AdminAddNewBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    status: "DRAFT",
    thumbnail: "",
    galleryImages: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    async function loadBlog() {
      try {
        setLoading(true);
        setError("");
        const blog = await fetchAdminBlogById(id);
        setForm({
          title: blog.title || "",
          category: blog.category || "",
          summary: blog.description || "",
          content: blog.content || "",
          status: blog.status || "DRAFT",
          thumbnail: blog.raw?.thumbnail || blog.image || "",
          galleryImages: blog.raw?.galleryImages || blog.galleryImages || [],
        });
      } catch (err) {
        console.error(err);
        setError("Không tải được bài viết để chỉnh sửa.");
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [id, isEdit]);

  const wordCount = useMemo(
    () => form.content.trim().split(/\s+/).filter(Boolean).length,
    [form.content]
  );

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const uploaded = await uploadImage(file);
      setField("thumbnail", uploaded);
    } catch (err) {
      console.error(err);
      setError("Không tải được ảnh thumbnail.");
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      const uploaded = await Promise.all(files.map((file) => uploadImage(file)));
      setForm((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...uploaded],
      }));
    } catch (err) {
      console.error(err);
      setError("Không tải được ảnh trong nội dung.");
    }
  };

  const handleSubmit = async (status) => {
    try {
      setSubmitting(true);
      setError("");

      const payload = {
        title: form.title,
        categoryName: form.category,
        summary: form.summary,
        content: form.content,
        thumbnail: form.thumbnail,
        galleryImages: form.galleryImages,
        status,
      };

      if (isEdit) {
        await updateAdminBlog(id, payload);
      } else {
        await createAdminBlog(payload);
      }

      navigate("/AdminBlog");
    } catch (err) {
      console.error(err);
      setError("Không lưu được bài viết. Kiểm tra lại backend blog.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <main className="min-h-screen flex-1 overflow-y-auto bg-slate-50 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Admin / Blog / {isEdit ? "Chỉnh sửa bài viết" : "Thêm bài viết"}
            </p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              {isEdit ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/AdminBlog")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Hủy
            </button>
            <button
              onClick={() => handleSubmit("DRAFT")}
              disabled={submitting || loading}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
            >
              Lưu nháp
            </button>
            <button
              onClick={() => handleSubmit("PUBLISHED")}
              disabled={submitting || loading}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {isEdit ? "Cập nhật" : "Đăng bài"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500 shadow-sm">
            Đang tải bài viết...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <label className="mb-2 block text-sm font-bold text-slate-700">Tiêu đề bài viết</label>
                <input
                  className={INPUT_CLS}
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="Nhập tiêu đề bài viết..."
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <label className="mb-2 block text-sm font-bold text-slate-700">Mô tả ngắn</label>
                <textarea
                  className={`${INPUT_CLS} min-h-28 resize-none`}
                  value={form.summary}
                  onChange={(e) => setField("summary", e.target.value)}
                  placeholder="Mô tả ngắn để hiển thị ngoài danh sách blog..."
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-bold text-slate-700">Nội dung bài viết</label>
                  <span className="text-xs font-semibold text-slate-400">Số từ: {wordCount}</span>
                </div>
                <textarea
                  className={`${INPUT_CLS} min-h-[420px] resize-y`}
                  value={form.content}
                  onChange={(e) => setField("content", e.target.value)}
                  placeholder="Nhập nội dung bài viết..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-base font-bold text-slate-800">Thông tin bài viết</h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">Chuyên mục</label>
                    <input
                      className={INPUT_CLS}
                      value={form.category}
                      onChange={(e) => setField("category", e.target.value)}
                      placeholder="VD: Văn hóa, HSK, Kinh nghiệm..."
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">Trạng thái</label>
                    <select
                      className={INPUT_CLS}
                      value={form.status}
                      onChange={(e) => setField("status", e.target.value)}
                    >
                      <option value="DRAFT">Bản nháp</option>
                      <option value="PUBLISHED">Xuất bản</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-base font-bold text-slate-800">Thumbnail</h3>
                <label className="flex min-h-48 cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  {form.thumbnail ? (
                    <img
                      src={form.thumbnail.startsWith("http") ? form.thumbnail : `http://localhost:8080/api/files/${form.thumbnail}`}
                      alt="thumbnail"
                      className="max-h-52 rounded-lg object-cover"
                    />
                  ) : (
                    <span>Chọn ảnh thumbnail</span>
                  )}
                </label>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-800">Ảnh trong bài viết</h3>
                  <label className="cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
                    Thêm ảnh
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {form.galleryImages.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-400">
                    Chưa có ảnh nội dung.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {form.galleryImages.map((img, index) => (
                      <div
                        key={`${img}-${index}`}
                        className="relative overflow-hidden rounded-lg border border-slate-200"
                      >
                        <img
                          src={img.startsWith("http") ? img : `http://localhost:8080/api/files/${img}`}
                          alt={`gallery-${index}`}
                          className="h-28 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              galleryImages: prev.galleryImages.filter((_, i) => i !== index),
                            }))
                          }
                          className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[11px] font-bold text-white"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                  {error}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

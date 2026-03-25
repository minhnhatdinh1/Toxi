import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import { uploadImage, deleteImagesByBook } from "./api/apiFile";
import { getAllCategories } from "./api/apiCategory";
import {
  getProductById,
  updateProduct,
} from "../../Layouts/admin/api/apiProduct";


export default function AdminEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get("page") || 1;

  const formatCurrency = (value) => {
    if (!value) return "";
    return Number(value).toLocaleString("vi-VN");
  };
  const parseCurrency = (value) => {
    return Number(value.replace(/\./g, ""));
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setFormData({
        bookId: data.bookId,
        title: data.title,
        categories: data.categories?.map((c) => c.categoryId) || [],
        originalPrice: Number(data.price),
        salePrice: Number(data.discountPrice),
        stock: data.stock,
        description: data.description,
      });

      // Load tất cả ảnh hiện có thành array
      if (data.imageUrls && data.imageUrls.length > 0) {
        const existing = data.imageUrls.map((url, idx) => ({
          id: `existing-${idx}`,
          name: `Image ${idx + 1}`,
          size: "",
          preview: url,
          isExisting: true,
        }));
        setImages(existing);
      } else {
        setImages([]);
      }
    } catch (err) {
      console.error("Error loading product:", err);
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [newFileMap, setNewFileMap] = useState({});

  const [formData, setFormData] = useState({
    bookId: "",
    title: "",
    categories: [],
    originalPrice: 0,
    salePrice: 0,
    stock: 0,
    description: "",
  });


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;


    const tempId = `new-${Date.now()}`;
    const previewUrl = URL.createObjectURL(file);

    setImages((prev) => [
      ...prev,
      {
        id: tempId,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        preview: previewUrl,
        isExisting: false,
      },
    ]);

    setNewFileMap((prev) => ({ ...prev, [tempId]: file }));
    e.target.value = "";
  };

  const handleRemoveImage = (imgId) => {
    setImages((prev) => {
      const removed = prev.find((img) => img.id === imgId);
      if (removed && !removed.isExisting) {
        URL.revokeObjectURL(removed.preview);
      }
      return prev.filter((img) => img.id !== imgId);
    });
    setNewFileMap((prev) => {
      const next = { ...prev };
      delete next[imgId];
      return next;
    });
  };

  const handleDeleteAll = async (bookId) => {
    try {
      if (!window.confirm("Xóa tất cả ảnh của sản phẩm này?")) return;
      await deleteImagesByBook(bookId);
      setImages([]);
      setNewFileMap({});
      alert("Đã xóa tất cả ảnh");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.bookId) return "Mã sách không được bỏ trống";
    if (!formData.title.trim()) return "Tiêu đề sách không được bỏ trống";
    if (!formData.categories.length) return "Danh mục không được bỏ trống";
    if (!formData.originalPrice || formData.originalPrice <= 0)
      return "Giá gốc phải lớn hơn 0";
    if (!formData.salePrice || formData.salePrice <= 0)
      return "Giá khuyến mãi phải lớn hơn 0";
    if (formData.salePrice >= formData.originalPrice)
      return "Giá khuyến mãi phải nhỏ hơn giá gốc";
    if (formData.stock < 0) return "Số lượng tồn kho không hợp lệ";
    return "";
  };

  const handleSave = async () => {
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const finalUrls = await Promise.all(
        images.map(async (img) => {
          if (img.isExisting) return img.preview; // URL gốc từ server
          const file = newFileMap[img.id];
          if (file) return await uploadImage(file);
          return null;
        }),
      );

      await updateProduct(id, {
        title: formData.title,
        description: formData.description,
        price: formData.originalPrice,
        discountPrice: formData.salePrice,
        stock: formData.stock,
        categoryIds: formData.categories,
        imageUrls: finalUrls.filter(Boolean),
      });

      alert("Cập nhật thành công!");
      navigate(`/adminProduct?page=${currentPage}`, {
        state: { scrollToTable: true },
      });
    } catch (err) {
      console.error("Update error:", err);
      setError("Lỗi cập nhật sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const confirm = window.confirm(
      "Bạn chắc chắn muốn hủy? Các thay đổi sẽ không được lưu.",
    );
    if (confirm) {
      navigate(`/adminStore?page=${currentPage}`, {
        state: { scrollToTable: true },
      });
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col bg-background-light py-8 overflow-y-auto">
          {/* Breadcrumbs & Header */}
          <div className="px-6 py-6 lg:px-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  <a
                    className="hover:text-primary transition-colors"
                    href="/adminStore"
                  >
                    Store
                  </a>
                  <span className="text-[10px]">/</span>
                  <span className="text-primary">Edit</span>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Update Product
                </h1>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="px-6 pb-12 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 lg:p-8 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">
                        edit_note
                      </span>
                      Thông tin sản phẩm
                    </h3>
                  </div>

                  <div className="p-6 lg:p-8 space-y-6">
                    {/* Row 1: ID & Title */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Mã sách
                        </label>
                        <input
                          type="text"
                          value={formData.bookId}
                          readOnly
                          className="w-full rounded-xl border border-cyan-200/30 bg-gray-100 dark:bg-slate-800 dark:text-white transition-all p-3 cursor-not-allowed"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Tiêu đề sách
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          placeholder="Nhập tên sách..."
                          className="w-full rounded-xl border border-cyan-200/30 bg-gradient-to-br dark:bg-slate-900 focus:ring-primary dark:text-white transition-all p-3"
                        />
                      </div>
                    </div>

                    {/* Row 2: Category & Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Danh mục
                        </label>
                        <select
                          multiple
                          value={formData.categories}
                          onChange={(e) => {
                            const values = Array.from(
                              e.target.selectedOptions,
                              (option) => Number(option.value),
                            );
                            handleInputChange("categories", values);
                          }}
                          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all min-h-[120px] dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                        >
                          {categories.map((cat) => (
                            <option
                              key={cat.id}
                              value={cat.id}
                              className="p-2 rounded hover:bg-blue-50"
                            >
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        <span className="text-xs text-slate-400">
                          Giữ Ctrl (Windows) hoặc Command (Mac) để chọn nhiều
                          danh mục
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Số lượng tồn kho
                        </label>
                        <input
                          type="number"
                          placeholder="0"
                          value={formData.stock}
                          onChange={(e) =>
                            handleInputChange("stock", Number(e.target.value))
                          }
                          className="w-full rounded-xl border border-cyan-200/30 bg-gradient-to-br dark:bg-slate-900 focus:ring-primary dark:text-white transition-all p-3"
                        />
                      </div>
                    </div>

                    {/* Row 3: Prices */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Giá gốc (VNĐ)
                        </label>
                        <input
                          type="text"
                          value={formatCurrency(formData.originalPrice)}
                          onChange={(e) =>
                            handleInputChange(
                              "originalPrice",
                              parseCurrency(e.target.value),
                            )
                          }
                          placeholder="Nhập giá gốc..."
                          className="w-full rounded-xl border border-cyan-200/30 bg-gradient-to-br dark:bg-slate-900 focus:ring-primary dark:text-white transition-all p-3"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Giá khuyến mãi (VNĐ)
                        </label>
                        <input
                          type="text"
                          value={formatCurrency(formData.salePrice)}
                          onChange={(e) =>
                            handleInputChange(
                              "salePrice",
                              parseCurrency(e.target.value),
                            )
                          }
                          placeholder="Nhập giá khuyến mại..."
                          className="w-full rounded-xl border border-cyan-200/30 bg-gradient-to-br dark:bg-slate-900 focus:ring-primary dark:text-white transition-all p-3"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Mô tả chi tiết
                      </label>
                      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="bg-slate-50 p-2 flex gap-1 border-b border-slate-200">
                          {[
                            "format_bold",
                            "format_italic",
                            "format_list_bulleted",
                            "link",
                            "image",
                          ].map((icon, i) => (
                            <button
                              key={i}
                              type="button"
                              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
                            >
                              <span className="material-symbols-outlined text-sm">
                                {icon}
                              </span>
                            </button>
                          ))}
                        </div>
                        <textarea
                          rows={10}
                          placeholder="Nhập mô tả chi tiết..."
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          className="w-full border-none bg-transparent focus:ring-0 text-slate-700 p-4 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                {/* ── Thumbnail Card ── */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Ảnh bìa sản phẩm
                    </h3>
                    {/* Badge số lượng ảnh */}
                    {images.length > 0 && (
                      <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {images.length} ảnh
                      </span>
                    )}
                  </div>

                  {/* Upload Area — luôn hiển thị để thêm ảnh mới */}
                  <label className="aspect-square w-full rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 group cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl text-primary">
                        add_photo_alternate
                      </span>
                    </div>
                    <p className="text-sm text-slate-900 font-bold text-center px-4">
                      + Thêm ảnh
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PNG, JPG tối đa 5MB
                    </p>
                  </label>

                  {/* Danh sách ảnh hiện có */}
                  {images.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {images.map((img, index) => (
                        <div
                          key={img.id}
                          className="p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-3"
                        >
                          {/* Thumbnail nhỏ */}
                          <div
                            className="size-10 rounded bg-slate-200 bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url(${img.preview})` }}
                          />

                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-700 truncate">
                              {img.name}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {img.isExisting
                                ? "Ảnh hiện tại"
                                : `Mới • ${img.size}`}
                            </p>
                          </div>

                          {/* Index badge */}
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">
                            #{index + 1}
                          </span>

                          {/* Nút xóa từng ảnh */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(img.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                            title="Xóa ảnh này"
                          >
                            <span className="material-symbols-outlined text-sm">
                              delete
                            </span>
                          </button>
                        </div>
                      ))}

                      {/* Nút xóa tất cả ảnh trên server */}
                      <button
                        type="button"
                        onClick={() => handleDeleteAll(formData.bookId)}
                        className="w-full mt-2 py-2 text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl border border-red-100 transition-all"
                      >
                        Xóa tất cả ảnh trên server
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions Card */}
                <div className="bg-background-dark rounded-2xl p-6 lg:p-8 text-white">
                  <h4 className="font-bold mb-4">Actions</h4>

                  {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-row gap-3 justify-end items-center">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={loading}
                      className="px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-60 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {loading ? "sync" : "check_circle"}
                      </span>
                      {loading ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-2.5 bg-slate-600 hover:bg-slate-700 rounded-xl font-bold transition-all text-white"
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

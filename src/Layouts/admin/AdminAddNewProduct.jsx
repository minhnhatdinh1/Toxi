
import AdminSidebar from "./AdminSidebar";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "./api/apiProduct";

export default function AdminAddNewProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    bookId: "",
    title: "",
    category: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const [thumbnail, setThumbnail] = useState("");

  const validateForm = () => {
    if (!formData.bookId.trim()) return "Mã sách không được bỏ trống";
    if (!formData.title.trim()) return "Tiêu đề sách không được bỏ trống";
    if (!formData.category) return "Danh mục không được bỏ trống";
    if (!formData.originalPrice || formData.originalPrice <= 0) return "Giá gốc phải lớn hơn 0";
    if (!formData.discountPrice || formData.discountPrice <= 0) return "Giá khuyến mãi phải lớn hơn 0";
    if (parseFloat(formData.discountPrice) >= parseFloat(formData.originalPrice)) return "Giá khuyến mãi phải nhỏ hơn giá gốc";
    if (!formData.stock || formData.stock < 0) return "Số lượng tồn kho không hợp lệ";
    if (!thumbnail) return "Ảnh sản phẩm không được bỏ trống";
    return '';
  };

  const handleCancel = () => {
    const confirm = window.confirm("Bạn chắc chắn muốn hủy? Dữ liệu sẽ không được lưu.");
    if (confirm) {
      navigate('/adminStore');
    }
  };

  const handleSave = async () => {
    setError('');
    const validationError = validateForm();
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const productData = {
        ...formData,
        originalPrice: parseFloat(formData.originalPrice),
        discountPrice: parseFloat(formData.discountPrice),
        stock: parseInt(formData.stock),
        image: thumbnail
      };

      // Khi API backend ready, bỏ comment dòng này
      // const response = await createProduct(productData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alert('Thêm sản phẩm thành công!');
      navigate('/adminStore');
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi thêm sản phẩm');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e) => {
    setThumbnail(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setThumbnail(previewUrl);
    }
  };
    return (
        <>
         <div className="flex h-screen overflow-hidden ">
           <AdminSidebar />
           {/* Main Content Area */}
<main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark/50 overflow-y-auto">
      
      {/* Breadcrumbs & Header */}
      <div className="px-6 py-6 lg:px-10">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-500 mb-2">
          <Link
            to="/adminStore"
            className="hover:text-primary transition-colors"
          >
            Store
          </Link>
          <span>/</span>
          <span className="text-primary">Add New Product</span>
        </div>

        {/* Title + Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Add New Product
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Populate the form below to create a new store item.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl border border-primary/20 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-sm">loading</span>
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Lưu sản phẩm</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
      <div className="px-6 pb-12 lg:px-10">
      {error && (
        <div className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
          <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
          <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
        </div>
      )}
      <div className="bg-white dark:bg-[#1a0c0e] rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-primary/10 bg-primary/5">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              info
            </span>
            Course Details
          </h3>
        </div>

        {/* Form Body */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Column */}
            <div className="space-y-6">

              {/* Book ID */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Mã sách
                </label>
                <input
                  type="text"
                  name="bookId"
                  value={formData.bookId}
                  onChange={handleChange}
                  placeholder="e.g. BOOK-2024-001"
                  className="w-full rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all p-3"
                />
              </div>

              {/* Title */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Tiêu đề sách
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nhập tên sách..."
                  className="w-full rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all p-3"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Danh mục
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all p-3"
                >
                  <option value="">Chọn danh mục</option>
                  <option value="textbook">Sách giáo khoa</option>
                  <option value="workbook">Sách bài tập</option>
                  <option value="flashcards">Flashcards</option>
                </select>
              </div>

              {/* Price + Stock */}
              <div className="grid grid-cols-3 gap-4">

                {/* Original Price */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Giá gốc (VNĐ)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    placeholder="99.99"
                    className="w-full rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all p-3"
                  />
                </div>

                {/* Discount Price */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Giá khuyến mãi
                  </label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    placeholder="79.99"
                    className="w-full rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all p-3"
                  />
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Số lượng tồn kho
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all p-3"
                  />
                </div>
     
              </div>

            </div>
           <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Ảnh sản phẩm (Thumbnail URL)
        </label>

        <div className="flex flex-col gap-3">
          
          {/* URL Input */}
          <input
            type="url"
            value={thumbnail}
            onChange={handleUrlChange}
            placeholder="https://example.com/thumbnail.jpg"
            className="w-full rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all p-3"
          />

          {/* Upload Area */}
          <label className="aspect-video w-full rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center bg-slate-50 dark:bg-primary/5 group cursor-pointer hover:border-primary hover:bg-primary/10 transition-all overflow-hidden">
            
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl text-primary/40 group-hover:text-primary transition-colors">
                  image
                </span>
                <p className="text-sm text-slate-400 mt-2 font-medium">
                  Click to upload or drag image
                </p>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

        </div>
      </div>
    </div>
    

          </div>
          
        </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      
      {/* Card 1 */}
      <div className="p-6 bg-brand-blue rounded-2xl border border-white/10 text-white relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-8xl">
            lightbulb
          </span>
        </div>

        <h4 className="font-bold mb-2">Pro Tip</h4>
        <p className="text-sm text-white/80 leading-relaxed">
          Courses with high-quality thumbnails and detailed descriptions see
          40% more engagement.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-6 bg-accent rounded-2xl border border-white/10 text-slate-900 relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-20 -rotate-12 transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-8xl">
            verified
          </span>
        </div>

        <h4 className="font-bold mb-2">HSK Alignment</h4>
        <p className="text-sm text-slate-800 leading-relaxed">
          Ensure all vocabulary matches the updated 2024 HSK standard for
          better certification results.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 text-slate-900 dark:text-white relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-10 rotate-45 transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-8xl">
            schedule
          </span>
        </div>

        <h4 className="font-bold mb-2">Draft Status</h4>
        <p className="text-sm text-slate-500 dark:text-primary/60 leading-relaxed">
          Your progress is automatically saved to your drafts every 2 minutes.
        </p>
      </div>

    </div>
      </div>
    </div>
    </main>
    </div>
        </>
    )
};
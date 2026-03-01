import react from "react";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "./api/apiProduct";

export default function AdminEditProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    bookId: "HSK-6-2024-001",
    title: "HSK 6 Masterclass",
    category: "textbook",
    originalPrice: 550000,
    salePrice: 450000,
    stock: 150,
    description: "This comprehensive HSK 6 masterclass includes all necessary materials for passing the highest level Chinese proficiency test..."
  });

  const [image, setImage] = useState({
    name: "current_cover.jpg",
    size: "1.2 MB",
    preview:
      "https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=200",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', Number(e.target.value))}
                placeholder="Nhập số lượng..."
                className="w-full rounded-xl border border-cyan-200/30 bg-gradient-to-br dark:bg-slate-900 focus:ring-primary dark:text-white transition-all p-3"
              />
    const previewUrl = URL.createObjectURL(file);

    setImage({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      preview: previewUrl,
    });
  };

  const handleDelete = () => {
    setImage(null);
  };
  
    const validateForm = () => {
      if (!formData.bookId.trim()) return "Mã sách không được bỏ trống";
      if (!formData.title.trim()) return "Tiêu đề sách không được bỏ trống";
      if (!formData.category) return "Danh mục không được bỏ trống";
      if (!formData.originalPrice || formData.originalPrice <= 0) return "Giá gốc phải lớn hơn 0";
      if (!formData.salePrice || formData.salePrice <= 0) return "Giá khuyến mãi phải lớn hơn 0";
      if (parseFloat(formData.salePrice) >= parseFloat(formData.originalPrice)) return "Giá khuyến mãi phải nhỏ hơn giá gốc";
      if (!formData.stock || formData.stock < 0) return "Số lượng tồn kho không hợp lệ";
      return '';
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
        await new Promise(resolve => setTimeout(resolve, 500));
        alert('Cập nhật sản phẩm thành công!');
        navigate('/adminStore');
      } catch (err) {
        setError(err.response?.data?.message || 'Lỗi khi cập nhật sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    const handleCancel = () => {
      const confirm = window.confirm("Bạn chắc chắn muốn hủy? Các thay đổi sẽ không được lưu.");
      if (confirm) {
        navigate('/adminStore');
      }
    };
const onSave = () => {
  console.log("Save clicked");
};

const onCancel = () => {
  console.log("Cancel clicked");
};
    return(
        <>
          <div className="flex h-screen overflow-hidden ">
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
                Sản phẩm
              </a>
              <span className="text-[10px]">/</span>
              <span className="text-primary">Chỉnh sửa</span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Cập nhật sách
            </h1>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold bg-white hover:bg-slate-50 transition-all">
              Xem bản xem trước
            </button>
          </div>

        </div>
      </div>
         {/* Form Area */}
      <div className="px-6 pb-12 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              
              {/* Form Header */}
              <div className="p-6 lg:p-8 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    edit_note
                  </span>
                  Thông tin sản phẩm
                </h3>
              </div>

              {/* Form Body */}
              <div className="p-6 lg:p-8 space-y-6">
                
                {/* Row 1: ID & Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Mã sách */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Mã sách
                    </label>
                      <input
                        type="text"
                        value={formData.bookId}
                        onChange={(e) => handleInputChange('bookId', e.target.value)}
                        placeholder="e.g. BOOK-2024-001"
                        className="w-full rounded-xl border border-cyan-200/30 bg-gradient-to-br dark:bg-slate-900 focus:ring-primary dark:text-white transition-all p-3"
                      />
                  </div>

                  {/* Tiêu đề sách */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Tiêu đề sách
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Nhập tên sách..."
                      className="w-full rounded-xl border border-cyan-200/30 bg-gradient-to-br dark:bg-slate-900 focus:ring-primary dark:text-white transition-all p-3"
                    />
                  </div>

                </div>
     {/* Row 2: Category & Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Danh mục */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Danh mục
          </label>
          <select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} className="w-full rounded-xl border border-cyan-200/30 bg-gradient-to-br dark:bg-slate-900 focus:ring-primary dark:text-white transition-all p-3">
            <option value="textbook">Sách giáo khoa</option>
            <option value="workbook">Sách bài tập</option>
            <option value="flashcards">Flashcards</option>
          </select>
        </div>

        {/* Số lượng tồn kho */}
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
        
        {/* Giá gốc */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Giá gốc (VNĐ)
          </label>
          <div className="relative">
              <input
                type="number"
                placeholder="Nhập giá gốc..."
                value={formData.originalPrice}
                onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value))}
                className="w-full rounded-xl border border-cyan-200/30 bg-gradient-to-br dark:bg-slate-900 focus:ring-primary dark:text-white transition-all p-3"
              />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
              ₫
            </span>
          </div>
        </div>

        {/* Giá khuyến mãi */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Giá khuyến mãi (VNĐ)
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="Nhập giá khuyến mại..."
              value={formData.salePrice}
              onChange={(e) => handleInputChange('salePrice', parseFloat(e.target.value))}
              className="w-full rounded-xl border border-cyan-200/30 bg-gradient-to-br dark:bg-slate-900 focus:ring-primary dark:text-white transition-all p-3"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">
              ₫
            </span>
          </div>
        </div>

      </div>
      {/* Description */}
      <div className="flex flex-col gap-2">
        
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Mô tả chi tiết
        </label>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="bg-slate-50 p-2 flex gap-1 border-b border-slate-200">
            
            <button
              type="button"
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
            >
              <span className="material-symbols-outlined text-sm">
                format_bold
              </span>
            </button>

            <button
              type="button"
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
            >
              <span className="material-symbols-outlined text-sm">
                format_italic
              </span>
            </button>

            <button
              type="button"
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
            >
              <span className="material-symbols-outlined text-sm">
                format_list_bulleted
              </span>
            </button>

            <div className="w-px bg-slate-200 mx-1"></div>

            <button
              type="button"
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
            >
              <span className="material-symbols-outlined text-sm">
                link
              </span>
            </button>

            <button
              type="button"
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
            >
              <span className="material-symbols-outlined text-sm">
                image
              </span>
            </button>

          </div>

          {/* Textarea */}
          <textarea
            rows={10}
            placeholder="Nhập mô tả chi tiết..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full border-none bg-transparent focus:ring-0 text-slate-700 p-4 resize-none"
          />
        </div>
      </div>
              </div>
            </div>
          </div>
   <div className="space-y-8">
      {/* Thumbnail Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
        
        <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
          Ảnh bìa sản phẩm
        </h3>

        {/* Upload Area */}
        <label className="aspect-square w-full rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 group cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
          
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleImageUpload}
          />

          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl text-primary">
              upload_file
            </span>
          </div>

          <p className="text-sm text-slate-900 font-bold text-center px-4">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-slate-400 mt-2">
            PNG, JPG up to 5MB
          </p>
        </label>

        {/* Current Image Preview */}
        {image && (
          <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-3">
            
            <div
              className="size-10 rounded bg-slate-200 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.preview})` }}
            />

            <div className="flex-1">
              <p className="text-xs font-bold text-slate-700">
                {image.name}
              </p>
              <p className="text-[10px] text-slate-400">
                {image.size}
              </p>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                delete
              </span>
            </button>

          </div>
        )}
      </div>
<div className="bg-background-dark rounded-2xl p-6 lg:p-8 text-white">
       {/* 👉 THÊM Ở ĐÂY */}
      <h4 className="font-bold mb-4">Actions</h4>

      <div className="flex flex-row gap-3 justify-end items-center">
        
        {/* Save Button */}
        <button
          type="button"
          onClick={onSave}
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">
            check_circle
          </span>
          Lưu thay đổi
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 bg-slate-600 hover:bg-slate-700 rounded-xl font-bold transition-all text-white"
        >
          Hủy bỏ
        </button>

      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-xs text-slate-400">
          Last updated: Today at 2:45 PM
        </p>
      </div>
    </div>
    </div>
        </div>
      </div>
    </main>
                     </div>
        </>
    )
};
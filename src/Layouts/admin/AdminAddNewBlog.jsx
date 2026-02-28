import react from "react";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminAddNewBlog(){
     const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const handleContentChange = (e) => {
    setContent(e.target.innerText);
  };
   const [status, setStatus] = useState("DRAFT"); 
  // DRAFT | PUBLISHED

  const handleSaveDraft = () => {
    setStatus("DRAFT");
    console.log("Saved as draft");
  };

  const handlePublish = () => {
    setStatus("PUBLISHED");
    console.log("Post published");
  };
 const [categories, setCategories] = useState([
    { id: 1, name: "Ngữ pháp cơ bản", checked: false },
    { id: 2, name: "Từ vựng HSK", checked: false },
    { id: 3, name: "Văn hóa Trung Hoa", checked: false },
    { id: 4, name: "Kinh nghiệm học tập", checked: false },
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  // Toggle checkbox
  const handleToggleCategory = (id) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  // Add new category
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const newItem = {
      id: Date.now(),
      name: newCategory,
      checked: true,
    };

    setCategories([...categories, newItem]);
    setNewCategory("");
  };

  // Upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ảnh vượt quá 2MB!");
      return;
    }

    setThumbnail(URL.createObjectURL(file));
  };
    return(
        <>
         <div className="flex h-screen overflow-hidden ">
                    <AdminSidebar />
 <main className="flex-1  bg-slate-50 dark:bg-background-dark min-h-screen p-8 overflow-y-auto">
      
      {/* Header & Breadcrumbs */}
      <div className="mb-8">
        <nav className="flex gap-2 text-sm text-slate-500 mb-2">
          <a className="hover:text-primary" href="#">
            Admin
          </a>
          <span>/</span>
          <a className="hover:text-primary" href="#">
            Blog
          </a>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200 font-medium">
            Thêm bài viết
          </span>
        </nav>

        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black text-toxi-dark dark:text-white tracking-tight flex items-center gap-3">
            Thêm bài viết mới
            <span className="material-symbols-outlined text-toxi-gold text-2xl">
              cloud_queue
            </span>
          </h2>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Title Input */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Tiêu đề bài viết
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề hấp dẫn cho bài viết của bạn..."
              className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg p-3 text-lg focus:ring-toxi-gold focus:border-toxi-gold transition-all"
            />
          </div>

          {/* Editor */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-[600px]">

            {/* Toolbar */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-2">
              <button title="In đậm"><span className="material-symbols-outlined">format_bold</span></button>
              <button title="In nghiêng"><span className="material-symbols-outlined">format_italic</span></button>
              <button title="Gạch chân"><span className="material-symbols-outlined">format_underlined</span></button>

              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1"></div>

              <button title="Danh sách số"><span className="material-symbols-outlined">format_list_numbered</span></button>
              <button title="Danh sách dấu chấm"><span className="material-symbols-outlined">format_list_bulleted</span></button>

              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1"></div>

              <button title="Chèn ảnh"><span className="material-symbols-outlined">image</span></button>
              <button title="Chèn liên kết"><span className="material-symbols-outlined">link</span></button>
              <button title="Trích dẫn"><span className="material-symbols-outlined">format_quote</span></button>

              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1"></div>

              <button title="Xóa định dạng"><span className="material-symbols-outlined">format_clear</span></button>
            </div>

            {/* Editable Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div
                contentEditable
                suppressContentEditableWarning={true}
                onInput={handleContentChange}
                className="prose dark:prose-invert max-w-none focus:outline-none min-h-full placeholder:text-slate-400"
              >
                {content.length === 0 && (
                  <p className="text-slate-400 italic">
                    Bắt đầu viết nội dung bài viết học tiếng Trung của bạn...
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex justify-between">
              <span>Số từ: {wordCount}</span>
              <span>Lưu tự động: {new Date().toLocaleTimeString()}</span>
            </div>

          </div>

        </div>
         <div className="space-y-6">

      {/* Publishing Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">

        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            send
          </span>
          Trạng thái xuất bản
        </h3>

        <div className="space-y-4">

          {/* Current Status */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">
              Trạng thái hiện tại
            </label>

            <div className="flex items-center gap-2 mt-1">
              <span
                className={`h-2 w-2 rounded-full ${
                  status === "PUBLISHED"
                    ? "bg-green-500"
                    : "bg-slate-400"
                }`}
              ></span>

              <span className="text-sm font-medium">
                {status === "PUBLISHED"
                  ? "Đã xuất bản"
                  : "Bản nháp"}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">

            <button
              onClick={handleSaveDraft}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              <span className="material-symbols-outlined text-lg">
                save
              </span>
              Lưu bản nháp
            </button>

            <button
              onClick={handlePublish}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-lg hover:bg-slate-800 transition-all"
            >
              <span className="material-symbols-outlined text-lg">
                publish
              </span>
              Đăng bài viết
            </button>

          </div>

        </div>
      </div>
       <div className="space-y-6">

      {/* Categories Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">

        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            category
          </span>
          Chuyên mục
        </h3>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={cat.checked}
                onChange={() => handleToggleCategory(cat.id)}
                className="rounded text-yellow-500 focus:ring-yellow-500 bg-slate-50 border-slate-300"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 transition-colors">
                {cat.name}
              </span>
            </label>
          ))}
        </div>

        {/* Add new category */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Chuyên mục mới..."
            className="flex-1 text-xs border border-slate-200 rounded px-2 py-1"
          />
          <button
            onClick={handleAddCategory}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">
              add
            </span>
            Thêm
          </button>
        </div>
      </div>

      {/* Featured Image Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">

        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            image
          </span>
          Ảnh đại diện
        </h3>

        <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />

          <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg flex flex-col items-center justify-center mb-2 overflow-hidden">

            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Thumbnail preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
                  add_photo_alternate
                </span>
                <p className="text-xs text-slate-500 font-medium">
                  Nhấn để tải lên ảnh thumbnail
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Hỗ trợ JPG, PNG, WEBP (Tối đa 2MB)
                </p>
              </>
            )}

          </div>
        </label>
      </div>

    </div>
    </div>
      </div>
    </main>
                    </div>
        </>
    )
}

import AdminSidebar from "./AdminSidebar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../common/ToastContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { useApi } from "../service/useApi";
import { createExam } from "./api/apiExam";

export default function AdminAddNewExam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  title: "",
  course: "",
  type: "",
  search: "",
  description: "",
  file: null,
  active: true
});

const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;

  setFormData({
    ...formData,
    [name]:
      type === "checkbox"
        ? checked
        : type === "file"
        ? files[0]
        : value
  });
};

  const handleSubmit = () => {
    console.log("Dữ liệu tài liệu:", formData);
    const newExam = {
    id: "#PBT-" + Math.floor(Math.random() * 1000),
    title: formData.title,
    file: formData.file ? formData.file.name : "",
    course: formData.course,
    deadline: "30/10/2023",
    status: formData.active ? "Published" : "Draft"
  };

  const oldData = JSON.parse(localStorage.getItem("exams")) || [];

  localStorage.setItem("exams", JSON.stringify([...oldData, newExam]));

  navigate("/adminExam");
  };
  
  
    return (
        <>
         <div class="flex h-screen overflow-hidden">
                    <AdminSidebar />
 <main className="flex-1 min-h-screen bg-background-light dark:bg-background-dark chinese-pattern overflow-y-auto ">

      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 shadow-sm">

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Quizzes</span>
          <span className="material-symbols-outlined text-slate-400 text-xs">
            chevron_right
          </span>
          <span className="text-toxi-blue font-semibold text-sm">
            Add New Document
          </span>
        </div>

        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              search
            </span>

            <input
              name="search"
              value={formData.search}
              onChange={handleChange}
              className="pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/50"
              placeholder="Tìm kiếm hệ thống..."
            />
          </div>

          <button className="size-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-xl">
              notifications
            </span>
          </button>

        </div>
      </header>

      <div className="p-8  mx-auto">

        {/* Title */}
        <div className="mb-8 flex items-end justify-between">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-toxi-gold">
                description
              </span>
              <h2 className="text-3xl font-bold text-toxi-blue dark:text-white">
                Thêm mới tài liệu
              </h2>
            </div>

            <p className="text-slate-500 dark:text-slate-400">
              Tạo bộ đề thi đánh giá năng lực HSK/HSKK cho học viên
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Hủy bỏ
            </button>

            <button
              onClick={handleSubmit}
             className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              Lưu tài liệu
            </button>
          </div>

        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">

          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              article
            </span>
            <h3 className="font-bold text-toxi-blue dark:text-white">
              Thông tin cơ bản
            </h3>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Tiêu đề tài liệu
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="Ví dụ: Giáo trình HSK 4 - Tập 1"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-toxi-gold focus:ring-2 focus:ring-toxi-gold/20 outline-none transition-all"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Khóa học liên quan
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="">Chọn khóa học</option>
                <option value="HSK4">Khóa học HSK 4 Cấp tốc</option>
                <option value="HSK5">Luyện thi HSK 5</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Loại tài liệu
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="pdf">PDF</option>
                <option value="slide">Slide bài giảng</option>
                <option value="exercise">Bài tập bổ trợ</option>
              </select>
            </div>
 {/* Description */}
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Mô tả tài liệu
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Nhập mô tả ngắn về nội dung tài liệu này..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-toxi-gold focus:ring-2 focus:ring-toxi-gold/20 outline-none transition-all resize-none"
        />
      </div>

      {/* Upload File */}
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Tải lên tệp (PDF)
        </label>

        <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">

          <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
            upload_file
          </span>

          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Kéo và thả tệp vào đây hoặc{" "}
            <span className="text-primary">chọn từ máy tính</span>
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Chấp nhận định dạng .pdf (Tối đa 20MB)
          </p>

          <input
            type="file"
            name="file"
            accept=".pdf"
            onChange={handleChange}
            className="hidden"
          />

        </label>

        {formData.file && (
          <p className="text-sm text-green-600 mt-2">
            File đã chọn: {formData.file.name}
          </p>
        )}
      </div>

      {/* Active Status */}
      <div className="md:col-span-2 flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">

        <div>
          <p className="font-semibold text-toxi-blue dark:text-white">
            Trạng thái hoạt động
          </p>
          <p className="text-xs text-slate-500">
            Cho phép học viên truy cập và tải xuống tài liệu này
          </p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">

          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="sr-only peer"
          />

          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 
          peer-checked:after:translate-x-full peer-checked:after:border-white 
          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
          after:bg-white after:border-gray-300 after:border after:rounded-full 
          after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>

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
import react from "react";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminAddNewExample() {
    return (
        <>
            <div className="flex h-screen overflow-hidden ">
                <AdminSidebar />
                {/* Main Content */}
  <main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark/50 overflow-y-auto">
  
  {/* Header (đã đổi thành div) */}
  <div className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
    
    {/* Breadcrumb */}
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <span className="material-symbols-outlined text-primary text-lg">
        spa
      </span>

      <a
        className="hover:text-primary transition-colors"
        href="#"
      >
        Quản lý đề thi
      </a>

      <span className="material-symbols-outlined text-xs">
        chevron_right
      </span>

      <span className="text-slate-900 dark:text-white font-medium">
        Thêm mới đề thi
      </span>
    </div>

    {/* Right section */}
    <div className="flex items-center gap-4">
      
      {/* Notification */}
      <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
        <span className="material-symbols-outlined">
          notifications
        </span>
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>

      {/* User info */}
      <div className="flex items-center gap-3">
        
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
            Admin User
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            Quản trị viên
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-primary/20 overflow-hidden">
          <img
            alt="Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0dTn8JaQ4mz1AgpTLkQfA9Q0SJQEsbDu_221B28qBVL9KblvedGwCTrbyQ3BDJ-2QA-8olyQa4I29y_tyiCPoqanlBuu7QJyhGNCeipKFRY_1hB-TdiW-KaiyTevD8HTwImxECeVFZBJxV5jan4_5Fuvn_27eiyO_DBu9weBqpzbIFOSOECzKuUcz3L_2nt7mPuEgKOAThZ7voOjVk-j7NuHX7b0ilhDNMR_AGeshhiLcPZpXPAhBWogNgeE7i64CYHcK_9pOgrc"
          />
        </div>

      </div>
    </div>

  </div>
{/* Page Body */}
<div className="p-8 w-full">
  
  <div className="flex items-center justify-between mb-8">
    
    {/* Left */}
    <div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
        Tạo đề thi mới
        <span className="material-symbols-outlined text-primary/40 text-2xl">
          edit_note
        </span>
      </h2>

      <p className="text-slate-500 mt-1">
        Thiết lập thông tin cơ bản cho bài kiểm tra đánh giá năng lực.
      </p>
    </div>

    {/* Right buttons */}
    <div className="flex items-center gap-3">
      
      <button
        type="button"
        className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
      >
        Hủy bỏ
      </button>

      <button
        type="button"
        className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">
          save
        </span>
        Lưu đề thi
      </button>

    </div>

  </div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  
  {/* Main Form Section */}
  <div className="lg:col-span-2 space-y-6">
    
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <span className="material-symbols-outlined text-6xl">
          quiz
        </span>
      </div>

      <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <span className="w-1 h-5 bg-primary rounded-full"></span>
        Thông tin chung
      </h3>

      <div className="space-y-5">
        
        {/* Quiz Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Tiêu đề đề thi (Quiz Title) <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="Ví dụ: Kiểm tra cuối khóa HSK 3"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          />
        </div>

        {/* Quiz Type + Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Loại đề thi (Quiz Type)
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none">
                <option value="MULTIPLE_CHOICE">Trắc nghiệm (Multiple Choice)</option>
                <option value="ESSAY">Tự luận (Essay)</option>
                <option value="LISTENING">Kỹ năng nghe (Listening)</option>
                <option value="MIXED">Hỗn hợp (Mixed)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                expand_more
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Thời gian làm bài (Phút)
            </label>
            <div className="relative">
              <input
                type="number"
                defaultValue={60}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none pl-12"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                timer
              </span>
            </div>
          </div>
        </div>

        {/* Pass Score + Max Attempts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Điểm đạt (%)
            </label>
            <div className="relative">
              <input
                type="number"
                defaultValue={80}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none pl-12"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                check_circle
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Số lần thi tối đa
            </label>
            <div className="relative">
              <input
                type="number"
                defaultValue={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none pl-12"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                replay
              </span>
            </div>
          </div>
        </div>

        {/* Max Pause */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Số lần tạm dừng tối đa
          </label>
          <div className="relative w-1/2">
            <input
              type="number"
              defaultValue={0}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none pl-12"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              pause_circle
            </span>
          </div>
        </div>

      </div>
    </div>

    {/* Tip Box */}
    <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
        <span className="material-symbols-outlined">
          lightbulb
        </span>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
          Mẹo nhỏ
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Bạn có thể cấu hình thêm các câu hỏi sau khi nhấn nút "Lưu đề thi".
          Đừng quên thiết lập điểm số cho từng câu hỏi để hệ thống tự động tính toán kết quả.
        </p>
      </div>
    </div>

  </div>
  {/* Sidebar Settings */}
<div className="space-y-6">
  
  {/* Status */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
    
    <h3 className="text-md font-bold mb-4 flex items-center gap-2">
      <span className="material-symbols-outlined text-primary text-lg">
        flag
      </span>
      Trạng thái
    </h3>

    <div className="space-y-3">
      
      {/* Draft */}
      <label className="flex items-center gap-3 p-3 rounded-lg border border-primary bg-primary/5 cursor-pointer">
        <input
          type="radio"
          name="status"
          defaultChecked
          className="text-primary focus:ring-primary"
        />
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            Bản nháp
          </p>
          <p className="text-[10px] text-slate-500">
            Lưu lại để chỉnh sửa sau
          </p>
        </div>
      </label>

      {/* Public */}
      <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors cursor-pointer">
        <input
          type="radio"
          name="status"
          className="text-primary focus:ring-primary"
        />
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            Công khai
          </p>
          <p className="text-[10px] text-slate-500">
            Hiển thị cho học viên ngay
          </p>
        </div>
      </label>

    </div>
  </div>

  {/* Display Settings */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
    
    <h3 className="text-md font-bold mb-4 flex items-center gap-2">
      <span className="material-symbols-outlined text-primary text-lg">
        settings_suggest
      </span>
      Cài đặt hiển thị
    </h3>

    <div className="space-y-4">
      
      {/* Shuffle Questions */}
      <label className="flex items-center justify-between cursor-pointer group">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          Trộn câu hỏi
        </span>
        <div className="relative inline-flex items-center">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 
            peer-checked:after:translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
            after:bg-white after:border after:rounded-full after:h-5 after:w-5 
            after:transition-all dark:border-gray-600 peer-checked:bg-primary">
          </div>
        </div>
      </label>

      {/* Show Answer Immediately */}
      <label className="flex items-center justify-between cursor-pointer group">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          Xem đáp án ngay
        </span>
        <div className="relative inline-flex items-center">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 
            peer-checked:after:translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
            after:bg-white after:border after:rounded-full after:h-5 after:w-5 
            after:transition-all dark:border-gray-600 peer-checked:bg-primary">
          </div>
        </div>
      </label>

      {/* Certificate */}
      <label className="flex items-center justify-between cursor-pointer group">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          Chứng chỉ hoàn thành
        </span>
        <div className="relative inline-flex items-center">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 
            peer-checked:after:translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
            after:bg-white after:border after:rounded-full after:h-5 after:w-5 
            after:transition-all dark:border-gray-600 peer-checked:bg-primary">
          </div>
        </div>
      </label>

    </div>
  </div>

  {/* AI Generator Card */}
  <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-6 text-white overflow-hidden relative group">
    
    <div className="pattern-bg absolute inset-0"></div>

    <div className="relative z-10">
      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-primary">
          auto_awesome
        </span>
      </div>

      <h4 className="font-bold mb-2">
        Trình tạo câu hỏi AI
      </h4>

      <p className="text-xs text-slate-400 leading-relaxed mb-4">
        Sử dụng AI của TOXI để tạo đề thi từ văn bản có sẵn trong vài giây.
      </p>

      <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all border border-white/10">
        Thử nghiệm ngay
      </button>
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
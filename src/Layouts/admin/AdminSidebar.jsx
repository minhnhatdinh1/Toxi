import react from "react";
import toxiLogo from "../../assets/image/LOGO (1).png";
import React, { useState } from "react";
export default function AdminSidebar() {
   const [open, setOpen] = useState(false);
  return (
    <aside className="w-72 bg-primary dark:bg-slate-900 flex-shrink-0 flex flex-col relative chinese-cloud-bg shadow-2xl z-20">

      {/* Logo */}
      <div className="px-3 py-2.5 flex flex-col items-center border-b border-white/10 relative">
        <div className="h-16 w-16 rounded-2xl  text-primary flex items-center ">
          <img src={toxiLogo} alt="TOXI Logo" className=" object-contain" />
        </div>

        <h1 className="text-3xl font-black tracking-tighter text-white">
          TOXI
        </h1>

        <div className="flex items-center gap-2 mt-1">
          <div className="h-[1px] w-4 bg-secondary"></div>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">
            Education
          </p>
          <div className="h-[1px] w-4 bg-secondary"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

        <a
          className="sidebar-active flex items-center gap-3 px-4 py-3 rounded-lg text-white transition-all"
          href="/admin"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-medium">Tổng quan</span>
        </a>

        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
          href="/adminStudent"
        >
          <span className="material-symbols-outlined">group</span>
          <span className="font-medium">Quản lý học viên</span>
        </a>

        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
          href="/adminCourse"
        >
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-medium">Quản lý Store (Sách)</span>
        </a>

        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
          href="/adminStore"
        >
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="font-medium">Quản lý khóa học</span>
        </a>

        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
          href="/adminExample"
        >
          <span className="material-symbols-outlined">quiz</span>
          <span className="font-medium">Ngân hàng đề thi HSK</span>
        </a>

        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
          href="/adminBlog"
        >
          <span className="material-symbols-outlined">article</span>
          <span className="font-medium">Bài viết Blog</span>
        </a>

        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
          href="/adminFinance"
        >
          <span className="material-symbols-outlined">payments</span>
          <span className="font-medium">Báo cáo tài chính</span>
        </a>

        {/* System */}
        <div className="pt-10">
          <p className="px-4 text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
            Hệ thống
          </p>

          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium">Cài đặt</span>
          </a>
        </div>
      </nav>

      {/* Admin Profile */}
      <div className="p-4 mt-auto">
        <div className="bg-white/10 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3">

            <div className="size-10 rounded-full border-2 border-accent-yellow overflow-hidden bg-slate-200">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZvYHM0SKvQCObpBDREu25_Bwy4qTgGLQUSa0jqEOXBroKnKObgFjEzPxG8in7x9UUw9W2f7HK2Liccz8_Vit6UssF-JWAXk3bGyPyImyniFp5g0BSONX6CFXhfipp7Aqa79hs2xuHMDMQSWNU9L99c76KH3ZzfuOD2EhW3Nn1fbXSFj5vLwOjrcMj3YVZAUwJE4VFnarDoy4oeLhHaYtSLX9oglXtiaVhaSmp2vwo5vRJGicXHDYP-cDjj38oMPTyzxShK7DoF1I"
                alt="Avatar của người quản trị admin"
              />
            </div>

            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate">
                Quản trị viên
              </p>
              <p className="text-white/50 text-[10px] truncate">
                admin@toxi.edu.vn
              </p>
            </div>

          </div>
        </div>
      </div>

    </aside>
  );
}


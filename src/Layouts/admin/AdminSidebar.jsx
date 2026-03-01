
import toxiLogo from "../../assets/image/LOGO (1).png";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
export default function AdminSidebar() {

  const menuItems = [
    { name: "Tổng quan", path: "/admin", icon: "dashboard" },
    { name: "Quản lý học viên", path: "/adminStudent", icon: "group" },
    { name: "Quản lý khóa học", path: "/adminCourse", icon: "menu_book" },
    { name: "Quản lý Store (Sách)", path: "/adminStore", icon: "shopping_bag" },
    { name: "Ngân hàng đề thi HSK", path: "/adminExample", icon: "quiz" },
    { name: "Tạo phiếu bài tập", path: "#", icon: "quiz" },
    { name: "Bài viết Blog", path: "/AdminBlog", icon: "article" },
    { name: "Báo cáo tài chính", path: "/adminFinance", icon: "payments" },
    { name: "Quản lý giáo viên ", path: "/adminTeacher", icon: "person" },
  ];



   const [Open, SetOpen] = useState(false);

  return (
   <>
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
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <span className="material-symbols-outlined">
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}

        {/* System section */}
        <div className="pt-10">
          <p className="px-4 text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
            Hệ thống
          </p>

          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium">Cài đặt</span>
          </Link>
        </div>
      </nav>
      <div className="p-4 mt-auto">
  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
    <div className="flex items-center gap-3">
      
      <div className="size-10 rounded-full border-2 border-accent-yellow overflow-hidden bg-slate-200">
        <img
          className="w-full h-full object-cover"
          alt="Avatar của người quản trị admin"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZvYHM0SKvQCObpBDREu25_Bwy4qTgGLQUSa0jqEOXBroKnKObgFjEzPxG8in7x9UUw9W2f7HK2Liccz8_Vit6UssF-JWAXk3bGyPyImyniFp5g0BSONX6CFXhfipp7Aqa79hs2xuHMDMQSWNU9L99c76KH3ZzfuOD2EhW3Nn1fbXSFj5vLwOjrcMj3YVZAUwJE4VFnarDoy4oeLhHaYtSLX9oglXtiaVhaSmp2vwo5vRJGicXHDYP-cDjj38oMPTyzxShK7DoF1I"
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
   </>
  );
}


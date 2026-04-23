import toxiLogo from "../../assets/image/LOGO (1).png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  const menuItems = [
    { name: "Tổng quan", path: "/admin", icon: "dashboard" },
    { name: "Quản lý học viên", path: "/adminStudent", icon: "group" },
    { name: "Quản lý khóa học", path: "/adminCourse", icon: "menu_book" },
    { name: "Review khóa học", path: "/adminCourseComment", icon: "reviews" },
    { name: "Quản lý Store (Sách)", path: "/adminProduct", icon: "shopping_bag" },
    {name : "Quản lý học từ vựng HSK", path: "/adminFlashCardPage", icon: "library_books"},
    { name: "Quản lý Flashcards", path: "/adminFlashCards", icon: "flash_on" },
    { name: "Ngân hàng đề thi HSK", path: "/adminQuiz", icon: "quiz" },
    { name: "Ngân hàng câu hỏi", path: "/adminExam", icon: "quiz" },
    { name: "Bài viết Blog", path: "/AdminBlog", icon: "article" },
    { name: "Quản lý đơn hàng", path: "/admin/orders", icon: "orders" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-[70] flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-2xl lg:hidden"
        aria-label="Mở menu quản trị"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
          aria-label="Đóng menu quản trị"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-[280px] max-w-[86vw] flex-col bg-primary shadow-2xl transition-transform duration-300 dark:bg-slate-900 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:w-72 lg:max-w-none lg:self-start lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-3 py-2.5 flex flex-col items-center border-b border-white/10 relative">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Đóng menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="h-16 w-16 rounded-2xl text-primary flex items-center ">
            <img src={toxiLogo} alt="TOXI Logo" className="object-contain" />
          </div>

          <h1 className="text-3xl font-black tracking-tighter text-white">TOXI</h1>

          <div className="flex items-center gap-2 mt-1">
            <div className="h-[1px] w-4 bg-secondary"></div>
            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">
              Education
            </p>
            <div className="h-[1px] w-4 bg-secondary"></div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}

          <div className="pt-10">
            <p className="px-4 text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
              Hệ thống
            </p>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
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
                <p className="text-white text-sm font-semibold truncate">Quản trị viên</p>
                <p className="text-white/50 text-[10px] truncate">admin@toxi.edu.vn</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

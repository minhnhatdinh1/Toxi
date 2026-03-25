import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import logo from "../../../assets/image/LOGO (1).png";

export default function AdminTopHeader() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userName = localStorage.getItem("userName") || "Admin";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Home");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-40 bg-primary text-white shadow-xl">
      <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
        <Link to="/Home" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">TOXI</h1>
            <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">Education</p>
          </div>
        </Link>

        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative group">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
              className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">
              search
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button onClick={() => navigate("/cart")} className="relative cursor-pointer p-2">
            <span className="material-symbols-outlined text-[28px] text-secondary hover:text-white transition-colors">
              shopping_cart
            </span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 hover:bg-white/10 rounded-full px-2 py-1 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm shadow-md">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm font-semibold max-w-[120px] truncate">{userName}</span>
              <span className="material-symbols-outlined text-white/60 text-[18px]">
                {menuOpen ? "expand_less" : "expand_more"}
              </span>
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100"
                style={{ zIndex: 99999, boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
              >
                <div className="px-4 py-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{userName}</p>
                      <p className="text-xs text-slate-400 truncate">
                        {localStorage.getItem("email") || "Quản trị viên TOXI"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  {[
                    { icon: "dashboard", label: "Bảng điều khiển", to: "/admin" },
                    { icon: "school", label: "Khóa học", to: "/adminCourse" },
                    { icon: "person", label: "Trang cá nhân", to: "/Profile" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setMenuOpen(false);
                        navigate(item.to);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-600 text-sm text-left"
                    >
                      <span className="material-symbols-outlined text-slate-400 text-[20px]">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-100 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-500 text-sm"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
